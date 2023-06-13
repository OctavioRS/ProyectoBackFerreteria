import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'
import handlebars from "express-handlebars"
import { __dirname } from "./path.js"
import path from "path"
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/usermongo.routes.js'
import { Server } from 'socket.io'
import ProductManager from "./daos/filesystem/ProductManager.js";
import productmongoRouter from './routes/productsmongo.routes.js'
import messagemongoRouter from './routes/messagesmongo.routes.js'
import cartsmongoRouter from './routes/cartsmongo.routes.js'
import sessionFileStore from 'session-file-store'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import './db/database.js'


const productManager = new ProductManager('../productos.json');


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//app.use('/api/products' , productsRoute)
//app.use('/api/carts' , cartRoute)
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')
//app.use('/', viewsRouter)

app.use('/products', productmongoRouter)
app.use('/messages', messagemongoRouter)
app.use('/carts', cartsmongoRouter)

app.use(
  session({
    secret: 'sessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000
    },
    store: new MongoStore({
      mongoUrl: 'mongodb+srv://octavio:octavio@clusterecommerce.xka9yxf.mongodb.net/Ecommerce?retryWrites=true&w=majority',
       autoRemoveInterval: 1,
      //autoRemove: "interval",
      //ttl: 10,
      // crypto: {
      //   secret: '1234',       //encripta los datos de la sesion
      // },
    }),
  })
)

app.use('/users',usersRouter)
app.use('/views',viewsRouter)

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


