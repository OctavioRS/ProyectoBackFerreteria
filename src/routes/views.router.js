import express from 'express';
import ProductManager from "../daos/filesystem/ProductManager.js";
const router = express.Router();

const productManager = new ProductManager('./productos.json');

// router.get('/', async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//   res.render('index', { products });
// }
//   catch (error) {
//     console.error(error);
//   }
// });

router.get('/realTimeProducts', async (req, res) => {
   try{
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error){
    console.log(error)
  }
});

//Login//

router.get('/',(req,res)=>{
  res.render('login')
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.get('/error-register',(req,res)=>{
  res.render('errorRegister')
})

router.get('/error-login',(req,res)=>{
  res.render('errorLogin')
})

router.get('/profile',(req,res)=>{
  res.render('profile')
})

export default router;
