module.exports.asyncHandler=(fn)=>async (req,res,next)=>{
    try{
        await fn(req,res,next)
    }
    catch(error){
        res.status(error.code || 500).send({
            success:false,
            message:error.message || "Internal Server Error"
        })
    }
}