const User =require("../models/user.model.js");
const {asyncHandler}=require("../utils/asyncHandler");

module.exports.registerUser=asyncHandler(async (req,res,next)=>{
    const {userName,email,fullName,password}=req.body;
    if(!userName || !email || !fullName || !password){
        return res.status(400).json({
            success:false,
            message:"Request Data Missing"
        })      
    }

    const user =new User({
        userName,
        email,
        fullName,
        password
    }
    )
    await user.save()
    res.status(200).json({
        success:true,
        message:"User Registered Successfully"
    })
})