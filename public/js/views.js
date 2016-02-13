var Task = Backbone.Model.extend({
    defaults: {
        _id  : null,
        title: null,
        done : false
    }
});

var TaskCollection = Backbone.Collection.extend({
    model: Task
});

var TaskListModel = Backbone.Model.extend({
    urlRoot : function () {
        return '/taskLists';
    },
    defaults: function () {
        return {
            user : null,
            _id  : null,
            title: null,
            tasks: new TaskCollection
        }
    }
});

var TaskListsCollection = Backbone.Collection.extend({
    url  : function () {
        return '/taskLists';
    },
    parse: function (val) {
        console.log(val);
        return val;
    },
    model: TaskListModel
});

var taskListCollection = new TaskListsCollection();

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
            this.model.collection.remove(this.model);
        }
    }
});

var CompositeView = Backbone.Marionette.CompositeView.extend({
    template          : '#list-template',
    childView         : ItemView,
    childViewContainer: '.wrap',
    ui                : {
        input     : 'input',
        create    : '#create',
        backButton: '.back'
    },
    events            : {
        'click @ui.create'    : function () {
            var input  = this.ui.input.val();
            var nextId = getNextIdentifier(this.collection);
            var Model  = this.model.get('childClass');

            var model = new Model({title: input, user: authentication});
            model.save();
            this.collection.add(model);

            this.ui.input.val('');
        },
        'keyup'               : function (e) {
            if (e.which == 13) {
                this.ui.create.click();
            }
        },
        'click @ui.backButton': function () {
            window.location = '#';
        }
    }
});

function getNextIdentifier(collection) {
    if (collection.length) {
        var lastModelIdentifier = collection.at(collection.length - 1).get('id');
        return ++lastModelIdentifier;
    } else {
        return 0;
    }
}

var getListsView = function () {
    taskListCollection.fetch( {success: function () {
        console.log('5');
    }});
    var itemView = ItemView.extend({
        attributes: function () {
            return {
                href: '#tasks/' + this.model.get('id')
            };
        }
    });

    return new CompositeView({
        collection: taskListCollection,
        childView : itemView,
        model     : new Backbone.Model({title: 'Task lists:', childClass: TaskListModel})
    });
};

var getTasksView = function (listId) {
    var taskList = taskListCollection.at(listId);
    var title    = taskList.get('title');
    var tasks    = taskList.get('tasks');

    var CustomCompositeView = CompositeView.extend({
        childView: ItemView.extend({
            ui: {
                removeBtn : '.remove',
                stateIcon : '.state-icon',
                backButton: '.back'
            },

            events: {
                'click'               : 'changeTaskState',
                'click @ui.backButton': 'goBack',
                'click @ui.removeBtn' : function (e) {
                    e.preventDefault();
                    this.model.collection.remove(this.model);
                }
            },

            onRender: function () {
                var stateIcon = this.ui.stateIcon;
                if (this.model.get('done') == false) {
                    stateIcon.addClass('glyphicon-unchecked');
                } else {
                    stateIcon.addClass('glyphicon-check');
                }
                this.ui.stateIcon.show();
            },

            changeTaskState: function () {
                if (!this.isRendered) {
                    return
                }
                this.model.set('done', this.model.get('done') ? false : true);
                this.render();
            }
        }),

        onRender: function () {
            this.ui.backButton.show();
        }
    });

    return new CustomCompositeView({
        collection: tasks,
        model     : new Backbone.Model({title: title + ':', childClass: Task})
    });
};