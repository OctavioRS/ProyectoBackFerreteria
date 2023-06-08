import mongoose from "mongoose";

const cartsProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartsSchema = new mongoose.Schema({
  products: [cartsProductSchema],
});

cartsSchema.pre('find', function() {
  this.populate('products');
});

export const cartsModel = mongoose.model('carts', cartsSchema);
