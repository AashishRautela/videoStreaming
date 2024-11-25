const User =require("../models/user.model.js");
const {asyncHandler}=require("../utils/asyncHandler");
const {validateUser}=require("../utils/validateUser.js");
const {updloadFile}=require("../services/cloudinary");
const { upload } = require("../middlewares/multer.js");

module.exports.registerUser=asyncHandler(async (req,res,next)=>{
    
    validateUser(req,res);
    const {userName,email,fullName,password}=req.body;
    
    const files=req.files
    const userAvatar=files?.avatar;
    const userCoverImage=files?.coverImage || "";
    if(!userAvatar){
        const error=new Error("Request data missing");
        error.statusCode=400;
        throw error;
    }

    const avatar=await updloadFile(userAvatar[0]?.path);
    const coverImage=await updloadFile(userCoverImage[0]?.path || "");
    const user =new User({
        userName,
        email,
        fullName,
        password,
        avatar:avatar?.url,
        coverImage:coverImage?.url || ""
    }
    )
    await user.save()
    res.status(200).json({
        success:true,
        message:"User Registered Successfully"
    })
})