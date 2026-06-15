const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticate(email, password); // from Q1
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Protected route
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.user.userId}` });
});