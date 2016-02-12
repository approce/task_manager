

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