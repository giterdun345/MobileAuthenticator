export interface IUserData {
  sub: string; // whom the token refers to
  env: "dev";
  exp: number; // expiration time
  userId: string;
  deviceId: string;
  nonce: string;
  iat: number; // issued at
  email: string;
}

export type envTypes = "dev" | "uat" | "prod";
