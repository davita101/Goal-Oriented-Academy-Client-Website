// ! Import necessary modules and dependencies
import { UserModel } from "../models/user.models.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { generateVerificationToken } from "../utils/generateVerificationToken.js"
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js"
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'

// * Define constants
const SIX_HOURS = 6 * 60 * 60 * 1000 // 6 საათი მილიწამებში

// * Define rate limiter for signup
const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 წუთი
    max: 5, // თითოეული IP მისამართიდან 5 მოთხოვნა
    message: "Too many signup attempts from this IP, please try again later."
});

// * Signup controller
export const signup = [signupLimiter, async (req, res) => {
    const { email, name } = req.body

    try {
        // ? Check if all fields are provided
        if (!name || !email) {
            throw new Error("All fields are required")
        }

        // ? Check if user already exists
        const userAlreadyExist = await UserModel.findOne({ email })
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        // ? Create new user with verification token
        const verificationToken = generateVerificationToken()
        const user = new UserModel({
            name,
            email,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 საათი
        })
        await user.save()
        await sendVerificationEmail({ email, token: verificationToken })

        // ? Generate token and set cookie
        generateTokenAndSetCookie(res, user._id)
        res.status(201).json({
            success: true,
            message: "User created successfully. Please check your email for verification.",
            user: {
                ...user._doc,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: "An error occurred" })
    }
}]

// * Login controller
export const login = [signupLimiter, async (req, res) => {
    const { email } = req.body
    try {
        // ? Find user by email
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        const session = req.cookies?.clientId
        const now = Date.now()

        // ? Check if session is valid
        if (!session) {
            user.isVerified = false
            user.clientId = undefined
            user.verificationToken = generateVerificationToken()
            user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000 // 24 საათი
            await user.save()
            return res.status(400).json({ success: false, message: "Invalid session" })
        }

        // ? Check if last login was more than six hours ago
        if (user.lastLogin && (now - user.lastLogin.getTime() > SIX_HOURS)) {
            user.isVerified = false
            user.verificationToken = generateVerificationToken()
            user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000 // 24 საათი
            await user.save()

            await sendVerificationEmail({ email, token: user.verificationToken })

            return res.status(400).json({ success: false, message: "Email not verified. Verification token sent to email." })
        }

        // ? Check if user is verified
        if (!user.isVerified) {
            user.isVerified = false
            user.verificationToken = generateVerificationToken()
            user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000 // 24 საათი
            await user.save()

            await sendVerificationEmail({ email, token: user.verificationToken })

            return res.status(400).json({ success: false, message: "Email not verified. Verification token sent to email." })
        }

        // ? Check if user is already logged in from another device
        if (user.clientId) {
            return res.status(400).json({ success: false, message: "User already logged in from another device" })
        }

        // ? Update last login and set clientId
        user.lastLogin = now
        const clientId = generateVerificationToken() // ან სხვა მეთოდი clientId-ს გენერაციისთვის
        user.clientId = clientId
        await user.save()

        // ? Set cookies and respond with success
        res.cookie('clientId', clientId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი
        generateTokenAndSetCookie(res, user._id)
        res.cookie('goa_auth_is_verified', user.isVerified, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: "An error occurred" })
    }
}]

// * Logout controller
export const logout = async (req, res) => {
    const token = req.cookies.token
    const { email } = req.body

    // ? Check if token is provided
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    // ? Check if email is provided
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" })
    }
    try {
        // ? Verify token and find user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findOne({ email, _id: decoded.userId })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
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
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        console.error("Logout error:", error)
        res.status(400).json({ success: false, message: "An error occurred" })
    }
}

// * Verify email controller
export const verifyEmail = [signupLimiter, async (req, res) => {
    const { token } = req.params
    try {
        // ? Find user by verification token
        const user = await UserModel.findOne({ verificationToken: token })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" })
        }

        // ? Check if token is expired
        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: "Token expired" })
        }

        // ? Verify user and clear verification token
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        // ? Set cookies and respond with success
        const verificationTime = new Date().toISOString()
        res.cookie('clientId', generateVerificationToken(), { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი
        generateTokenAndSetCookie(res, user._id)
        res.cookie('goa_auth_is_verified', true, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი
        res.cookie('verificationTime', verificationTime, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი

        res.status(200).json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: "An error occurred" })
    }
}]

// * Check authentication controller
export const checkAuth = async (req, res) => {
    const { user } = req
    const clientId = req.cookies?.clientId

    // ? Check if user is authenticated
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    // ? Check if user is verified
    if (!user.isVerified) {
        return res.status(403).json({ success: false, message: "Email not verified" })
    }

    // ? Check if session is valid
    if (!clientId || user.clientId !== clientId) {
        return res.status(401).json({ success: false, message: "Invalid session" })
    }

    res.status(200).json({ success: true, user })
}