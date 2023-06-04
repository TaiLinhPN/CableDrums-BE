import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import connectDB from "./config/db";
import http from "http";
import { Server, Socket } from "socket.io";
import SocketService from "./services/socket.service";
import authRouter from "./router/auth";
import userRouter from "./router/user";
import contractRouter from "./router/contract";
import orderRouter from "./router/order";

const PORT = 4001;
mongoose.set("strictQuery", false);
connectDB();
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const socketService = new SocketService();

global._io = io;

global._io.on("connection", socketService.connection);

io.listen(Number(process.env.SOCKET_IO_PORT) || 1234);

app.get("/", (req, res) => {
  res.send("I love you all ❤️");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/contract", contractRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log("love u");
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
