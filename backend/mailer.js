
import sendGridMailer from "@sendgrid/mail"
sendGridMailer.setApiKey(process.env.SEND_GRID_API_KEY)
export const sendMagicLinkEmail = ({ email, token }) => {
    console.log(email, token)
    return sendGridMailer.send({
        to: email,
        from: process.env.FROM_MAIL,
        subject:"Finish Login in",
        html: `<a href="http://localhost:3000/verify?token=${token}">log in</a>`,
    })
}