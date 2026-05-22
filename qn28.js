import express from 'express';
const app=express();
app.use(express.json())
app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    if(password.length>5){
        res.json("Login sucessfull")
    }
    else{
        res.json("log in failes")
    }

});
app.listen(3000)