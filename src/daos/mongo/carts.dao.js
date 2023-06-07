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
            const response = await cartsModel.findById({ _id: cid });
            return response.populate('products');
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            cart.products.push(pid);
            cart.save()
            /*if (cart) {
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
            }*/
        } catch (error) {
            console.log(error);
        }
    };

    async deleteProductCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid);
            console.log(cart)
            if (!cart) {
                return { error: true, status: 404, message: 'Carrito no encontrado' };
            }

            const productIndex = cart.products.findIndex(product => product.toString() === pid);
            console.log(productIndex)

            if (productIndex === -1) {
                return { error: true, status: 404, message: 'Producto no encontrado en el carrito' };
            }

            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
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




