import {
    addServices,
    getServices,
    getServicesById,
    updateServices,
    deleteServices
} from '../services/products.services.js'

export const getController = async (req, res, next) => {
    try {
     const docs = await getServices();
     res.json(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const getByIdController = async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await getServicesById(id);
      res.json(doc);
    } catch (error) {
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
      next(error);
    }
  };