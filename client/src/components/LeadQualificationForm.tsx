/* TMF lead layer: qualification is handled locally and shared with WhatsApp only after explicit contact consent. */
import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type LeadForm = { name: string; company: string; email: string; size: string; challenge: string; consent: boolean };
const initialForm: LeadForm = { name: "", company: "", email: "", size: "", challenge: "", consent: false };

export function LeadQualificationForm() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof LeadForm, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.consent) return;
    trackEvent("lead_qualification_submit", { company_size: form.size, challenge: form.challenge });
    const message = `Quero solicitar um diagnóstico da TMF.%0A%0ANome: ${form.name}%0AEmpresa: ${form.company}%0AE-mail: ${form.email}%0APorte: ${form.size}%0APrincipal desafio: ${form.challenge}`;
    setSubmitted(true);
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <form className="lead-form" onSubmit={handleSubmit}>
    <div className="lead-grid"><label>Nome<input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" required /></label><label>Empresa<input value={form.company} onChange={(event) => update("company", event.target.value)} autoComplete="organization" required /></label></div>
    <label>E-mail corporativo<span className="input-with-icon"><Mail size={16} /><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="voce@empresa.com.br" autoComplete="email" required /></span></label>
    <div className="lead-grid"><label>Porte da empresa<select value={form.size} onChange={(event) => update("size", event.target.value)} required><option value="">Selecione</option><option value="Micro ou pequena">Micro ou pequena</option><option value="Média">Média</option><option value="Grande">Grande</option></select></label><label>Principal desafio<select value={form.challenge} onChange={(event) => update("challenge", event.target.value)} required><option value="">Selecione</option><option value="Tributário">Tributário</option><option value="Fiscal">Fiscal</option><option value="Contábil">Contábil</option><option value="Marketing ou TI">Marketing ou TI</option><option value="Outro">Outro</option></select></label></div>
    <label className="lgpd-consent"><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required /><span>Autorizo a TMF a usar estes dados exclusivamente para responder ao meu pedido e iniciar o atendimento pelo WhatsApp.</span></label>
    <button type="submit" className="lead-submit"><Check size={17} /> Solicitar diagnóstico <ArrowUpRight size={16} /></button>
    {submitted && <small className="form-success">Dados preparados. Finalize o contato na conversa do WhatsApp.</small>}
  </form>;
}
