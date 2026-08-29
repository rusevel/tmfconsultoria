import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const reactPage = readFileSync(resolve(import.meta.dirname, "../client/src/pages/InstagramHub.tsx"), "utf8");
const staticPage = readFileSync(resolve(import.meta.dirname, "../client/instagram/index.html"), "utf8");

describe("landing page do Instagram", () => {
  it("mantém a jornada de diagnóstico e os destinos principais", () => {
    for (const value of ["Agendar diagnóstico", "Falar pelo WhatsApp", "Ler o Caderno Cenvara", "Conhecer a Cenvara", "Ver a apresentação"]) {
      expect(reactPage).toContain(value);
      expect(staticPage).toContain(value);
    }
    expect(reactPage).toContain("DIAGNÓSTICO");
    expect(staticPage).toContain("DIAGNÓSTICO");
  });

  it("mantém o perfil oficial e a imagem institucional de compartilhamento", () => {
    expect(reactPage).toContain("https://www.instagram.com/cenvaraconsult/");
    expect(staticPage).toContain("https://www.instagram.com/cenvaraconsult/");
    expect(staticPage).toContain("cenvara-og-institucional.jpg");
  });
});
