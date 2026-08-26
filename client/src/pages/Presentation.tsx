import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Download, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { trackEvent } from "@/lib/analytics";

const deckUrl = "/deck-comercial-cenvara.pdf";
const slides = [
  { number: "01", eyebrow: "Cenvara Fiscal & Estratégia", title: <>O centro da <em>decisão.</em></>, body: "Clareza para decidir. Estrutura para avançar.", accent: "CVA" },
  { number: "02", eyebrow: "Contexto", title: <>Empresas decidem em meio a <em>variações constantes.</em></>, body: "Regras fiscais, custos, processos, tecnologia e mercado mudam ao mesmo tempo.", accent: "Variações" },
  { number: "03", eyebrow: "O problema", title: <>Não é falta de informação. <em>É prioridade.</em></>, body: "Quando tudo parece urgente, a empresa perde tempo e assume riscos desnecessários.", accent: "Foco" },
  { number: "04", eyebrow: "Nossa abordagem", title: <>Encontrar o <em>centro da decisão.</em></>, body: "Conectamos fiscal, contábil, tecnologia e estratégia conforme a realidade de cada negócio.", accent: "Integração" },
  { number: "05", eyebrow: "Nosso método", title: <>Da complexidade à <em>decisão segura.</em></>, body: "Diagnosticar. Priorizar. Implementar.", accent: "Método" },
  { number: "06", eyebrow: "Essência", title: <>Centro, contexto e <em>direção.</em></>, body: "Cenvara interpreta as variações e transforma complexidade em próximo passo.", accent: "Direção" },
  { number: "07", eyebrow: "Mensagem central", title: <>Decisões melhores começam com <em>contexto real.</em></>, body: "Organizamos riscos e mostramos quais próximos passos são mais claros e responsáveis.", accent: "Clareza" },
  { number: "08", eyebrow: "Próximo passo", title: <>Encontre o centro da próxima <em>decisão.</em></>, body: "Agende um diagnóstico inicial com a Cenvara Fiscal & Estratégia.", accent: "Vamos conversar" },
];

export default function Presentation() {
  const [active, setActive] = useState(0);
  const current = slides[active];
  const progress = useMemo(() => `${((active + 1) / slides.length) * 100}%`, [active]);

  const goTo = (index: number) => setActive(Math.max(0, Math.min(slides.length - 1, index)));
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") goTo(active + 1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") goTo(active - 1);
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <div className="site-shell presentation-shell">
      <SiteHeader contactMessage="Quero conversar sobre a apresentação da Cenvara." />
      <main className="presentation-page">
        <section className="presentation-intro section">
          <div className="wrap presentation-intro-grid">
            <div className="reveal"><a className="back-link" href="/"><ArrowLeft size={15} /> Voltar para a home</a><span className="section-kicker">apresentação comercial</span><h1>O centro da<br /><em>decisão.</em></h1><p>Explore a proposta da Cenvara em uma experiência interativa. Use as setas do teclado, os controles abaixo ou navegue pelos indicadores.</p></div>
            <div className="presentation-actions reveal"><a className="button button-quiet" href={deckUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("deck_download", { placement: "presentation_page" })}><Download size={16} /> Baixar PDF completo</a><WhatsAppButton message="Quero conversar sobre a apresentação comercial da Cenvara."><MessageCircle size={16} /> Conversar com a Cenvara</WhatsAppButton></div>
          </div>
        </section>
        <section className="interactive-deck-section section" aria-label="Deck comercial interativo">
          <div className="wrap">
            <div className="deck-progress" aria-label={`Progresso da apresentação: slide ${active + 1} de ${slides.length}`}><span>Slide {current.number} / 08</span><div role="progressbar" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={active + 1} aria-valuetext={`Slide ${active + 1} de ${slides.length}`}><i style={{ width: progress }} /></div><span>Use ← →</span></div>
            <div className="interactive-slide" key={current.number}>
              <div className="interactive-slide-copy"><span className="section-kicker">{current.eyebrow}</span><h2>{current.title}</h2><p>{current.body}</p>{active === slides.length - 1 && <WhatsAppButton message="Quero agendar um diagnóstico com a Cenvara.">Agendar diagnóstico</WhatsAppButton>}</div>
              <div className="interactive-slide-mark" aria-hidden="true"><span>{current.accent}</span><b>{current.number}</b></div>
            </div>
            <div className="deck-controls"><button type="button" className="deck-arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Slide anterior"><ArrowLeft size={18} /></button><div className="deck-dots" role="tablist" aria-label="Selecionar slide">{slides.map((slide, index) => <button type="button" role="tab" aria-selected={index === active} aria-label={`Ir para o slide ${slide.number}`} className={index === active ? "active" : ""} onClick={() => goTo(index)} key={slide.number}><span>{slide.number}</span></button>)}</div><button type="button" className="deck-arrow" onClick={() => goTo(active + 1)} disabled={active === slides.length - 1} aria-label="Próximo slide"><ArrowRight size={18} /></button></div>
          </div>
        </section>
      </main>
      <SiteFooter contactMessage="Quero conversar sobre a apresentação da Cenvara." />
    </div>
  );
}
