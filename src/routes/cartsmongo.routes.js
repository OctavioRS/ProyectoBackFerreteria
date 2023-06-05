import { Router } from 'express'

import {
    getCartsController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    deleteProductCartController

} from '../controllers/carts.controllers.js';

const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.delete("/api/carts/:cid/products/:pid", deleteProductCartController);  

export default router