import { Room, RoomModel } from "../model/room-model";

export class ChatService {
  async createNewRoom(
    roomData: Omit<Room, "_id" | "createdAt" | "updatedAt">
  ): Promise<Room> {
    try {
      const roomCreated = await RoomModel.create(roomData);
      const roomSaved = await roomCreated.save();
      return roomSaved.toObject();
    } catch (err) {
      throw err;
    }
  }
}
