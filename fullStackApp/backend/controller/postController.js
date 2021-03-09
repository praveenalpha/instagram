const connection = require("../model/db");
const getAllFollowers = require("./requestController") ;


const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");
const { getUserByIDPromisified } = require("./userController");



function createPostByIdPromisified(u_id, post_image, caption){
    return new Promise( function(resolve, reject){
        let p_id = uuidv4();
        let sql = `insert into post_table (p_id, u_id, post_image, caption) values ('${p_id}', '${u_id}',  '${post_image}', '${caption}');`;
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
const createPostById = async function(req, res){
    try{
        let u_id = req.params.uid;
        let post_image = "photos/"+req.file.filename;
        let caption = req.body.caption;
        
        // console.log("caption:",caption);
        let output = await createPostByIdPromisified(u_id, post_image, caption);
        res.json({
            "message":"created post succesfully!!!!",
            "data": output
        })
    }
    catch(error){
        res.json({
            "message":"error occured",
            "error":error
        })
    }
}

function getPostByIdPromisified(uid){
    return new Promise( function(resolve, reject) {
        let sql = `select * from post_table where u_id = '${uid}';`;
        connection.query(sql, function(error, data) {
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
const getPostById = async function(req, res){
    try{
        let uid = req.params.uid;
        let output = await getPostByIdPromisified(uid);
        res.json({
            "message":"got post by id",
            "data":output
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!!!",
            "error": error
        })
    }
}


function getPostForFeedsByIdPromisified(req){
    return new Promise( async function(resolve, reject) {
        let uid = req.params.uid;
        let followersArray = await getAllFollowers(uid);
        console.log(followersArray);
        // let allReleventPosts = await getPostByIdPromisified(uid);
    })
}
const getPostForFeedsById = async function(req,res){
    try{
        let output = await getPostForFeedsByIdPromisified(req);
        res.json({
            "message":"got all posts for feeds!!!!!",
            "data":output
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!!!!",
            "error":error
        })
    }
}


function getAllPostsPromisified(){
    return new Promise( (resolve, reject) =>{
        let sql = "select * from post_table;";
        connection.query(sql, function(error, data){
            if(error){
                console.log("error :", error);
                reject(error);
            }
            else{
                console.log("data :", data);
                resolve(data);
            }
        })
    })
}
const getAllPosts = async function(req, res){
    try{
        let output = await getAllPostsPromisified();
        for(let i=0;i<output.length;i++){
            let uid = output[i].u_id;
            let obj = await getUserByIDPromisified(uid);
            output[i]["user_name"] = obj[0].user_name;
            output[i]["pimage"] = obj[0].pimage;
        }
        res.json({
            "message":"got all posts with their user_name and pimage",
            "data":output
        })
    }
    catch(error){
        res.json({
            "message":"error occured",
            "error":error
        })
    }
    
}

module.exports.createPostById = createPostById;
module.exports.getPostById = getPostById;
module.exports.getPostForFeedsById = getPostForFeedsById;
module.exports.getAllPosts = getAllPosts;

