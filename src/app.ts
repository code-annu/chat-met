import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}`);
});
