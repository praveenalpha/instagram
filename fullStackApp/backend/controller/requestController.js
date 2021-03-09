const connection = require("../model/db");
const { getUserByIDPromisified } = require("./userController");

//send request
function addInFollowerTablePromisified(u_id, follow_id){
    return new Promise( function (resolve, reject){
        let sql = `insert into follower_table (u_id, follower_id) values ('${u_id}', '${follow_id}');`;
        // let sql2 = `insert into following_table (u_id, following_id, is_accepted) values ('${u_id}', '${follow_id}', `;
        // let result = getUserByID(follow_id);
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
function addInFollowingTablePromisified(u_id, follow_id, is_public){
    return new Promise( function(resolve, reject) {
        let sql = `insert into following_table (u_id, following_id, is_accepted) values ('${u_id}', '${follow_id}', ${is_public})`
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
const sendRequest = async (req,res) =>{
    try{
        let u_id = req.params.uid;
        let { follow_id} = req.body;
        let followUser = await getUserByIDPromisified(follow_id);
        let is_public = followUser[0].is_public;
        console.log(is_public);
        if(is_public){
            let output = await addInFollowerTablePromisified(u_id, follow_id);
            let output2 = await addInFollowingTablePromisified(u_id, follow_id, is_public);
            res.json({
                "message": "sendRequest successful both table!!",
                "number_of_tables": 2        
            })
            
        }
        else{
            let output2 = await addInFollowingTablePromisified(u_id, follow_id, is_public);
            console.log("sql");
            res.json({
                "message": "sendRequest successful one table!!",
                "number_of_tables": 1,
                "data":output2
            })
        }
        // console.log(follow_id);
        // let sql = `insert into follower_table (u_id, follower_id) values ('${u_id}', '${follow_id});`;
    }
    catch(error){
        res.json({
            "message": "error occured!!!!!",
            "error":error
        })
    }
    
}


//show pending requests
function showPendingRequestsPromisified(uid){
    return new Promise( (resolve, reject) =>{
        let sql = `select following_id from following_table where u_id = '${uid}' and is_accepted = ${0};`;
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
const showPendingRequests = async function(req, res){
    try{
        let {u_id} = req.body;
        let output = await showPendingRequestsPromisified(u_id);
        res.json({
            "message":"got all requests",
            "data":output
        })
    }
    catch(error){
        res.json({
            "message":"error ocured!!",
            "error":error
        })
    }
}


//accept request
function acceptRequestPromisified(uid, follow_id){
    return new Promise( function(resolve, reject) {
        let sql = `update following_table set is_accepted = 1 where u_id = '${follow_id}' and following_id = '${uid}';`;
        let sql2 = `insert into follower_table (u_id, follower_id) values ('${uid}', '${follow_id}');`;
        console.log(sql2);
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
        })
        connection.query(sql2, function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
const acceptRequest = async function(req,res){
    try{
        let uid = req.params.uid;
        let follow_id = req.body.follow_id;
        let output = await acceptRequestPromisified(uid, follow_id);
        res.json({
            "message":"accepted",
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

//get suggetions
function getAllFollowers(uid){
    return new Promise(function(resolve,reject){
        let sql =  `select * from follower_table where u_id = '${uid}';`;
        connection.query(sql, function(error, data) {
            if(error){
                reject(error); 
            }
            else{
                // console.log(data);
                resolve(data);
            }
        })

    })
}
const getSuggetion = async(req,res)=>{
    try{
        let uid = req.params.uid;
        let allFollowers = await getAllFollowers(uid);
        let arrOfFollowers = [];
        for(let i=0;i<allFollowers.length;i++){
            arrOfFollowers.push(allFollowers[i].follower_id)
        }
        let mySuggestions = [];
        for(let i=0;i<arrOfFollowers.length;i++){
            let followerOfFollower = await getAllFollowingsPromisified(arrOfFollowers[i]);
            //[hiruzen, guy, minato]
            //[itachi]
            if(followerOfFollower.length){
                
                for(let j=0;j<followerOfFollower.length;j++){
                    
                    if(!arrOfFollowers.includes(followerOfFollower[j].follower_id)){
                        mySuggestions.push(followerOfFollower[j].following_id)
                    }
                }    
            }
        }
        let allSuggestions = [];
        for(let i=0;i<mySuggestions.length;i++){
            let suggetion = await getUserByIDPromisified(mySuggestions[i]);
            allSuggestions.push(suggetion[0]);
            
        }
        
        console.log("all allSuggestions :", allSuggestions);
        res.json({
            "message":"got it",
            "data":allSuggestions
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!!!!",
            "error":error
        })
    }
}

//get all followers

const showAllFollowers = async(req,res) => {
    try{
        let uid = req.params.uid;
        let output = await getAllFollowers(uid);
        let followersWithInfo = [];
        for(let i=0;i<output.length;i++){
            followersWithInfo.push(output[i].follower_id);
        }
        let arr =[];
        for(let i=0;i<followersWithInfo.length;i++){
            let user = await getUserByIDPromisified(followersWithInfo[i]);
            arr.push(user[0]);
        }
        // console.log(arr);
        res.json({
            "message":"got all followers",
            "data":arr
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!",
            "error":error
        })
    }
}

//get all followings
function getAllFollowingsPromisified(uid){
    return new Promise( ( resolve, reject) =>{
        
        let sql = `select following_id from following_table where u_id = '${uid}';`;
        
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
            else{
                // console.log(data);
                resolve(data);
            }
        })
    })
}
const getAllFollowings = async(req, res) =>{
    try{
        let uid = req.params.uid;
        let output = await getAllFollowingsPromisified(uid);
        let arr = [];
        for(let i=0;i<output.length;i++){
            let obj = await getUserByIDPromisified(output[i].following_id);
            arr.push(obj[0]);
        }
        console.log(arr);
        res.json({
            "message":"successfully got all followings!!!!",
            "data":arr
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!!!!",
            "error": error
        })
    }
}

module.exports.sendRequest = sendRequest;
module.exports.getSuggetion = getSuggetion;
module.exports.showPendingRequests = showPendingRequests;
module.exports.acceptRequest = acceptRequest;
module.exports.showAllFollowers = showAllFollowers;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getAllFollowings = getAllFollowings;