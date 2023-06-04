import { Response } from "express";
import { extractDate } from "../helper/formattedDate";
import { handleServerError, sendResponse } from "../helper/response";
import { AuthenticatedRequest } from "../middleware/auth";
import Contract from "../models/Contract";
import User from "../models/User";

export const createContract = async (req: AuthenticatedRequest, res) => {
  try {
    const { supplyVendor, cableDrumCount, cableDelivered, expireAt } = req.body;

    const newContract = await new Contract({
      supplyVendor,
      cableDrumCount,
      cableDelivered,
      expireAt,
    }).save();

    if (!newContract) {
      return sendResponse(res, 400, "Internal Server Error");
    }

    global._io.emit("new-Contract", newContract);
    // mailRegister("Your account has been created", email);
    sendResponse(res, 200, "Contract successfully created");
  } catch (err) {
    return handleServerError(res, err);
  }
};

export const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().populate(
      "supplyVendor",
      "username"
    );
    const modifiedData = contracts.map(
      ({
        _id,
        supplyVendor,
        cableDrumCount,
        cableDelivered,
        cableRequired,
        expireAt,
        createAt,
      }) => ({
        _id,
        supplyVendor: supplyVendor,
        cableDrumCount,
        cableDelivered,
        cableRequired,
        expireAt: extractDate(expireAt),
        createAt: extractDate(createAt),
      })
    );

    sendResponse(res, 201, "Get data successful", modifiedData);
  } catch (err) {
    return handleServerError(res, err);
  }
};

export const updateContract = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { contractId, cableRequired } = req.body;
  try {
    const updateContract = await Contract.findByIdAndUpdate(contractId, {
      cableRequired,
    });

    if (!updateContract) {
      return sendResponse(res, 400, "Cant update contract, try again");
    }
    sendResponse(res, 201, "contract update successful");
  } catch (error) {
    handleServerError(res, error);
  }
};
