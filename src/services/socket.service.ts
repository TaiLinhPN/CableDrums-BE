import { Socket } from "socket.io";
import { handleMess } from "../sockets/message";

class SocketService {
  connection(socket: Socket) {
    handleMess(socket, global._io);

    console.log(socket.id, " :connect");
    socket.on("disconnect", () => {
      console.log(socket.id, " :disconnected");
    });

    socket.on("user-connect", (userId) => {
      console.log("User ID:", userId);
    });
  }
}

export default SocketService;
