const connection = require("../model/db");
const { v4: uuidv4 } = require('uuid');



function createUserPromisified(obj) {
    return new Promise(function (resolve, reject) {
        let uid = uuidv4();
        let sql = "";
        if (obj.is_public != undefined) {
            sql = `insert into user_table(uid, user_name, email, pw, bio, pimage, created_on, is_public) values ('${uid}', '${obj.user_name}', '${obj.email}', '${obj.pw}', '${obj.bio}', '${obj.pimage}', '${obj.created_on}', ${obj.is_public})`;
        }
        else {
            sql = `insert into user_table(uid, user_name, email, pw, bio, pimage, created_on) values ('${uid}', '${obj.user_name}', '${obj.email}', '${obj.pw}', '${obj.bio}', '${obj.pimage}', '${obj.created_on}')`;
        }
        connection.query(sql, function (error, data) {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
}
async function createUser(req, res) {
    try {
        let obj = req.body;
        let output = await createUserPromisified(obj);
        // console.log(output);
        res.json({
            "message": "user created!!"
        })
    }
    catch (error) {
        res.json({
            "message": "error occured!!",
            "error": error
        })
    }
}


function getUserByIDPromisified(uid) {
    return new Promise(function (resolve, reject) {
        console.log("inside getUserByIDPromisified");
        let sql = `select * from user_table where uid='${uid}';`;
        console.log(sql);
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
}
async function getUserByID(req, res) {
    try {
        console.log("inside getUserByID");
        let uid = req.params.uid;
        getUserByIDPromisified(uid).then( output =>{
            res.json({
                "message": "got user by id",
                "data": output
            })
        }).catch( err=>{
            res.json({
                "message":"error occured",
                "error":err
            })
        })
    }
    catch (error) {
        res.json({
            "message": "error occured!!",
            "error": error
        })
    }

}


function updateUserByIDPromisified(uid, req) {
    return new Promise(function (resolve, reject) {
        let updateObj = req;
        let file = req.file;
        let obj = updateObj.body;

        let sql = `update user_table set `;
        uid = uid.replace(/(\r\n|\n|\r)/gm, "");
        console.log(uid);
        for (let key in obj) {
            sql += `${key}='${obj[key]}',`;
        }
        if (file) {
            sql += `pimage='/photos/${file.filename}',`;
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ` where uid = '${uid}' ;`;
        console.log(sql);
        connection.query(sql, function (error, data) {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
}
async function updateUserByID(req, res) {
    try {
        console.log("i am in");
        // console.log(req.body);
        // console.log(req.file);
        let uid = req.params.uid;

        let output = await updateUserByIDPromisified(uid, req);
        res.json({
            "message": "successfully updated user by id ",
            "data": output
        })
    }
    catch (error) {
        res.json({
            "message": "error occured!!!!",
            "error": error
        })
    }
}

function getUserByNamePromisified(req){
    return new Promise( (resolve, reject) =>{
        let name = req.params.name;
        let sql = `select * from user_table where user_name = '${name}';`;
        console.log(sql);
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
async function getUserByName(req, res){
    try{
        let output = await getUserByNamePromisified(req);
        
        res.json({
            "message":"found user by name",
            "data":output
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!",
            "error":error
        })
    }
}


function getUserByIDPromisifiedFromParamsPromisified(req){
    return new Promise( (resolve, reject) =>{
        let uid = req.params.uid;
        let sql = `select * from user_table where uid = ${uid};`;
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })

}
function getUserByIDPromisifiedFromParams(req, res){
    try{
        getUserByIDPromisifiedFromParamsPromisified(req).then( obj =>{
            res.json({
                "message":"got user",
                "data":obj
            })
        }).catch(err=>{
            res.json({
                "message":"error occured",
                "error":err
            })
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!",
            "error":error
        })
    }
}

module.exports.createUser = createUser;
module.exports.getUserByID = getUserByID;
module.exports.updateUserByID = updateUserByID;
module.exports.getUserByIDPromisified = getUserByIDPromisified;
module.exports.getUserByName = getUserByName;
module.exports.getUserByIDPromisifiedFromParams = getUserByIDPromisifiedFromParams;