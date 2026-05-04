import express from "express";
const app=express();
const logger=(req,res,next)=>{
    console.log(req.url);
    console.log(req.method);
    next()
}

app.get("/",logger,(req,res)=>{
    if(req.method==="GET"){
        return res.send("pls proceed")
    }
}
)
app.listen(3000)