const fs = require("fs");
class ProductManager {
  constructor() {
    this.path = "./productos.json";
    this.nextId = 1;
  }

  async addProduct(title, description, price, thumbnail, stock) {
    try {
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        stock,
      };
      const products = await this.getProducts();
      if (products.some((p) => p.id === product.id)) {
        console.error("Error: product with same id already exists");
        return;
      }

      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      this.nextId++;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
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

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.error("Error: product not found");
      return {};
    }
    return product;
  }

  async updateProduct(updatedProduct , id){
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        console.error("Error: producto not found");
        return;
      }
      products[index] = { ...products[index], ...updatedProduct };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      const productToDelete = products.find((p) => p.id === id);
      if (!productToDelete) {
        console.error("Error: product not found");
        return;
      }
      products = products.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`Product with id ${id} deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager();

const test = async() => {
    const get = await productManager.getProducts();
    console.log('primer consulta', get);
    await productManager.addProduct(
       "gorra",
       "marca Vans",
       "200",
       "http://gorra.com",
       "5"
);
    const get2 = await productManager.getProducts();
    console.log('segunda consulta', get2);
}

test()

module.exports = ProductManager;

//const product2 = await productManager.getProducts();
//console.log(product2);

//const productID = await productManager.getProductById(1);
//console.log(productID);

//await productManager.updateProduct({ title: "Producto actualizado", price: 15 });


