import { extractDate } from "../helper/formattedDate";
import { handleServerError, sendResponse } from "../helper/response";
import { AuthenticatedRequest } from "../middleware/auth";
import Contract from "../models/Contract";
import User from "../models/User";
import { mailRegister } from "../utils/mailUtils";

export const createContract = async (req: AuthenticatedRequest, res) => {
  try {
    const { supplyVendor, cableDrumCount, cableDelivered, expireAt } = req.body;
    if (req.user.userType !== "admin") {
      return sendResponse(
        res,
        400,
        "You do not have permission to create a contract"
      );
    }
    const IsSupplyVendor = await User.findById(supplyVendor).select("userType");

    if (!IsSupplyVendor && IsSupplyVendor?.userType !== "supplyVendor") {
      return sendResponse(res, 400, "Supply Vendor not found");
    }

    const newContract = new Contract({
      supplyVendor,
      cableDrumCount,
      cableDelivered,
      expireAt,
    });
    const contract = newContract.save();
    if (!contract) {
      return sendResponse(res, 400, "Internal Server Error");
    }

    global._io.emit("new-Contract", newContract);
    // mailRegister("Your account has been created", email);
    sendResponse(res, 200, "Contract successfully created");
  } catch (err) {
    return handleServerError(res, err);
  }
};

// export const getAllContracts = async (req, res) => {
//   try {
//     const contracts = await Contract.find();
//     const modifiedData = contracts.map(
//       ({
//         _id,
//         supplyVendor,
//         cableDrumCount,
//         cableDelivered,
//         expireAt,
//         createAt,
//       }) => ({
//         _id,
//         supplyVendor,
//         cableDrumCount,
//         cableDelivered,
//         expireAt: extractDate(expireAt),
//         createAt: extractDate(createAt),
//       })
//     );

//     // Send modifiedData to the client
//     console.log(modifiedData);
//     sendResponse(res, 201, "", modifiedData);
//   } catch (err) {
//     return handleServerError(res, err);
//   }
// };

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
        expireAt,
        createAt,
      }) => ({
        _id,
        supplyVendor: supplyVendor,
        cableDrumCount,
        cableDelivered,
        expireAt: extractDate(expireAt),
        createAt: extractDate(createAt),
      })
    );

    sendResponse(res, 201, "Get data successful", modifiedData);
  } catch (err) {
    return handleServerError(res, err);
  }
};