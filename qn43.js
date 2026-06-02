import express from "express";
const app = express();
app.use(express.json());

const users = [];
let nextId = 1;

function isValidEmail(email) {
    return email && email.includes("@") && email.includes(".");
}

function isValidPassword(password) {
    return password && password.length >= 6;
}

function findUserByEmail(email) {
    return users.find(user => user.email === email);
}

function validateRegisterInput(req, res, next) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }
    
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Valid email required" });
    }
    
    if (!isValidPassword(password)) {
        return res.status(400).json({ error: "Password must be 6+ characters" });
    }
    
    if (findUserByEmail(email)) {
        return res.status(409).json({ error: "Email already registered" });
    }
    
    next();
}

function validateLoginInput(req, res, next) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }
    
    next();
}

app.post("/register", validateRegisterInput, (req, res) => {
    const { email, password } = req.body;
    
    const newUser = {
        id: nextId++,
        email: email,
        password: password
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: "Registration successful",
        user: { id: newUser.id, email: newUser.email }
    });
});

app.post("/login", validateLoginInput, (req, res) => {
    const { email, password } = req.body;
    
    const user = findUserByEmail(email);
    
    if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    
    res.json({
        message: "Login successful",
        user: { id: user.id, email: user.email }
    });
});
app.get("/register",(req,res)=>{
    res.json(users)
})


app.listen(3000, () => console.log("Server running on port 3000"));