import TicketService from '../services/carts.services.js';
import CartsDaoMongoDB from '../daos/mongo/carts.dao.js';
const cartDaoMongo = new CartsDaoMongoDB();
const ticketService = new TicketService();
import {
    getCartService,
    getCartByIdService,
    createCartService,
    addProductToCartService,
    deleteProductCartService,
    updateProductCartService,
    deleteAllProductsCartService,
    
} from '../services/carts.services.js'

export const getCartsController = async (req, res, next) => {
    try {
        const docs = await getCartService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const docs = await getCartByIdService(cid)
        res.json(docs)
    } catch (error) {
        next(error)
    }
}

export const createCartController = async (req, res, next) => {
    try {
        const docs = await createCartService();
        res.json(docs)
    } catch (error) {
        next(error);
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await addProductToCartService(cid, pid);
        res.json(product)
    } catch (error) {
        next(error);
    }
}

export const deleteProductCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await deleteProductCartService(cid, pid);
        res.json(product)
    } catch (error) {
        next(error);
    }
}

export const updateProductCartController = async (req, res, next) => {
    try {
       const {cid, pid} = req.params
       const { quantity } = req.body
       const product = await updateProductCartService(cid, pid , quantity)
       res.json(product)
    } catch (error) {
        next(error);
    }
}

export const deleteAllProductsCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const data = await deleteAllProductsCartService(cid)
        res.json(data)
    } catch (error) {
        next(error);
    }
}









