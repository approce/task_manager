var express = require('express');
var router  = express.Router();

var TaskList = require('../model/TaskList');


router.get('/', function (req, res, next) {
    console.log(req.session);
    console.log('4');
    console.log(req.params);

});
router.post('/', function (req, res, next) {
    var body  = req.body;
    var title = body.title;
    var user  = body.user;

    var taskList = new TaskList({name: title, subdomain: user});
    taskList.save();

    res.sendStatus(201);
});


module.exports = router;