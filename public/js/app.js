//Attention: google do not permits to remove very first task list & first task in any list.

var initApp = function () {
    console.log('inited');
    var myApp;
    var Router = Backbone.Router.extend({
        routes: {
            "/"        : "signUp",
            "tasks/:id": "tasks",
            'signup'   : 'signUp'
        },
        lists : function () {
            console.log('1');
            myApp.layout.content.show(getListsView());
        },
        tasks : function (id) {
            myApp.layout.content.show(getTasksView(id));
        },
        signUp: function () {
            console.log('1');
            myApp.layout.content.show(new LoginView);
        }
    });

    var AppLayout = Marionette.LayoutView.extend({
        template: "#layout-template",
        regions : {
            content : "#content",
            register: '#auth'
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
    myApp.layout.content.show(new LoginView);
};

initApp();