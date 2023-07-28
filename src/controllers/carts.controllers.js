import TicketService from '../services/carts.services.js';
import CartsDaoMongoDB from '../daos/mongo/carts.dao.js';
const cartDaoMongo = new CartsDaoMongoDB();
const ticketService = new TicketService();
import {
    getCartService,
    getCartByIdService,
    createCartService,
    addProductToCartService,
    deleteProductCartService,
    updateProductCartService,
    deleteAllProductsCartService,
    
} from '../services/carts.services.js'

export const getCartsController = async (req, res, next) => {
    try {
        const docs = await getCartService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const docs = await getCartByIdService(cid)
        res.json(docs)
    } catch (error) {
        next(error)
    }
}

export const createCartController = async (req, res, next) => {
    try {
        const docs = await createCartService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addProductToCartService(cid, pid);
        res.json(product)
    } catch (error) {
        next(error);
    }
}

export const deleteProductCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await deleteProductCartService(cid, pid);
        res.json(product)
    } catch (error) {
        next(error);
    }
}

export const updateProductCartController = async (req, res, next) => {
    try {
       const {cid, pid} = req.params
       const { quantity } = req.body
       const product = await updateProductCartService(cid, pid , quantity)
       res.json(product)
    } catch (error) {
        next(error);
    }
}

export const deleteAllProductsCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const data = await deleteAllProductsCartService(cid)
        res.json(data)
    } catch (error) {
        next(error);
    }
}







async function purchaseCart(req, res) {
    try {
      const { cartId, userId } = req.params;
  
      // Verify that the cart belongs to the user
      const cart = await cartDaoMongo.getCartById(cartId);
  
      if (!cart || cart.userId !== userId) {
        return res.status(404).json({ message: 'Cart not found for the user' });
      }
  
      const { ticket, failedProductIds } = await ticketService.generateTicket(cartId);
  
      if (ticket) {
        // Remove purchased products from the cart
        cart.products = cart.products.filter(
          (product) => !ticket.purchasedProducts.map((p) => p.productId).includes(product.productId)
        );
        await cartDaoMongo.updateProductCart(cartId, cart);
  
        return res.status(200).json({ ticket });
      } else {
        return res.status(422).json({ message: 'No products could be purchased', failedProductIds });
      }
    } catch (error) {
      console.error('Error purchasing cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export { purchaseCart };

