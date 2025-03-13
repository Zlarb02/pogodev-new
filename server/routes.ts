import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { parseContactForm } from "./models/contact";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = parseContactForm(req.body);
      
      // In a production app, we would send an email here
      // For now, just log the contact request and return success
      console.log("Contact form submission:", contactData);
      
      // Configure email service (in production, would use real credentials)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.example.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "user@example.com",
          pass: process.env.SMTP_PASS || "password",
        },
      });
      
      // In a real app, the email would be sent here
      // Since we don't have actual credentials, just log the intention
      console.log("Would send email with:", {
        from: `"Contact Form" <${process.env.SMTP_USER || "noreply@pogodev.com"}>`,
        to: "etienne@pogodev.com",
        subject: `Message de ${contactData.name}`,
        text: `Nouveau message de ${contactData.name} (${contactData.email}):\n\n${contactData.message}`,
        html: `<p>Nouveau message de <strong>${contactData.name}</strong> (${contactData.email}):</p>
              <p>${contactData.message.replace(/\n/g, '<br>')}</p>`,
      });
      
      // If SMTP credentials are configured, try to send the email
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          await transporter.sendMail({
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: "etienne@pogodev.com",
            subject: `Message de ${contactData.name}`,
            text: `Nouveau message de ${contactData.name} (${contactData.email}):\n\n${contactData.message}`,
            html: `<p>Nouveau message de <strong>${contactData.name}</strong> (${contactData.email}):</p>
                  <p>${contactData.message.replace(/\n/g, '<br>')}</p>`,
          });
        } catch (error) {
          console.error("Email sending failed:", error);
          // Don't fail the request if email sending fails
        }
      }
      
      res.status(200).json({ success: true, message: "Message reçu. Merci pour votre contact !" });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Données invalides", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Une erreur s'est produite lors du traitement de votre message." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
