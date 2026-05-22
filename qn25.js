import express, { application } from "express";
const app=express();
app.get("/",(req,res)=>{
    res.send("this is home page")
})
app.get("/about",(req,res)=>{
    res.send("this is about page")
})
app.get("/contact",(req,res)=>{
    res.send("this is contact page")
})
app.listen(3000,()=>{
    console.log("the server is running");
})