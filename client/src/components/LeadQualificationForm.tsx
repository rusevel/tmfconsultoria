/* Cenvara lead layer: field-level validation is immediate, legible and never sends personal data to analytics. */
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { trpc } from "@/lib/trpc";

type LeadForm = { name: string; company: string; email: string; size: string; challenge: string; consent: boolean };
type LeadField = keyof LeadForm;
type LeadErrors = Partial<Record<LeadField, string>>;
const initialForm: LeadForm = { name: "", company: "", email: "", size: "", challenge: "", consent: false };

function fieldError(field: LeadField, values: LeadForm) {
  if (field === "name") return values.name.trim().length >= 2 ? undefined : "Informe seu nome para continuarmos.";
  if (field === "company") return values.company.trim().length >= 2 ? undefined : "Informe o nome da empresa.";
  if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email) ? undefined : "Informe um e-mail corporativo válido.";
  if (field === "size") return values.size ? undefined : "Selecione o porte da empresa.";
  if (field === "challenge") return values.challenge ? undefined : "Selecione o principal desafio.";
  return values.consent ? undefined : "É necessário autorizar o contato para enviar a solicitação.";
}

function formErrors(values: LeadForm) {
  return (Object.keys(values) as LeadField[]).reduce<LeadErrors>((errors, field) => {
    const error = fieldError(field, values);
    if (error) errors[field] = error;
    return errors;
  }, {});
}

export function LeadQualificationForm() {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [errors, setErrors] = useState<LeadErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const successRef = useRef<HTMLDivElement>(null);
  const captureLead = trpc.newsletter.captureLead.useMutation();

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function update<K extends LeadField>(field: K, value: LeadForm[K]) {
    const next = { ...form, [field]: value } as LeadForm;
    setForm(next);
    setSubmitted(false);
    setSubmitError(undefined);
    if (touched[field]) {
      const error = fieldError(field, next);
      setErrors((current) => {
        const updated = { ...current };
        if (error) updated[field] = error; else delete updated[field];
        return updated;
      });
    }
  }

  function validateOnBlur(field: LeadField) {
    setTouched((current) => ({ ...current, [field]: true }));
    const error = fieldError(field, form);
    setErrors((current) => {
      const updated = { ...current };
      if (error) updated[field] = error; else delete updated[field];
      return updated;
    });
  }

  const inputState = (field: LeadField) => touched[field] ? (errors[field] ? "is-invalid" : "is-valid") : "";
  const describedBy = (field: LeadField) => errors[field] ? `${field}-error` : undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = formErrors(form);
    setTouched({ name: true, company: true, email: true, size: true, challenge: true, consent: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    trackEvent("lead_qualification_submit", { company_size: form.size, challenge: form.challenge });
    const message = `DIAGNÓSTICO — Quero entender onde minha empresa pode melhorar.\n\nNome: ${form.name}\nEmpresa: ${form.company}\nE-mail: ${form.email}\nPorte: ${form.size}\nAssunto principal: ${form.challenge}`;
    let captured = true;
    try {
      await captureLead.mutateAsync({ name: form.name, company: form.company, email: form.email, companySize: form.size, challenge: form.challenge, consent: true, source: "diagnostico-home" });
    } catch {
      captured = false;
      setSubmitError("Não foi possível registrar sua solicitação agora. A mensagem será aberta no WhatsApp para você continuar o atendimento ou tentar novamente.");
      trackEvent("lead_capture_fallback", { source: "diagnostico-home" });
    }
    setSubmitted(captured);
    setForm(initialForm);
    setTouched({});
    setErrors({});
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return <form className="lead-form" onSubmit={handleSubmit} noValidate>
    <p className="lead-form-note"><strong>Captação rápida.</strong> Este formulário organiza seu assunto e seus dados. Após a validação, a conversa continua no WhatsApp; nenhuma página separada é necessária.</p>
    <div className="lead-grid"><label>Nome<input className={inputState("name")} value={form.name} onChange={(event) => update("name", event.target.value)} onBlur={() => validateOnBlur("name")} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} autoComplete="name" /></label><label>Empresa<input className={inputState("company")} value={form.company} onChange={(event) => update("company", event.target.value)} onBlur={() => validateOnBlur("company")} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("company")} autoComplete="organization" /></label></div>
    <div className="field-messages lead-grid"><span id="name-error" role="alert">{errors.name}</span><span id="company-error" role="alert">{errors.company}</span></div>
    <label>E-mail corporativo<span className="input-with-icon"><Mail size={16} /><input className={inputState("email")} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} onBlur={() => validateOnBlur("email")} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} placeholder="voce@empresa.com.br" autoComplete="email" /></span></label><span className="field-message" id="email-error" role="alert">{errors.email}</span>
    <div className="lead-grid"><label>Porte da empresa<select className={inputState("size")} value={form.size} onChange={(event) => update("size", event.target.value)} onBlur={() => validateOnBlur("size")} aria-invalid={Boolean(errors.size)} aria-describedby={describedBy("size")}><option value="">Selecione</option><option value="Micro ou pequena">Micro ou pequena</option><option value="Média">Média</option><option value="Grande">Grande</option></select></label><label>Assunto principal<select className={inputState("challenge")} value={form.challenge} onChange={(event) => update("challenge", event.target.value)} onBlur={() => validateOnBlur("challenge")} aria-invalid={Boolean(errors.challenge)} aria-describedby={describedBy("challenge")}><option value="">Selecione</option><option value="Tributário">Tributário</option><option value="Fiscal">Fiscal</option><option value="Contábil">Contábil</option><option value="Marketing ou TI">Marketing ou TI</option><option value="Outro">Outro</option></select></label></div>
    <div className="field-messages lead-grid"><span id="size-error" role="alert">{errors.size}</span><span id="challenge-error" role="alert">{errors.challenge}</span></div>
    <label className={`lgpd-consent ${inputState("consent")}`}><input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} onBlur={() => validateOnBlur("consent")} aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} /><span>Autorizo a Cenvara a usar estes dados exclusivamente para responder ao meu pedido e iniciar o atendimento pelo WhatsApp. Consulte a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span></label><span className="field-message" id="consent-error" role="alert">{errors.consent}</span>
    {submitError && <div className="field-message lead-submit-error" role="alert">{submitError}</div>}
    <button type="submit" className="lead-submit" disabled={captureLead.isPending}><Check size={17} /> {captureLead.isPending ? "Registrando solicitação…" : "Enviar e abrir WhatsApp"} <ArrowUpRight size={16} /></button>
    {submitted && <div ref={successRef} className="form-success" role="status" aria-live="polite" tabIndex={-1}><span className="form-success-icon"><Check size={17} /></span><div><strong>Solicitação registrada.</strong><small>Seus dados foram validados, os campos foram limpos e a mensagem com o assunto escolhido foi aberta no WhatsApp.</small></div><span className="form-success-step">01 / 01</span></div>}
  </form>;
}
