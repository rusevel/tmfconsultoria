import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const styles = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const header = readFileSync(resolve(root, "client/src/components/SiteHeader.tsx"), "utf8");
const form = readFileSync(resolve(root, "client/src/components/LeadQualificationForm.tsx"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("guardas de experiência Cenvara", () => {
  it("desativa transições de rota para preferência de movimento reduzido", () => {
    expect(app).toContain("useReducedMotion");
    expect(app).toContain("duration: reduceMotion ? 0 : 0.22");
    expect(styles).toContain("@media(prefers-reduced-motion:reduce)");
  });

  it("mantém controles de navegação alcançáveis por teclado e mobile", () => {
    expect(styles).toContain(":focus-visible");
    expect(header).toContain('type="button"');
    expect(header).toContain("aria-expanded");
    expect(header).toContain('aria-controls="mobile-nav"');
  });

  it("revela conteúdo também nas rotas secundárias e separa os botões fixos", () => {
    expect(app).toContain('document.querySelectorAll<HTMLElement>(".reveal")');
    expect(app).toContain('classList.add("show")');
    expect(styles).toContain(".back-to-top{position:fixed;right:101px");
    expect(styles).toContain("@media (max-width:600px){.back-to-top{right:83px");
    expect(styles).not.toContain(".essence-section:before");
    expect(styles).not.toContain(".process-section{background:linear-gradient(180deg,rgba(255,255,255,.018),rgba(255,255,255,.035));border-block:1px solid var(--line)}");
  });

  it("explica o fluxo de captação e mantém a marca atual nos depoimentos", () => {
    expect(form).toContain("Captação rápida.");
    expect(form).toContain("Assunto principal");
    expect(form).toContain("nenhuma página separada é necessária");
    expect(form).toContain("Assunto principal: ${form.challenge}");
    expect(home).not.toContain("TMF");
  });
});
