import { ProductsfakeModel } from '../daos/models/productsfake.models.js';
import {generateProduct} from '../utils/utils.js'
import { loggerDev } from '../utils/loggers.js';

export const createProductMock = async (cant = 100) => {
  try {
    const prodArray = []
    for (let i = 0; i < cant; i++) {
      const prod = generateProduct();
      prodArray.push(prod);
    }
    const product = await ProductsfakeModel.create(prodArray)
    return product;
    
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
};

export const getProducts = async() => {
  try {
    const products = await ProductsfakeModel.find({});
    return products;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
};