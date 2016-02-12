var express = require('express');
var router  = express.Router();
var User    = require('../model/User');
var md5     = require("../node_modules/blueimp-md5/js/md5.min");

var salt = 'IAmHighlyRandomSaltValue';

router.post('/', function (req, res, next) {
    var body = req.body;

    var email          = body.email;
    var password       = body.password;
    var saltedPassword = md5(password + salt);

    var user = new User({
        email   : email,
        password: saltedPassword
    });

    user.save(function (err) {
        if (err) {
            console.log(err);
        }
    });

    res.sendStatus(201);
});

module.exports = router;