import { model, Schema, Types } from "mongoose";

export interface Message {
  sentAt: Date;
  senderId: string;
  text: string;
}
