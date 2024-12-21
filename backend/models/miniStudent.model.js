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
            enum: [
                "math",
                "english",
                "programming",
            ]
        }
    },
    { timestamps: true }
)