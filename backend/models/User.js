import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
        type: Boolean,
        default: false,
        required: true,
        unique: true,
      },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
