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
            authentication  = data;
            console.log(authentication);
            console.log('Authentication successful');
            window.location = '#taskLists';
        }
    }).fail(function () {
        console.log('Incorrect credentials');
    });
};