import express from 'express'
import {
  signup,
  login,
  logout,
  verifyEmail,
  checkAuth
} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/check-auth', authMiddleware, checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/verify-email/:token', verifyEmail) // შეცვლილია verify-token-დან verify-email-ზე

export default router
