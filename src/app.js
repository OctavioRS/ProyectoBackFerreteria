import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'



const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products' , productsRoute)
app.use('/api/carts' , cartRoute)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

