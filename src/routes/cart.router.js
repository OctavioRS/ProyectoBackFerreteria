import { Router } from "express";
import CartManager from "../CartManager.js";
const router = Router();
const cartManager = new CartManager('./cart.json');


router.post("/", async (req, res) => {
    try {
        const { products } = req.body;
        const newCart = await cartManager.addCart(products)
        res.json(newCart)
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message })
    }
});
router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if (cart) {
            res.status(200).json(cart)
        }
        } catch (error) {
            console.error(error);
            res.status(500).send("Product not found");
        }
    }
);


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid , pid } = req.params;
        const product = await cartManager.saveProductToCart(Number(cid) , Number(pid));
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(400).send('product not found')
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message })
    }
});




export default router;