import { sendMail } from "../config/mailConfig";
import User from "../models/User";

export const sendMailNewOrder = async (
  userId: string,
  cableRequired: number,
  orderId?: string
) => {
  const email = await findEmail(userId);
  if (email) {
    const content = `The request to unplug the cable has been made, and the required amount of cable drums ${cableRequired}. Please prepare the required number of cable drums. See details at: Link`;
    sendMail(email, `EnergySure-tech`, content);
  }
};

export const sendMailUpdateOrder = async (
  userId: string,
  status: string,
  orderId?: string
) => {
  const email = await findEmail(userId);
  if (email) {
    const content = `The request to update the cable has been made, and the stats have been updated to ${status}`;
    sendMail(email, `EnergySure-tech`, content);
  }
};

const findEmail = async (userId: string) => {
  try {
    const user = await User.findById(userId).select("email");
    return user.email;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const mailRegister = (connect: string, email: string) => {
  const message = connect;
  sendMail(email, `EnergySure-tech`, message);
};
