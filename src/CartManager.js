import fs from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
        this.nextId = 1;
    }

    async addCart() {
        try {
            
            const product = {
                id: this.nextId,
                products: []
            }
            const carts = await this.getCarts();
            if (carts.some((p) => p.id === product.id)) {
                console.error("Error: product with same id already exists");
                return;

            }
            carts.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            this.nextId++;
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
    
    async saveProductToCart(cid, pid) {
        const cart = await this.getCartById(cid);
        if (cart) {
          const prodExist = cart.products.find((p) => p.product === pid);
          if (prodExist) {
            prodExist.quantity++;
          } else {
            cart.products.push({
              product: pid,
              quantity: 1
            });
          }
          await fs.promises.writeFile(this.path, JSON.stringify(await this.getCarts()));
          return cart;
        } else {
          throw new Error("Error: cart not found");
        }
      }
      
    
}
export default CartManager;