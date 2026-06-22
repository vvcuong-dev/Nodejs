import ejs from "ejs";
import path from "path";
import { mailService } from "../services/mail.service";

export const sendMailOrder = {
  send(to: string, subject: string, data: { name: string; orderId?: string }) {
    ejs.renderFile(
      `${path.join(__dirname, "../views/mail/order.mail.ejs")}`,
      { name: data.name, orderId: data.orderId },
      async (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const info = await mailService.sendMail(to, subject, data);
          return info;
        }
      },
    );
  },
};
