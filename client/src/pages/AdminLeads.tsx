import * as XLSX from "xlsx";
import { Download, FileSpreadsheet, Filter, Mail, RefreshCw, Users } from "lucide-react";
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";

type LeadFilters = { from: string; to: string; companySize: string; challenge: string; source: string };
type ColumnKey = "createdAt" | "name" | "company" | "email" | "companySize" | "challenge" | "source";
const emptyFilters: LeadFilters = { from: "", to: "", companySize: "", challenge: "", source: "" };
const columns: Array<{ key: ColumnKey; label: string }> = [
  { key: "createdAt", label: "Data" },
  { key: "name", label: "Nome" },
  { key: "company", label: "Empresa" },
  { key: "email", label: "E-mail" },
  { key: "companySize", label: "Porte" },
  { key: "challenge", label: "Assunto" },
  { key: "source", label: "Origem" },
];

function csvValue(value: string | number | Date | null | undefined) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function leadValue(lead: Record<string, unknown>, key: ColumnKey) {
  if (key === "createdAt") return new Date(String(lead.createdAt)).toLocaleString("pt-BR");
  return String(lead[key] ?? "");
}

export default function AdminLeads() {
  const [filters, setFilters] = useState<LeadFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<LeadFilters>(emptyFilters);
  const [selectedColumns, setSelectedColumns] = useState<ColumnKey[]>(columns.map(({ key }) => key));
  const queryInput = useMemo(() => Object.fromEntries(Object.entries(appliedFilters).filter(([, value]) => value)), [appliedFilters]);
  const leads = trpc.newsletter.admin.listLeads.useQuery(queryInput);

  const updateFilter = (field: keyof LeadFilters, value: string) => setFilters((current) => ({ ...current, [field]: value }));
  const applyFilters = (event: React.FormEvent) => { event.preventDefault(); setAppliedFilters(filters); };
  const clearFilters = () => { setFilters(emptyFilters); setAppliedFilters(emptyFilters); };
  const toggleColumn = (key: ColumnKey) => setSelectedColumns((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const selectedDefinitions = columns.filter(({ key }) => selectedColumns.includes(key));
  const exportRows = () => (leads.data || []).map((lead) => selectedDefinitions.reduce<Record<string, string>>((row, column) => { row[column.label] = leadValue(lead as unknown as Record<string, unknown>, column.key); return row; }, {}));

  const exportXlsx = () => {
    if (!selectedDefinitions.length || !leads.data?.length) return;
    const sheet = XLSX.utils.json_to_sheet(exportRows());
    sheet["!cols"] = selectedDefinitions.map(({ label }) => ({ wch: Math.max(label.length + 2, 18) }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Leads Cenvara");
    XLSX.writeFile(workbook, `leads-cenvara-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const exportCsv = () => {
    if (!selectedDefinitions.length || !leads.data?.length) return;
    const rows = exportRows();
    const content = [selectedDefinitions.map(({ label }) => label), ...rows.map((row) => selectedDefinitions.map(({ label }) => row[label]))]
      .map((row) => row.map(csvValue).join(";"))
      .join("\n");
    const blob = new Blob(["\ufeff", content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `leads-cenvara-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <DashboardLayout><div className="admin-leads-page"><header className="admin-page-header"><div><span className="section-kicker">inteligência comercial</span><h1>Leads captados<br /><em>com contexto.</em></h1><p>Consulte as solicitações de diagnóstico registradas pela Cenvara. Use os filtros para priorizar o atendimento e exporte somente a visão necessária.</p></div><div className="admin-stat"><Users size={18} /><strong>{leads.data?.length ?? 0}</strong><span>resultado(s) atual</span></div></header><section className="admin-leads-filters"><div className="admin-panel-heading"><div><span className="section-kicker">filtros de atendimento</span><h2>Encontrar uma oportunidade</h2></div><Filter size={20} /></div><form className="admin-filter-form" onSubmit={applyFilters}><label>De<input type="date" value={filters.from} onChange={(event) => updateFilter("from", event.target.value)} /></label><label>Até<input type="date" value={filters.to} onChange={(event) => updateFilter("to", event.target.value)} /></label><label>Porte<select value={filters.companySize} onChange={(event) => updateFilter("companySize", event.target.value)}><option value="">Todos</option><option>Micro ou pequena</option><option>Média</option><option>Grande</option></select></label><label>Assunto<select value={filters.challenge} onChange={(event) => updateFilter("challenge", event.target.value)}><option value="">Todos</option><option>Tributário</option><option>Fiscal</option><option>Contábil</option><option>Marketing ou TI</option><option>Outro</option></select></label><label>Origem<input value={filters.source} onChange={(event) => updateFilter("source", event.target.value)} placeholder="diagnostico-home" /></label><div className="admin-filter-actions"><button type="submit" className="admin-primary-button"><Filter size={15} /> Aplicar filtros</button><button type="button" className="admin-quiet-button" onClick={clearFilters}>Limpar</button></div></form></section><section className="admin-export-panel"><div className="admin-panel-heading"><div><span className="section-kicker">arquivo sob medida</span><h2>Escolha as colunas</h2></div><FileSpreadsheet size={20} /></div><p className="admin-panel-note">A mesma seleção será usada no CSV e no XLSX. Evite exportar dados que não sejam necessários para o atendimento.</p><fieldset className="admin-column-picker"><legend>Colunas da exportação</legend>{columns.map(({ key, label }) => <label key={key}><input type="checkbox" checked={selectedColumns.includes(key)} onChange={() => toggleColumn(key)} /> <span>{label}</span></label>)}</fieldset></section><section className="admin-leads-table-panel"><div className="admin-panel-heading"><div><span className="section-kicker">dados protegidos</span><h2>Solicitações de diagnóstico</h2></div><div className="admin-table-actions"><button type="button" className="admin-quiet-button" onClick={() => leads.refetch()} disabled={leads.isFetching}><RefreshCw size={15} /> Atualizar</button><button type="button" className="admin-quiet-button" onClick={exportCsv} disabled={!leads.data?.length || !selectedColumns.length}><Download size={15} /> Exportar CSV</button><button type="button" className="admin-primary-button" onClick={exportXlsx} disabled={!leads.data?.length || !selectedColumns.length}><FileSpreadsheet size={15} /> Exportar XLSX</button></div></div><p className="admin-panel-note"><Mail size={15} /> Estes dados são privados, acessíveis somente a administradores autenticados. A exportação considera os filtros e colunas selecionados.</p>{leads.isLoading ? <p className="admin-empty-state">Carregando leads…</p> : leads.error ? <p className="admin-error-state">Não foi possível carregar os leads. Verifique sua sessão de gestor e tente novamente.</p> : leads.data?.length ? <div className="admin-leads-table-wrap"><table className="admin-leads-table"><thead><tr><th>Data</th><th>Contato</th><th>Empresa</th><th>Assunto</th><th>Porte</th><th>Origem</th></tr></thead><tbody>{leads.data.map((lead) => <tr key={lead.id}><td>{new Date(lead.createdAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td><td><strong>{lead.name}</strong><small>{lead.email}</small></td><td>{lead.company}</td><td>{lead.challenge}</td><td>{lead.companySize}</td><td><span className="lead-source-badge">{lead.source}</span></td></tr>)}</tbody></table></div> : <p className="admin-empty-state">Nenhuma solicitação encontrada com os filtros atuais.</p>}</section><p className="admin-security-note">Boas práticas: use a exportação apenas para atendimento autorizado, evite compartilhar o arquivo por canais públicos e remova cópias locais quando não forem mais necessárias.</p></div></DashboardLayout>;
}
