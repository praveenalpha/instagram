//npm init -y
//npm install express
//npm  install nodemon
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const connection = require("./db/connection");

const app = express();

app.use(express.json());


// this is how we get something from UI/postman
const get = (req,res) => {
    console.log(req.body);
    res.send("you are in home");
};
app.get("/home", get);

// this is how we post something to UI/postman
const post =  (req,res) => {
    let uid = uuidv4();
    req.body.uid = uid;
    console.log(uid);
    res.json({
        message: "we got post res",
        body: req.body
    })
};
app.post("/user", post);

// this is how we get something with uid from UI/postman
app.get("/user", (req,res) => {

})

app.listen(3000, () =>{
    console.log("started server at port 3000");
});