const express = require('express');
const app = express();

const rateLimitStore = new Map(); 

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; 
  const maxRequests = 5;
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });
    return next();
  }
  
  const record = rateLimitStore.get(ip);
  
  if (now > record.resetTime) {
    // Reset window
    record.count = 1;
    record.resetTime = now + windowMs;
    return next();
  }
  
  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    });
  }
  
  record.count++;
  next();
};

app.use(rateLimiter);

app.get('/api/data', (req, res) => {
  res.json({ message: 'Success' });
});

app.listen(3000);