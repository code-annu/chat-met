import { Room, RoomModel } from "../model/room-model";
import { Message } from "../model/message-model";

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

  async getRoom(roomId: string): Promise<Room> {
    try {
      const result = await RoomModel.findOne({ id: roomId });
      const room = result?.toObject();
      return room!;
    } catch (error) {
      throw error;
    }
  }

  async updateRoom(roomId: string, roomData: Partial<Room>): Promise<Room> {
    try {
      const result = await RoomModel.updateOne(
        { id: roomId },
        { $set: roomData }
      );
      return await this.getRoom(roomId);
    } catch (err) {
      throw err;
    }
  }

  async addMemberToRoom(roomId: string, memberId: string): Promise<Room> {
    try {
      const room = await this.getRoom(roomId);
      const roomMembers = room.members;
      room.members.push(memberId);
      return await this.updateRoom(roomId, room);
    } catch (err) {
      throw err;
    }
  }

  async sendMessageToRoom(roomId: string, message: Message) {
    try {
      const result = await RoomModel.updateOne(
        { id: roomId },
        { $push: { messages: message } }
      );
    } catch (err) {
      throw err;
    }
  }
}
