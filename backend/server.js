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
app.get("/verify", async (req, res) => {
  const token = req.query.token
  if (token == null) return res.sendStatus(401)
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decodedToken.userId)
    user.login = true

    await user.save()
    res.send(`Atuhed as ${user.username}`)
  } catch (e) {
    res.sendStatus(401)
  }
})
app.post('/users', async (req, res) => {
  try {
    const { username, email, login } = req.body;

    // Check if username or email already exists in the database
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      login: login || false,  // If 'login' is not provided, default to false
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
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
// crypto.subtle
//   .generateKey(
//     {
//       name: "HMAC",
//       hash: { name: "SHA-256" }
//     },
//     true,
//     ["sign", "verify"]
//   )
//   .then(key => {
//     crypto.subtle.exportKey("jwk", key).then(exported => {
//       console.log(exported.k)
//     })
//   })