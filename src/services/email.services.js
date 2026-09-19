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
});

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL CONFIG ERROR:", error);
  } else {
    console.log("EMAIL SERVER IS READY:", success);
  }
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
