const mysql = require("mysql");
const secret = require("../secret");

 
let connection; 

function handleDisconnect() {
  connection = mysql.createPool({
    host: secret.Host,
    user: secret.user,
    password: secret.pass,
    database: secret.DB_name,
  });
  
  // connection.connect();
    
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err;
    }
  });
}
handleDisconnect();

module.exports = connection;
