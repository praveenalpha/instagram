// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const app = express();
const fs = require("fs");
const userDB = require("./db/user.json");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");
const { resolve } = require("path");
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

//get all details of the table
function getAllUser(){
  return new Promise (( resolve, reject) => {
    let sql = `SELECT * FROM user_table`;
    connection.query(sql, function(error,results){
      if(error){
        reject(error);
      }
      else{
        resolve(results);
      }
    })

  })
}
const getUser = async (req,res) => {
  try{
    let result = await getAllUser();
    res.json({
      message : "SUCCESS!!",
      data : result
    })
  }
  catch(err){
    res.json({
      message : "failed !!",
      error : err
    })

  }

}
app.get("/user", getUser);

//get detail from uid
function getFromId(uid)  {
  return new Promise ( (resolve , reject)=>{
    let sql = `SELECT * FROM user_table WHERE uid='${uid}'`;
    connection.query(sql , (error, results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results);
      }
    });

  });
}
const getById = async (req,res) => {
  try{
    let uid = req.params.uid;
    // console.log(uid);
    let result = await getFromId(uid);
    res.json({
      message : "SUCCESS!!",
      data : result
    })
  }
  catch(err){
    res.json({
      message : "failed :(",
      error : err
    })
  }
}
app.get("/user/:uid", getById);


// update a user with the help of uid
function updateWithUid(uid, toBeUpdateObjects)  {
  return new Promise( (resolve,reject) => {
    let sql = `UPDATE user_table SET`;
    for(key in toBeUpdateObjects){
      sql += ` ${key} = "${toBeUpdateObjects[key]}" ,`;
    }
    sql = sql.slice(0,-1);
    sql += ` WHERE uid = "${uid}";`;
    console.log(sql);
    connection.query(sql , (error,results) => {
      if(error)
        reject(error);
      else
        resolve(results);
    })
  })
}
const update = async (req,res) => {
  
  try{
    let uid = req.params.uid;
    let toBeUpdateObjects = req.body;
    await updateWithUid(uid , toBeUpdateObjects);
    
    res.json({
      message : "SUCCESS!!"
    })
  }
  catch(err){
    res.json({
      message :" failed :(",
      error : err
    })
  }
  

}
app.patch("/user/:uid", update);


//delete by uid
function deleteViaUid (uid){
  return new Promise ( ( resolve, reject)=>{
    let sql = `DELETE FROM user_table WHERE uid = '${uid}';`
    connection.query(sql, (error, results)=>{
      if(error)
        reject(error);
      else  resolve(results);
    })
  })
}
const deleteByUid = async (req,res) => {
  try{
    let uid = req.params.uid;
    await deleteViaUid(uid);
    res.json({
      message : " SUCCEFULLY DELETED!!!!"
    })
  }
  catch(err){
    res.json({
      message : "failed :(",
      error : err
    })
  }
}
app.delete("/user/:uid", deleteByUid);

app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
// post => create , get by id , get all , update , delete