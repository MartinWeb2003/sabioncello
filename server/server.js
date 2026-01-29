import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { z } from "zod";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Brevo from "@getbrevo/brevo";

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

/**
 * SECURITY HEADERS / CSP
 * - Allows Google Maps embed
 * - Allows Google Fonts
 * - Allows Font Awesome via cdnjs (if you use it)
 */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://maps.googleapis.com"],
        frameSrc: ["'self'", "https://www.google.com"],
        objectSrc: ["'none'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://maps.gstatic.com",
          "https://maps.googleapis.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
        ],
        connectSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);

// CORS (fine for now; later restrict to your domain)
app.use(cors());

app.use(express.json({ limit: "50kb" }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Health check (for uptime monitor)
app.get("/healthz", (req, res) => res.status(200).send("ok"));

// Zod validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  message: z.string().trim().min(5).max(4000),
  website: z.string().optional(), // honeypot
});

// Quick env sanity check (helps you catch missing vars in Render logs)
function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

// POST route to handle form
app.post("/api/contact", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid form data." });
    }

    const { name, email, phone, message, website } = parsed.data;

    // Honeypot: if bots fill it, pretend success
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered.");
      return res.json({ ok: true });
    }

    const BREVO_API_KEY = requireEnv("BREVO_API_KEY");
    const MAIL_FROM = requireEnv("MAIL_FROM"); // MUST be a verified sender in Brevo
    const MAIL_TO = requireEnv("MAIL_TO");

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

    // Brevo transactional email send
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      BREVO_API_KEY
    );

    await apiInstance.sendTransacEmail({
      sender: { email: MAIL_FROM, name: "Sabioncello Website" },
      to: [{ email: MAIL_TO }],
      subject,
      textContent: plainText,
      htmlContent: html,
      replyTo: { email }, // reply goes to the visitor
    });

    console.log("Brevo email sent.");
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
