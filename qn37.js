import express from "express";
const app=express();
app.use(express.json());
const users=[];
let  userid=1;
app.post("/students",(req,res)=>{
    const {name,course,marks}=req.body;
    const student={id:userid++,name,course,marks};
    users.push(student);
    res.json(student);
})
app.get("/students",(req,res)=>{
    res.json(users);

})
app.listen(3000);