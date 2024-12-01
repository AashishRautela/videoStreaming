const mongoose= require("mongoose");

const subscriptionSchema=new mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    subscriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{timestamps:true});

module.exports=mongoose.model("Subscription",subscriptionSchema)