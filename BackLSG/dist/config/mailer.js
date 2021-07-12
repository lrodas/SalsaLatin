"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'infosalsalatinguatemala@gmail.com',
        pass: 'vmcrpjwpskozaeqd',
    },
});
exports.transporter.verify().then(() => {
    console.log("Listo para enviar correos");
});
