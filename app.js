var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var lessMiddleware = require('less-middleware');
 bcrypt = require('bcryptjs');
var index = require('./routes/home');
var api = require('./routes/api');
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
const LocalStrategy = require('passport-local').Strategy
var app = express();
const passport = require('passport')
const session = require('express-session')
const https = require('https');
const http = require('http');
var Promise = require('promise');
const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/extractmi.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/extractmi.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/extractmi.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

//mysql





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'W$q4=25*8%v-}UV',
  resave: true,
  saveUninitialized: true
}));


/**
 * Passport
 * 
 * 
 */
app.use(passport.initialize())
app.use(passport.session())
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/dashboard'
}));

/**
 * End of init passport
 */

/**
 * Routes
 */
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', api);
app.use('/dashboard', dashboard);
app.use('/signup', signup)

/**
 * End of routes
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
 
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

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
const httpServer = http.createServer(app);

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 80');
});
/**
 * Passport User Validation
 * 
 */
var user = require('./routes/models/user.js');
passport.use(new LocalStrategy(
  (username, password, done) => {
    
    user.logincheck(username,password).then(function (data) {
    
      return done(null, {username: data});    
    }).catch((err) => setImmediate(() => { return done(null, false); }));
   }
 ));

 /**
  * End of validation
  */
 passport.serializeUser(function(user, done) {
     done(null, user.username);
 });
 passport.deserializeUser((username, done) => {
     done(null, {username: username});
 }); 

module.exports = app;
