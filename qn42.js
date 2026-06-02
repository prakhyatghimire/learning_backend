import express from "express";
const app=express();

function authorization(req,res,next){
    const auth_key=req.headers.authorization;
    if(auth_key==="upasana123"){
        next();
    }else{
        res.status(400).send('unauthorized');
    }
    
}

// function acess(req,res,next){
//     const value=req.body.role;
//     if(value==="admin"){
//         next();
//     }
//     else{
//         res.status(400).send("unauthorized");
//     }
    
// }
app.use(express.json())
app.use(authorization);
app.get("/admin",(req,res)=>{
    res.send("this is a admin page")
})
app.listen(3000);
