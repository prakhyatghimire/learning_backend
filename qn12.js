import express from "express";
const app=express();
app.get("/city/:name",(req,res)=>{
    res.json({
        city:req.params.name,
        message:`${req.params.name} is a beautiful city`
    })
})
app.listen(3000,()=>{
    console.log("the server has started");
})