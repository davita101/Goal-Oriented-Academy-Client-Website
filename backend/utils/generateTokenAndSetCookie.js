import jwt from 'jsonwebtoken'

//* ვაგენერირებს ტოკენს და ვანეყენებ კუქიში
export const generateTokenAndSetCookie = (res, userId) => {
    // jwt.sign ფუნქცია გენერირებს ტოკენს 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '24h' // 24 საათი
    })
    // ვანეყენებ კუქიშში
    res.cookie('token', token, {
        httpOnly: true, // რომ ფრონტიდან არ შეიძლოს წვდომა
        maxAge: 24 * 60 * 60 * 1000, // 24 საათი
    })

    return token
}