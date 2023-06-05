import { AuthenticatedRequest } from "../middleware/auth";
import { Response } from "express";
import { handleServerError, sendResponse } from "../helper/response";
import Contract, { IContract } from "../models/Contract";
import Order, { IOrder, Note } from "../models/Oder";
import { sendMailNewOrder, sendMailUpdateOrder } from "../helper/sendMail";
import { extractDate, extractDateTime } from "../helper/formattedDate";

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { contract, projectContractorId, cableDrumsToWithdraw, note } =
    req.body;
  try {
    const newNote: Note = {
      username: `${req.user.username} was created a new order`,
      time: new Date(),
      message: note,
    };

    const newOrder = await new Order({
      plannerId: req.user.userId,
      contractId: contract._id,
      supplyVendorId: contract.supplyVendor,
      projectContractorId,
      cableDrumsToWithdraw,
      notes: newNote,
    }).save();

    if (!newOrder) {
      return sendResponse(res, 500, "Internal server error");
    }

    // code update contract
    const updatedContract = await Contract.findByIdAndUpdate(
      contract._id,
      { cableRequired: cableDrumsToWithdraw },
      { new: true }
    );

    if (!updatedContract) {
      return sendResponse(res, 400, "Can't update contract, try again");
    }

    global._io.emit("update-contract", updatedContract);
    global._io.emit("new-order", newOrder);

    sendResponse(res, 201, "Create new order successful", newOrder);

    sendMailNewOrder(
      newOrder.supplyVendorId.toString(),
      newOrder.cableDrumsToWithdraw
    );
    sendMailNewOrder(
      newOrder.projectContractorId.toString(),
      newOrder.cableDrumsToWithdraw
    );
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateOrder = async (req: AuthenticatedRequest, res: Response) => {
  const orderId = req.params.orderId;
  const { status, note } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return sendResponse(res, 404, "Order not found");
    }

    order.status = status;
    const newNote: Note = {
      username:`${req.user.username} was updated status to ${status}`,
      time: new Date(),
      message: note,
    };
    order.notes.push(newNote);
    const updatedOrder = await order.save();

    if (status === "completed") {
      await updateContractOnOrderCompletion(order);
    }

    global._io.emit("order-updated", updatedOrder);
    sendResponse(res, 200, "Order updated successfully", updatedOrder);

    sendMailUpdateOrder(order.supplyVendorId.toString(), order.status);
    sendMailUpdateOrder(order.projectContractorId.toString(), order.status);
    sendMailUpdateOrder(order.plannerId.toString(), order.status);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  let conditions = {};

  if (user.userType === "projectContractor") {
    conditions = { projectContractorId: user.userId };
  }

  try {
    const orders = await Order.find(conditions)
      .populate("supplyVendorId", "username")
      .populate("plannerId", "username")
      .populate("projectContractorId", "username")
      .select("-__v");

    const result = orders.map((order) => ({
        supplyVendor: order.supplyVendorId,
        planner: order.plannerId,
        projectContractor: order.projectContractorId,
        _id: order._id,
        contractId: order.contractId,
        cableDrumsToWithdraw: order.cableDrumsToWithdraw,
        status: order.status,
        notes: order.notes.map((note) => ({
          username: note.username,
          time: extractDateTime(note.time),
          message: note.message || undefined,
        }
        )),
        createdAt: extractDate(order.createAt),
    }));

    if (!orders) {
      return sendResponse(res, 500, "Internal Server Error");
    }

    sendResponse(res, 201, "Get order successful", result);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateContractOnOrderCompletion = async (order: IOrder) => {
  const contract = await Contract.findById(order.contractId);
  if (!contract) {
    throw new Error("Contract not found");
  }

  const updatedContract = await updateContractWithDeliveredCable(
    contract,
    order.cableDrumsToWithdraw as number
  );

  global._io.emit("update-contract", updatedContract);
};

const updateContractWithDeliveredCable = async (
  contract: IContract,
  cableDrumsToWithdraw: number
): Promise<IContract> => {
  const updatedContract = await Contract.findByIdAndUpdate(
    contract._id,
    {
      cableRequired: 0,
      cableDelivered:
        (contract.cableDelivered as number) + cableDrumsToWithdraw,
    },
    { new: true }
  );

  if (!updatedContract) {
    throw new Error("Unable to update contract");
  }

  return updatedContract;
};