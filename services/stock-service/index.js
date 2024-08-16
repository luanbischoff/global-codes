require("dotenv").config();
const express = require("express");
const app = express();
const keyRoutes = require("./routes/keyRoutes");

// Middlewares
app.use(express.json()); // For parsing application/json

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// }); // Error handling middleware

// Use routes
app.use("/keys", keyRoutes);

app.get("/", (req, res) => {
  return res.status(200).send({
    status: res.statusCode,
    message: "Stock services is OK.",
  });
});

// Start server
const PORT = process.env.PORT || 1001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
