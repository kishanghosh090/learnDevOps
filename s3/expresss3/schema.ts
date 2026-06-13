import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  fileName: String,
  price: Number,
});

export const ProductModel = mongoose.model("Products", productSchema);
