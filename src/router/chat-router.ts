import { ChatController } from "../controller/chat-controller";
import { Router } from "express";
import { requireAuth } from "../middleware/auth-middleware";

export const chatRouter = Router();
const _chatController = new ChatController();

chatRouter.get(
  "/chat/:username",
  _chatController.chatHome.bind(_chatController)
);

chatRouter.post(
  "/rooms/create",
  requireAuth,
  _chatController.createChatRoom.bind(_chatController)
);

chatRouter.post(
  "/rooms/join",
  requireAuth,
  _chatController.joinChatRoom.bind(_chatController)
);
