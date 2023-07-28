import CartsDaoMongoDB from '../daos/mongo/carts.dao.js'
import { ticketModel } from '../daos/models/ticket.models.js'
import { productModel } from '../daos/models/products.models.js';
import { userModel } from '../daos/models/user.models.js';
import ProductDaoMongoDB from '../daos/mongo/products.dao.js'

const cartDaoMongo = new CartsDaoMongoDB();
const productDaoMongo = new ProductDaoMongoDB()
export const getCartService = async () => {
  try {
    const docs = await cartDaoMongo.getAllCarts()
    return docs;
  } catch (error) {
    console.error(error);
  }
}

export const getCartByIdService = async (cid) => {
  try {
    const data = await cartDaoMongo.getCartById(cid);
    if (!data)
      return `Cart not found`
    else return data;
  } catch (error) {
    console.log(error);
  }
}

export const createCartService = async () => {
  try {
    const cart = await cartDaoMongo.createCart()
    return cart
  } catch (error) {
    console.log(error)
  }
}

export const addProductToCartService = async (cid, pid) => {
  try {
    const doc = await cartDaoMongo.addProductToCart(cid, pid);
    return doc;
  } catch (error) {
    console.log(error);
  }
}
export const deleteProductCartService = async (cid, pid) => {
  try {
    const doc = await cartDaoMongo.deleteProductCart(cid, pid);
    if (!doc) {
      throw new Error('Cart not found');
    }
    return doc
  } catch (error) {
    throw new Error(error);
  }
}
export const updateProductCartService = async (cid, pid, quantity) => {
  try {
    const product = await cartDaoMongo.updateProductCart(cid, pid, quantity);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating cart');
  }
}

export const deleteAllProductsCartService = async (cid) => {
  try {
    const cart = await cartDaoMongo.deleteAllProductsCart(cid)
    if (!cart) {
      throw new Error('Products not found');
      
    }return cart
  } catch (error) {
    throw new Error('Error to delete products');
  }
}



class TicketService {
  async generateTicket(cartId) {
    const cart = await userModel.findOne({ cart: cartId }).populate('cart');

    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    const purchasedProducts = [];
    const failedProductIds = [];

    for (const product of cart.cart.products) {
      const availableProduct = await productModel.findById(product.productId);

      if (!availableProduct || availableProduct.stock < product.quantity) {
        failedProductIds.push(product.productId);
      } else {
        availableProduct.stock -= product.quantity;
        await availableProduct.save();
        purchasedProducts.push({
          productId: product.productId,
          name: availableProduct.name,
          quantity: product.quantity,
          price: availableProduct.price,
        });
      }
    }

    if (purchasedProducts.length > 0) {
      const ticketData = {
        code: generateTicketCode(), // You need to implement this function to generate a unique ticket code
        purchase_datetime: new Date(),
        amount: cart.totalAmount,
        purchaser: cart.userId,
        purchasedProducts,
      };

      const ticket = await ticketModel.create(ticketData);

      // Add the ticket to the user's cart
      cart.cart.push(ticket._id);
      await cart.save();

      return { ticket, failedProductIds };
    } else {
      return { ticket: null, failedProductIds };
    }
  }
}

export default TicketService;


