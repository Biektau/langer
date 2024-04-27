import nodemailer, { Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter;

  constructor() {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD
    ) {
      throw new Error("Some environment variables are not defined");
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  public async sendActivationMail(
    email: string,
    activationLink: string
  ): Promise<string> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Account activation on ${process.env.API_URL}`,
        text: `To activate your account, follow the link: ${process.env.API_URL}/api/auth/activateAccount/${activationLink}`,
        html: `
        <div>
          <h1>Account activation letter</h1>
          <a href="${process.env.API_URL}/api/auth/activateAccount/${activationLink}">Press here</a>
        </div>
        `,
      });
      return `Activation mail successfully sent to ${email}`;
    } catch (error) {
      return "Activation mail could not be sent";
    }
  }
}

export default new MailService();
