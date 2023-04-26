const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

