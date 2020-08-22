var mysql = require('mysql');
var md5 = require('md5');
var constants = require('./constants');

var connection = mysql.createConnection({
    host:constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE
});

function apiKey(req, res) {
    var userId = req.user.username; 
    
    return new Promise(function (resolve, reject) {
        
        connection.query("SELECT api_key  FROM api_key WHERE user_id =?", [userId],function (error, result) {
        
            if (error) {
                return reject(error);
            }
            
            if (result!='') {
                resolve(result[0].api_key)
            }
            else
                resolve("Regenerate API KEY")
        });
    });

}


function checkKey(key) {
   
    
    return new Promise(function (resolve, reject) {
        
        connection.query("SELECT id,api_key,hits,DATE(last_used_date) as  last_used_date FROM api_key WHERE api_key =?", [key],function (error, result) {
        
            if (error) {
                return reject(error);
            }
           
            if (result!='') {
               
                var mydate = new Date(result[0].last_used_date);
                mydate=result[0].last_used_date.toISOString().slice(0,10);
                
                var datetime = new Date();
                datetime=datetime.toISOString().slice(0,10);
                console.log(mydate);
                console.log(datetime);
                console.log(mydate!=datetime);
                if(mydate!=datetime)
                    resetHits(key,result[0].hits,result[0].id,result[0].last_used_date);
                
                if(result[0].hits!=10000){
                    updateHitCount(key);
                    resolve(result[0].api_key)
                }
                else
                    reject({error:"You have reached your daily limit."})
            }
            else
                reject({error:"Invalid API key"})
        });
    });

}

function resetHits(key,hits,id,date){

    return new Promise(function (resolve, reject) {
        
        connection.query('INSERT INTO api_hit_log SET ?', { ap_key_id:id, hits:hits,date:date}, function (error, resultsU, fields) {
            
            return new Promise(function (resolve, reject) {
        
                connection.query("UPDATE api_key  set hits=0,last_used_date=NOW() WHERE api_key =?", [key],function (error, result) {
                
                    
                });
            });
            
        });
        
    });

  
}

function updateHitCount(key) {
   
    
    return new Promise(function (resolve, reject) {
        
        connection.query("UPDATE api_key  set hits=hits+1 WHERE api_key =?", [key],function (error, result) {
        
            
        });
    });

}
exports.apiKey = apiKey;
exports.checkKey = checkKey;
exports.updateHitCount = updateHitCount;
