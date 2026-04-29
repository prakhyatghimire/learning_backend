// JSON Response Route

// Create a route:

// /api/user

// Return JSON:

// {
//   "name": "John",
//   "age": 25,
//   "city": "Kathmandu"
// }

// Goal: Learn res.json()
import express from "express";

const app = express();

app.get("/api/user", (req, res) => {
  res.json({
    name: "John",
    age: 25,
    city: "Kathmandu",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
