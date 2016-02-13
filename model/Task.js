var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('task', new Schema({
    title: String,

    subdomain: {
        type: Schema.Types.ObjectId, ref: 'taskList'
    }
}));