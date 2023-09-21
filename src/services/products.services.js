import ProductDaoMongoDB from "../daos/mongo/products.dao.js";
import UserDao from "../daos/mongo/user.dao.js";
import { loggerDev } from "../utils/loggers.js";
import { transporter } from "./email.services.js";
import config from "../config.js";
const prodDaoMongo = new ProductDaoMongoDB();
const userDao = new UserDao();

export const getServices = async (page , limit, category , availability) => {
    try {
        const docs = await prodDaoMongo.getProducts(page , limit, category, availability)
        return docs;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
}

export const addServices = async (obj) => {

    try {
        const newProd = await prodDaoMongo.addProduct(obj)
        return newProd;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
}

export const getServicesById = async (id) => {
    try {
        const docs = await prodDaoMongo.getProductById(id)
        return docs;
    } catch (error) {
        loggerDev.error(error.message)
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
        loggerDev.error(error.message)
        throw new Error(error)
    }
}

export const deleteServices = async (id) => {
    try {
        const prodDel = await prodDaoMongo.deleteProduct(id)
        return prodDel;
    } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
    }
}

export const mailPremium = async(user) => {
    try {
        const mailOptions = {
            from: config.email_ethereal, 
            to: user.email, 
            subject: 'Se elimino tu producto',
            text: `Hola ${user.first_name},\n\nTu producto fue eliminado.`, 
        };
  
        
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo de aviso:', error);
        throw new Error(error);
    }
  }
  