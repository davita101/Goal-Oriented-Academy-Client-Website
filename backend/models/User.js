import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
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
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model("users", UserSchema)
