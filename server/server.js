// server/server.js
import express from "express";
import helmet from "helmet";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";  // for validation

dotenv.config();

const app = express();

// security headers & JSON parsing
app.use(helmet());
app.use(express.json({ limit: "50kb" }));

// serve static files from ../public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

// zod schema for contact form (authoritative validation)
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional()  // optional honeypot
});

// escape user input for HTML emails
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function oneLine(str) {
  return String(str ?? "").trim().replace(/\s+/g, " ");
}

// configure nodemailer transport from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// endpoint to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid form data." });
    }
    const { name, email, phone, message, website } = parsed.data;
    // honeypot: if filled, quietly succeed to block bots
    if (website && website.trim() !== "") {
      return res.json({ ok: true });
    }

    const now = new Date();
    const subject = `New enquiry: ${oneLine(name)}`;
    const plainText =
      `New website enquiry\n\n` +
      `Name: ${oneLine(name)}\n` +
      `Email: ${oneLine(email)}\n` +
      `Phone: ${oneLine(phone)}\n` +
      `Date: ${now.toISOString()}\n\n` +
      `Message:\n${message}\n`;

    // simple HTML table for nicer formatting
    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New website enquiry</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="border: 1px solid #ddd;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="border: 1px solid #ddd;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Phone</strong></td>
            <td style="border: 1px solid #ddd;">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Date</strong></td>
            <td style="border: 1px solid #ddd;">${escapeHtml(now.toISOString())}</td>
          </tr>
        </table>
        <h3>Message</h3>
        <div style="border: 1px solid #ddd; padding: 10px; white-space: pre-wrap;">
          ${escapeHtml(message)}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,  // this is "bogojemartin@gmail.com"
      replyTo: email,
      subject,
      text: plainText,
      html
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error." });
  }
});

// fallback: serve index.html for unknown routes (useful for SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
