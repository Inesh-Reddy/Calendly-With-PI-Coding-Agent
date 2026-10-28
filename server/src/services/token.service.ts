import { sign, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

type TokenPayload = {
  sub: string;
  email: string;
};

export class TokenService {
  createAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    };

    return sign(payload, env.jwtSecret, options);
  }
}

export const tokenService = new TokenService();
