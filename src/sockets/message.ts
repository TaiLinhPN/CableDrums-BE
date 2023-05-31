import { Server, Socket } from "socket.io";

export const handleMess = (socket: Socket, io: Server) => {
  socket.on("send-message", (mess) => {
    io.emit("chat-message", mess);
  });
};
