import CartsDaoMongoDB from '../daos/mongo/carts.dao.js'

const cartDaoMongo = new CartsDaoMongoDB();

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