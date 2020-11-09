// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const app = express();
const fs = require("fs");
const userDB = require("./db/user.json");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");
// server created

app.use(express.json());
// post a user => add a user in userDB
function insertUser(user){
  return new Promise( ( resolve, reject ) => {
    let uid = user.uid;
    let name = user.name;
    let email = user.email;
    let phone = user.phone;
    let bio = user.bio;
    let handle = user.handle;
    let sql =  `INSERT INTO user_table(uid, name, email, phone, bio, handle) VALUES ('${uid}','${name}','${email}',${phone},'${bio}','${handle}')`;
    connection.query(sql, function (error, results) {
      if(error){
        reject(error);
      }
      else{
        resolve(results);
      }
    });

  });
}
const createUser = async (req,res) => {
  try{
    let user = req.body;
    let uid = uuidv4();
    user.uid = uid;
    await insertUser(user);
    res.json({
      message: "success",
      data : user
    })
  }
  catch(err){
    res.json({
      message : "failed!!",
      error : err
    })
  }
  res.json({
    message: "User created Succesfully !",
    data: req.body
  });
}
app.post("/user", createUser);


app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
// post => create , get by id , get all , update , delete