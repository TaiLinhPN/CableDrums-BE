import { Response } from "express";
import { extractDate } from "../helper/formattedDate";
import { handleServerError, sendResponse } from "../helper/response";
import { AuthenticatedRequest } from "../middleware/auth";
import Contract from "../models/Contract";
import User from "../models/User";
import { formatContractData } from "../helper/formattedData";

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
    const contractsData = await Contract.findById(newContract._id).populate(
      "supplyVendor",
      "username"
    );
const modifiedData = formatContractData([contractsData]);
    global._io.emit("new-contract", modifiedData[0]);
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
    const modifiedData = formatContractData(contracts);

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
