import fs from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
        this.nextId = 1;
    }

    async addCart() {
        try {
            const carts = await this.getCarts();
            let maxId = 0;
            carts.forEach((cart) => {
                if (cart.id > maxId) {
                    maxId = cart.id;
                }
            });
    
            const newId = maxId + 1;
            const product = {
                id: newId,
                products: []
            }
    
            carts.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            this.nextId = newId + 1;
            return carts;
        } catch (error) {
            console.log(error);
        }
    }
    

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const productJSON = await fs.promises.readFile(this.path, "utf-8");
                const productJS = JSON.parse(productJSON);
                return productJS;
            } else {
                return [];
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getCartById(cid) {
       try {const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cid);
        if (cart) {
           return cart;
        }
        return false;
    }  catch (error) {
        console.log(error);
    }
    }
    
    async saveCarts(carts) {
        try {
          await fs.promises.writeFile(this.path, JSON.stringify(carts));
        } catch (error) {
          console.log(error);
        }
      }
    
      async saveProductToCart(cid, pid) {
        try {
          const carts = await this.getCarts();
          const cartIndex = carts.findIndex((c) => c.id === cid);
          if (cartIndex >= 0) {
            const cart = carts[cartIndex];
            const prodIndex = cart.products.findIndex((p) => p.product === pid);
            if (prodIndex >= 0) {
              cart.products[prodIndex].quantity++;
            } else {
              cart.products.push({ product: pid, quantity: 1 });
            }
            await this.saveCarts(carts);
            return cart;
          } else {
            throw new Error("Error: cart not found");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
export default CartManager;