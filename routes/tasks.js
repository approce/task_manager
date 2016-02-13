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
    var user = '56bd14b5ca8b435e15587d83';

    var taskList = new TaskList({title: title, subdomain: user});
    taskList.save();

    res.sendStatus(201);
});


module.exports = router;