const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "contact@coddadevelopment.com", // generated ethereal user
        pass: process.env.PASSWORD_EMAIL, // generated ethereal password
    },
});

module.exports = transporter;