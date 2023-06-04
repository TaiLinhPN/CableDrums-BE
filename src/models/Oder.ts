import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IOrder extends Document {
  contractId: ObjectId;
  plannerId: ObjectId;
  supplyVendorId: ObjectId;
  projectContractorId: ObjectId;
  cableDrumsToWithdraw: number;
  status:
    | "newRequest"
    | "inPreparation"
    | "readyForPickup"
    | "delivered"
    | "inTransit"
    | "completed";
  notes: Note[];
  createAt?: Date;
}
export type Note = { username: string, time: Date, message: string }

const OrderSchema = new Schema<IOrder>({
  contractId: {
    type: Schema.Types.ObjectId,
    ref: "contracts",
    required: true,
  },
  cableDrumsToWithdraw: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "newRequest",
      "inPreparation",
      "readyForPickup",
      "delivered",
      "inTransit",
      "completed",
    ],
    default: "newRequest",
  },
  supplyVendorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  plannerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  projectContractorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  notes: {
    type: [],
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order: Model<IOrder> = mongoose.model<IOrder>("orders", OrderSchema);

export default Order;
