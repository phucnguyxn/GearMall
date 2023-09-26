const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')


const sendMail = asyncHandler(async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"GEARMALL" <no-reply@Gearmall.com', //Sender address
        to: email, //Receiver
        subject: "Fotgot password", //Subject line
        html: html, // html body
    });
    return info
})

module.exports = sendMail