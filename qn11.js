import express from "express"
const app=express();
app.get('/greet/:username',(req,res)=>{
    
    res.send(`hello ${req.params.username}`);

})
app.listen(3000,()=>{
    console.log("server is running in port 3000");
})
