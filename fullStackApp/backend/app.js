// npm init -y
// npm install express
// npm install nodemon

const express = require("express");
const app = express();
const fs = require("fs");
const userDB = require("./db/user.json");
// server created

app.use(express.json());
// post a user => add a user in userDB

app.post("/user", function (req,res){
  
  let user = req.body;
  userDB.push(user);
  fs.writeFileSync("./db/user.json",JSON.stringify(user))
  
  console.log("got it !!");
  res.json({
    message: "User created Succesfully !",
    data: req.body
  })
  
})


app.listen(3000, () => {
  console.log("Server started at port 3000 ");
});
// post => create , get by id , get all , update , delete