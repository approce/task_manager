var express = require('express');
var router  = express.Router();
var User    = require('../model/User');
var md5     = require("./md5")

var salt = 'IAmHighlyRandomSaltValue';

router.post('/', function (req, res, next) {
    var body = req.body;

    var username       = body.username;
    var password       = body.password;
    var saltedPassword = md5(password + salt);

    var user = new User({
        username: username,
        password: saltedPassword
    });

    user.save(function (err) {
        if (err) {
            console.log(err);
        }
    });

    res.send(201);
});

module.exports = router;