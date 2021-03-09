const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const requestRouter = require("./router/requestRouter");
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");
const likeRouter = require("./router/likeRouter");
const commentRouter = require("./router/commentRouter");
let cookie = require("cookie-session");
const passport = require("passport");

const bodyParser = require('body-parser')

app.use(cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["this is my secret keys"]
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/request", requestRouter);
app.use("/api/post", postRouter);
app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);


app.listen(3000,function(){
    console.log("server started!!");
})