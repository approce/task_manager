var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('task', new Schema({
    title: String,
    done: Boolean,

    subdomain: {
        type: Schema.Types.ObjectId, ref: 'taskList'
    }
}));