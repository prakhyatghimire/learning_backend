const authMiddleware = (req, res, next) => {
    const token = req.headers["x-auth-token"];
  
    if (!token) {
      return res.json("Access Denied: No Token Provided");
    }
  
    next(); // Token exists, move forward
  };
  
  app.get("/dashboard", authMiddleware, (req, res) => {
    res.json("Welcome to the Dashboard!");
  });