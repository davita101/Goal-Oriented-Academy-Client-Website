import { UserModel } from "../models/user.models.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js"
import { v4 as uuidv4 } from 'uuid'

const SIX_HOURS = 6 * 60 * 60 * 1000 // 6 საათი მილიწამებში

export const signup = async (req, res) => {
    const { email, name } = req.body

    try {
        if (!name || !email) {
            throw new Error("All fields are required")
        }

        const userAlreadyExist = await UserModel.findOne({ email })
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new UserModel({
            name,
            email,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 საათი
        })
        await user.save()
        await sendVerificationEmail({ email, token: verificationToken })

        generateTokenAndSetCookie(res, user._id)
        res.status(201).json({
            success: true,
            message: "User created successfully. Please check your email for verification.",
            user: {
                ...user._doc,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email } = req.body
    const clientId = req.cookies.clientId || uuidv4()

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const now = Date.now()
        if (user.lastLogin && (now - user.lastLogin.getTime() > SIX_HOURS)) {
            user.isVerified = false
            user.verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
            user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000 // 24 საათი
            await user.save()

            await sendVerificationEmail({ email, token: user.verificationToken })

            return res.status(400).json({ success: false, message: "Email not verified. Verification token sent to email." })
        }

        if (user.clientId && user.clientId !== clientId) {
            user.isVerified = false
            user.verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
            user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000 // 24 საათი
            await user.save()

            await sendVerificationEmail({ email, token: user.verificationToken })

            return res.status(400).json({ success: false, message: "Email not verified. Verification token sent to email." })
        }

        user.lastLogin = now
        user.clientId = clientId
        await user.save()

        res.cookie('clientId', clientId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი
        generateTokenAndSetCookie(res, user._id)
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params

    try {
        const user = await UserModel.findOne({ verificationToken: token })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid token" })
        }

        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: "Token expired" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        res.cookie('isVerified', true, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // 24 საათი

        res.status(200).json({ success: true, message: "Email verified successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.clearCookie('clientId')
    res.clearCookie('isVerified')
    res.status(200).json({ success: true, message: "Logged out successfully" })
}