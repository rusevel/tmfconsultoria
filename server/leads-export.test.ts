import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(import.meta.dirname, "../client/src/pages/AdminLeads.tsx"), "utf8");

describe("exportação configurável de leads", () => {
  it("oferece seleção de todas as colunas sensíveis do lead", () => {
    for (const label of ["Data", "Nome", "Empresa", "E-mail", "Porte", "Assunto", "Origem"]) {
      expect(source).toContain(`label: "${label}"`);
    }
    expect(source).toContain("selectedColumns");
    expect(source).toContain("toggleColumn");
  });

  it("gera uma planilha XLSX apenas com os dados filtrados e selecionados", () => {
    expect(source).toContain('import * as XLSX from "xlsx"');
    expect(source).toContain("XLSX.utils.json_to_sheet(exportRows())");
    expect(source).toContain('type="button" className="admin-primary-button" onClick={exportXlsx}');
    expect(source).toContain("filtros e colunas selecionados");
  });
});
