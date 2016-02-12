var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('taskList', new Schema({
    name: String,

    subdomain: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
}));