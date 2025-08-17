import { UserService } from "../service/user-service";
import { ChatService } from "../service/chat-service";
import { Request, Response } from "express";
import { Room } from "../model/room-model";
import { Message } from "../model/message-model";

export class ChatController {
  private userService = new UserService();
  private chatService = new ChatService();

  async chatHome(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserProfile(req.session.userId!);
      res.render("pages/chat/home", { user: user });
    } catch (error) {
      res.send((error as Error).message);
    }
  }

  async createChatRoom(req: Request, res: Response) {
    const { roomId, roomName, imageUrl } = req.body;
    const messages: Message[] = [];
    const roomData: Omit<Room, "_id" | "createdAt" | "updatedAt"> = {
      id: roomId,
      name: roomName,
      imageUrl: imageUrl,
      members: [req.session.userId!],
      lastMessage: null,
      messages: messages,
    };
    try {
      const room = await this.chatService.createNewRoom(roomData);
      await this.userService.addNewRoomId(req.session.userId!, room.id);
      res.redirect("/");
    } catch (err) {
      res.send((err as Error).message);
    }
  }

  async joinChatRoom(req: Request, res: Response) {
    const { roomId } = req.body;
    try {
      const room = await this.chatService.addMemberToRoom(
        roomId,
        req.session.userId!
      );
      await this.userService.addNewRoomId(req.session.userId!, room.id);
      res.redirect("/");
    } catch (err) {
      res.send((err as Error).message);
    }
  }

  async chatRoom(req: Request, res: Response) {
    const roomId = req.params.id;
    const room = await this.chatService.getRoom(roomId);

    res.render("pages/chat/chat-room", {
      room: room,
      userId: req.session.userId!,
    });
  }

  async sendMessageToChatRoom(req: Request, res: Response) {
    const roomId = req.params.id;
    const messageText = req.body;
    try {
      const message: Message = {
        senderId: req.session.userId!,
        sentAt: new Date(),
        text: messageText,
      };
      await this.chatService.sendMessageToRoom(roomId, message);
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/chat/room/${roomId}`);
  }
}
