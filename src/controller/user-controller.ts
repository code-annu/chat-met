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
    const username = req.params.username;
    try {
      const user = await this.userService.getUserProfile(req.session.userId!);
      if (user.username == username) {
        res.render("pages/user/profile", { user: user });
        return;
      }
      res.send("Page not found!");
    } catch (error) {
      res.redirect("/login");
    }
  }
}
