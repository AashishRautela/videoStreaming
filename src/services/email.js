const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'  // Use app password if using Gmail
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        text: body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };
