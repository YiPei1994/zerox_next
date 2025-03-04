const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import crypto from "crypto";
import { format, parseISO } from "date-fns";

export const hashAndSalt = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (
  candidatePass: string,
  userPass: string
) => {
  return await bcrypt.compare(candidatePass, userPass);
};

export function createToken(id: string | undefined) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

type MailOptions = {
  toEmail: string;
  subject: string;
  message: string;
};

export const sendEmail = async (options: MailOptions) => {
  // 1) Create a transporter
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
  /*   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  }); */

  // 2) Define the email options
  const mailOptions = {
    from: "Yi Pei Zhu <studentypz@gmail.com>",
    to: options.toEmail,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transport.sendMail(mailOptions);
};

export const bsonParser = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
