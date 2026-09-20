import { Resend } from "resend";
import config from "../config/config.js";

console.log("===== EMAIL SERVICE LOADED (Resend) =====");
console.log("RESEND API KEY SET:", !!config.RESEND_API_KEY);

const resend = new Resend(config.RESEND_API_KEY);

export async function sendEmail(to, subject, text, html) {
  console.log("BEFORE SEND MAIL");

  try {
    const { data, error } = await resend.emails.send({
      from: `Your Name <${config.GOOGLE_USER}>`, // swap to your verified domain later
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("SEND EMAIL ERROR:", error);
      throw error;
    }

    console.log("AFTER SEND MAIL");
    console.log("Message sent:", data.id);

    return data;
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error;
  }
}