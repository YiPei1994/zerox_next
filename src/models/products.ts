import { model, models, Schema } from "mongoose";

const productSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    rate: Number,
    count: Number,
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
