"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSocketId = exports.mapUserWithSocket = void 0;
const UserSocketIo_1 = __importDefault(require("../models/UserSocketIo"));
const mapUserWithSocket = async (userId, socket) => {
    try {
        socket.join(userId);
        const filter = { userId };
        const update = { $addToSet: { userSocketId: socket.id } };
        const options = { upsert: true, new: true };
        //   const userSocket: IUserSocket | null =
        await UserSocketIo_1.default.findOneAndUpdate(filter, update, options);
        // console.log("UserSocket updated/created successfully.");
    }
    catch (error) {
        console.error("Error updating/creating UserSocket:", error);
    }
};
exports.mapUserWithSocket = mapUserWithSocket;
const removeSocketId = async (socket) => {
    try {
        const filter = { userSocketId: socket.id };
        const update = { $pull: { userSocketId: socket.id } };
        const result1 = await UserSocketIo_1.default.find(filter);
        const useId = result1[0].userId;
        socket.leave(useId.toString());
        // const result: any =
        await UserSocketIo_1.default.updateMany(filter, update);
        // if (result.modifiedCount > 0) {
        //   console.log("SocketId removed successfully.");
        // } else {
        //   console.log("SocketId not found.");
        // }
    }
    catch (error) {
        console.error("Error removing SocketId:", error);
    }
};
exports.removeSocketId = removeSocketId;
//# sourceMappingURL=socket.js.map