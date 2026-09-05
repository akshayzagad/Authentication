import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
    accessToken: config.ACCESS_TOKEN,
  },
});

export async function sendEmail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: `"Your Name" <${config.GOOGLE_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}
