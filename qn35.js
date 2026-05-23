const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "The best error message is the one that never shows up.",
    "Simplicity is the soul of efficiency.",
  ];
  
  app.get("/quote", (req, res) => {
    const random = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[random] });
  });