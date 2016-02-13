var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('taskList', new Schema({
    title: String,

    subdomain: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
}));