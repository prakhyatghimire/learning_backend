const codes = new Map(); 


app.get('/authorize', (req, res) => {
  const { client_id, redirect_uri, response_type } = req.query;
  if (response_type !== 'code') return res.status(400).send('Invalid response type');
 
  const code = crypto.randomBytes(16).toString('hex');
  codes.set(code, { clientId: client_id, userId: '123', expires: Date.now() + 60000 });
  res.redirect(`${redirect_uri}?code=${code}`);
});


app.post('/token', async (req, res) => {
  const { code, client_id, client_secret } = req.body;
  const data = codes.get(code);
  if (!data || data.clientId !== client_id || data.expires < Date.now()) {
    return res.status(400).json({ error: 'Invalid code' });
  }
  codes.delete(code);
  const accessToken = jwt.sign({ userId: data.userId }, SECRET, { expiresIn: '1h' });
  res.json({ access_token: accessToken, token_type: 'Bearer', expires_in: 3600 });
});