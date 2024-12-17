import nodemailer from "nodemailer"

export const sendVerificationEmail = async ({ email, token }) => {
        // http://localhost:5000/api/auth/verify-email/459906 //! token example

        // const html = `
        // <h1>Please verify your GOA account</h1>
        // <p>Click the link below to verify your account:</p>
        // <a href="http://localhost:${process.env.PORT}/api/auth/verify-email/${token}">Click Verify</a>
        // `

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: process.env.ADMIN_USER,
        //         pass: process.env.SMTP_PASS
        //     }
        // })

        // const info = await transporter.sendMail({
        //     from: `"GOA Support" <${process.env.ADMIN_USER}>`,
        //     to: email,
        //     subject: "GOA Account Verification",
        //     html: html,
        // })

        // console.log("Message sent: %s", info.messageId)
}