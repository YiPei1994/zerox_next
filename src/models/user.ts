import { Document, Schema, model, models, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  createFrom: string;
  admin: string;
  icon: string;
  createdAt: string;
  passwordResetToken: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  createFrom: {
    type: String,
    default: null,
  },
  admin: {
    type: String,
    default: "user",
  },
  icon: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
