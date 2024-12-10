import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { UserModel } from "./models/User.js"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api", async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error })
  }
})

const uri = process.env.MONGODB_URI
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })