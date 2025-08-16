import { Response, Request } from "express";
import { AuthService } from "../service/auth-service";

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
      res.redirect("/");
    } catch (error) {
      res.send((error as Error).message);
    }
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const loggedUser = await this.authService.loginUser(username, password);
      res.redirect("/");
    } catch (error) {
      res.send((error as Error).message);
    }
  }
}
