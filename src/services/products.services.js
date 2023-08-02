import ProductDaoMongoDB from "../daos/mongo/products.dao.js";
const prodDaoMongo = new ProductDaoMongoDB();

export const getServices = async (page , limit, category , availability) => {
    try {
        const docs = await prodDaoMongo.getProducts(page , limit, category, availability)
        return docs;
    } catch (error) {
        throw new Error(error)
    }
}

export const addServices = async (obj) => {
    try {
        const newProd = await prodDaoMongo.addProduct(obj)
        return newProd;
    } catch (error) {
        throw new Error(error)
    }
}

export const getServicesById = async (id) => {
    try {
        const docs = await prodDaoMongo.getProductById(id)
        return docs;
    } catch (error) {
        throw new Error(error)
    }
}

export const updateServices = async (id, obj) => {
    try {
        const docs = await prodDaoMongo.getProductById(id)
        if (!docs) {
            console.log('product not found')
        } else {
            const updProd = await prodDaoMongo.updateProduct(id, obj) 
            return updProd
        }
     
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteServices = async (id) => {
    try {
        const prodDel = await prodDaoMongo.deleteProduct(id)
        return prodDel;
    } catch (error) {
        throw new Error(error)
    }
}
