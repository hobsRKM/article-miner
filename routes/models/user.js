var mysql = require('mysql');
var md5 = require('md5');
 

var connection = mysql.createConnection({
    host:constants.HOST,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE
});
function register(req, res) {
    var data = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);

    return new Promise(function (resolve, reject) {
        
        connection.query('INSERT INTO users SET ?', { user_name: data.email, email: data.email, password: hash }, function (error, resultsU, fields) {
            
            if (error) {
                return reject(error);
                resolve(false)
            }
            var userId=resultsU.insertId;
            console.log(userId);
            var apiKey=md5(userId);
            connection.query('INSERT INTO api_key SET ?', { user_id: userId, api_key: apiKey }, function (error, resultsA, fields) {
            
                if (error) {
                    return reject(error);
                    resolve(false)
                }
                
                resolve(true)
            });
            
        });
        
    });



}

function usercheck(req, res) {
    var email = req.body.email; 
    
    return new Promise(function (resolve, reject) {
        
        connection.query("SELECT count(*) as id FROM users WHERE email =?", [email],function (error, result) {
        
            if (error) {
                return reject(error);
            }

            if (result[0].id > 0) {
                resolve(true)
            }
            else
                resolve(false)
        });
    });

}


function logincheck(email,password) {
   
  

    return new Promise(function (resolve, reject) {
        
        connection.query("SELECT password,id FROM users WHERE email =?", [email],function (error, result) {
        
            if (error) {
                return reject(error);
            }
           var isValid= bcrypt.compareSync(password, result[0].password);
            if (isValid) {
                resolve(result[0].id)
            }
            else
                resolve(false)
        });
    });



}
exports.logincheck = logincheck;
exports.register = register;
exports.usercheck = usercheck;