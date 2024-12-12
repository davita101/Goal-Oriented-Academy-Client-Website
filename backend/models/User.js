import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    login: {
      type: Boolean,
      default: false,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const UserModel = mongoose.model("users", UserSchema);
