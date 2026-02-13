import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ADMINISTRATOR,
        pass: process.env.MAIL_ADMINISTRATOR_PASS,
    },
});

export default transporter;
