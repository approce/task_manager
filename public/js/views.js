var LISTS_URL      = 'https://content.googleapis.com/tasks/v1/users/@me/lists';
var LIST_TASKS_URL = 'https://content.googleapis.com/tasks/v1/lists/{0}/tasks/';

var CommonModel = Backbone.Model.extend({
    urlRoot : LISTS_URL,
    defaults: {
        id   : null,
        title: ''
    }
});

var ListCollection = Backbone.Collection.extend({
    url  : LISTS_URL,
    model: CommonModel,
    parse: function (data) {
        return data.items;
    }
});

var ItemView = Backbone.Marionette.ItemView.extend({
    tagName  : 'a',
    className: 'list-group-item',
    template : '#item-template',
    ui       : {
        removeBtn: '.remove'
    },
    events   : {
        'click @ui.removeBtn': function (e) {
            e.preventDefault();
            this.model.destroy();
        }
    }
});

var CompositeView = Backbone.Marionette.CompositeView.extend({
    template          : '#list-template',
    childView         : ItemView,
    childViewContainer: '.wrap',
    ui                : {
        input : 'input',
        create: '#create'
    },
    events            : {
        'click @ui.create': function () {
            var input = this.ui.input.val();
            var Model = this.model.get('childClass');
            var model = new Model({title: input});
            model.save(model.attributes, {
                success: function () {
                    this.collection.add(model);
                }.bind(this)
            });

            this.ui.input.val('');
        },
        'keyup'           : function (e) {
            if (e.which == 13) {
                this.ui.create.click();
            }
        }
    }
});

var getListsView = function () {
    var taskListCollection = new ListCollection();
    taskListCollection.fetch();

    var itemView = ItemView.extend({
        attributes: function () {
            return {
                href: '#tasks/' + this.model.get('id')
            };
        },
        ui        : {
            removeBtn: '.remove'
        },
        events    : {
            'click @ui.removeBtn': function (e) {
                e.preventDefault();
                this.model.destroy();
            }
        }
    });

    return new CompositeView({
        collection: taskListCollection,
        childView : itemView,
        model     : new Backbone.Model({title: 'Task lists:', childClass: CommonModel})
    });
};

var getTasksView = function (listId) {
    var url = LIST_TASKS_URL.format(listId);

    var TaskModel = CommonModel.extend({
        urlRoot: url
    });

    var TaskCollection = ListCollection.extend({
        url  : url,
        model: TaskModel
    });

    var collection = new TaskCollection();
    collection.fetch();

    var TaskCompositeView = CompositeView.extend({});

    return new TaskCompositeView({
        collection: collection,
        model     : new Backbone.Model({title: 'Tasks:', childClass: TaskModel})
    });
};