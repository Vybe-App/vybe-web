var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');

var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = 3000;

var app = express();

// view engine setup - set to Jade by defualt, what do we want to use?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

//app.use('/', index);
app.use('/users', users);

//connecting to DB
mongoose.connect(config.getDbConnectionString(), {
  useMongoClient: true,
}, function( err ) {
  if ( err ) {
    console.log( 'Failed connecting to MongoDB!' );
  } else {
    console.log( 'You have connected to Mongo!' );
  }

});

setupController(app);
apiController(app);

// app.get('/main', function(req,res){
//     res.sendFile(path.join(__dirname + '/public'+'/main.html'));
//     console.log("homepage");
// });

app.get('/', function(req, res){
  res.sendfile('index.html');
});

// app.get('/main.css', function(req, res) {
//   res.sendFile(__dirname + "/" + "main.css");
// });




/////// ERROR HANDLING  ////////
//


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);

// var express = require('express');
// var app = express();
// var mongoose = require('mongoose');
// var config = require('./config');
// var setupController = require('./controllers/setupController');
// //var apiController = require('./controllers/apiController');
//
// var port = process.env.PORT || 3000;
//
// app.use('/assets', express.static(__dirname + '/public'));
//
// app.set('view engine', 'ejs');
//
//
// //connecting to DB
// mongoose.connect(config.getDbConnectionString(), {
//   useMongoClient: true,
// }, function( err ) {
//   if ( err ) {
//     console.log( 'Failed connecting to MongoDB!' );
//   } else {
//     console.log( 'You have connected to Mongo!' );
//   }
//
// });
//
// setupController(app);
// //apiController(app);
//
// app.listen(port);


//connecting to DB
// mongoose.connect(config.getDbConnectionString(), {
//   useMongoClient: true,
// }, function( err ) {
//   if ( err ) {
//     console.log( 'Failed connecting to MongoDB!' );
//   } else {
//     console.log( 'You have connected to MongoDB!' );
//   }
//
// });
//
// setupController(app);
//
// app.listen(port);

//module.exports = app;
