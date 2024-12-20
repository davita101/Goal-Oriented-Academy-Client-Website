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
    role: {
      type: [String],
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
    avatar: {
      type: String,
      default: undefined
    },
    github: {
      type: String,
      default: undefined
    },
    fbUrl: {
      type: String,
      default: undefined
    },
    codewarsUrl: {
      type: String,
      default: undefined
    },
    leaderLevel: {
      type: Number,
      default: 0
    },
    parentFb: {
      type: String,
      default: undefined
    },
    cards: {
      green: {
        type: Number,
        default: 0
      },
      yellow: {
        type: Number,
        default: 0
      },
      black: {
        type: Number,
        default: 0
      }
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