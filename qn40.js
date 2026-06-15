import express from "express";
const app = express();
function authenticate(req,res,next){
    const auth_header=req.header.authorization;
    if(auth_header=="secret_123"){
        next()

    }
    else{
        res.status(401).send('Unautorized')
    }

    
}

app.get("/user",(req,res)=>{
    res.send('this is a user page')
    
})
app.listen(3000);