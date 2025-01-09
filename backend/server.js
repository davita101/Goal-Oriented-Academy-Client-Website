import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' // Make sure to import cors
import express from 'express' // Make sure to import express
import path from 'path'

import { connectDB } from './db/connectDB.js'
import authRouters from './routes/api.auth.js'
import apiRoutes from './routes/api.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 1000
const __dirname = path.resolve()

app.use(cors({ origin: process.env.FRONT_URL, credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'backend/public')))

app.use('/auth', authRouters)
app.use("/api", apiRoutes)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}
app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`)
})
