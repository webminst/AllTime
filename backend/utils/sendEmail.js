const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `AllTime <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
    });
}

module.exports = sendEmail;
