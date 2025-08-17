import { model, Schema, Types } from "mongoose";

export interface Room {
  _id: Types.ObjectId;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string | null;
  members: [string];
  name: string;
  imageUrl: string;
}

const RoomSchema = new Schema<Room>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Room id cannot exceed 50 characters"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Room name cannot exceed 100 characters"],
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    members: {
      type: [String],
      required: true,
    },
    lastMessage: { type: String, required: false, trim: true },
  },
  { timestamps: true, collection: "rooms" }
);

export const RoomModel = model<Room>("Room", RoomSchema);
