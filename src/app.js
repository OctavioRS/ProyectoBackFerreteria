const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./productos.json');

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit; 
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Product not found");
  }
});


app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if(product){
      res.status(200).json(product)
    }
    else{
      res.status(400).send('product not found')
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({message: error.message})
  }
});

app.post("/products", async (req, res) => {
  try {
    const prod = req.body;
    const newProduct = await productManager.addProduct(prod)
    res.json(newProduct)
    
  } catch (error) {
    console.error(error);
    res.status(404).json({message: error.message})
  }
});

app.put("/products/:id", async (req, res)=>{
  try {
    const product = req.body;
    const { id } = req.params;
    const productFile = await productManager.getProductById(Number(id))
    if(productFile){
      await productManager.updateProduct(product, Number(id))
      res.send('product updated succesfully')
    }
    else {
      res.status(400).send("Product not found");
    }
    } 
    catch (error) {
    console.error(error);
    res.status(404).json({message: error.message})
  }})

  app.delete("/products/:id", async (req , res)=>{
    const { id } = req.params;
    const products = await productManager.getProducts()
    if(products.length > 0){
      await productManager.deleteProduct(Number(id))
      res.send(`product id: ${id} deleted succesfully`)
    } else {
      res.send('product not found')
    }
  })




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

