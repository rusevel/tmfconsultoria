import { describe, expect, it } from "vitest";
import nodemailer from "nodemailer";

describe("provedor de newsletter", () => {
  it("valida uma credencial configurada sem enviar mensagem", async () => {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    const gmailUser = process.env.GMAIL_SMTP_USER?.trim();
    const gmailPassword = process.env.GMAIL_SMTP_APP_PASSWORD?.trim();

    if (resendKey) {
      const response = await fetch("https://api.resend.com/domains", {
        headers: { Authorization: `Bearer ${resendKey}` },
      });
      expect(response.status, "A chave do Resend foi rejeitada pela API").not.toBe(401);
      expect(response.status, "A chave do Resend não tem permissão suficiente").not.toBe(403);
      return;
    }

    if (gmailUser && gmailPassword) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPassword },
        connectionTimeout: 8_000,
        greetingTimeout: 8_000,
        socketTimeout: 8_000,
      });
      await expect(transporter.verify()).resolves.toBe(true);
      return;
    }

    throw new Error("Configure RESEND_API_KEY ou GMAIL_SMTP_APP_PASSWORD para validar o provedor.");
  }, 20_000);
});
