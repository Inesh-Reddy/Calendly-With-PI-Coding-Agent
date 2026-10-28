import bcrypt from "bcryptjs";
import type { SigninInput, SignupInput } from "../schemas/auth.schema";
import { prisma } from "../config/prisma";
import { AppError } from "../errors/AppError";
import { tokenService } from "./token.service";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResult = {
  user: AuthUser;
  token: string;
};

const SALT_ROUNDS = 10;

export class AuthService {
  async signup(input: SignupInput): Promise<AuthResult> {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new AppError(409, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      user,
      token: tokenService.createAccessToken({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async signin(input: SigninInput): Promise<AuthResult> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: tokenService.createAccessToken({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}

export const authService = new AuthService();
