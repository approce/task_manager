var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('taskLists', new Schema({
    lists: [{
        listName: String,
        tasks   : [{
            taskName: String
        }]
    }],

    ingredients: [{
        type: Schema.Types.ObjectId, ref: 'user'
    }]
}));