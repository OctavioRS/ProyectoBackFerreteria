import TicketService from "../services/ticket.services.js";
import CartsDaoMongoDB from "../daos/mongo/carts.dao.js";


const cartUser = new CartsDaoMongoDB()
import { productModel } from "../daos/models/products.models.js";


function generateCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}


export const ticketController = async (req, res, next) => {
  try {
    const userCart = await cartUser.getCartByUser(req.user._id);

    if (!userCart || !Array.isArray(userCart.products)) {
      return res.status(400).json({ error: 'Invalid cart or products' });
    }

    let totalAmount = 0.0;
    let purchasedProducts = [];
    let unavailableProductIds = [];

    for (const product of userCart.products) {
      const productDetails = await productModel.findById(product._id);

      if (!productDetails || isNaN(productDetails.price) || productDetails.stock <= 0) {
        unavailableProductIds.push(product._id);
      } else if (product.quantity > productDetails.stock) {
        unavailableProductIds.push(product._id);
      } else {
        totalAmount += productDetails.price * product.quantity;
        purchasedProducts.push(product);

        // Restar la cantidad comprada del stock del producto en la base de datos
        productDetails.stock -= product.quantity;
        await productDetails.save();
      }
    }

    const ticket = {
      purchase_datetime: Date(),
      purchaser: req.user.email,
      cart: req.user.cart,
      code: generateCode(5),
      amount: totalAmount,
    };

    const newTicket = await TicketService.generateTicket(ticket);
    res.json(newTicket);

    // Filtrar los productos no comprados y actualizar el carrito del usuario
    const notPurchasedProducts = userCart.products.filter((product) => !purchasedProducts.includes(product));
    userCart.products = notPurchasedProducts;
    await cartUser.updateCart(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};