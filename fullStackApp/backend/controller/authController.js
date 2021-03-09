function oAuth(req, res){
    res.send("<h1>user authenticated!!</h1>");
}

function callBack(req, res){
    res.redirect("http://localhost:3001");
}

function checkAuth(req, res){
    if(req.user){
        res.json({
            isAuth:true,
            user: req.user
        })
    }
    else{
        res.json({
            isAuth: false
        });
    }
}

module.exports.oAuth = oAuth;
module.exports.callBack = callBack;
module.exports.checkAuth = checkAuth;