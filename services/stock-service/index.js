require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

let digitalKeyStock = [];

// Retrieve all keys
app.get("/keys", (req, res) => {
  return res.status(200).json(digitalKeyStock);
});

// Add new key to stock
app.post("/keys", (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res.status(400).send("Key is required");
  }

  digitalKeyStock.push(key);
  return res.status(201).send("Key added successfully");
});

// Remove key from stock
app.delete("/keys/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = digitalKeyStock.length;

  digitalKeyStock = digitalKeyStock.filter((key) => key.id !== id);

  if (digitalKeyStock.length < initialLength) {
    return res.status(200).send("Key removed successfully");
  } else {
    return res.status(404).send("Key not found");
  }
});

// Update key in stock
app.put("/keys/:id", (req, res) => {
  const { id } = req.params;
  const updatedKey = req.body;

  const index = digitalKeyStock.findIndex((key) => key.id === id);

  if (index !== -1) {
    digitalKeyStock[index] = { ...digitalKeyStock[index], ...updatedKey };
    return res.status(200).send("Key updated successfully");
  } else {
    return res.status(404).send("Key not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
