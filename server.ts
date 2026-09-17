import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API route for handling contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, expertise, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const resendApiKey = process.env.RESEND_API_KEY;
      const contactEmailStr = process.env.CONTACT_EMAIL?.trim();
      const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

      if (!resendApiKey) {
        console.error("RESEND_API_KEY is not configured.");
        return res.status(500).json({ error: "Email service is not configured. Please configure RESEND_API_KEY." });
      }

      if (!contactEmailStr) {
        return res.status(500).json({ error: "CONTACT_EMAIL is not configured. Please configure CONTACT_EMAIL in your environment variables." });
      }

      const contactEmails = contactEmailStr.split(",").map((em) => em.trim()).filter(Boolean);

      const resend = new Resend(resendApiKey);

      // Email to the firm (admin)
      const adminEmail = await resend.emails.send({
        from: `Contact Form <${fromEmail}>`,
        to: contactEmails,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Expertise Area:</strong> ${expertise || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });

      if (adminEmail.error) {
        console.error("Resend API Error (Admin Email):", JSON.stringify(adminEmail.error));
        const errorMsg = adminEmail.error.message || adminEmail.error.name || "Unknown error";
        return res.status(400).json({ 
          error: `Failed to send to admin: ${errorMsg}. Please check that your RESEND_FROM_EMAIL and CONTACT_EMAIL are properly configured and verified in Resend.` 
        });
      }

      // Email to the user (submitter)
      try {
        const userEmail = await resend.emails.send({
          from: `Prolaw Law Firm <${fromEmail}>`,
          to: [email.trim()],
          subject: "We received your message",
          html: `
            <h3>Dear ${name},</h3>
            <p>Thank you for reaching out to Prolaw Law Firm. We have successfully received your message.</p>
            <p>This is a confirmation of the details you submitted:</p>
            <blockquote>
              <p><strong>Expertise Area:</strong> ${expertise || 'N/A'}</p>
              <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
            </blockquote>
            <p>Our team will review your inquiry and get back to you shortly.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>Prolaw Law Firm</strong></p>
          `,
        });

        if (userEmail.error) {
          console.error("Resend API Error (User Email):", userEmail.error);
          const errorMsg = userEmail.error.message || userEmail.error.name;
          if (errorMsg.includes('validation_error') && fromEmail === 'onboarding@resend.dev') {
            console.warn("Skipping user confirmation email due to Resend onboarding restrictions.");
            // We just warn and don't fail the whole request because admin email succeeded
          } else {
             return res.status(400).json({ error: `Failed to send to user: ${errorMsg}` });
          }
        }
      } catch (err) {
         console.error("Failed to send user confirmation email:", err);
      }

      res.status(200).json({ success: true, message: "Emails sent successfully" });
    } catch (error: any) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: `An unexpected error occurred: ${error.message}` });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Express 5 signature: '*' is usually valid, but can use '*all' if app.get('*all') required by v5
    // Actually the docs say Express 5 requires '/*' or `*all` ? Usually in Express 5 it's req.params[0] with `/(.*)` but let's use app.get("*",) and fix if it throws.
    // The framework guidelines actually specify: "In Express v4, use app.get('*', ..., but in Express v5, you must use app.get('*all', ...)"
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
