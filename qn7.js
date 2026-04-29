import express from "express";
const app=express()
const PORT=3000;
app.get("/",(req,res)=>{
    res.send("this is the home page")
});
app.listen(PORT,()=>{
    console.log("the server is running");
})