import jwt from 'jsonwebtoken';

const TIME_PER_LOGIN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const EXPIRE_IN = '7d'; // 7 days

//* Generates a token and sets it in a cookie
export const generateTokenAndSetCookie = (res, userId) => {
    // jwt.sign function generates the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: EXPIRE_IN // 7 days
    });
    res.cookie('token', token, {
        httpOnly: true, // Prevents access from the frontend
        maxAge: TIME_PER_LOGIN // 7 days
    });

    return token;
};