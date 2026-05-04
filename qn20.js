const express = require('express');
const app = express();

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Route that throws an error
app.get('/user/:id', (req, res, next) => {
  const userId = req.params.id;
  
  if (userId === '0') {
    throw new AppError('User not found', 404);
  }
  
  if (userId === 'error') {
    throw new Error('Database connection failed'); // Non-operational
  }
  
  res.json({ id: userId, name: 'John Doe' });
});

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/async-data', asyncHandler(async (req, res) => {
  throw new AppError('Async error occurred', 500);
}));


app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});


app.use((err, req, res, next) => {
  console.error('ERROR LOG:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  
  if (err.isOperational || err instanceof AppError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  }
  

  res.status(500).json({
    success: false,
    message: 'Something went wrong'
  });
});

app.listen(3000);