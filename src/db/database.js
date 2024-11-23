const mongoose=require("mongoose");
require("dotenv").config({ path: "/" });

module.exports.connectDB=async ()=>{
    await mongoose.connect(process.env.DB_URI)
}