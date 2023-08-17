import { cartsModel } from '../models/carts.models.js'
import { productModel } from '../models/products.models.js';
import { userModel } from '../models/user.models.js';
import { loggerDev } from '../../utils/loggers.js';
class CartsDaoMongoDB {

    async getAllCarts() {
        try {
            const response = await cartsModel.find({});
            return response;
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    }

    async createCart(obj) {
        try {
            const response = await cartsModel.create(obj);
            return response;
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    }

    async getCartById(cid) {
        try {
            const response = await cartsModel.findById(cid).populate('products.productId');
            return response;
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    }


    async addProductToCart(cid, pid, userId) {
        try {
            const cart = await cartsModel.findById(cid);
            const product = await productModel.findById(pid)
            const user = await userModel.findById(userId)

            if (user.role === 'premium' && product.owner === user.email) {
                throw new Error('No se puede agregar un producto propio al carrito')
            } else {
                cart.products.push(pid);
                cart.save()
                return cart
            }
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
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
            loggerDev.error(error.message)
            throw new Error(error)
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
            loggerDev.error(error.message)
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
            loggerDev.error(error.message)
            throw new Error("Error");
        }
    }

    async updateCart(cart) {
        try {
            const updatedCart = await cartsModel.findByIdAndUpdate(cart._id, { products: cart.products }, { new: true });
            return updatedCart;
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error('Error updating cart in the database');
        }
    }

    async getCartByUser(userId) {
        try {
            const user = await userModel.findOne({ _id: userId }).populate('cart');
            if (user) {
                if (user.cart) {
                    return user.cart;
                } else {
                    return { message: 'Cart user not found' };
                }
            } else {
                return { message: 'User not found' };
            }
        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    }
}

export default CartsDaoMongoDB




