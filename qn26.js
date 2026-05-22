
import express from "express";
const app=express();
app.use(express.json());

const student={
    name:"Prakhyat",
    age:20,

}

app.get("/user",(req,res)=>{
    res.json(student)
})
app.listen(3000,()=>{
    console.log("the server is running");
})


