const fs =require("fs");
const http=require('http');

// 1. HTTP Server — Basic Routing
// Create a native HTTP server that responds differently based on URL:

// GET / → "Home Page"

// GET /about → "About Us"

// GET /contact → "Contact Page"

// Any other URL → 404 Not Found

// No Express allowed.



const server=http.createServer((req,res)=>{
    if(req.url==="/" && req.method==="GET"){
        res.end("this is home page")
    
    }
    else if(req.url==="about" && req.method==="GET"){
        res.end('this is about page')
    }
    else if(req.url=="contactpage" && req.method==="GET"){
        res.end("this is contact page")
    }
    else {
        req.statusCode=404;
        res.end('404 not found ');
    }
})
server.listen(3000,()=>{
    console.log("the sever is running ");
})


