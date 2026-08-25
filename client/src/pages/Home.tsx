/*
 * ALTA visual system: dark editorial minimalism, emerald action color, asymmetric layouts,
 * Space Grotesk display type + Manrope body type, restrained motion and direct CTAs.
 */
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";

const WHATSAPP_NUMBER = "5511969293429";
const WHATSAPP_MESSAGE = "Quero saber mais sobre o site";

function whatsappUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

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
          <a className="brand" href="#top" aria-label="ALTA início">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>ALTA<span className="brand-dot">.</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#processo">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
            <a className="nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer">Falar agora <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="pulse-dot" /> presença digital premium</div>
              <h1>Seu negócio merece uma presença <em>à altura.</em></h1>
              <p className="hero-lead">Um site claro, sofisticado e preparado para transformar interesse em conversa — com atendimento direto pelo WhatsApp.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Quero saber mais sobre o site <ArrowUpRight size={16} /></a>
                <a className="button button-quiet" href="#solucoes">Ver o que entregamos <ChevronDown size={16} /></a>
              </div>
              <div className="trust-line"><span><Check size={14} /> visual responsivo</span><span><Check size={14} /> contato sem complicação</span></div>
            </div>

            <div className="hero-visual reveal" aria-label="Prévia visual de um site premium">
              <div className="orb orb-one" /><div className="orb orb-two" />
              <div className="browser-frame">
                <div className="browser-top"><span /><span /><span /><small>alta.studio / preview</small></div>
                <div className="browser-content">
                  <div className="preview-kicker">digital presence / 01</div>
                  <h2>Clareza que<br /><strong>abre portas.</strong></h2>
                  <div className="preview-rule" />
                  <p>Uma experiência pensada para a próxima conversa.</p>
                  <div className="preview-stats"><div><b>01</b><span>direção</span></div><div><b>02</b><span>presença</span></div><div><b>03</b><span>conversa</span></div></div>
                </div>
              </div>
              <div className="status-card"><span className="status-icon"><Zap size={15} /></span><div><small>agora</small><strong>Atendimento disponível</strong></div></div>
            </div>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Princípios do projeto">
          <div className="wrap metrics-grid"><div><span className="metric-index">01</span><strong>Impacto</strong><small>primeira impressão com intenção</small></div><div><span className="metric-index">02</span><strong>Clareza</strong><small>cada mensagem no lugar certo</small></div><div><span className="metric-index">03</span><strong>Conversa</strong><small>menos barreira, mais contato</small></div><div><span className="metric-index">04</span><strong>Presença</strong><small>uma marca que permanece</small></div></div>
        </section>

        <section id="solucoes" className="section section-solutions">
          <div className="wrap">
            <div className="section-heading reveal"><span className="section-kicker">o que fazemos</span><h2>Não é só um site.<br /><span>É o começo da percepção.</span></h2><p>Organizamos a sua mensagem para que o visitante entenda o valor do seu trabalho e saiba exatamente qual é o próximo passo.</p></div>
            <div className="solution-layout">
              <article className="solution-card solution-feature reveal"><span className="card-number">01</span><div className="solution-icon"><Sparkles size={21} /></div><h3>Direção visual</h3><p>Uma identidade digital coerente, elegante e reconhecível em cada detalhe.</p><a href={whatsappUrl("Quero saber mais sobre direção visual.")} target="_blank" rel="noreferrer">Conversar sobre isso <ArrowUpRight size={16} /></a></article>
              <div className="solution-stack"><article className="solution-card reveal"><span className="card-number">02</span><div><h3>Experiência responsiva</h3><p>Conteúdo que funciona com naturalidade no celular, tablet e computador.</p></div><ShieldCheck size={22} className="card-trailing-icon" /></article><article className="solution-card reveal"><span className="card-number">03</span><div><h3>Contato que acontece</h3><p>Chamadas para ação conectadas ao WhatsApp, sem formulários escondidos.</p></div><MessageCircle size={22} className="card-trailing-icon" /></article></div>
            </div>
          </div>
        </section>

        <section id="processo" className="section process-section"><div className="wrap process-wrap"><div className="section-heading reveal"><span className="section-kicker">como funciona</span><h2>Do primeiro olhar<br /><span>à próxima conversa.</span></h2></div><div className="process-list"><article className="process-row reveal"><span>01</span><div><h3>Entender</h3><p>Você conta o que faz, para quem e onde quer chegar.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>02</span><div><h3>Traduzir</h3><p>Transformamos a sua experiência em uma mensagem clara e visual.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>03</span><div><h3>Conectar</h3><p>O visitante encontra um caminho simples para falar com você.</p></div><ArrowUpRight size={20} /></article></div></div></section>

        <section id="duvidas" className="section faq-section"><div className="wrap faq-layout"><div className="section-heading reveal"><span className="section-kicker">dúvidas</span><h2>O essencial,<br /><span>sem rodeios.</span></h2><a className="text-link" href={whatsappUrl()} target="_blank" rel="noreferrer">Ainda tem uma pergunta? <ArrowUpRight size={16} /></a></div><div className="faq-list reveal"><details><summary>Como começo o projeto?<ChevronDown size={18} /></summary><p>Envie uma mensagem pelo WhatsApp com o que você precisa. A primeira conversa serve para entender o momento da sua empresa e o melhor caminho.</p></details><details><summary>O site funciona no celular?<ChevronDown size={18} /></summary><p>Sim. A experiência é pensada primeiro para o celular e se adapta a telas maiores sem perder clareza ou velocidade.</p></details><details><summary>Posso atualizar os textos depois?<ChevronDown size={18} /></summary><p>Sim. A estrutura pode ser ajustada conforme sua oferta, seus serviços e a fase do negócio.</p></details></div></div></section>

        <section className="section contact-section"><div className="wrap"><div className="contact-box reveal"><div className="contact-copy"><span className="section-kicker">próximo passo</span><h2>Quero saber mais<br /><em>sobre o site.</em></h2><p>Deixe seu e-mail ou fale diretamente com a gente. A conversa começa do jeito mais simples.</p></div><div className="contact-actions"><form onSubmit={handleEmailSubmit} className="email-form"><label htmlFor="email">Seu melhor e-mail</label><div className="email-input-wrap"><Mail size={18} /><input id="email" type="email" placeholder="voce@empresa.com" value={email} onChange={(event) => { setEmail(event.target.value); setEmailSent(false); }} required /><button type="submit" aria-label="Enviar e-mail"><ArrowUpRight size={19} /></button></div>{emailSent && <small className="form-success">E-mail preparado. Finalize o contato no WhatsApp.</small>}</form><a className="button button-primary contact-button" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Abrir conversa no WhatsApp</a></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="wrap footer-inner"><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /></span><span>ALTA<span className="brand-dot">.</span></span></a><span>Presença que abre portas.</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">+55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
      <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp"><MessageCircle size={28} /></a>
    </div>
  );
}
