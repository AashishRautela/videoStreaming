const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();
const User=require("./src/models/user.model")


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true})); //data which is coming from url
app.use(express.static("public"))



//import routes
const userRouter=require("./src/routes/user.routes");
const channelRouter=require("./src/routes/channel.routes");
const videoRouter=require("./src/routes/video.routes");


//use routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/channel",channelRouter);
app.use("/api/v1/video",videoRouter);

app.get("/:username",async (req,res)=>{
    console.log('req', req)
    const username=req.params.username;
    console.log('username', username)
    const user=await User.find({email:username.trim().toLowerCase()})
    console.log('user', user)
    res.send(user)
})

module.exports={app}