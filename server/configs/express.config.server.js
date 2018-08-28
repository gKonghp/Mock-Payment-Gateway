/**
 * Created by gordonkong on 25/8/2018.
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    http = require('http'),
    errorhandler = require('errorhandler'),
    session = require('express-session'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    config = require('./config.server'),
    compress = require('compression'),
    serveFavicon = require('serve-favicon'),
    path = require('path');


var app = express();

var server = http.createServer(app);


//   Server-in-development Configuration
if ('development' == app.get('env')) {
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
}

//   Server-in-production Configuration
if ('production' == app.get('env')) {
    app.use(errorhandler());
}


//  Application Configuration

app.set('views', config.rootPath + 'server/views');
app.set('view engine', 'jade');

// Port Configuration
app.set('port', config.port);

// Middleware Configuration
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));
app.use(bodyParser.json());


 app.use(session({
 secret: config.sessionSecret,
 saveUninitialized: true,
 resave: true,
 }));


app.use(compress());
// app.use(serveFavicon(path.join(config.rootPath, 'public', 'dist', 'assets', 'images', 'icon', 'favicon.ico')));
app.use(express.static(path.join(config.rootPath, 'public', 'dist')));
// Routes Configuration

require('../routes/error.route.server')(app);
require('../routes/entry.route.server')(app);
require('../routes/order.route.server')(app);
require('../routes/paymentGatewayAdaptor.route.server')(app);

// layout render for "*"
app.all('/*', function (req, res, next) {
    return res.render('entry.view.server.jade');
});

// message for porting in use
server.listen(app.get('port'), function (err) {
    console.log('Mock Payment Gateway server listening on port ' + app.get('port'));
});
/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', function(error){
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof app.get('port') === 'string'
        ? 'Pipe ' + app.get('port')
        : 'Port ' + app.get('port');

    // handle specific listen errors
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// catch 404 and forward to error handler
 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });




module.exports = server;