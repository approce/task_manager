var SignInView = Backbone.Marionette.ItemView.extend({
    template: '#sign-in-view',
    ui      : {
        email   : '#email',
        password: '#password',
        register: '#register',
        signIn  : '#signIn'
    },
    events  : {
        'click @ui.register': 'submit',
        'click @ui.signIn'  : 'signIn'
    },
    signIn  : function () {
        console.log('sign in');
        var email    = this.ui.email.val();
        var password = this.ui.password.val();
        signIn(email, password);
    }
});

var signIn = function (email, password) {
    var md5Pass = md5(password);

    $.post('/signIn', {
        email   : email,
        password: md5Pass
    }).success(function (data, statusText, xhr) {
        if (xhr.status === 200) {
            console.log('Authentication successful');
            console.log(data);
        }
    }).fail(function () {
        console.log('Incorrect credentials');
    });
};