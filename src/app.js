import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'
import handlebars from "express-handlebars"
import { __dirname } from "./path.js"
import path from "path"
import productViews from './routes/productviews.routes.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.routes.js'
import { Server } from 'socket.io'
import ProductManager from "./daos/filesystem/ProductManager.js";
import productmongoRouter from './routes/productsmongo.routes.js'
import messagemongoRouter from './routes/messagesmongo.routes.js'
import cartsmongoRouter from './routes/cartsmongo.routes.js'
import sessionFileStore from 'session-file-store'
import session from "express-session";
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import passport from 'passport';
import './passport/current.js'
import './passport/strategies.js'
import './passport/github.js'
import './db/database.js'
import dotenv from 'dotenv'
dotenv.config()


const productManager = new ProductManager('../productos.json');


const app = express();
const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'sessionKey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000
  },
  store: new mongoStore({
    mongoUrl: 'mongodb+srv://octavio:octavio@clusterecommerce.xka9yxf.mongodb.net/Ecommerce?retryWrites=true&w=majority',
    ttl: 10322,
  }),
})
)

app.use(passport.initialize());
app.use(passport.session())
//app.use('/api/products' , productsRoute)
//app.use('/api/carts' , cartRoute)

app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')
//app.use('/', productViews)

app.use('/products', productmongoRouter)
app.use('/messages', messagemongoRouter)
app.use('/carts', cartsmongoRouter)

app.use('/users', usersRouter)
app.use('/views', viewsRouter)
app.use('/api/sessions', usersRouter )


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


