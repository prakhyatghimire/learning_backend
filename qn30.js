import express from "express";
const app = express();

app.use(express.json());

const users = [];
let nextId = 1; // Auto-increment ID counter

// ✅ GET - Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ POST - Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  res.json(newUser);
});

// ✅ DELETE - Delete user by id
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.json("User not found");
  }

  users.splice(index, 1);
  res.json("User Deleted Successfully");
});

// ✅ PUT - Update user by id
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.json("User not found");
  }

  user.name = name;
  user.email = email;

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});