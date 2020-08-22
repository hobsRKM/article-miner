var express = require('express');
var router = express.Router();
var api = require('./models/api.js');
let {PythonShell} = require('python-shell')


router.get('/', function(req, res, next) {
  var url=req.query.url;
  var key=req.query.key;
  console.log(key);
  if(typeof key==='undefined' || typeof url==='undefined' ){
    
    res.json({error:"Please check the Docs on how to use the API."});
  }
  api.checkKey(key).then(function (data) {
    processURL(url,res);
   
   
    }).catch((err) => setImmediate(() => {  res.json(err); }));
  
 

});


router.post('/', function(req, res, next) {
  var url=req.body.url;
  processURL(url,res);
 

});

function processURL(url,res){
  var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    args: [url]
  };
  
  PythonShell.run('image.py', options, function (err, results) {
      var data=[]
    if (err){ 
        
          data.push({status:"fail",mine:"Error!.",error:"Opps Somwthing Went Wrong. Try Again!"});
          res.json(data);
          return false;
        
      } 
    // results is an array consisting of messages collected during execution
    var mine=results;
    var details=JSON.parse(mine)
    data.push({status:"ok",mine:details});
    res.json(data);
  });
}
module.exports = router;
