import nodemailer from "nodemailer";
import { mailConfig } from "../../configs/mail.config";

export const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: mailConfig.auth,
});
