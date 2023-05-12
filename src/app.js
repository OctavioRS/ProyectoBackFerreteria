import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'
import handlebars from "express-handlebars"
import { __dirname } from "./path.js"
import path from "path"
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from "./ProductManager.js";
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


const httpServer = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('newProduct', async (obj) => {
    await productManager.addProduct(obj.name, obj.price, obj.description );
    const products = await productManager.getProducts();
    
    socketServer.emit('arrayProducts', products);  
  });


socket.on('deleteProduct', async (id) => {
  await productManager.deleteProduct(id);
  const products = await productManager.getProducts();
  socketServer.emit('deleteProduct', id);
  socketServer.emit('getProducts', products);
});

});


