const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3030;

const dbPath = path.join(__dirname, "data.json");
app.use(cors());

const readDatabase = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

app.get("/products", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const { products } = readDatabase();
  const productsPerPage = 10;
  const start = (page - 1) * productsPerPage;
  const paginatedProducts = products.slice(start, start + productsPerPage);
  res.json(paginatedProducts);
});

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
