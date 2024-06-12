import { model, models, Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
}

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

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
