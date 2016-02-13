//Attention: google do not permits to remove very first task list & first task in any list.

var authentication = false;

var initApp = function () {
    var myApp;
    var Router = Backbone.Router.extend({
        routes: {
            "/"        : "verify",
            "taskLists": "lists",
            "tasks/:id": "tasks",
            'signup'   : 'signUp',
            'signin'   : 'signIn'
        },
        verify: function () {
            console.log('1');
            if (authentication) {
                this.lists();
            } else {
                this.signUp();
            }
        },
        lists : function () {
            myApp.layout.content.show(getListsView());
        },
        tasks : function (id) {
            console.log(id);
            myApp.layout.content.show(getTasksView(id));
        },
        signUp: function () {
            myApp.layout.content.show(new LoginView);
        },
        signIn: function () {
            myApp.layout.content.show(new SignInView);
        }
    });

    var AppLayout = Marionette.LayoutView.extend({
        template: "#layout-template",
        regions : {
            content : "#content",
            register: '#auth',
            signIn  : '#signInLayout'
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

    $.get('/auth/user').done(function (data) {
        window.location = '#taskLists';
    }).fail(function () {
        window.location = '#signup';
    });

};

initApp();