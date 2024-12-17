import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    restEmailToken: String,
    restEmailExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    clientId: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);