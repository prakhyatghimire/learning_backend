const express = require('express');
const app = express();

app.use(express.json());


const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  
  req.body.name = name.trim();
  req.body.email = email.toLowerCase();
  next();
};

app.post('/register', validateRegistration, (req, res) => {
  const { name, email, password } = req.body;
  
  res.status(201).json({ message: `User ${name} registered successfully` });
});

app.listen(3000);