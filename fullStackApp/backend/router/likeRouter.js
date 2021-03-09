const likeRouter = require("express").Router();
const {getLikeCount, addLike} = require("../controller/likeController.js");

likeRouter.route("/:p_id").get(getLikeCount).post(addLike);

module.exports = likeRouter;