import { UserController } from "../controller/user-controller";
import { Router } from "express";

const _userController = new UserController();
export const userRouter = Router();

userRouter.get("/", _userController.home.bind(_userController));
// userRouter.get('/')