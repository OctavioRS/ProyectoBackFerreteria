import { Router } from 'express'

import {
    getCartsController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    deleteProductCartController,
    updateProductCartController,
    deleteAllProductsCartController

} from '../controllers/carts.controllers.js';

import { isUser } from '../middleweare/autorization.js';

import TicketController from '../controllers/ticket.controllers.js';


const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.delete("/:cid/products/:pid", deleteProductCartController); 
router.delete("/:cid", deleteAllProductsCartController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", isUser, addProductToCartController);
router.put("/:cid/products/:pid", updateProductCartController);
router.post("/:cid/purchase" , TicketController.generateTicket)
 

export default router