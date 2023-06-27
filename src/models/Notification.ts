import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface INotification extends Document {
  senderId: ObjectId;
  userId: ObjectId;
  content: string;
  link?: string;
  isRead: boolean;
  isDeleted: boolean;
  createAt: Date;
}

const NotificationSchema: Schema = new mongoose.Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification: Model<INotification> = mongoose.model<INotification>(
  "notifications",
  NotificationSchema
);

export default Notification;
