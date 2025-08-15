import { model, Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  fullname: string;
  password: string;
}
