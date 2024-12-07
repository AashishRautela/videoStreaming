const mongoose =require("mongoose");

const tweetSchema=new mongoose
.Schema({
    tweet:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
},{timestamps:true})

module.exports=mongoose.model("Tweet",tweetSchema);