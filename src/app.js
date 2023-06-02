import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'
import handlebars from "express-handlebars"
import { __dirname } from "./path.js"
import path from "path"
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from "./daos/filesystem/ProductManager.js";
import productmongoRouter from './routes/productsmongo.routes.js'
import messagemongoRouter from './routes/messagesmongo.routes.js'
import cartsmongoRouter from './routes/cartsmongo.routes.js'

import './db/database.js'

const productManager = new ProductManager('../productos.json');


const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products' , productsRoute)
app.use('/api/carts' , cartRoute)
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')
app.use('/', viewsRouter)

app.use('/products', productmongoRouter)
app.use('/messages', messagemongoRouter)
app.use('/carts', cartsmongoRouter)

const httpServer = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

socket.on('newProduct', async (obj) => {
  await productManager.addProduct({
    title: obj.title,
    description: obj.description,
    price: obj.price,
  });
  const products = await productManager.getProducts();
  socketServer.emit('arrayProducts', products);
});


socket.on('deleteProduct', async (id) => {
  await productManager.deleteProduct(id);
  const products = await productManager.getProducts();
  socketServer.emit('arrayProducts', products);
});


});


