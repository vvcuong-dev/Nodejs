import { Request, Response } from "express";
import { CreateOrder } from "../mail/create-order.mail";
import { MailData } from "../types/mail.type";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    return res.render("home");
  },
  testMail: async (req: Request, res: Response) => {
    const data = {
      name: "John Doe Zin",
      orderId: "OD-12345",
    };

    const info = new CreateOrder<MailData>({
      info: {
        to: "mibiv91148@aratrin.com",
        subject: "Order Confirmation",
      },
      options: {
        name: data.name,
        orderId: data.orderId,
      },
    });

    await info.send();

    res.json({
      message: "Email sent successfully",
    });
  },
};
