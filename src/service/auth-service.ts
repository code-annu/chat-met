import { User } from "../model/user-model";
import { UserModel } from "../model/user-model";

export class AuthService {
  async registerNewUser(
    newUser: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> {
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
      const match = password === user.password;
      if (!match) throw Error("Invalid password!");
      return user;
    } catch (error) {
      throw error;
    }
  }
}
