import { cartsModel } from '../models/carts.models.js'
import { productModel } from '../models/products.models.js';
class CartsDaoMongoDB {

    async getAllCarts() {
        try {
            const response = await cartsModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(obj) {
        try {
            const response = await cartsModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(cid) {
        try {
          const response = await cartsModel.findById(cid).populate('products.productId');
          return response;
        } catch (error) {
          console.log(error);
        }
      }
      

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            cart.products.push(pid);
            cart.save()
            
        } catch (error) {
            console.log(error);
        }
    };

    async deleteProductCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);

            if (!cart) {
                return { error: true, status: 404, message: 'Cart not found' };
            }

            const productIndex = cart.products.findIndex(product => product.toString() === pid);
            console.log(productIndex)

            if (productIndex === -1) {
                return { error: true, status: 404, message: 'Product not found' };
            }

            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteAllProductsCart(cid) {
        try {
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                return { error: true, status: 404, message: 'Cart not found' };
            }
            cart.products = [];
            await cart.save();
            return { error: false, status: 200, message: 'Products deleted successfully' };
        } catch (error) {
            throw new Error("Error");
        }
    }

    async updateProductCart(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid);
            if (!cart) {
                throw new Error('Cart not found');
            }

            const prodIndex = cart.products.findIndex((p) => p._id.toString() === pid.toString());
            if (prodIndex >= 0) {
                cart.products[prodIndex].quantity = quantity;
            } else {
                cart.products.push({ _id: pid, quantity: quantity });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error");
        }
    }

}

export default CartsDaoMongoDB




