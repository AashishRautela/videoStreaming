const { asyncHandler } = require("../utils/asyncHandler");
const Video=require("../models/video.model");
const User=require("../models/user.model");
const { uploadFile } = require("../services/cloudinary");



module.exports.uploadVideo=asyncHandler(async (req,res,next)=>{
    const user=req.user;

    const files=req.files.video;
    console.log('files', files)

    const vdoLocalPath=files[0].path;
    console.log('vdoLocalPath', vdoLocalPath)

    if(!vdoLocalPath){
        return res.status(400).send({
            success:false,
            message:"Video file missing"
        })
    }

    const video=await uploadFile(vdoLocalPath)
    console.log('video', video)
})