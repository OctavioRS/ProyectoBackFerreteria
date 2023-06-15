import express from 'express';
import ProductManager from "../daos/filesystem/ProductManager.js";

const router = express.Router();

const productManager = new ProductManager('./productos.json');

router.get('/products', async (req, res) => {
  try {
    const products = await productManager.getProducts();
  res.render('index', { products });
}
  catch (error) {
    console.error(error);
  }
});

router.get('/realTimeProducts', async (req, res) => {
   try{
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error){
    console.log(error)
  }
});


export default router;