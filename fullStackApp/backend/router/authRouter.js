const authRouter = require("express").Router();
const GoolgeStrategy = require("passport-google-oauth2").Strategy;
const {CLIENT_ID, CLIENT_PW} = require("../config/secrets");
const connection = require("../model/db");
const { oAuth, callBack, checkAuth } = require("../controller/authController");
const passport = require("passport");



passport.serializeUser(function(user, done){
    console.log("inside serializeUser");
    // console.log(user);
    // console.log(done);
    done(null, user)
})

passport.deserializeUser(function(data, done){
    console.log("inside deserialize");
    // console.log(data);
    done(null, data);
})


passport.use(
    new GoolgeStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret:CLIENT_PW,
            callbackURL:"http://localhost:3000/auth/callback",
            passReqToCallback:true
        },
        function(request, accessToken, refreshToken, profile, done){
            // console.log("request  ", request);
            // console.log("accessToken  ", accessToken);
            // console.log("refreshToken  ", refreshToken);
            // console.log("profile  ", profile);
            // console.log("done  ", done);
            let { id, given_name, email} = profile;
            // console.log(id);
            // console.log(given_name);
            // console.log(email);
            let sql = `select * from user_table where uid = ${id};`;
            // let user = { id, given_name, email} ;
            connection.query(sql, function(error, data){
                if(error){
                    // console.log(error);
                    done(error);
                }
                if(data.length){
                    // console.log(data);
                    done(null, data[0]);
                }
                else{
                    let sql2 = `INSERT INTO user_table(uid, user_name, email) VALUES ('${id}', '${given_name}', '${email}')`;
                    connection.query(sql2, function(err, da){
                        if(err){
                            // console.log(err);
                            done(err);
                        }
                        else{
                            // console.log(sql2);
                            // console.log(da);
                            done(null, da[0]);
                        }
                    })
                }
            })
            // done(null, user);
        }
    )
)

authRouter.route("/google").get(passport.authenticate('google', {scope:['email', 'profile']}), oAuth);

authRouter.route("/callback").get(passport.authenticate('google') , callBack);

authRouter.route("/checkAuth").get(checkAuth);


module.exports = authRouter;