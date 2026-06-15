const crypto = require('crypto');


app.post('/login', async (req, res) => {
  const user = await authenticate(...);
  const accessToken = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '15m' });
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const hashedRT = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await db.refreshTokens.insert({ tokenHash: hashedRT, userId: user.id, expiresAt: Date.now() + 7*24*3600000 });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
});

app.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  const hashedRT = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const stored = await db.refreshTokens.findOne({ tokenHash: hashedRT });
  if (!stored || stored.expiresAt < Date.now()) return res.sendStatus(403);
 
  await db.refreshTokens.delete(stored.id);
  const newRefreshToken = crypto.randomBytes(40).toString('hex');
  const newHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
  await db.refreshTokens.insert({ tokenHash: newHash, userId: stored.userId, expiresAt: Date.now() + 7*24*3600000 });
  const newAccessToken = jwt.sign({ userId: stored.userId }, SECRET, { expiresIn: '15m' });
  res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken: newAccessToken });
});