const logger = (req, res, next) => {
    const time   = new Date().toISOString();
    const method = req.method;
    const route  = req.url;
  
    console.log(`[${time}] ${method} ${route}`);
  
    next();
  };
  
  app.use(logger); // Apply to ALL routes
  
  app.get("/home", (req, res) => res.json("Home Page"));
  app.get("/about", (req, res) => res.json("About Page"));