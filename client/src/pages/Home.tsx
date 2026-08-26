/*
 * TMF visual system: dark editorial minimalism, emerald action color, asymmetric layouts,
 * Space Grotesk display type + Manrope body type, restrained motion and direct CTAs.
 */
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail, Menu, MessageCircle, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE = DEFAULT_WHATSAPP_MESSAGE;

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    const message = `${WHATSAPP_MESSAGE}. Meu e-mail é ${email.trim()}.`;
    setEmailSent(true);
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap nav">
          <a className="brand" href="#top" aria-label="TMF início">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>TMF<span className="brand-dot">.</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#solucoes">Áreas de atuação</a>
            <a href="#processo">Método</a>
            <a href="#duvidas">Dúvidas</a>
            <a className="nav-cta" href={whatsappUrl("Quero agendar um diagnóstico fiscal.")} target="_blank" rel="noreferrer">Agendar diagnóstico <ArrowUpRight size={15} /></a>
          </nav>
          <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile"><a href="#solucoes" onClick={() => setMenuOpen(false)}>Áreas de atuação</a><a href="#processo" onClick={() => setMenuOpen(false)}>Método</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a><a className="nav-cta" href={whatsappUrl("Quero agendar um diagnóstico fiscal.")} target="_blank" rel="noreferrer">Agendar diagnóstico <ArrowUpRight size={15} /></a></nav>}
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="pulse-dot" /> estratégia para empresas que querem crescer</div>
              <h1>Reduza riscos, organize a operação e cresça com <em>mais clareza.</em></h1>
              <p className="hero-lead">Consultoria fiscal, contábil, tributária, de marketing e TI para encontrar oportunidades legais, melhorar decisões e transformar complexidade em direção.</p>
              <div className="hero-actions">
                <WhatsAppButton message="Quero agendar um diagnóstico fiscal para minha empresa.">Quero agendar um diagnóstico</WhatsAppButton>
                <a className="button button-quiet" href="#solucoes">Conhecer as áreas de atuação <ChevronDown size={16} /></a>
              </div>
              <div className="trust-line"><span><Check size={14} /> análise sob medida</span><span><Check size={14} /> atuação dentro da lei</span></div>
            </div>

            <div className="hero-visual reveal" aria-label="Prévia visual de um site premium">
              <div className="orb orb-one" /><div className="orb orb-two" />
              <div className="browser-frame">
                <div className="browser-top"><span /><span /><span /><small>tmf.consultoria / preview</small></div>
                <div className="browser-content">
                  <div className="preview-kicker">intelligence / 01</div>
                  <h2>Decisões que<br /><strong>protegem margem.</strong></h2>
                  <div className="preview-rule" />
                  <p>Visão integrada para a próxima decisão.</p>
                  <div className="preview-stats"><div><b>01</b><span>diagnóstico</span></div><div><b>02</b><span>estratégia</span></div><div><b>03</b><span>execução</span></div></div>
                </div>
              </div>
              <div className="status-card"><span className="status-icon"><Zap size={15} /></span><div><small>próximo passo</small><strong>Diagnóstico sob medida</strong></div></div>
            </div>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Benefícios da consultoria">
          <div className="wrap metrics-grid"><div><span className="metric-index">01</span><strong>Tributário</strong><small>mapa de oportunidades legais</small></div><div><span className="metric-index">02</span><strong>Contábil</strong><small>informação para decidir melhor</small></div><div><span className="metric-index">03</span><strong>Marketing</strong><small>posicionamento que gera demanda</small></div><div><span className="metric-index">04</span><strong>TI</strong><small>processos mais seguros e eficientes</small></div></div>
        </section>

        <section id="solucoes" className="section section-solutions">
          <div className="wrap">
            <div className="section-heading reveal"><span className="section-kicker">áreas de atuação</span><h2>Uma visão integrada para <span>proteger e acelerar.</span></h2><p>Conectamos estratégia fiscal, contabilidade, marketing e tecnologia para que sua empresa encontre clareza antes de tomar decisões importantes.</p></div>
            <div className="solution-layout">
              <article className="solution-card solution-feature reveal"><span className="card-number">01</span><div className="solution-icon"><Sparkles size={21} /></div><h3>Consultoria tributária e fiscal</h3><p>Mapeamos o cenário da empresa, identificamos riscos e avaliamos oportunidades previstas na legislação. Sem promessa genérica: cada recomendação depende dos seus dados.</p><a href={whatsappUrl("Quero agendar um diagnóstico tributário e fiscal.")} target="_blank" rel="noreferrer">Agendar diagnóstico <ArrowUpRight size={16} /></a></article>
              <div className="solution-stack"><article className="solution-card reveal"><span className="card-number">02</span><div><h3>Contábil e financeiro</h3><p>Organização de informações e indicadores para apoiar planejamento e gestão.</p></div><ShieldCheck size={22} className="card-trailing-icon" /></article><article className="solution-card reveal"><span className="card-number">03</span><div><h3>Marketing e tecnologia</h3><p>Posicionamento, aquisição e processos digitais para transformar estratégia em execução.</p></div><MessageCircle size={22} className="card-trailing-icon" /></article></div>
            </div>
          </div>
        </section>

        <section id="processo" className="section process-section"><div className="wrap process-wrap"><div className="section-heading reveal"><span className="section-kicker">nosso método</span><h2>Da complexidade<br /><span>à decisão segura.</span></h2></div><div className="process-list"><article className="process-row reveal"><span>01</span><div><h3>Diagnosticar</h3><p>Analisamos contexto, regime, operação, prioridades e pontos de atenção.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>02</span><div><h3>Priorizar</h3><p>Organizamos oportunidades e riscos para você saber o que merece atenção primeiro.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>03</span><div><h3>Implementar</h3><p>Você recebe uma direção prática para avançar com responsabilidade e acompanhamento.</p></div><ArrowUpRight size={20} /></article></div></div></section>

        <section id="duvidas" className="section faq-section"><div className="wrap faq-layout"><div className="section-heading reveal"><span className="section-kicker">antes de conversar</span><h2>O essencial,<br /><span>sem rodeios.</span></h2><a className="text-link" href={whatsappUrl("Tenho uma dúvida sobre o diagnóstico tributário.")} target="_blank" rel="noreferrer">Tirar uma dúvida no WhatsApp <ArrowUpRight size={16} /></a></div><div className="faq-list reveal"><details><summary>Como começa o diagnóstico?<ChevronDown size={18} /></summary><p>Você envia uma mensagem com o segmento e o principal desafio da empresa. A partir daí, alinhamos o escopo das informações necessárias para uma análise responsável.</p></details><details><summary>A consultoria garante redução de impostos?<ChevronDown size={18} /></summary><p>Não existe promessa responsável sem análise. Avaliamos oportunidades legais conforme os dados e a legislação aplicável, sempre com transparência sobre premissas, riscos e limites.</p></details><details><summary>Vocês também atuam com marketing e TI?<ChevronDown size={18} /></summary><p>Sim. A proposta é integrar inteligência fiscal e contábil com posicionamento, aquisição e processos digitais, quando isso fizer sentido para o momento da empresa.</p></details></div></div></section>

        <section className="section contact-section"><div className="wrap"><div className="contact-box reveal"><div className="contact-copy"><span className="section-kicker">diagnóstico inicial</span><h2>Quero entender<br /><em>onde melhorar.</em></h2><p>Deixe seu e-mail ou fale diretamente com a gente. Conte o principal desafio da sua empresa e receba o próximo passo.</p></div><div className="contact-actions"><form onSubmit={handleEmailSubmit} className="email-form"><label htmlFor="email">E-mail corporativo</label><div className="email-input-wrap"><Mail size={18} /><input id="email" type="email" placeholder="voce@empresa.com.br" value={email} onChange={(event) => { setEmail(event.target.value); setEmailSent(false); }} required /><button type="submit" aria-label="Enviar e-mail"><ArrowUpRight size={19} /></button></div>{emailSent && <small className="form-success">E-mail preparado. Finalize o contato no WhatsApp.</small>}</form><WhatsAppButton className="contact-button" message="Quero entender onde melhorar na minha empresa.">Falar com um consultor</WhatsAppButton></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="wrap footer-inner"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /></span><span>TMF<span className="brand-dot">.</span></span></a><span>Clareza para decidir melhor.</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">+55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
      <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp"><MessageCircle size={28} /></a>
    </div>
  );
}
