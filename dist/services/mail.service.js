"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        if (!process.env.SMTP_HOST ||
            !process.env.SMTP_PORT ||
            !process.env.SMTP_USER ||
            !process.env.SMTP_PASSWORD) {
            throw new Error("Some environment variables are not defined");
        }
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    sendActivationMail(email, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
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
            }
            catch (error) {
                return "Activation mail could not be sent";
            }
        });
    }
}
exports.default = new MailService();
