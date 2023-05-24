import nodemailer from "nodemailer";

const mailConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

export async function sendMail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: mailConfig.auth.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
}

export default sendMail;