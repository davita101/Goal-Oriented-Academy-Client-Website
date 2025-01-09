import nodemailer from 'nodemailer'

export const sendVerificationEmail = async ({ email, token }) => {
  // http://localhost:5000/api/auth/verify-email/459906 //! token example
  const html = `
<div style="padding: 20px; text-align: center; background-color: #ffffff; margin: 0; padding: 0;">
    <div style="padding: 20px;">
        <div style="width: 200px; height: 170px; margin: 0 auto; overflow: hidden;">
            <img width="100%" height="100%" style="border-radius: 100%;"
                src="https://scontent.ftbs6-2.fna.fbcdn.net/v/t39.30808-6/408864179_342479481868687_2724919989645877908_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=1s6Lca61Qt8Q7kNvgHlUiEz&_nc_oc=Adj9t_5iNZL-C8sE67RMh8kIeRRunYAx36OkEvdrykQ3elGbzUKUnkCjiKVxyT7_klg&_nc_zt=23&_nc_ht=scontent.ftbs6-2.fna&_nc_gid=AFtEVKmn7eH9248khZ4IHDN&oh=00_AYBcBENkdRK_XZ2UXHrptvVfR2CbMxDs4ZqEIB4qFgxb4w&oe=677C80D3"
                alt="Goal Oriented Academy">
        </div>
        <h1 style="font-size: 2em; color: #000000;">Please verify your GOA account!</h1>
        <p style="font-size: 1em; color: #6c6c6c; margin-bottom: 30px;">To keep things secure and make sure your account
            is protected, please verify your account using the button below</p>
        <a href="${process.env.NODE_ENV =="production" ? process.env.WEB_URL : `http://localhost:${process.env.port}`}/auth/verify-email/${token}"
            style="display: inline-block; padding: 15px 30px; background-color: #1b8620; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 1.2em; border-radius: 5px;">Click
            to Verify</a>
    </div>
</div>
        `
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const info = await transporter.sendMail({
    from: `"GOA Support" <${process.env.ADMIN_USER}>`,
    to: email,
    subject: 'GOA Account Verification',
    html: html
  })

  console.log('Message sent: %s')
}
