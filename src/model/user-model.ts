import { Types, Schema, model } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  fullname: string;
  password: string;
  roomIds?: [string] | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Username cannot exceed 100 characters"],
    },
    fullname: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [100, "Name cannot exceed 100 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    roomIds: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true, collection: "users" }
);

// Find by username
UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username: username });
};

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

export const UserModel = model<User>("User", UserSchema);
