import mongoose from "mongoose"
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb Connected: $   `)
    }
    catch (err) {
        console.log("Error connection to MongoDB: ", err.message)
    }
}