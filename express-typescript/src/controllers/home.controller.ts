import { Request, Response } from "express";
import { sendMailOrder } from "../mail/send-mail-order";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    return res.render("home");
  },
  testMail: async (req: Request, res: Response) => {
    const data = {
      name: "dganm",
      orderId: "OD-12345",
    };

    await sendMailOrder.send(
      "mibiv91148@aratrin.com",
      "Order Confirmation",
      data,
    );
    return res.json({ message: "Email sent successfully!" });
  },
};
