import type { RequestHandler } from "express";
import type { ApiResponse } from "../types/api";
import { authService } from "../services/auth.service";
import type { SigninInput, SignupInput } from "../schemas/auth.schema";

type AuthResponseData = Awaited<ReturnType<typeof authService.signup>>;

export class AuthController {
  signup: RequestHandler<unknown, ApiResponse<AuthResponseData>, SignupInput> = async (req, res, next) => {
    try {
      const data = await authService.signup(req.body);

      return res.status(201).json({
        success: true,
        message: "Signup successful",
        data,
      });
    } catch (error) {
      return next(error);
    }
  };

  signin: RequestHandler<unknown, ApiResponse<AuthResponseData>, SigninInput> = async (req, res, next) => {
    try {
      const data = await authService.signin(req.body);

      return res.status(200).json({
        success: true,
        message: "Signin successful",
        data,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export const authController = new AuthController();
