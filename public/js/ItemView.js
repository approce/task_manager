
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
            this.model.collection.remove(this.model);
        }
    }
});