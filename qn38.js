import express from "express";
const app=express();
const tasks=[];
let  nextid=1;
app.use(express.json());
app.post("/tasks",(req,res)=>{
    const{task,completed=false}=req.body;
    const new_task={id:nextid++,task,completed}
    tasks.push(new_task);
    res.json(new_task);
 
})
app.get("/tasks",(req,res)=>{
    res.json(tasks)
})
app.listen(3000)