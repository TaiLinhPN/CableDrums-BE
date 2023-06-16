import { sendMail } from "../config/mailConfig";
import User from "../models/User";

export const sendMailNewOrder = async (
  userId: string,
  cableRequired: number,
  orderId?: string
) => {
  const email = await findEmail(userId);
  if (email) {
    const content = `The request to withdraw the cable has been made, and the required amount of cable drums is ${cableRequired}. Please prepare the necessary number of cable drums. You can find more details at the following link: Link.`;
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
    const content = `The request to update the cable has been made, and the status has been updated to be ${status}.`;
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
