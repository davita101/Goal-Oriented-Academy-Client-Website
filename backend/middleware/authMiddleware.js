import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.models.js'

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
}