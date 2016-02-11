var express = require('express');
var router  = express.Router();

var User = require('../model/User');
var md5  = require("../node_modules/blueimp-md5/js/md5.min");

var salt = 'IAmHighlyRandomSaltValue';

router.post('/', function (req, res, next) {
    var body = req.body;

    var username       = body.username;
    var password       = body.password;
    var saltedPassword = md5(password + salt);

    User.find({username: username, password: saltedPassword}, function (err, resp) {
        if (err) {
            console.log(err);
        }
        if (resp.length > 0) {
            res.sendStatus(20);
        } else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;