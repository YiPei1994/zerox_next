import { Document, Schema, model, models, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  admin: string;
  icon: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  admin: {
    type: String,
    default: "user",
  },
  icon: {
    type: String,
  },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
