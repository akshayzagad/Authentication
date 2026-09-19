import nodemailer from "nodemailer";
import config from "../config/config.js";

console.log("===== EMAIL SERVICE LOADED =====");
console.log("EMAIL USER:", config.GOOGLE_USER);
console.log("CLIENT ID:", !!config.GOOGLE_CLIENT_ID);
console.log("CLIENT SECRET:", !!config.GOOGLE_CLIENT_SECRET);
console.log("REFRESH TOKEN:", !!config.REFRESH_TOKEN);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN,
    // accessToken: config.ACCESS_TOKEN,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify()
  .then(() => {
    console.log("EMAIL SERVER IS READY");
  })
  .catch((error) => {
    console.error("EMAIL CONFIG ERROR:", error);
  });

export async function sendEmail(to, subject, text, html) {
  console.log("BEFORE SEND MAIL");

  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("AFTER SEND MAIL");
    console.log("Message sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error;
  }
}
