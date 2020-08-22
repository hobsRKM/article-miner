var express = require('express');
var router = express.Router();
  

  router.get('/', function(req, res, next) {
    if (!req.isAuthenticated())
      res.render('login', { title: 'Express' });
    else{
        req.logout();
        res.render('login', { title: 'Express' });
    }
    });

module.exports = router;
