const express = require("express");
const postRouter = express.Router();
const {getPostById, createPostById, getPostForFeedsById, getAllPosts} = require("../controller/postController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(__dirname);
        cb(null, "../frontedn/insta/public/photos");
    },
    filename:(req, file, cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

postRouter.get("", getAllPosts);
postRouter.route("/:uid").get(getPostForFeedsById).post(upload.single('post_image'), createPostById);

postRouter.route("/profile/:uid").get(getPostById);

module.exports = postRouter;