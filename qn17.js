const express = require('express');
const app = express();

const VALID_API_KEY = 'my-secret-key-123';

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token format' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (token !== VALID_API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
 
  req.user = { id: 1, role: 'admin' };
  next();
};


app.get('/dashboard', authenticate, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

app.listen(3000);