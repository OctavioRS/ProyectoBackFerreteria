import { cartsModel } from '../models/carts.models.js'
import { productModel } from '../models/products.models.js'


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
            const response = await cartsModel.findById(cid);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            if (cart) {
                const product = await productModel.findById(pid);
                if (product) {
                    const prodIndex = cart.product.findIndex((p) => p._id.toString() === pid.toString());
                    if (prodIndex >= 0) {
                        cart.product[prodIndex].quantity++;
                    } else {
                        cart.product.push({ _id: pid, quantity: 1 });
                    }
                    await cart.save();
                    return cart;
                } else {
                    throw new Error("Error: product not found");
                }
            } else {
                throw new Error("Error: cart not found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    async deleteProductCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            console.log(cart);
            if (cart) {
                cart.product = cart.product.filter((product) => product._id.toString() !== pid.toString());
                await cart.save();
                return cart;
            } else {
                throw new Error("Error: cart not found");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}

export default CartsDaoMongoDB




