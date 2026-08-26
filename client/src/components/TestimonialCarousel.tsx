/* Cenvara trust layer: carousel accepts only real, authorized testimonials supplied by the business, with restrained accessible motion. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

type TestimonialCarouselProps = { testimonials?: Testimonial[] };

export function TestimonialCarousel({ testimonials = [] }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (testimonials.length < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveIndex((index) => (index + 1) % testimonials.length), 6500);
    return () => window.clearInterval(interval);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <section className="section testimonials-section" aria-labelledby="testimonials-title">
        <div className="wrap testimonials-empty">
          <div className="section-heading"><span className="section-kicker">confiança construída</span><h2 id="testimonials-title">Resultados pedem contexto,<br /><span>e autorização.</span></h2><p>A Cenvara publicará depoimentos somente quando houver autorização explícita do cliente e informações verificáveis sobre a experiência.</p></div>
          <div className="testimonial-consent-card"><Quote size={25} aria-hidden="true" /><div><strong>Espaço reservado para vozes reais.</strong><p>O carrossel já está preparado para receber depoimentos autorizados, sem avaliações fictícias ou promessas genéricas.</p></div><WhatsAppButton className="testimonial-contact" message="Quero saber como funciona o diagnóstico da Cenvara.">Conversar com a Cenvara</WhatsAppButton></div>
        </div>
      </section>
    );
  }

  const active = testimonials[activeIndex];
  const showPrevious = () => setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % testimonials.length);
  const selectTestimonial = (index: number) => setActiveIndex(index);

  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="wrap testimonials-grid"><div className="section-heading"><span className="section-kicker">vozes de clientes</span><h2 id="testimonials-title">Experiências reais,<br /><span>com contexto.</span></h2><p>Relatos publicados com autorização e vinculados à experiência de cada empresa.</p></div><div className="testimonial-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onTouchStart={() => setPaused(true)}><article className="testimonial-slide" aria-live="polite"><Quote size={29} aria-hidden="true" /><blockquote>“{active.quote}”</blockquote><footer><strong>{active.name}</strong><span>{active.role}{active.company ? ` · ${active.company}` : ""}</span></footer></article><div className="testimonial-controls"><button type="button" onClick={showPrevious} aria-label="Depoimento anterior"><ArrowLeft size={18} /></button><div className="testimonial-indicators" aria-label="Selecionar depoimento">{testimonials.map((testimonial, index) => <button type="button" key={`${testimonial.name}-${index}`} className={index === activeIndex ? "is-active" : ""} aria-label={`Exibir depoimento ${index + 1} de ${testimonials.length}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => selectTestimonial(index)} />)}</div><span>{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span><button type="button" onClick={showNext} aria-label="Próximo depoimento"><ArrowRight size={18} /></button></div></div></div>
    </section>
  );
}
