import express from "express";
const app=express()
app.get((req,res)=>{
    res.send("the server is running")
})
app.listen(3000,()=>{
    console.log("the server has started running");
}) 