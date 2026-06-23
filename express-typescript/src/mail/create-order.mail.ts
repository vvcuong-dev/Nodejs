import { MailData } from "../types/mail.type";
import { Mail } from "./base.mail";

export class CreateOrder<T extends MailData> extends Mail<T> {
  constructor(data: T) {
    super(data);
  }

  view() {
    return "order.mail";
  }
}
