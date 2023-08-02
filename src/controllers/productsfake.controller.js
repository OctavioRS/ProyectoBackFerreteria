import * as prodfakeService from "../services/productsfake.services.js";
import { HttpResponse } from '../utils/http.response.js';
const Httpresponse = new HttpResponse();

export const createProd = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await prodfakeService.createProductMock(cant);
    res.status(200).json({ products: response });
  } catch (error) {
    return Httpresponse.ServerError(res, error)
  }
};

export const getProds = async (req, res) => {
  try {
    const response = await prodfakeService.getProducts();
    res.status(200).json({ products: response });
  } catch (error) {
    return Httpresponse.ServerError(res, error)
  }
};