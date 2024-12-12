import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { UserModel } from "./models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { sendMagicLinkEmail } from "./mailer.js"

dotenv.config();
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())


app.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user !== null) {
    try {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      })
      await sendMagicLinkEmail({ email: user.email, token })
    } catch (e) {
      return res.send("Error Login in. Please try again.")
    }
  }

})
app.get("/verify", (req, res) => {
  const token = req.query.token
  if (token == null) return res.sendStatus(401)

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = UserModel.find(u => u._id === decodedToken.userId)
    res.send(`Atuhed as ${user.username}`)
  } catch (e) {
    res.sendStatus(401)
  }
})

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
crypto.subtle
  .generateKey(
    {
      name: "HMAC",
      hash: { name: "SHA-256" }
    },
    true,
    ["sign", "verify"]
  )
  .then(key => {
    crypto.subtle.exportKey("jwk", key).then(exported => {
      console.log(exported.k)
    })
  })