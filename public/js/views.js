var Task = Backbone.Model.extend({
    idAttribute: '_id',

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
    url        : '/taskLists',
    idAttribute: '_id',
    defaults   : function () {
        return {
            _id  : null,
            title: null,
            tasks: new TaskCollection
        }
    },
    initialize : function () {
        if (this.get('_id')) {
            this.url           = '/taskLists/' + this.get('_id');
            var taskCollection = new TaskCollection;
            taskCollection.url = this.url + '/tasks';
            this.set('tasks', taskCollection);
        }
    }
});

var TaskListsCollection = Backbone.Collection.extend({
    url  : '/taskLists',
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
            this.model.destroy();
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
            var input = this.ui.input.val();
            if (this.model.get('list')) {
                var taskListModel = new TaskListModel({title: input});
                taskListModel.save({}, {
                    success: function () {
                        $('.list-group-item:last-child').attr('href', '/#tasks/' + taskListModel.get('_id'));
                        taskListModel.url = '/taskLists/' + taskListModel.get('_id');
                        var taskCollection = new TaskCollection;
                        taskCollection.url = taskListModel.url + '/tasks';
                        taskListModel.set('tasks', taskCollection);
                    }
                });
                this.collection.add(taskListModel);
            } else {
                this.collection.create({title: input});
            }
            this.ui.input.val('');
        },
        'keyup'               : function (e) {
            if (e.which == 13) {
                this.ui.create.click();
            }
        },
        'click @ui.backButton': function () {
            window.location = '#taskLists';
        }
    }
});


var getListsView = function () {
    taskListCollection.fetch();

    var itemView = ItemView.extend({
        attributes: function () {
            return {
                href: '#tasks/' + this.model.get('_id')
            };
        }
    });

    return new CompositeView({
        collection: taskListCollection,
        childView : itemView,
        model     : new Backbone.Model({title: 'Task lists:', childClass: TaskListModel, list: true})
    });
};

var getTasksView = function (listId) {
    var taskList = taskListCollection.get(listId);
    var title    = taskList.get('title');
    var tasks    = taskList.get('tasks');
    tasks.fetch();

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
                    this.model.destroy();
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
                this.model.save({done: this.model.get('done')});
                this.render();
            }
        }),

        onRender: function () {
            this.ui.backButton.show();
        }
    });

    return new CustomCompositeView({
        collection: tasks,
        model     : new Backbone.Model({title: title + ':', childClass: Task, task: true})
    });
};