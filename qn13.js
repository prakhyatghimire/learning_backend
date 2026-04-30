// Create a route /calculate/:num1/:num2 that multiplies the two numbers and returns: "10 x 5 = 50"
import  express  from "express";
const app=express();
app.get("/calculate/:num1/:num2",(req,res)=>{
    const number_1=parseInt(req.params.num1);
    const number_2=parseInt(req.params.num2);
    const product=number_1 * number_2;
    res.send(`${number_1} * ${number_2} = ${product}`)

})
app.listen(3000,()=>{
    console.log("the server is ready");

})
