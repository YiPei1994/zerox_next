import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: number;
  name: string;
  isAdmin: false;
  icon: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
