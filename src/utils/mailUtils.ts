import { sendMail } from "../config/mailConfig"

export const mailRegister = (connect: string, email: string) => {
  const message = connect;
  sendMail(email, `EnergySure-tech`, message);
};

