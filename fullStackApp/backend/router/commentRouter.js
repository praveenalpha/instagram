const commentRouter = require("express").Router();
const {postComment, getCommentByP_id} = require("../controller/commentController");
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



commentRouter.route("/:p_id").post(upload.single('pimage'), postComment).get(getCommentByP_id);



module.exports = commentRouter;