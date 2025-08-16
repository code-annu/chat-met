import { UserModel } from "../model/user-model";
import { User } from "../model/user-model";

export class UserService {
  async getUserProfile(userId: string): Promise<User> {
    try {
      const result = await UserModel.findById(userId);
      const user = result?.toObject();
      return user!;
    } catch (error) {
      throw error;
    }
  }
}
