var mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
    username: String,
    password: String
}));

//var save = function (snapshot) {
//    new SnapshotModel(snapshot).save(function (err) {
//        if (err) {
//            console.log(err);
//        }
//    });
//};