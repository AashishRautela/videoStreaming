const { v2 : cloudinary }=require('cloudinary');
require("dotenv").config({ path: "config.env" });
const fs =require("fs")


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });


//upload file  
const updloadFile=async (filePath)=>{
    try{
        if(!filePath) return null;
        const fileUrl=await cloudinary.uploader
        .upload(filePath,
            {
                resource_type:"auto"
            }) 
        fs.unlinkSync(filePath);
        return fileUrl;    
    }
    catch(error){
            fs.unlinkSync(filePath);
            return null;
    }
}

module.exports={updloadFile}
