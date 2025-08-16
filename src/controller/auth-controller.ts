import { Response, Request } from "express";
import { AuthService } from "../service/auth-service";
import SessionData from "../types/express-session";

export class AuthController {
  private authService = new AuthService();
  registerForm(req: Request, res: Response) {
    res.render("pages/auth/register-form");
  }

  loginForm(req: Request, res: Response) {
    res.render("pages/auth/login-form");
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
}
