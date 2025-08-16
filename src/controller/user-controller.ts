import { User } from "../model/user-model";
import { UserService } from "../service/user-service";
import { Request, Response } from "express";

export class UserController {
  private userService = new UserService();
  async home(req: Request, res: Response) {
    let userProfile: User | null;
    try {
      userProfile = await this.userService.getUserProfile(req.session.userId!);
    } catch (error) {
      userProfile = null;
    }
    res.render("pages/common/home", { user: userProfile });
  }

  async userProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserProfile(req.session.userId!);
      res.render("pages/user/profile", { user: user });
    } catch (error) {
      res.redirect("/login");
    }
  }
}
