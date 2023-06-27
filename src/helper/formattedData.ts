import { extractDate, extractDateTime } from "./formattedDate";

export const formatContractData = (data) => {
  const modifiedData = data.map(
    ({
      _id,
      contractName,
      supplyVendor,
      cableDrumCount,
      cableDelivered,
      cableRequired,
      expireAt,
      createAt,
    }) => ({
      _id,
      contractName,
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
    orderName: order.orderName,
    contract: order.contractId,
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

export const formatDataNotification = (notifications) => {
  const result = notifications.map((notification) => ({
    _id: notification._id,
    sender: notification.senderId,
    userId: notification.userId,
    content: notification.content,
    link: notification.link,
    isRead: notification.isRead,
    isDeleted: notification.isDeleted,
    createdAt: extractDate(notification.createAt),
  }));

  return result;
};
