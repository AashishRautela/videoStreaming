const User =require("../models/user.model.js");
const {asyncHandler}=require("../utils/asyncHandler");
const {validateUser}=require("../utils/validateUser.js");
const {updloadFile}=require("../services/cloudinary");
const { upload } = require("../middlewares/multer.middleware.js");
const validator=require("validator");

const generateTokens=async (user,res)=>{
    try {
        const accessToken=await user.generateAccessToken();
        const refreshToken=await user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({ validateBeforeSave: false });
        return {accessToken,refreshToken}

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Something went wrong"
        })
    }
}


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

module.exports.logIn=asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"Request data missing"
        })
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({
            success:false,
            message:"Enter a valid email"
        })
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Email or password is incorrect"
        })
    }

    const isPasswordValid=await user.validatePassword(password);
    if(isPasswordValid){
        const {accessToken,refreshToken}=await generateTokens(user,res);
        res
            .cookie("token", accessToken)
            .cookie("refreshToken", refreshToken)
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
            });
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Email or password is incorrect"
        })
    }
})

module.exports.logOut=asyncHandler(async (req,res,next)=>{
        const user=req.user;
        await User.findByIdAndUpdate(user?._id,{refreshToken:""});
        res
        .cookie("token",null)
        .cookie("refreshToken",null)
        .status(200)
        .json({
            success:true,
            message:"User logged out"
        })


})