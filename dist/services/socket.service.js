"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../sockets/message");
const socket_1 = require("../helper/socket");
class SocketService {
    connection(socket) {
        (0, message_1.handleMess)(socket, global._io);
        socket.on("user-connect", (userId) => {
            console.log("map", socket.id, userId);
            (0, socket_1.mapUserWithSocket)(userId, socket);
        });
        socket.on("disconnect", () => {
            console.log(socket.id, " :disconnected");
            (0, socket_1.removeSocketId)(socket);
        });
        // socket.on("join", (room) => {
        //   socket.join(room);
        // });
        // socket.on("leave", (room) => {
        //   socket.leave(room); // Leave the specified room
        // });
    }
}
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map