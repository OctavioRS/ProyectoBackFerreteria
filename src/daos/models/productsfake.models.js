import { Schema, model } from "mongoose";

const productsfakeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

export const ProductsfakeModel = model("productsFake", productsfakeSchema);