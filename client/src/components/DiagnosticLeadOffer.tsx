import { ArrowUpRight, Check, MessageCircle, ScanSearch } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function DiagnosticLeadOffer() {
  const message = "DIAGNÓSTICO — Quero entender onde minha empresa pode estar perdendo margem e quais são os próximos passos.";

  return (
    <section id="diagnostico" className="section diagnostic-offer-section" aria-labelledby="diagnostic-offer-title">
      <div className="wrap diagnostic-offer">
        <div className="diagnostic-offer-intro reveal">
          <span className="section-kicker">ponto de partida</span>
          <h2 id="diagnostic-offer-title">Sua empresa pode estar deixando margem na mesa <span>sem perceber.</span></h2>
          <p>Antes de escolher uma ferramenta ou mudar um processo, vale entender o que os seus dados já estão dizendo. A Cenvara organiza o contexto fiscal, contábil e operacional para indicar onde olhar primeiro.</p>
          <div className="diagnostic-proof"><span><Check size={15} /> leitura sob medida</span><span><Check size={15} /> oportunidades legais</span><span><Check size={15} /> próximos passos claros</span></div>
        </div>
        <div className="diagnostic-offer-action reveal">
          <div className="diagnostic-action-index"><ScanSearch size={19} /><span>01 / diagnóstico</span></div>
          <h3>Quer saber por onde começar?</h3>
          <p>Envie a palavra-chave <strong>DIAGNÓSTICO</strong> no WhatsApp. A conversa começa pelo seu principal desafio, sem promessa genérica e sem compromisso de contratação.</p>
          <div className="diagnostic-action-buttons">
            <WhatsAppButton message={message} className="diagnostic-whatsapp-cta">Enviar “DIAGNÓSTICO” <MessageCircle size={16} /></WhatsAppButton>
            <a className="text-link" href="#contato" onClick={() => trackEvent("diagnostic_form_cta_click", { placement: "diagnostic_offer" })}>Prefiro preencher o formulário <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
