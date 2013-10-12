
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var users = require('./routes/users');
var wx = require('./routes/wx');
var log = require('./routes/log');
var menu = require('./routes/menu');
var system = require('./routes/system');
var home = require('./routes/home');
var recommended = require('./routes/recommended');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/wx', wx.access);
app.post('/wx', wx.message);
app.get('/log', log.list);
app.get('/users', users.list);
app.post('/users', users.save);
app.get('/menu', menu.list);
app.get('/system',system.create)
app.get('/home/:user', home.list);
app.get('/recommended',recommended.list)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
