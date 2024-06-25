import { Document, Schema, model, models, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId | string;
  email: string;
  password: string;
  name: string;
  role: string;
  icon: string;
  createdAt: string;
  passwordResetToken: string;
  active: boolean;
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
    select: false,
  },
  name: {
    type: String,
    default: null,
  },
  role: {
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
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
