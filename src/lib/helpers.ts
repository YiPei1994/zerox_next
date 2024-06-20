const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
