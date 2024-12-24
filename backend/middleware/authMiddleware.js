import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.models.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    const clientIdMain = req.cookies?.clientId;

    const updateUserVerificationStatus = async () => {
        if (clientIdMain) {
            await UserModel.updateOne({ clientId: clientIdMain }, { $set: { isVerified: false, clientId: undefined } });
        }
       
    };

    if (!token) {
        await updateUserVerificationStatus();
        return res.status(401).json({ success: false, message: "Unauthorized 1" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            await updateUserVerificationStatus();
            res.clearCookie('token');
            res.clearCookie('clientId');
            res.clearCookie('goa_auth_is_verified');
            return res.status(401).json({ success: false, message: "Unauthorized 2" });
        }

        req.user = user;
        next();
    } catch (error) {
        await updateUserVerificationStatus();
        res.clearCookie('token');
        res.clearCookie('clientId');
        res.clearCookie('goa_auth_is_verified');
        return res.status(401).json({ success: false, message: "Unauthorized 3" });
    }
};