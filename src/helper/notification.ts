import Notification from "../models/Notification";
import { formatDataNotification } from "./formattedData";

export const createNotification = async (senderId,userId, content, link?) => {
  try {
    return await new Notification({
      senderId,
      userId,
      content,
      link,
    }).save();
     
  } catch (error) {
      console.log(error);
      return null;
  }
};

export const sendNotification = async (senderId, userId, content, link?) => {
  const notification = await createNotification(senderId, userId, content, link);
  if (notification) {
    let data = await Notification.findById(notification._id).populate(
      "senderId",
      "username"
    );
    data = formatDataNotification([data]);
    global._io.to(userId).emit("notification", { data: data[0] });
   
  }
};
