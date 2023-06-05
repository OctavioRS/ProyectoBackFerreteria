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

export const addProductToCartService = async (cid, pid) =>{
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
        return doc
    } catch (error) {
        console.log(error);
    }

}
