import { Response, Request } from "express";

export class AuthController {
  registerForm(req: Request, res: Response) {
    res.render("pages/auth/register-form");
  }

  loginForm(req: Request, res: Response) {
    res.render("pages/auth/login-form");
  }
}
