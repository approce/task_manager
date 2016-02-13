var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var authRouter = require('./routes/Authentication');
var routes     = require('./routes/index');
var taskLists  = require('./routes/tasklists');
var task  = require('./routes/tasks');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/tasks');

var app = express();

app.listen(3003);
app.use(express.static(__dirname + '/public'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    store            : new session.MemoryStore(),
    secret           : 'If you keep ur head, when all about u r loosing theirs & blaming it on u.',
    resave           : true,
    saveUninitialized: false,
    cookie           : {maxAge: 24 * 60 * 60 * 1000}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/taskLists', taskLists);
app.use('/taskLists', task);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});


module.exports = app;