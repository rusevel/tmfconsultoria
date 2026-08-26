import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const styles = readFileSync(resolve(root, "client/src/index.css"), "utf8");
const header = readFileSync(resolve(root, "client/src/components/SiteHeader.tsx"), "utf8");

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
});
