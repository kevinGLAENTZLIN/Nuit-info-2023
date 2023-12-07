import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    sendEmail(toMail, url, userName) {
        const emailContent = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    .container {
                        background-color: #f4f4f4;
                        padding: 20px;
                        padding-bottom: 10px;
                    }
                    .header {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .message {
                        font-size: 16px;
                        margin-top: 20px;
                    }
                    .activate-link {
                        color: #007BFF;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Account Activation</div>
                    <div class="message">
                        <p>Dear ${userName},</p>
                        <p>Thank you for registering on our website! To activate your account, please click on the following link:</p>
                        <p><a class="activate-link" href="${url}">Activate Your Account</a></p>
                        <p>If the link above does not work, you can copy and paste the following URL into your browser:</p>
                        <p>${url}</p>
                        <p>If you did not register on our website, you can ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>
            `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toMail,
            subject: `Account Activation | Complete Registration`,
            html: emailContent,
        };


        this.transporter.sendMail(mailOptions, (err, rsp) => {
            if (err) {
                throw new Error('Error when sending email: ' + err);
            }
        });
    }
}

export default EmailSender;
