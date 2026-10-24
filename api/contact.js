import nodemailer from "nodemailer";
const emailAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mailUser = process.env.MAIL_USER || "varunsaiv0713@gmail.com";
const recipient = process.env.CONTACT_TO || "varunsaiv0713@gmail.com";
const mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: mailUser,
    pass: process.env.MAIL_APP_PASSWORD
  },
  connectionTimeout: 1e4,
  greetingTimeout: 1e4,
  socketTimeout: 1e4
});
function isContactBody(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}
async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { success: false, error: "Method not allowed." });
    return;
  }
  if (!isContactBody(req.body)) {
    sendJson(res, 400, { success: false, error: "A valid contact form submission is required." });
    return;
  }
  const { name, email, message } = req.body;
  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  if (trimmedName.length < 2 || trimmedName.length > 100 || /[\r\n]/.test(trimmedName)) {
    sendJson(res, 400, { success: false, error: "Name must be between 2 and 100 characters." });
    return;
  }
  if (trimmedEmail.length > 254 || !emailAddressPattern.test(trimmedEmail)) {
    sendJson(res, 400, { success: false, error: "Enter a valid email address." });
    return;
  }
  if (trimmedMessage.length < 10 || trimmedMessage.length > 2e3) {
    sendJson(res, 400, { success: false, error: "Message must be between 10 and 2000 characters." });
    return;
  }
  if (!process.env.MAIL_APP_PASSWORD) {
    console.error("Contact form cannot send mail: MAIL_APP_PASSWORD is not configured.");
    sendJson(res, 503, { success: false, error: "The email service is not configured yet." });
    return;
  }
  try {
    const info = await mailTransport.sendMail({
      from: mailUser,
      to: recipient,
      replyTo: trimmedEmail,
      subject: `New Portfolio Message from ${trimmedName}`,
      text: [
        "You received a new inquiry from your portfolio website:",
        "",
        `Sender Name: ${trimmedName}`,
        `Sender Email: ${trimmedEmail}`,
        "",
        "Message:",
        trimmedMessage
      ].join("\n")
    });
    console.info("Contact email accepted by SMTP server:", info.messageId);
    sendJson(res, 200, {
      success: true,
      message: "Your message was accepted by the email server."
    });
  } catch (error) {
    const authenticationFailed = error instanceof Error && ("code" in error && error.code === "EAUTH" || "responseCode" in error && error.responseCode === 535);
    console.error("Contact email delivery failed:", error);
    sendJson(res, authenticationFailed ? 503 : 502, {
      success: false,
      error: authenticationFailed ? "Email authentication failed. Check the Gmail App Password configured in Vercel." : "The email service could not deliver your message. Please try again later."
    });
  }
}
export {
  handler as default
};
