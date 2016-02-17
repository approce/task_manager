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
            var input  = this.ui.input.val();
            var nextId = getNextIdentifier(this.collection);
            var Model  = this.model.get('childClass');

            var model = new Model({id: nextId, title: input});
            this.collection.add(model);

            this.ui.input.val('');
        },
        'keyup'               : function (e) {
            if (e.which == 13) {
                this.ui.create.click();
            }
        },
        'click @ui.backButton': function () {
            window.location = '#';
        }
    },

    onRender: function () {
        this.ui.backButton.hide();
    }
});