import {
    addServices,
    getServices,
    getServicesById,
    updateServices,
    deleteServices
} from '../services/products.services.js';
import { HttpResponse } from '../utils/http.response.js';
import { loggerDev } from '../utils/loggers.js';
const Httpresponse = new HttpResponse();

export const getController = async (req, res, next) => {
    try {
      const { page , limit, category , availability  } = req.query
     const docs = await getServices(page , limit, category, availability);
     

     const status = "succes"
     const payload = docs.docs
     const totalPages = docs.totalPages
     const prevPage = docs.prevPage
     const nextPage = docs.nextPage
     const currentpage = docs.page
     const hasPrevPage = docs.hasPrevPage
     const hasNextPage = docs.hasNextPage
     const prevLink = hasPrevPage ? `http://localhost:8080/products?page=${docs.hasPrevPage}` : null
     const nextLink = hasNextPage ? `http://localhost:8080/products?page=${docs.hasNextPage}` : null
     res.json({
      status,
      payload,
      totalPages,
      prevPage,
      nextPage,
      currentpage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
     })
    } catch (error) {
      const status = "error"
      loggerDev.error(error.message)
      next(error);
    }
  };
  
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getServicesById(id);
      res.json(doc);
    } catch (error) {
      loggerDev.error(error.message)
      next(error);
    }
  };
  
  export const createController = async (req, res, next) => {
    try {
      const { title, description, price, stock, code, status, category, thumbnails   } = req.body;
      const newDoc = await addServices({
        title,
        description,
        price,
        stock,
        code,
        status,
        category,
        thumbnails
      });
      res.json(newDoc);
    } catch (error) {
      loggerDev.error(error.message)
      next(error);
    }
  };
  
  export const updateController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, price, stock, status, category, thumbnails } = req.body;
      await getServicesById(id);
      const docUpd = await updateServices(id, {
        title, description, price, stock, status, category, thumbnails
      });
      res.json(docUpd);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteController = async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteServices(id);
      res.json({message: 'Product deleted successfully!'})
    } catch (error) {
      loggerDev.error(error.message)
      next(error);
    }
  };