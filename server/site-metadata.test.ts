import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const publicHead = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const tributaryPage = readFileSync(resolve(projectRoot, "client/consultoria-tributaria/index.html"), "utf8");
const fiscalPage = readFileSync(resolve(projectRoot, "client/consultoria-fiscal/index.html"), "utf8");

describe("metadados institucionais da Cenvara", () => {
  it("declara São Paulo, SP no SEO e nos dados estruturados", () => {
    expect(publicHead).toContain("consultoria tributária São Paulo");
    expect(publicHead).toContain('"addressLocality":"São Paulo"');
    expect(publicHead).toContain('"addressRegion":"SP"');
    expect(publicHead).toContain("Cenvara Fiscal & Estratégia em São Paulo, SP");
    expect(tributaryPage).toContain("Consultoria Tributária em São Paulo, SP");
    expect(fiscalPage).toContain("Consultoria Fiscal em São Paulo, SP");
    expect(tributaryPage).toContain('"@type":"Service"');
    expect(tributaryPage).toContain('"serviceType":"Consultoria tributária"');
    expect(fiscalPage).toContain('"@type":"Service"');
    expect(fiscalPage).toContain('"serviceType":"Consultoria fiscal"');
  });

  it("mantém Rusevel Barros como CEO & CTO na apresentação institucional", () => {
    expect(publicHead).toContain('"name":"Rusevel Barros"');
    expect(publicHead).toContain('"jobTitle":"CEO & CTO"');
    expect(homePage).toContain("Rusevel Barros");
    expect(homePage).toContain('role="CEO & CTO"');
    expect(publicHead).toContain("Consultor de tecnologia e analista de negócios");
    expect(homePage).toContain("automação de fluxos");
    expect(publicHead).toContain('"name":"Jessica Carvalho"');
    expect(publicHead).toContain('"jobTitle":"Sócia e Cofundadora | GFS — Gestora Fiscal Sênior"');
    expect(homePage).toContain("Jessica Carvalho");
    expect(homePage).toContain("GFS — Gestora Fiscal Sênior");
  });
});
