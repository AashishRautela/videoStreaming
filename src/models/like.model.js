const mongoose =require("mongoose");

const likeSchema=new mongoose
.Schema({
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Video"
    }
},{timestamps:true})

module.exports=mongoose.model("Like",likeSchema);