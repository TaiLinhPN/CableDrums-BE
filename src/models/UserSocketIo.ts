import mongoose, { Model, Schema,  Document, ObjectId } from "mongoose";

export interface IUserSocket extends Document {
  userId: ObjectId;
  userSocketId: string[];
}

const UserSocketScheme: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userSocketId: {
    type: String,
    required: true,
  },
});

const UserSocket: Model<IUserSocket> = mongoose.model<IUserSocket>(
  "userSockets",
  UserSocketScheme
);

export default UserSocket;
