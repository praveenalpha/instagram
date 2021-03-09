const express = require("express");
const requestRouter = express.Router();
const {sendRequest, getSuggetion, showPendingRequests, acceptRequest, showAllFollowers, getAllFollowings} = require("../controller/requestController");


requestRouter.route("/sendRequest/:uid").get(getSuggetion).post(sendRequest);;


requestRouter.route("/showAllFollowers/:uid").get(showAllFollowers);


requestRouter.route("/getAllFollowings/:uid").get(getAllFollowings);


requestRouter.route("/showPendingRequests/:uid").get(showPendingRequests);

requestRouter.route("/acceptRequest/:uid").patch(acceptRequest);


module.exports = requestRouter;