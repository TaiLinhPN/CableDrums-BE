"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMess = void 0;
const handleMess = (socket, io) => {
    socket.on("send-message", (mess) => {
        io.emit("chat-message", mess);
    });
};
exports.handleMess = handleMess;
//# sourceMappingURL=message.js.map