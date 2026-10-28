import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { signinSchema, signupSchema } from "../schemas/auth.schema";

export const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), authController.signup);
authRouter.post("/signin", validateRequest(signinSchema), authController.signin);
