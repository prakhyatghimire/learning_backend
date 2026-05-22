import  express  from "express";
const app=express();
app.get("/product/:id",(req,res)=>{
    const value=Number(req.params.id)
    res.send(`the product id is ${value}`)
})
app.listen(3000)