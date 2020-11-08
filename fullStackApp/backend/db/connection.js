const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'btumysizashnpawlmepc-mysql.services.clever-cloud.com',
  user     : 'ulimg02h1p32vm6m',
  password : 'ZHYvpsoWmT0f57NVCkAZ',
  database : 'btumysizashnpawlmepc'
});
 
connection.connect();
 console.log("yes:");
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.export = connection;