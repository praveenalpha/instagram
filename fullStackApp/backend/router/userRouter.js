const express = require("express");
const userRputer = express.Router();
const path = require("path");
const multer = require("multer");

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
const {createUser,   getUserByID, updateUserByID, getUserByName, getUserByIDPromisifiedFromParams}= require("../controller/userController");
const { use } = require("passport");


// console.log("inside");
userRputer.route("/").post(createUser);

userRputer.route("/:uid").get(getUserByID).patch(upload.single('pimage'), updateUserByID);

userRputer.get("/byName/:name", getUserByName);

userRputer.get("/params/:uid", getUserByIDPromisifiedFromParams);

module.exports = userRputer;