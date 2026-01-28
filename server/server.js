import express from "express";
import helmet from "helmet";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const app = express();

// Middleware setup
app.use(helmet());
import cors from "cors";

// Allow CORS in development
app.use(cors({
  origin: "http://127.0.0.1:5501", // allow Live Server frontend
  methods: ["POST"],              // allow only POST method
}));

function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.use(express.json({ limit: "50kb" }));  // parse JSON bodies

// Serve static files from ../public (for the frontend)
app.use(express.static(path.join(__dirname, "../public")));


// Define Zod schema for contact form fields (server-side validation)
const ContactSchema = z.object({
  name:    z.string().trim().min(2).max(100),
  email:   z.string().trim().email().max(200),
  phone:   z.string().trim().min(6).max(30),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional()  // honeypot field (optional)
});

// Configure Nodemailer transporter using SMTP settings from .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});



// POST endpoint to handle contact form submission
app.post("/api/contact", async (req, res) => {
  try {
    // Validate incoming JSON against the schema
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid form data." });
    }
    const { name, email, phone, message, website } = parsed.data;

    // Honeypot check: if 'website' field is filled, assume it's a bot and do nothing
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered, likely spam bot – skipping email.");
      return res.json({ ok: true });  // respond with success but skip sending
    }

    // Compose email content (subject, text, HTML)
    const now = new Date();
    const subject   = `New enquiry: ${name}`;  // or use a sanitized oneLine(name)
    const plainText = 
      `New website enquiry\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${now.toISOString()}\n\n` +
      `Message:\n${message}\n`;
    // Create an HTML table for nicer formatting of the message
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
    // Send the email using the transporter
    await transporter.sendMail({
      from: process.env.MAIL_FROM,         // e.g. "Your Site <no-reply@yoursite.com>"
      to:   process.env.MAIL_TO,           // recipient (e.g. bogojemartin@gmail.com)
      replyTo: email,                     // so the client can reply directly
      subject: subject,
      text: plainText,
      html: html
    });

    console.log("Contact form submission emailed successfully.");
    return res.json({ ok: true });  // success response
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return res.status(500).json({ ok: false, error: "Server error." });
  }
});

// Serve all .html files from public directory
app.get("/:page", (req, res, next) => {
  const filePath = path.join(__dirname, "../public", req.params.page);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(); // Let Express handle 404 if file doesn't exist
    }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

