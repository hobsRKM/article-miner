var express = require('express');
var router = express.Router();
var api = require('./models/api.js');
/* GET Login page. */

router.get('/', function(req, res, next) {
 
  if (!req.isAuthenticated())
    res.render('login', { title: 'Express' });
  else{
  
    api.apiKey(req,res).then(function (data) {
      console.log(data);
      res.render('dashboard', { key: data }); 
      }).catch((err) => setImmediate(() => {  res.send("Something Went Wrong!, Try Again!"); }));
    
 
    
  }
  });
 
module.exports = router;
 