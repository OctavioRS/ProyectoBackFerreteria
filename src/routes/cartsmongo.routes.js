import { Router } from 'express'

import {
    getCartsController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    deleteProductCartController,
    updateProductCartController

} from '../controllers/carts.controllers.js';

const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.delete("/:cid/products/:pid", deleteProductCartController); 
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/products/:pid", updateProductCartController)
 

export default router