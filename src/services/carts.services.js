import CartsDaoMongoDB from '../daos/mongo/carts.dao.js'
import { ticketModel } from '../daos/models/ticket.models.js'
import { productModel } from '../daos/models/products.models.js';
import { userModel } from '../daos/models/user.models.js';
import ProductDaoMongoDB from '../daos/mongo/products.dao.js'
import { HttpResponse } from '../utils/http.response.js';
import { loggerDev } from '../../utils/loggers.js';
const Httpresponse = new HttpResponse();

const cartDaoMongo = new CartsDaoMongoDB();
const productDaoMongo = new ProductDaoMongoDB()

export const getCartService = async () => {
  try {
    const docs = await cartDaoMongo.getAllCarts()
    return docs;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const getCartByIdService = async (cid) => {
  try {
    const data = await cartDaoMongo.getCartById(cid);
    if (!data)
      return `Cart not found`
    else return data;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const createCartService = async () => {
  try {
    const cart = await cartDaoMongo.createCart()
    return cart
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const addProductToCartService = async (cid, pid) => {
  try {
    const doc = await cartDaoMongo.addProductToCart(cid, pid);
    return doc;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
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
    loggerDev.error(error.message)
    throw new Error(error)
  }
}
export const updateProductCartService = async (cid, pid, quantity) => {
  try {
    const product = await cartDaoMongo.updateProductCart(cid, pid, quantity);
    if (!product) {
      return Httpresponse.NotFound(res, error)
    }
    return product;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const deleteAllProductsCartService = async (cid) => {
  try {
    const cart = await cartDaoMongo.deleteAllProductsCart(cid)
    if (!cart) {
      return Httpresponse.NotFound(res, error)
      
    }return cart
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}






