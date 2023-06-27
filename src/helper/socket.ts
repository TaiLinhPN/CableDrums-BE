import { Socket } from "socket.io";
import UserSocket from "../models/UserSocketIo";

export const mapUserWithSocket = async (userId: string, socket: Socket) => {
  try {
    socket.join(userId);
    const filter = { userId };
    const update = { $addToSet: { userSocketId: socket.id } };
    const options = { upsert: true, new: true };
    //   const userSocket: IUserSocket | null =
    await UserSocket.findOneAndUpdate(filter, update, options);

    // console.log("UserSocket updated/created successfully.");
  } catch (error) {
    console.error("Error updating/creating UserSocket:", error);
  }
};

export const removeSocketId = async (socket: Socket) => {
  try {
    const filter = { userSocketId: socket.id };
    const update = { $pull: { userSocketId: socket.id } };

    const result1 = await UserSocket.find(filter);
    const useId = result1[0].userId;
    socket.leave(useId.toString());

    // const result: any =
    await UserSocket.updateMany(filter, update);

    // if (result.modifiedCount > 0) {
    //   console.log("SocketId removed successfully.");
    // } else {
    //   console.log("SocketId not found.");
    // }
  } catch (error) {
    console.error("Error removing SocketId:", error);
  }
};
