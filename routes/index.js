var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Article Miner' });
});

router.get('/image', function(req, res, next) {
  var url=req.query.article_url;
  
var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python3',
//  pythonOptions: ['-u'],
//  scriptPath: 'path/to/my/scripts',
  args: [url]
};

PythonShell.run('image.py', options, function (err, results) {
    var data=[]
  if (err){ 
      
        data.push({status:"fail",top_image:"Error!.",error:err.traceback});
        res.json(data);
        return false;
      
    }
  // results is an array consisting of messages collected during execution
  var image=results;
  
  data.push({status:"ok",top_image:image});
  res.json(data);
});
});
module.exports = router;
