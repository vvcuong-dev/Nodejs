export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
};
