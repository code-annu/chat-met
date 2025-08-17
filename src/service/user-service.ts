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

  async updateUserProfile(
    userId: string,
    userData: Partial<User>
  ): Promise<User> {
    try {
      const result = await UserModel.updateOne(
        { _id: userId },
        { $set: userData }
      );
      const user = await UserModel.findById(userId);
      return user!.toObject();
    } catch (err) {
      throw err;
    }
  }

  async addNewRoomId(userId: string, roomId: string): Promise<User> {
    try {
      const user = await this.getUserProfile(userId);
      let userRoomIds = user.roomIds;
      if (userRoomIds) {
        userRoomIds.push(roomId);
      } else {
        userRoomIds = [roomId];
      }
      user.roomIds = userRoomIds;
      return await this.updateUserProfile(userId, user);
    } catch (err) {
      throw err;
    }
  }
}
