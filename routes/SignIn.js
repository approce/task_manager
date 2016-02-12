var express = require('express');
var router  = express.Router();

var User = require('../model/User');
var md5  = require("../node_modules/blueimp-md5/js/md5.min");

var salt = 'IAmHighlyRandomSaltValue';

router.post('/', function (req, res, next) {
    var body = req.body;

    var credentials = {email: body.email, password: md5(body.password + salt)};
    console.log('Credentials', credentials);


    User.findOne(credentials, function (err, resp) {
        if (err) {
            console.log(err);
        }
        if (resp) {
            res.send(resp._id);

        } else {
            res.sendStatus(401);
        }
    });
});

module.exports = router;