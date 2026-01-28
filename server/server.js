import express from "express";
import helmet from "helmet";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

// Helmet with CSP for Google Maps
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://maps.googleapis.com"],
        frameSrc: ["'self'", "https://www.google.com"],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", "data:", "https://maps.gstatic.com", "https://maps.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);

// CORS for local dev (can be adjusted for production)
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["POST"],
  })
);

app.use(express.json({ limit: "50kb" }));
app.use(express.static(path.join(__dirname, "../public"))); // Serve frontend

function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Zod validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional(),
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// POST route to handle form
app.post("/api/contact", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid form data." });
    }

    const { name, email, phone, message, website } = parsed.data;
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered.");
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
      html,
    });

    console.log("Email sent.");
    res.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/contact:", err);
    res.status(500).json({ ok: false, error: "Server error." });
  }
});

// Handle all HTML files like /services.html
app.get("/:page", (req, res, next) => {
  const filePath = path.join(__dirname, "../public", req.params.page);
  res.sendFile(filePath, (err) => {
    if (err) next(); // Let default 404 take over
  });
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
