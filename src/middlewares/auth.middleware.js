const User=require("../models/user.model");
const jwt=require("jsonwebtoken");
require("dotenv").config({ path: "config.env" });


module.exports.userAuth=async (req,res,next)=>{
    try{
         const {token}=req.cookies;        
         if(!token){
            const error=new Error("Unauthorised request");
            error.statusCode=401;
            throw error
         }

        const {_id}=await jwt.verify(token,process.env.JWT_KEY);
        const user=await User.findById(_id).select("-password -refreshToken");

        if(!user){
            const error=new Error("Token is not valid");
            error.statusCode=404;
            throw error
        }
        req.user=user;
        next();
    }
    catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}