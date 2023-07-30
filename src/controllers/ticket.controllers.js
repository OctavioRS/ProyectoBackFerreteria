import TicketService from "../services/ticket.services.js";
import ProductDaoMongoDB from "../daos/mongo/products.dao.js";
import CartsDaoMongoDB from "../daos/mongo/carts.dao.js";
import { cartsModel } from "../daos/models/carts.models.js";
const proddao = new ProductDaoMongoDB()
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
    for (const product of userCart.products) {
        const productDetails = await productModel.findById(product._id);
        if (!productDetails || isNaN(productDetails.price)) {
            return res.status(400).json({ error: 'Invalid product in cart' });
        }
        totalAmount += productDetails.price * product.quantity;
    }

   
      const ticket = {
          purchase_datetime: Date(),
          purchaser: req.session.id,
          cart: req.user.cart, 
          code :generateCode(5) , 
          amount: totalAmount
      };

      const newTicket = await TicketService.generateTicket(ticket);
      res.json(newTicket);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
