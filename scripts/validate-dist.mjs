import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const publicDir = resolve(import.meta.dirname, "..", "dist", "public");
const requiredPages = [
  ["index.html", "Cenvara Fiscal & Estratégia"],
  ["consultoria-tributaria/index.html", "Consultoria Tributária em São Paulo, SP"],
  ["consultoria-fiscal/index.html", "Consultoria Fiscal em São Paulo, SP"],
];

for (const [relativePath, expectedText] of requiredPages) {
  const pagePath = resolve(publicDir, relativePath);
  if (!existsSync(pagePath)) throw new Error(`Arquivo de produção ausente: ${relativePath}`);
  const html = readFileSync(pagePath, "utf8");
  if (!html.includes(expectedText)) throw new Error(`Conteúdo esperado não encontrado em ${relativePath}: ${expectedText}`);
}

if (!existsSync(resolve(publicDir, "robots.txt")) || !existsSync(resolve(publicDir, "sitemap.xml"))) {
  throw new Error("robots.txt e sitemap.xml devem estar presentes na publicação.");
}

console.log("Validação do build Firebase concluída: rotas, SEO e arquivos públicos obrigatórios presentes.");
