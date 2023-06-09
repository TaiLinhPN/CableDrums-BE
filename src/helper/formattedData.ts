import { extractDate, extractDateTime } from "./formattedDate";

export const formatContractData = (data) => {
  const modifiedData = data.map(
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
    return modifiedData;
};

export const formatDataOrder = (orders) => {
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
    })),
    createdAt: extractDate(order.createAt),
  }));

  return result;
};