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

export const cartsModel = mongoose.model('carts', cartsSchema);
