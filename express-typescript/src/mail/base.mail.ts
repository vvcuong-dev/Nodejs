import { mailService } from "../services/mail.service";
import path from "path/win32";
import { MailData } from "../types/mail.type";

export abstract class Mail<T extends MailData> {
  private templatePath = "";
  private mailData;

  constructor(data: T) {
    const templatePath = path.join("mail", this.view());
    this.templatePath = templatePath;
    this.mailData = data;
  }

  send() {
    return mailService.sendWithTemplate(
      this.mailData.info.to,
      this.mailData.info.subject,
      this.templatePath,
      this.mailData.options,
    );
  }

  abstract view(): string;
}
