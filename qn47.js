const speakeasy = require('speakeasy');
const QRCode = require('qrcode')
app.post('/2fa/enable', authMiddleware, async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20, name: `MyApp:${req.user.email}` });
  await db.users.update(req.user.userId, { totpSecret: secret.base32 });
  const otpauthUrl = secret.otpauth_url;
  const qr = await QRCode.toDataURL(otpauthUrl);
  res.json({ secret: secret.base32, qrCode: qr });
});


app.post('/login/2fa', async (req, res) => {
  const { email, password, token } = req.body;
  const user = await authenticatePassword(email, password); // from Q1
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token: token,
    window: 1
  });
  if (!verified) return res.status(401).json({ error: 'Invalid 2FA token' });
  const accessToken = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ accessToken });
});