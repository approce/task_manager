var Task = Backbone.Model.extend({
    defaults: {
        id   : null,
        title: null
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
        input : 'input',
        create: '#create'
    },
    events            : {
        'click @ui.create': function () {
            var input  = this.ui.input.val();
            var nextId = getNextIdentifier(this.collection);
            var Model  = this.model.get('childClass');

            var model = new Model({id: nextId, title: input});
            this.collection.add(model);

            this.ui.input.val('');
        },
        'keyup'           : function (e) {
            if (e.which == 13) {
                this.ui.create.click();
            }
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
    var collection = taskListCollection.at(listId).get('tasks');
    return new CompositeView({
        collection: collection,
        model     : new Backbone.Model({title: 'Tasks:', childClass: Task})
    });
};