import express from "express";
import productsRoute from './routes/product.router.js';
import cartRoute from './routes/cart.router.js'
import handlebars from "express-handlebars"
import { __dirname } from "./path.js"
import path from "path"

import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

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

app.get('/', (req, res) => {
  res.render('websockets')
});

const httpServer = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) =>{
    console.log('usuario conectado!', socket.id);
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado!');
    });
    
    socketServer.emit('arrayProducts', arrayProducts);
   
    socket.on('newProduct', (obj) => {
        arrayProducts.push(obj);
        socketServer.emit('arrayProducts', arrayProducts);  
       
    })
});

