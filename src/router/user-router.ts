import { UserController } from "../controller/user-controller";
import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";

const _userController = new UserController();
export const userRouter = Router();

userRouter.get("/", _userController.home.bind(_userController));
userRouter.get(
  "/:username",
  requireAuth,
  _userController.userProfile.bind(_userController)
);
