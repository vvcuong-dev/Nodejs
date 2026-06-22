import { Request, Response } from "express";
import { mailService } from "../services/mail.service";

export const HomeController = {
  index: async (req: Request, res: Response) => {
    return res.render("home");
  },
  testMail: async (req: Request, res: Response) => {
    const info = await mailService.sendMail(
      "berapo6360@afterdo.com",
      "Test Subject",
      "<p>This is a test email.</p>",
    );
    return res.send(info);
  },
};
