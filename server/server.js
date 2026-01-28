import express from "express";
import helmet from "helmet";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Needed to get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

// Security and middleware
app.use(helmet());
app.use(cors({
  origin: "http://127.0.0.1:5501", // for local development
  methods: ["POST"]
}));
app.use(express.json({ limit: "50kb" }));

// Serve static files (CSS, JS, images, HTML)
app.use(express.static(path.join(__dirname, "../public")));

// Escape HTML for email safety
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional() // honeypot field
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid form data." });
    }

    const { name, email, phone, message, website } = parsed.data;

    if (website && website.trim() !== "") {
      console.log("Honeypot triggered, likely spam bot.");
      return res.json({ ok: true });
    }

    const now = new Date();
    const subject = `New enquiry: ${name}`;
    const plainText =
      `New website enquiry\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${now.toISOString()}\n\n` +
      `Message:\n${message}\n`;

    const html = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New website enquiry</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr><td style="border:1px solid #ddd;"><strong>Name</strong></td>
              <td style="border:1px solid #ddd;">${escapeHtml(name)}</td></tr>
          <tr><td style="border:1px solid #ddd;"><strong>Email</strong></td>
              <td style="border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
          <tr><td style="border:1px solid #ddd;"><strong>Phone</strong></td>
              <td style="border:1px solid #ddd;">${escapeHtml(phone)}</td></tr>
          <tr><td style="border:1px solid #ddd;"><strong>Date</strong></td>
              <td style="border:1px solid #ddd;">${escapeHtml(now.toISOString())}</td></tr>
        </table>
        <h3>Message</h3>
        <div style="border:1px solid #ddd; padding:10px; white-space:pre-wrap;">
          ${escapeHtml(message)}
        </div>
      </div>`;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject,
      text: plainText,
      html
    });

    console.log("Contact form emailed successfully.");
    res.json({ ok: true });

  } catch (err) {
    console.error("Error in /api/contact:", err);
    res.status(500).json({ ok: false, error: "Server error." });
  }
});

// Catch-all for static HTML routes (e.g. /services.html)
app.get("/:page", (req, res, next) => {
  const filePath = path.join(__dirname, "../public", req.params.page);
  res.sendFile(filePath, (err) => {
    if (err) next(); // let default 404 handler take over
  });
});

// Default root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
