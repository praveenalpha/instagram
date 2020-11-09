const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'btumysizashnpawlmepc-mysql.services.clever-cloud.com',
  user     : 'ulimg02h1p32vm6m',
  password : 'ZHYvpsoWmT0f57NVCkAZ',
  database : 'btumysizashnpawlmepc'
});
 
connection.connect();
 console.log("clever cloud pr connect ho gaya h !!!!");



module.exports = connection;