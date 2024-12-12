import nodeMailer from "nodemailer"


export const sendMagicLinkEmail = async ({ email, token }) => {
    const html = `
    <h1>Please verify GOA account</h1>
    <a href="http://localhost:3000/verify?token=${token}">verify</a>
`
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.ADMIN_USER,
            pass: process.env.SMTP_PASS
        }
    })
    const info = await transporter.sendMail({
        from: "bro from <grdzelishvilidaviti@gmail.com>",
        to: email,
        subject: "GOA",
        html: html,
    })
    console.log("message send: !", info.messageId)
}