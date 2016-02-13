var express = require('express');
var router  = express.Router();

var User = require('../model/User');
var md5  = require("../node_modules/blueimp-md5/js/md5.min");

var salt = 'IAmHighlyRandomSaltValue';

router.get('/user', function (req, res, next) {
    User.find({_id: req.session.userId}, function (err, resp) {
        if (err) {
            console.log(err);
        }
        if (resp) {
            console.log(resp);
            res.send(resp);
        } else {
            res.sendStatus(401);
        }
    });
});


router.post('/signin', function (req, res, next) {
    var body = req.body;

    var credentials = {email: body.email, password: md5(body.password + salt)};

    User.findOne(credentials, function (err, resp) {
        if (err) {
            console.log(err);
        }
        if (resp) {
            req.session.userId = resp._id;
            res.send(200);
        } else {
            res.sendStatus(401);
        }
    });
});

router.post('/signup', function (req, res, next) {
    var body = req.body;

    var email          = body.email;
    var password       = body.password;
    var saltedPassword = md5(password + salt);

    var user = new User({
        email   : email,
        password: saltedPassword
    });

    user.save(function (err, resp) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            req.session.userId = resp._id
            res.sendStatus(201);
        }
    });
});

module.exports = router;