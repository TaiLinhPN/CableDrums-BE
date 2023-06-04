import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IContract extends Document {
  supplyVendor: ObjectId;
  cableDrumCount: Number;
  cableDelivered: Number;
  cableRequired: Number;
  expireAt: Date;
  createAt: Date;
}

const ContractSchema: Schema = new mongoose.Schema({
  supplyVendor: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cableDrumCount: {
    type: Number,
    required: true,
  },
  cableDelivered: {
    type: Number,
    default: 0,
  },
  cableRequired: {
    type: Number,
    default: 0,
  },
  expireAt: {
    type: Date,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Contract: Model<IContract> = mongoose.model<IContract>(
  "contracts",
  ContractSchema
);

export default Contract;
