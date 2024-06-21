const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

export const hashAndSalt = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (
  candidatePass: string,
  userPass: string
) => {
  return await bcrypt.compare(candidatePass, userPass);
};

export function createToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function resetPasswordToken() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return crypto.createHash("sha256").update(resetToken).digest("hex");
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
      user: "b6d17a06f998b3",
      pass: "dc3d34fae22ddd",
    },
  });

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
