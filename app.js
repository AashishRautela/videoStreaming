const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true})); //data which is coming from url
app.use(express.static("public"))



//import routes
const userRouter=require("./src/routes/user.routes");


//use routes
app.use("/api/v1/user",userRouter)

app.get("/",(req,res)=>{
    res.send("yes")
})

module.exports={app}