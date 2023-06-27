import { Socket } from "socket.io";
import { handleMess } from "../sockets/message";
import { mapUserWithSocket, removeSocketId } from "../helper/socket";

class SocketService {
  connection(socket: Socket) {
    handleMess(socket, global._io);
    socket.on("user-connect", (userId) => {
      console.log("map", socket.id, userId);
      mapUserWithSocket(userId, socket);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, " :disconnected");
      removeSocketId(socket);
    });
    // socket.on("join", (room) => {
    //   socket.join(room);
    // });

    // socket.on("leave", (room) => {
    //   socket.leave(room); // Leave the specified room
    // });
  }
}

export default SocketService;
