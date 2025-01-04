// ! Import necessary modules and dependencies
import { UserModel } from '../models/user.models.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import path from 'path'

const __dirname = path.resolve()
// * Define constants
const SIX_HOURS = 6 * 60 * 60 * 1000 // 6 საათი მილიწამებში
const ONE_HOUR = 60 * 60 * 1000 // 1 hour in milliseconds

// * Define rate limiter for signup
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 წუთი
  max: 100, // თითოეული IP მისამართიდან 100 მოთხოვნა
  message: 'Too many signup attempts from this IP, please try again later.'
})

// * Signup controller
export const signup = [
  signupLimiter,
  async (req, res) => {
    const {
      email,
      name,
      role,
      avatar,
      github,
      facebook,
      linkedin,
      leaderInformation,
      mentorInformation,
      mentorAssistantInformation
    } = req.body

    try {
      // Check if all required fields are provided
      if (!name || !email || !role) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and role are required'
        })
      }

      // Check if user already exists
      const userAlreadyExist = await UserModel.findOne({ email })
      if (userAlreadyExist) {
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' })
      }

      // Create new user with verification token
      const verificationToken = generateVerificationToken()
      const user = new UserModel({
        name,
        email,
        role,
        avatar,
        social: {
          github,
          facebook,
          linkedin
        },
        information: {
          leaderInformation,
          mentorInformation,
          mentorAssistantInformation
        },
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000 // 1 hour
      })

      await user.save()
      await sendVerificationEmail({ email, token: verificationToken })

      // Generate token and set cookie
      generateTokenAndSetCookie(res, user._id)
      res.status(201).json({
        success: true,
        message:
          'User created successfully. Please check your email for verification.',
        user: {
          ...user._doc
        }
      })
    } catch (error) {
      console.error('Signup error:', error)
      res
        .status(500)
        .json({ success: false, message: 'An error occurred during signup' })
    }
  }
]
// * Login controller

export const login = [
  signupLimiter,
  async (req, res) => {
    const { email } = req.body

    try {
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: 'Email is required' })
      }

      // Helper function for sending verification email and updating the user
      const handleVerification = async (user, message) => {
        user.verificationToken = generateVerificationToken()
        user.verificationTokenExpiresAt = Date.now() + ONE_HOUR
        await user.save()
        await sendVerificationEmail({ email, token: user.verificationToken })
        res.status(400).json({ success: false, message })
      }

      // Find user by email
      const user = await UserModel.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid email' })
      }

      const now = Date.now()

      // Check if last login was more than six hours ago
      if (user.lastLogin && now - user.lastLogin.getTime() > SIX_HOURS) {
        user.lastLogin = undefined
        user.clientId = undefined
        user.isVerified = false
        await handleVerification(
          user,
          'User has been inactive for more than 6 hours. Verification token sent.'
        )
        return
      }

      // Check if verification token is expired
      if (user.verificationToken && user.verificationTokenExpiresAt < now) {
        await handleVerification(
          user,
          'Verification token expired. New token sent.'
        )
        return
      }

      // Check if email is not verified
      if (!user.isVerified) {
        await handleVerification(
          user,
          'Email not verified. Verification token sent.'
        )
        return
      }

      // Check if user is already logged in from another device
      if (user.clientId) {
        await handleVerification(
          user,
          'User already logged in from another device. Verification token sent.'
        )
        return
      }

      // Update last login and generate a new clientId
      user.lastLogin = now
      const clientId = generateVerificationToken() // Replace with a better clientId generation method if needed
      user.clientId = clientId
      await user.save()

      // Set cookies and respond with success
      res.cookie('clientId', clientId, { httpOnly: true, maxAge: ONE_HOUR })
      generateTokenAndSetCookie(res, user._id)
      res.cookie('goa_auth_is_verified', user.isVerified, {
        httpOnly: true,
        maxAge: ONE_HOUR
      })
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          ...user._doc
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      res
        .status(500)
        .json({ success: false, message: 'An error occurred during login' })
    }
  }
]

// * Logout controller
export const logout = async (req, res) => {
  const token = req.cookies.token
  const { email } = req.body

  // ? Check if token is provided
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  // ? Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is required' })
  }
  try {
    // ? Verify token and find user
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findOne({ email, _id: decoded.userId })
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    // ? Invalidate user session
    user.isVerified = false
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    user.clientId = undefined
    await user.save()

    // ? Clear cookies and respond with success
    res.clearCookie('token')
    res.clearCookie('clientId')
    res.clearCookie('goa_auth_is_verified')
    res.status(200).json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(400).json({ success: false, message: 'An error occurred' })
  }
}

// * Verify email controller
export const verifyEmail = [
  signupLimiter,
  async (req, res) => {
    const { token } = req.params
    try {
      // ? Find user by verification token
      const user = await UserModel.findOne({ verificationToken: token })
      if (!user) {
        return res
          .status(400)
          .sendFile(
            path.join(__dirname, 'backend', 'public', 'invalid-user.html')
          )
      }

      // ? Check if token is expired
      if (user.verificationTokenExpiresAt < Date.now()) {
        return res
          .status(400)
          .sendFile(
            path.join(__dirname, 'backend', 'public', 'invalid-token.html')
          )
      }

      // ? Verify user and clear verification token
      user.isVerified = true
      user.verificationToken = undefined
      const clientIdMain = generateVerificationToken() // ან სხვა მეთოდი clientId-ს გენერაციისთვის
      user.clientId = clientIdMain

      user.verificationTokenExpiresAt = undefined

      await user.save()

      // ? Set cookies and respond with success
      const verificationTime = new Date().toISOString()
      res.cookie('clientId', clientIdMain, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000
      }) // 24 საათი
      await generateTokenAndSetCookie(res, user._id)
      res.cookie('goa_auth_is_verified', true, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000
      }) // 24 საათი
      res.cookie('verificationTime', verificationTime, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000
      }) // 24 საათი
      res.status(200).send(
        `
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <link rel="icon" type="image/png+xml" href="${
                  process.env.WEB_URL
                }/logo.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Verification Successful</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>

            <body>
                <div class="flex flex-col h-screen w-screen justify-center items-center">
                    <p class="text-2xl text-green-400">Email verified successfully. Click to go to the website.</p>
                    <a href='${
                      process.env.NODE_ENV === 'development'
                        ? process.env.FRONT_URL
                        : process.env.WEB_URL
                    }/dashboard'> 
                    <button type="button" 
                        class="px-4 py-2 bg-green-400 text-white rounded-sm active:ring active:ring-green-300 flex items-center justify-center gap-2">
                        <span>Click to go to Website</span>
                    </button>
                    </a>
                </div>
            </body>
            </html>
      `
      )
    } catch (error) {
      console.error('Error during email verification:', error)
      res.status(400).json({ success: false, message: 'An error occurred' })
    }
  }
]
// * Check authentication controller
export const checkAuth = async (req, res) => {
  const { user } = req
  const clientId = req.cookies?.clientId
  // ? Check if user is authenticated
  if (!user) {
    res.status(200).json({ success: true, user })

    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  // ? Check if user is verified
  if (!user.isVerified) {
    return res
      .status(403)
      .json({ success: false, message: 'Email not verified' })
  }

  // ? Check if session is valid
  if (user.clientId !== clientId) {
    return res
      .status(401)
      .sendFile(
        path.join(__dirname, 'backend', 'public', 'invalid-session.html')
      )
  }

  res.status(200).json({ success: true, user })
}
