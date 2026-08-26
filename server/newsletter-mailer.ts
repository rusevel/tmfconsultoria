import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

export type NewsletterMessage = {
  to: string;
  subject: string;
  html: string;
};

export type NewsletterSendResult = {
  provider: "resend" | "gmail";
  messageId: string;
};

function cleanHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript\s*:/gi, "");
}

function resolveProvider() {
  if (ENV.emailProvider === "resend" || (ENV.emailProvider === "auto" && ENV.resendApiKey && ENV.resendFrom)) return "resend" as const;
  if (ENV.emailProvider === "gmail" || (ENV.emailProvider === "auto" && ENV.gmailSmtpUser && ENV.gmailSmtpAppPassword)) return "gmail" as const;
  throw new Error("Nenhum provedor de envio está configurado. Configure Resend ou Gmail SMTP.");
}

export async function sendNewsletterEmail(message: NewsletterMessage): Promise<NewsletterSendResult> {
  const provider = resolveProvider();
  const html = cleanHtml(message.html);

  if (provider === "resend") {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${ENV.resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: ENV.resendFrom, to: [message.to], subject: message.subject, html }),
    });
    const payload = await response.json().catch(() => ({})) as { id?: string; message?: string };
    if (!response.ok || !payload.id) throw new Error(payload.message || `Resend retornou HTTP ${response.status}`);
    return { provider, messageId: payload.id };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: ENV.gmailSmtpUser, pass: ENV.gmailSmtpAppPassword },
  });
  const info = await transporter.sendMail({
    from: `Cenvara Fiscal & Estratégia <${ENV.gmailSmtpUser}>`,
    to: message.to,
    subject: message.subject,
    html,
    text: "Acesse o site da Cenvara para ler esta novidade.",
  });
  return { provider, messageId: info.messageId };
}

export function newsletterHtml(post: { title: string; excerpt: string; contentHtml: string; slug: string }) {
  const safeTitle = post.title.replace(/[<>&"']/g, "");
  const safeExcerpt = post.excerpt.replace(/[<>&"']/g, "");
  const safeContent = cleanHtml(post.contentHtml);
  return `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#08100c;color:#eef7f0;font-family:Arial,sans-serif"><div style="max-width:620px;margin:0 auto;padding:36px 24px"><p style="color:#55e394;letter-spacing:.12em;text-transform:uppercase;font-size:12px">Caderno Cenvara</p><h1 style="font-size:30px;line-height:1.08">${safeTitle}</h1><p style="color:#b8c8bd;font-size:16px;line-height:1.6">${safeExcerpt}</p><div style="color:#d7e4da;font-size:15px;line-height:1.7">${safeContent}</div><p style="margin-top:30px"><a href="https://cenvara-consultoria.web.app/blog/${encodeURIComponent(post.slug)}" style="color:#08100c;background:#45df8b;padding:12px 16px;text-decoration:none;border-radius:4px">Ler no site</a></p><p style="color:#8ea095;font-size:12px">Você recebeu esta mensagem porque se inscreveu para receber novidades da Cenvara.</p></div></body></html>`;
}
