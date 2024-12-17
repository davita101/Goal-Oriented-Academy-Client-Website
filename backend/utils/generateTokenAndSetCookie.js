import jtw from "jsonwebtoken"

//* ვაგენერირებს ტოკენს და ვანეყენებ კუქიში
export const generateTokenAndSetCookie = (res, userId) => {
    // jwt.sign ფუნქცია გენერირებს ტოკენს 
    const token = jtw.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d" // ერთი დღე
    })
    // ვანეყენებ კუქიშში
    res.cookie("token", token, {
        httpOnly: true, // რომ ფრონტიდან არ შეიძლოს წვდომა
        secure: process.env.NODE_ENV === "production", // რომ მხოლოდ https კანექშენზიებისთვის შეიყვანოს
        sameSite: "none", // რომ მხოლოდ სამესამე საიტზე გადასვლისას გამოიყენოს
        maxAge: 1000 * 60 * 60 * 1, // 1 დღე
    })

    return token
}