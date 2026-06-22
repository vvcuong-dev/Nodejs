import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_SECURE = process.env.SMTP_SECURE;
const SMTP_FROM = process.env.SMTP_FROM;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE === "ssl", // true for 465, false for other ports
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export const mailService = {
  sendMail: async (to: string, subject: string, message: string) => {
    const info = await transporter.sendMail({
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM}>`,
      to: to,
      subject: subject,
      html: message,
    });

    return info;
  },
};
