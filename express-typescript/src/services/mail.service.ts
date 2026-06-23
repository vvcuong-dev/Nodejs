import path from "path/win32";
import ejs from "ejs";
import { mailConfig } from "../configs/mail.config";
import { transporter } from "../mail/mail.transporter";

export const mailService = {
  sendMail: async (to: string, subject: string, message: string) => {
    const info = await transporter.sendMail({
      from: `"${mailConfig.fromName}" <${mailConfig.from}>`,
      to: to,
      subject: subject,
      html: message,
    });

    return info;
  },
  async sendWithTemplate(
    to: string,
    subject: string,
    template: string,
    options: { [key: string]: string },
  ) {
    const viewRoot = path.join(__dirname, "..", "views");
    const templatePath = path.join(viewRoot, template + ".ejs");
    try {
      let data = await ejs.renderFile(templatePath, options);

      const matches = data.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._/+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_/+.~#?&//=]*)/gi,
      );

      if (matches && matches.length > 0) {
        matches.forEach((urlFromData) => {
          if (urlFromData) {
            const url = `http://localhost:3000/tracking?url=${urlFromData}&mailId=1`;
            data = data.replace(
              urlFromData,
              `<a href="${url}" target="_blank">${urlFromData}</a>`,
            );
          }
        });
      }

      return await this.sendMail(to, subject, data as string);
    } catch {
      return false;
    }
  },
};

// join như vậy để đảm bảo đường dẫn đúng trên cả Windows và Linux, các ví dụ trước đó dùng path.join(__dirname, "../views") sẽ không chạy được trên Windows
// hiểu đơn giản path.join(__dirname, "..", "views") sẽ tạo ra đường dẫn tuyệt đối đến thư mục views từ vị trí hiện tại của file mail.service.ts
// ví dụ: nếu __dirname là "D:\Nodejs\express-typescript\src\services" thì viewRoot sẽ là "D:\Nodejs\express-typescript\src\views"
