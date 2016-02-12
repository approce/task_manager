var express = require('express');
var router  = express.Router();

var TaskList = require('../model/TaskList');

router.post('/', function (req, res, next) {
    var body  = req.body;
    var title = body.title;
    var user  = body.user;

    var taskList = new TaskList({name: title, subdomain: user});
    taskList.save();

    res.sendStatus(201);
});
router.get('/', function (req, res, next) {
    console.log(req);
    res.sendStatus(200);
});

module.exports = router;