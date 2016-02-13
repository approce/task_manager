var LoginView = Backbone.Marionette.ItemView.extend({
    template: '#template-view',
    ui      : {
        email   : '#email',
        password: '#password',
        signUp  : '#signUp'
    },

    events: {
        'click @ui.signUp': 'submit'
    },

    'submit': function () {
        var email    = this.ui.email.val();
        var password = this.ui.password.val();
        signUp(email, password)
    }
});

var signUp = function (email, password) {
    var md5Pass = md5(password);

    $.post('/auth/signup', {
        email   : email,
        password: md5Pass
    }).success(function (data) {
        if (data == 'Already exist') {
            $('#exist').show();
        } else {
            window.location = '#taskLists';
        }
    })
};