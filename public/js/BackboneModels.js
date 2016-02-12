var Task = Backbone.Model.extend({
    defaults: {
        id   : null,
        title: null,
        done : false
    }
});

var TaskCollection = Backbone.Collection.extend({
    model: Task
});

var TaskListModel = Backbone.Model.extend({
    defaults: function () {
        return {
            id   : null,
            title: null,
            tasks: new TaskCollection
        }
    }
});

var TaskListsCollection = Backbone.Collection.extend({
    model: TaskListModel
});