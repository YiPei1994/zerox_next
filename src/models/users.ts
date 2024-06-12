import { Schema, model, models } from "mongoose";

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

const User = models.User || model("User", userSchema);

export default User;
