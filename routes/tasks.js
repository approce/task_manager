var express = require('express');
var router  = express.Router();

var Task = require('../model/Task');

router.get('/:id/tasks', function (req, res, next) {
    var taskListiId = req.params.id;

    Task.find({subdomain: taskListiId}, function (err, resp) {
        if (err) {
            console.error(err);
        }
        if (resp) {
            console.log(resp);
            res.send(resp);
        } else {
            res.sendStatus(500);
        }
    });
});

router.post('/:id/tasks', function (req, res, next) {
    var taskListId = req.params.id;
    var title      = req.body.title;

    var task = new Task({subdomain: taskListId, title: title});
    task.save();

    res.send(201,task);
});

router.delete('/:id/tasks/:taskId', function (req, res) {
    var taskId = req.params.taskId;
    Task.remove({_id: taskId}, function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

router.put('/:id/tasks/:taskId', function (req, res) {
    var body   = req.body;
    var taskId = req.params.taskId;

    Task.update({_id: taskId}, body, {}, function (err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});


module.exports = router;