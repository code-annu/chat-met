import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.get(
  "/register-form",
  authController.registerForm.bind(authController)
);

authRouter.get("/login-form", authController.loginForm.bind(authController));
