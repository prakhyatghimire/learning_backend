// 2. Read File & Send Response
// Create an HTTP server that:

// Reads a local data.json file using fs.readFile

// Sends its content as JSON response

// Handles errors (file not found, etc.) with proper HTTP status codes
const fs =require("fs");
const http=require('http');

const server=http.createServer((req,res)=>{ 
const html_data=fs.readFileSync("data.json","utf-8");
if(req.url==="/"){
res.writeHead(200,{"content-type": "application/json"})
res.end(html_data)
}
else{
    
    res.end("cant find the required url")
}
})
server.listen(3000,()=>{
    console.log("the server has started");
})
