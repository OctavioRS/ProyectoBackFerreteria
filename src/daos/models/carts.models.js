import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
   product : {type: Array, default : []}
})

export const cartsModel = mongoose.model('carts',
    cartsSchema) 