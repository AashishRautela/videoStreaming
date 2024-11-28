const mongoose=require("mongoose");
const validator=require("validator");
const mongooseAgregatePaginate=require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config({ path: "config.env" });

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
        maxLength:15
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){
                const error=new Error("Please Enter a valid Email");
                error.code=400;
                throw error;
            }
        }
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
        maxLength:30
    },
    avatar:{
        type:String
    },
    coverImage:{
        type:String
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.plugin(mongooseAgregatePaginate)


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const hashedPassword=await bcrypt.hash(this.password,10);
    this.password=hashedPassword
    next()
})

userSchema.methods.validatePassword=async function(password){
    const isPasswordValid=await bcrypt.compare(password,this.password);
    return isPasswordValid;
}

userSchema.methods.generateAccessToken=async function(){
    return await jwt.sign({
        _id:this?._id,
    },
    process.env.JWT_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
    )
}

userSchema.methods.generateRefreshToken=async function(){
    return await jwt.sign({
        _id:this?._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    })
}

module.exports=mongoose.model("User",userSchema)