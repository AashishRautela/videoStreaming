const express=require("express");
const router=express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const { channelDetail } = require("../controllers/channel.controller");


router.get("/:userName",userAuth,channelDetail)

module.exports=router;