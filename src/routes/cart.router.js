import { Router } from "express";
import CartManager from "../daos/filesystem/CartManager.js";

const router = Router();
const cartManager = new CartManager('./cart.json');

router.post("/", async (req, res) => {
    try {
        const { products } = req.body;
        const newCart = await cartManager.addCart(products);
        res.json(newCart);
        console.log(newCart);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send("Cart not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving cart");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await cartManager.saveProductToCart(Number(cid), Number(pid));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send("Product or cart not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding product to cart");
    }
});

export default router;
