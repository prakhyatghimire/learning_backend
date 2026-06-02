import  express  from "express";
const app=express();
let count =0;
function counts(req,res,next){
    count++;
    next();
    
}
app.use(counts)
app.get("/count",(req,res)=>{
    res.send(count)
})
app.listen(3000);