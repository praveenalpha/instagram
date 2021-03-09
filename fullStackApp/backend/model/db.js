const mysql = require("mysql");
const secret = require("../secret");

// const connection = mysql.createConnection({
//   host     : "b4kmvne0ewx2vo28ril1-mysql.services.clever-cloud.com",
//   user     : "u40ejijkcxa5wdkw",
//   password : "6oiSGkKyQ6rEcpScx2RE",
//   database : "b4kmvne0ewx2vo28ril1"
// });
 
// connection.connect();
 
let connection; 

function handleDisconnect() {
  connection = mysql.createPool({
    host: "bl6z2vucqmghcpc2ylvm-mysql.services.clever-cloud.com",
    user: "u40ejijkcxa5wdkw",
    password: "6oiSGkKyQ6rEcpScx2RE",
    database: "bl6z2vucqmghcpc2ylvm",
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