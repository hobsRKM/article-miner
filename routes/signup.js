var express = require('express');
var router = express.Router();
var auth = require('./middleware/middleware.js');
var user = require('./models/user.js');
/* GET home page. */

router.get('/', function (req, res, next) {
  if (!req.isAuthenticated())
    res.render('signup', { title: 'Express' });
  else
    res.render('dashboard', { title: 'Express' });
});


router.post('/register', function (req, res, next) {

  user.usercheck(req, res).then(function (data) {
    if (!data) {
        /**
         * Register User
         */
        user.register(req, res).then(function (data) {
        
          res.json({ status: "success", "message": "Registration was successfull. You can now login here <a href='login'>Login</a>" });
        
        }).catch((err) => setImmediate(() => { res.json({ status: "ERR", "message": "Something Went Wrong!. Try Again." }); }));

    } else {
      res.json({ status: "fail", "message": "User Exists" });
    }
  }).catch((err) => setImmediate(() => { res.json({ status: "ERR", "message": "Something Went Wrong!. Try Again." }); }));





});

module.exports = router;