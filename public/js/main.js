var LISTS_URL      = 'https://content.googleapis.com/tasks/v1/users/@me/lists';
var LIST_TASKS_URL = 'https://content.googleapis.com/tasks/v1/lists/{0}/tasks/';

var ListModel = Backbone.Model.extend({
    urlRoot : LISTS_URL,
    defaults: {
        id   : null,
        title: ''
    }
});

var ListCollection = Backbone.Collection.extend({
    url  : LISTS_URL,
    model: ListModel,
    parse: function (data) {
        return data.items;
    }
});

var ItemView = Backbone.Marionette.ItemView.extend({
    tagName   : 'a',
    className : 'list-group-item',
    attributes: function () {
        return {
            href: '#'
        }
    },
    template  : '#item-template',
    ui        : {
        removeBtn: '.remove'
    },
    events    : {
        'click @ui.removeBtn': function (e) {
            console.log(e);
            e.preventDefault();
            console.log('123');
            this.model.destroy();
        }
    }
});

var CompositeView = Backbone.Marionette.CompositeView.extend({
    el                : '#container',
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
            model.save();
            this.collection.add(model);
            this.ui.input.val('');
        },
        'keyup'           : function (e) {
            if (e.which == 13) {
                console.log('here');
                this.ui.create.click();
            }
        }
    }
});

var initWorkspace  = function () {
    Backbone.history.start();

    renderTaskList();

    var Workspace = Backbone.Router.extend({
        routes: {
            ""         : "lists",
            "tasks/:id": "tasks"
        }
    });

    var workspace = new Workspace;
    workspace.on('route:lists', function (action) {
        renderTaskList();
    });
    workspace.on('route:tasks', function (id) {
        render(id);
    });
};
var renderTaskList = function () {
    var taskListCollection = new ListCollection();
    taskListCollection.fetch();

    var itemView = ItemView.extend({
        attributes: function () {
            return {
                href: '#tasks/' + this.model.get('id')
            };
        },
        ui        : {
            row      : '.task_list_row',
            removeBtn: '.remove'
        },
        events    : {
            'click @ui.removeBtn': function (e) {
                e.preventDefault();
                this.model.destroy();
            },
            'click @ui.row'      : function (e) {
                render(this.model.get('id'));
            }
        }
    });

    var compositeView = new CompositeView({
        collection: taskListCollection,
        childView : itemView,
        model     : new Backbone.Model({title: 'Task lists:', childClass: ListModel})
    });
    compositeView.render();
};

var render = function (listId) {
    var url = LIST_TASKS_URL.format(listId);

    var TaskModel = ListModel.extend({
        urlRoot: url
    });

    var TaskCollection = ListCollection.extend({
        url  : url,
        model: TaskModel
    });

    var collection = new TaskCollection();
    collection.fetch();

    var TaskCompositeView = CompositeView.extend({});

    var compositeView = new TaskCompositeView({
        collection: collection,
        model     : new Backbone.Model({title: 'Tasks:', childClass: TaskModel})
    });

    compositeView.render();
};