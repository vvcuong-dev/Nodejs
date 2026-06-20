declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      name: string;
      email: string;
      password: string | null;
    };
  }
}

declare module "express" {
  export interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      password: string | null;
    };
  }
}
