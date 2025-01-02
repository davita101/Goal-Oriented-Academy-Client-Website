import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors' // Make sure to import cors
import express from 'express' // Make sure to import express
import path from 'path'

import { connectDB } from './db/connectDB.js'
import authRouters from './routes/api.auth.js'
import groupRoutes from './routes/api.groups.js' // Correct import path
import studentRoutes from './routes/api.students.js' // Correct import path
import leadersRoutes from './routes/api.leaders.js' // Correct import pathn
import { authMiddleware } from './middleware/authMiddleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 1000
const __dirname = path.resolve()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouters)
app.use('/api/groups', authMiddleware, groupRoutes)
app.use('/api/leaders', leadersRoutes)
app.use('/api/students', authMiddleware, studentRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}
app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on http://localhost:${PORT}`)
})
