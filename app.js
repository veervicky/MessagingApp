
/**
 * Module dependencies.
 */

var express = require('express')
  , signup = require('./routes/signup')
  , index = require('./routes/index')
  , users = require('./routes/user')
  , messages = require('./routes/messages')
  , http = require('http')
  , path = require('path') ;

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
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

//starting application
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Defining get webservice
app.get('/', index.login);
app.get('/signup', signup.signup);

//Defining post webservice
app.post('/signup', function(request, response){
    //console.log(response.getValue());
    users.add(request,response);
});

app.post('/login', function(request, response){
    users.validate(request,response);
});

app.post('/createMessage', function(request, response){
    //console.log(request.body);
    messages.createNewMessage(request,response);
});

app.post('/addMessage', function(request, response){
    //console.log("In add Message"+request.body.user);
    messages.add(request,response);
});

app.post('/showMessage', function(request, response){
    //console.log(request.body);
    messages.showMessagesReceived(request,response);
});

app.post('/newReplyMessage', function(request, response){
    //console.log(request.body);
    messages.showUsingThreadId(request,response);
});


