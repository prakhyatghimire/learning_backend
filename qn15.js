import express from "express";
const app = express();
app.use(express.json());

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    if (token !== "mysecrettoken") {
        return res.status(403).json({ error: "Invalid token" });
    }
    next();
};

app.use(logger);

app.get("/public", (req, res) => {
    res.json({ message: "Anyone can see this" });
});

app.get("/private", authMiddleware, (req, res) => {
    res.json({ message: "Only authenticated users see this" });
});

app.listen(3000, () => console.log("server ready"));