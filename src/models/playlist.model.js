const mongoose =require("mongoose");

const playListSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:20
    },
    description:{
        type:String,
        maxlength:50
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]
},{timestamps:true})

module.exports=mongoose.model("Playlist",playListSchema);