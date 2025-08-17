import { Response, Request } from "express";
import { AuthService } from "../service/auth-service";
import SessionData from "../types/express-session";

export class AuthController {
  private authService = new AuthService();
  registerForm(req: Request, res: Response) {
    res.render("pages/auth/register-form", { user: null });
  }

  loginForm(req: Request, res: Response) {
    res.render("pages/auth/login-form", { user: null });
  }

  async registerUser(req: Request, res: Response) {
    const userData = req.body;
    try {
      const createdUser = await this.authService.registerNewUser(userData);
      req.session.userId = createdUser._id.toString();
      res.redirect("/");
    } catch (error) {
      res.send((error as Error).message);
    }
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const loggedUser = await this.authService.loginUser(username, password);
      req.session.userId = loggedUser._id.toString();
      res.redirect("/");
    } catch (error) {
      res.send((error as Error).message);
    }
  }

  async logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) res.send("Unable to detory session! You can't logout.");
      res.redirect("/");
    });
  }
}
