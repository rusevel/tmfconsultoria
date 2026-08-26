import { describe, expect, it } from "vitest";
import { newsletterHtml } from "./newsletter-mailer";

describe("módulo editorial da newsletter", () => {
  it("gera um HTML leve em português com link individual do artigo", () => {
    const html = newsletterHtml({ title: "Decisão fiscal", excerpt: "Resumo aplicado para a empresa.", contentHtml: "<p>Conteúdo <strong>essencial</strong>.</p>", slug: "decisao-fiscal" });
    expect(html).toContain('lang="pt-BR"');
    expect(html).toContain("Caderno Cenvara");
    expect(html).toContain("/blog/decisao-fiscal");
    expect(html).not.toContain("<script");
  });

  it("não mantém atributos de evento ou javascript no HTML enviado", () => {
    const html = newsletterHtml({ title: "Título", excerpt: "Resumo suficiente para a publicação.", contentHtml: '<p onclick="alert(1)"><a href="javascript:alert(1)">Ler</a></p>', slug: "titulo" });
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("javascript:");
  });

  it("define os contratos de publicação e inscrição no servidor", async () => {
    const source = await import("node:fs/promises").then((fs) => fs.readFile(new URL("./newsletter.ts", import.meta.url), "utf8"));
    expect(source).toContain("publishPost");
    expect(source).toContain("listSubscribers");
    expect(source).toContain("consent: z.literal(true)");
    expect(source).toContain('status === "sent"');
  });
});
