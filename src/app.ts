import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { authRouter } from "./router/auth-router";
import { connectDB } from "./config/db";
import { sessionMiddleware } from "./config/session";
import { userRouter } from "./router/user-router";
import { chatRouter } from "./router/chat-router";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware());

app.get("/test", async (req, res) => {
  res.send("No test are written.");
});

app.use(authRouter);
app.use(userRouter);
app.use(chatRouter);

const PORT = 3000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening at: http://localhost:${PORT}`);
  });
});
