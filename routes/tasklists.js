var express = require('express');
var router  = express.Router();

var TaskList = require('../model/TaskList');

router.post('/', function (req, res, next) {

    console.log(req.sessionID);
    console.log(req.session);
    var body  = req.body;
    var title = body.title;
    var user  = body.user;

    var taskList = new TaskList({name: title, subdomain: user});
    taskList.save();

    res.sendStatus(201);
});
router.get('/', function (req, res, next) {
    console.log(req.sessionID);
    console.log(req.session);
    req.session.value = 'value';
    var user = '56bd14b5ca8b435e15587d83';
    TaskList.find({subdomain: user}, function (err, resp) {
        res.send(resp);
    });
});

module.exports = router;