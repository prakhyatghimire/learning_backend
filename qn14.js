import express from "express";
const app=express();
app.get("/profile",(req,res)=>{
    const{name,age}=req.query
    res.send(req.query.name)
    res.send(req.query.age)

})
app.listen(3000,()=>{
    console.log("the server is runnnig ");
});