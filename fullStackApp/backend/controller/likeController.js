const { response } = require("express");
const connection = require("../model/db");









function addLikePromisified(req){
    return new Promise( (resolve, reject) =>{
        let p_id = req.params.p_id;
        let u_id = req.body.u_id;
        let sql = `insert into like_table (p_id, u_id) values ('${p_id}', '${u_id}');`;
        connection.query(sql, function(error, data){
            if(error){
                reject(error)
            }
            else{
                resolve(data);
            }
        })
    })
}
const addLike = async function(req, res){
    try{
        let output = await addLikePromisified(req);
        res.json({
            "message":"added like!!",
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




function getLikeCountPromisified(req){
    return new Promise( (resolve, reject) => {
        let p_id = req.params.p_id;
        let sql = `select * from like_table where p_id = '${p_id}';`;
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
const getLikeCount = async function(req, res){
    try{
        let output = await getLikeCountPromisified(req);
        res.json({
            "message":"got like count!!",
            "data":output,
            "likesCount":output.length
        })
    }
    catch(error){
        res.json({
            "message":"error occured!!",
            "error":error
        })
    }
}

module.exports.getLikeCount = getLikeCount;
module.exports.addLike = addLike;