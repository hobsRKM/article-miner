var express = require('express');
var router = express.Router();
var auth = require('./middleware/middleware.js');
var api = require('./models/api.js');
/* GET home page. */

router.get('/',auth.isLoggedIn, function(req, res, next) {
 
  api.apiKey(req,res).then(function (data) {
    console.log(data);
    res.render('dashboard', { key: data }); 
    }).catch((err) => setImmediate(() => {  res.send("Something Went Wrong!, Try Again!"); }));
  });
  

module.exports = router;
