var LoginView = Backbone.Marionette.ItemView.extend({
    template: '#template-view',
    ui      : {
        email   : '#email',
        password: '#password',
        register: '#register',
        signIn  : '#signIn'
    },
    events  : {
        'click @ui.register': 'submit',
        'click @ui.signIn'  : 'openSignInPage'
    },

    openSignInPage: function () {

    },

    'submit': function () {
        var email    = this.ui.email.val();
        var password = this.ui.password.val();
        signUp(email, password)
    }
});

var signUp = function (email, password) {
    var md5Pass = md5(password);

    $.post('/signup', {
        email   : email,
        password: md5Pass
    })
};