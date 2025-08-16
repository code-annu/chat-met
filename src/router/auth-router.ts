import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const authRouter = Router();
const authController = new AuthController();

authRouter.get(
  "/register-form",
  authController.registerForm.bind(authController)
);

authRouter.get("/login-form", authController.loginForm.bind(authController));

authRouter.post("/register", authController.registerUser.bind(authController));
authRouter.post("/login", authController.loginUser.bind(authController));
