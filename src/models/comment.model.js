const mongoose =require("mongoose");

const commentSchema=new mongoose
.Schema({
    comment:{
        type:String,
        required:true
    },
    owner:{
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

module.exports=mongoose.model("Comment",commentSchema);