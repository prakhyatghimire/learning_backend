import express from "express";
const app = express();
app.use(express.json());

const user = [];
let userid = 1;

function logger(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    const time = new Date().toLocaleString();
    console.log(time);
    next();
}

app.use(logger);

app.get("/profile", (req, res) => {
    res.send("hey this profile page");
    res.json(user)
});

app.post("/user", (req, res) => {
    const { username } = req.body;
    
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }
    
    const new_name = { userid: userid++, username };
    user.push(new_name);
    res.json(new_name);
});

app.listen(3000);