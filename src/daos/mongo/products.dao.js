import { productModel } from "../models/products.models.js";

class ProductDaoMongoDB {
   
    async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
      try {
        const response = await productModel.create({title, description, code, price, status, stock, category, thumbnails});
        return response
        
      } catch (error) {
        console.log(error);
      }
    }
    async getProducts(page = 1, limit = 10, category, availability) {
      try {
        const query = {};
    
        if (category) {
          query.category = category;
        }
    
        if (availability) {
          query.availability = availability;
        }
    
        const response = await productModel.paginate(query, { page, limit });
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  
    async getProductById(id) {
     try {
        const response = await productModel.findById(id);
        return response
     } catch (error) {
        console.log(error);
     }
    }
   
    async updateProduct(id, obj){
      try {
       await productModel.updateOne({_id: id}, obj)
       return obj
      } catch (error) {
        console.log(error);
      }
    }
  
    async deleteProduct(id) {
        try {
            const response = await productModel.findByIdAndDelete(id);
            return response
         } catch (error) {
            console.log(error);
         }
    }
  
}
  export default ProductDaoMongoDB;