export interface MailData {
  info: {
    to: string;
    subject: string;
  };
  options: {
    name: string;
    orderId: string;
  };
}
