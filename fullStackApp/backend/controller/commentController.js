const connection = require("../model/db");




function postCommentPromisified(req){
    return new Promise( (resolve, reject)=>{
        let p_id = req.params.p_id;
        let {user_name,  u_id, cmnt} = req.body;
        let pimage = "/photos/"+req.file.filename;
        let sql = `insert into comment_table (p_id, u_id, user_name, pimage, cmnt) values ('${p_id}', '${u_id}', '${user_name}', '${pimage}', '${cmnt}');`;
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
const postComment = async(req, res)=>{
    try{
        let output = await postCommentPromisified(req);
        res.json({
            "message":"posted comment succesfully !!",
            "data": output
        })
    }
    catch(error){
        res.json({
            "message": "error occured!!",
            "error": error
        })
    }
}

function getCommentByP_idPromisified(req){
    return new Promise((resolve, reject)=>{
        let p_id = req.params.p_id;
        let sql = `select * from comment_table where p_id = '${p_id}';`;
        connection.query(sql, (error, data)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })

    })
}
const getCommentByP_id = async(req, res)=>{
    try{
        let output = await getCommentByP_idPromisified(req);
        res.json({
            "message":"got all comments by p_id",
            "data": output
        })
    }
    catch( error){
        res.json({
            "message":"error occured !!",
            "error":error
        })
    }
}
module.exports.postComment = postComment;
module.exports.getCommentByP_id = getCommentByP_id;