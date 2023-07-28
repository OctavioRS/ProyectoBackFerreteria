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
        const cartId = req.params.cid;
        const result = await CartController.purchaseCart(cartId);
        
        if (result.success) {
          res.status(200).json({
            message: "Compra completada exitosamente",
            ticket: result.ticket,
            notPurchasedProducts: result.notPurchasedProducts
          });
        } else {
          res.status(400).json({
            message: "Error al completar la compra",
            notPurchasedProducts: result.notPurchasedProducts
          });
        }
      } catch (error) {
        res.status(500).json({
          error: "Error al procesar la solicitud"
        });
      }
    });


export default router;
