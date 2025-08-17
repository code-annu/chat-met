import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { authRouter } from "./router/auth-router";
import { connectDB } from "./config/db";
import { sessionMiddleware } from "./config/session";
import { userRouter } from "./router/user-router";
import { chatRouter } from "./router/chat-router";
import { ChatService } from "./service/chat-service";

const app = express();
const server = createServer(app);
const io = new Server(server);
const chatService = new ChatService();

io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    socket.join(roomId);
    socket.data = { roomId };
  });

  socket.on("message", (message) => {
    const { roomId } = socket.data as { roomId: string };
    io.to(roomId).emit("message", message);
    chatService.sendMessageToRoom(roomId, message);
  });
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware());

app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);

app.get("/some/test", async (req, res) => {
  res.send("no test written");
});

const PORT = 3000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}`);
  });
});
