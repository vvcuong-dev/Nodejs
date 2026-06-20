export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type JWTPayload = {
  userId: number;
  email: string;
};
