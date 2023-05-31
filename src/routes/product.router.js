import { Router } from "express";
import ProductManager from "../daos/filesystem/ProductManager.js";
const productManager = new ProductManager('./productos.json');
const router = Router();

router.get("/", async (req, res) => {
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
  
  
  router.get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(parseInt(pid));
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
  
  router.post("/", async (req, res) => {
    try {
      const prod = req.body;
      const newProduct = await productManager.addProduct(prod)
      res.json(newProduct)
      
    } catch (error) {
      console.error(error);
      res.status(404).json({message: error.message})
    }
  });
  
  router.put("/:id", async (req, res)=>{
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
  
    router.delete("/:id", async (req , res)=>{
      const { id } = req.params;
      const products = await productManager.getProducts()
      if(products.length > 0){
        await productManager.deleteProduct(Number(id))
        res.send(`product id: ${id} deleted succesfully`)
      } else {
        res.send('product not found')
      }
    });

export default router;
  
  