import * as prodfakeService from "../services/productsfake.services.js";
import { HttpResponse } from '../utils/http.response.js';
import { loggerDev } from '../utils/loggers.js';
const Httpresponse = new HttpResponse();

export const createProd = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await prodfakeService.createProductMock(cant);
    res.status(200).json({ products: response });
  } catch (error) {
    loggerDev.error(error.message)
    return Httpresponse.ServerError(res, error)
  }
};

export const getProds = async (req, res) => {
  try {
    const response = await prodfakeService.getProducts();
    res.status(200).json({ products: response });
  } catch (error) {
    loggerDev.error(error.message)
    return Httpresponse.ServerError(res, error)
  }
};