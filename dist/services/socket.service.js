"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../sockets/message");
class SocketService {
    connection(socket) {
        (0, message_1.handleMess)(socket, global._io);
        console.log(socket.id, " :connect");
        socket.on("disconnect", () => {
            console.log(socket.id, " :disconnected");
        });
        socket.on("user-connect", (userId) => {
            console.log("User ID:", userId);
        });
    }
}
exports.default = SocketService;
//# sourceMappingURL=socket.service.js.map