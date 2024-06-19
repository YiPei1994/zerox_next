const bcrypt = require("bcrypt");

export const hashAndSalt = async (password: string) => {
  return await bcrypt.hash(password, 12);
};
