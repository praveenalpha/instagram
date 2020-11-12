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


//send request 
function addInFollowingTable(obj){
  return new Promise ( ( resolve, reject) => {
    let sql;
    if(obj.is_public){
      sql = `INSERT INTO user_following(uid , follow_id, is_accepted) VALUES ("${obj.uid}" , "${obj.followId}" , "1") ;`;
    }
    else{
      sql = `INSERT INTO user_following(uid , follow_id ) VALUES ("${obj.uid}" , "${obj.followId}");`;
    }
    connection.query(sql, (error,results) => {
      if(error){
        reject(error);
      }
      else{
        resolve(results);
      }
    })
  })
}
function addInFollowerTable(follower_id, uid) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_follower(uid , follow_id) VALUES ("${uid}" , "${follower_id}");`;
    console.log(sql);
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
const sendRequest = async (req,res) => {
  try{
    let uid = req.body.uid;
    let follow_id = req.body.follow_id;
    let follow_details = await getFromId(follow_id);
    let is_public = follow_details[0].is_public;
    if(is_public){
      //add in following table
      let followingResult = await addInFollowingTable({
        is_public : true,
        uid : uid,
        followId : follow_id
      });
      //add in follower table
      let followerResult = await addInFollowerTable(uid, follow_id);
      
      
      res.json({
        message: "request sent and accepted !",
        data: { followingResult, followerResult },
      });
    }
    else{
      //insert details in user_following table
      //with is_accepted as false
      let followingResult = await addInFollowingTable({
        isPublic: false,
        uid: uid,
        followId: follow_id,
      });
      res.json({
        message: "Request sent and it is pending !",
        data: followingResult,
      });
    
      res.json({
        message : "SUCCESS!!"
      })
    }
  }
  catch(err){
    res.json({
      message : "failed :(",
      error : err
    })
  }
}
app.post("/user/sendRequest",sendRequest);
app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
// post => create , get by id , get all , update , delete