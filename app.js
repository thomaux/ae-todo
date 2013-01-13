
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socket = require('./routes/socket')
  , todo = require('./routes/todo')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/todos', todo.list);
app.post('/todo', todo.create);
app.put('/todo/:id', todo.update);
app.options('/todos', todo.options);
app.options('/todo', todo.options);
app.options('/todo/:id', todo.options);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', socket);