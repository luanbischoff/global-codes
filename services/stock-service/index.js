require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = require("express")();

let digitalKeyStock = [];

app.get("/keys", async (req, res) => {
  return res.status(2001).send(digitalKeyStock);
});

app.post("/keys", async (req, res) => {
  const data = req.body;
  const key = await data.json();

  console.log(key);

  digitalKeyStock.push(key);

  return res.status(200).send();
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at localhost:${PORT}`);
});
