class ProductManager {
    constructor(products = []) {
      this.products = products;
      this.nextId = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
        console.error("Error: missing fields");
        return;
      }
      if (this.products.some(p => p.id === product.id)) {
        console.error("Error: product with same id already exists");
        return;
      }
      product.id = this.nextId;
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
  

