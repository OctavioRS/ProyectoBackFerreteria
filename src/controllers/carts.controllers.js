import {
    getCartService,
    getCartByIdService,
    createCartService,
    addProductToCartService
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
        const docs = await getCartByIdService(Number(cid))
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
};
