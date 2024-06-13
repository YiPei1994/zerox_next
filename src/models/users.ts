import { Document, Schema, model, models, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  icon: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: false,
    default: "",
  },
  name: {
    type: String,
    require: false,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
