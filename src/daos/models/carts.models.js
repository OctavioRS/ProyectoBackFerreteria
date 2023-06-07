import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
   products :[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          default: []
      }
  ]
})

cartsSchema.pre('find', function() {
   this.populate('products')
})

export const cartsModel = mongoose.model('carts',
    cartsSchema) 