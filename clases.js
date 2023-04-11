class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, stock) {
      const product = {
        id: this.nextId,
        title,
        description,
        price,
        thumbnail,
        stock
      };
      if (this.products.some(p => p.id === product.id)) {
        console.error("Error: product with same id already exists");
        return;
      }
     
      this.products.push(product);
      this.nextId++;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error("Error: product not found");
      }
      return product;
    }
  }
  

const productManager = new ProductManager();

productManager.addProduct('remera', 'ideal para deportes', '100', 'http://remera.com', '2');
console.log(productManager.getProducts());

productManager.addProduct('gorra', 'marca Vans', '200', 'http://gorra.com', '5');
console.log(productManager.getProducts());
console.log(productManager.getProductById(1))


