const mongoose =require("mongoose");
const mongooseAgregatePaginate=require("mongoose-aggregate-paginate-v2");


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

likeSchema.plugin(mongooseAgregatePaginate);

module.exports=mongoose.model("Like",likeSchema);