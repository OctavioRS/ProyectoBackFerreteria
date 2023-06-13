import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
});

//cartsSchema.pre('find' , function(){
  //this.populate('products.productId')
//})

export const cartsModel = mongoose.model('carts', cartsSchema);
