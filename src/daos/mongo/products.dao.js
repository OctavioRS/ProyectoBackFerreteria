import { productModel } from "../models/products.models.js";
import { userModel } from "../models/user.models.js";
import { loggerDev } from '../../utils/loggers.js';

class ProductDaoMongoDB {
  async addProduct({ title, description, code, price, status, stock, category, thumbnails, userEmail }) {
    try {
      const user = await userModel.findOne({ email: userEmail })
      if (user.role === 'premium' || user.role === 'admin') {

        const response = await productModel.create({
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails,
          owner: user.email
        });

        return response;
      } else {
        throw new Error({ message: 'no puede crear un producto si no es admin o premium' });
      }
    } catch (error) {
      loggerDev.error(error.message);
      throw new Error(error);
    }
  }


  async getProducts(page = 1, limit = 10, category, availability, sort) {
    try {
      const query = {};

      if (category) {
        query.category = category;
      }

      if (availability) {
        query.availability = availability;
      }

      const options = {
        page,
        limit,
        sort: sort ? { price: sort } : undefined,
      };

      const response = await productModel.paginate(query, options);
      return response;
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  }


  async getProductById(id) {
    try {
      const response = await productModel.findById(id);
      return response
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  }

  async updateProduct(id, obj) {
    try {
      await productModel.updateOne({ _id: id }, obj)
      return obj
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  }

  async deleteProduct(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
  }
}
export default ProductDaoMongoDB;