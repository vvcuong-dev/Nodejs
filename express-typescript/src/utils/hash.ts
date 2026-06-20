import * as bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
};

export const verifyPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
