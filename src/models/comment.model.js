const mongoose =require("mongoose");
const mongooseAgregatePaginate=require("mongoose-aggregate-paginate-v2");


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

commentSchema.plugin(mongooseAgregatePaginate);

module.exports=mongoose.model("Comment",commentSchema);