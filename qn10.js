// Create route:

// /error

// Return:

// Status code: 404
// Message: "Page not found"

// Goal: Learn:

// res.status(404).send()
import express from "express"
const app=express();
app.get("/error",(req,res)=>{
    res.status(404).send("Error 404 page not found")

})
app.listen(3000,()=>{
    console.log("the server is running ");
})