var express = require('express');
var router  = express.Router();

var TaskList = require('../model/TaskList');

router.post('/', function (req, res, next) {
    var title  = req.body.title;
    var userId = req.session.userId;

    var taskList = new TaskList({title: title, subdomain: userId});
    taskList.save();

    res.sendStatus(201);
});

router.get('/', function (req, res, next) {
    var userId = req.session.userId;

    TaskList.find({subdomain: userId}, function (err, resp) {
        if (err) {
            console.error(err);
        }
        res.send(resp);
    });
});

module.exports = router;