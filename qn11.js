import express from "express"
const app=express();
app.get('/greet/:username',(req,res)=>{
    const username=req.params.username;
    res.send(`hello ${username}`);

})
app.listen(3000,()=>{
    console.log("server is running in port 3000");
})
