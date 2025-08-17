import { User } from "../model/user-model";
import { UserModel } from "../model/user-model";
import bcrypt from "bcrypt";

export class AuthService {
  private saltRounds = 10;
  async registerNewUser(
    newUser: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(newUser.password, this.saltRounds);
    newUser.password = hashedPassword;
    try {
      const createdUser = await UserModel.create(newUser);
      const savedUser = await createdUser.save();
      return savedUser.toObject();
    } catch (error) {
      throw error;
    }
  }

  async loginUser(username: string, password: string): Promise<User> {
    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        throw Error("Username not found!");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw Error("Invalid password!");
      return user;
    } catch (error) {
      throw error;
    }
  }
}
