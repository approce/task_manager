var TaskListModel      = Backbone.Model.extend({
    urlRoot : 'https://content.googleapis.com/tasks/v1/users/@me/lists',
    defaults: {
        id   : null,
        title: 'empty title'
    }
});
var TaskListCollection = Backbone.Model.extend({
    url  : 'https://content.googleapis.com/tasks/v1/users/@me/lists',
    model: TaskListModel,
    parse: function (data) {
        return data.items;
    }
});

var renderTaskList = function () {
    var taskListCollection = new TaskListCollection();

    taskListCollection.fetch({
        success: function (data) {
            render(data.attributes[0].id);
        }
    });
};

var render = function (listId) {

    var TaskModel      = Backbone.Model.extend({
        urlRoot : 'https://content.googleapis.com/tasks/v1/lists/' + listId + '/tasks/',
        defaults: {
            id   : null,
            title: 'empty title'
        }
    });
    var TaskCollection = Backbone.Collection.extend({
        url  : 'https://content.googleapis.com/tasks/v1/lists/' + listId + '/tasks',
        model: TaskModel,
        parse: function (data) {
            return data.items;
        }
    });

    var taskListCollection = new TaskListCollection();
    taskListCollection.fetch();

    var collection = new TaskCollection();
    collection.fetch();

    var TaskList = Backbone.Marionette.ItemView.extend({
        tagName  : 'a',
        className: 'list-group-item',
        template : _.template("Task: <%= title %>" +
                              "<a class='label label-danger pull-right'>X</a>"),
        ui       : {
            removeBtn: 'a'
        },
        events   : {
            'click @ui.removeBtn': function () {
                this.model.destroy();
            }
        }
    });

    var View = Backbone.Marionette.ItemView.extend({
        tagName  : 'a',
        className: 'list-group-item',
        template : _.template("Task: <%= title %>" +
                              "<a class='label label-danger pull-right'>X</a>"),
        ui       : {
            removeBtn: 'a'
        },
        events   : {
            'click @ui.removeBtn': function () {
                this.model.destroy();
            }
        }
    });

    var CompositeView = Backbone.Marionette.CompositeView.extend({
        template          : '#wrap',
        childView         : View,
        childViewContainer: '.wrap',

        ui    : {
            input : 'input',
            create: 'button'
        },
        events: {
            'click @ui.create': function () {
                var input = this.ui.input.val();
                var task  = new TaskModel({title: input});
                task.save();
                this.collection.add(task);
            }
        }
    });

    var view = new CompositeView({el: '#container', collection: collection});

    view.render();
};