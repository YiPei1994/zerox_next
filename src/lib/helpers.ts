const bcrypt = require("bcrypt");

export const hashAndSalt = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (
  candidatePass: string,
  userPass: string
) => {
  return await bcrypt.compare(candidatePass, userPass);
};
