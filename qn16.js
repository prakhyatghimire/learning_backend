const express = require('express');
const app = express();


app.use((req, res, next) => {
  const start = Date.now();
  
 
  const originalEnd = res.end;
  
  res.end = function(...args) {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
    originalEnd.apply(res, args);
  };
  
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);