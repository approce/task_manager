var taskListCollection = new TaskListsCollection();

function getNextIdentifier(collection) {
    if (collection.length) {
        var lastModelIdentifier = collection.at(collection.length - 1).get('id');
        return ++lastModelIdentifier;
    } else {
        return 0;
    }
}

(function () {
    var myApp;
    var Router = Backbone.Router.extend({
        routes: {
            ""         : "lists",
            "tasks/:id": "tasks"
        },
        lists : function () {
            myApp.layout.content.show(getListsView());
        },
        tasks : function (id) {
            myApp.layout.content.show(getTasksView(id));
        }
    });

    var AppLayout = Marionette.LayoutView.extend({
        template: "#layout-template",
        regions : {
            content: "#content"
        }
    });

    var MyApp = Marionette.Application.extend({
        onStart   : function () {
            this.router = new Router();
            Backbone.history.start();
        },
        initialize: function () {
            this.layout = new AppLayout({el: '#main'});
            this.layout.render();
        }
    });
    myApp     = new MyApp();
    myApp.start();
})();