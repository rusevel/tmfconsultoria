/*
 * Cenvara visual system: dark editorial minimalism, emerald action color, asymmetric layouts,
 * Space Grotesk display type + Manrope body type, restrained motion and direct CTAs.
 */
import { useEffect, useState } from "react";
import "../leadership.css";
import { ArrowUpRight, Check, ChevronDown, Menu, MessageCircle, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { LeadQualificationForm } from "@/components/LeadQualificationForm";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Brand } from "@/components/Brand";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE = DEFAULT_WHATSAPP_MESSAGE;
const authorizedTestimonials = [
  { quote: "Tivemos uma visão muito mais clara do nosso negócio. A Cenvara nos ajudou a enxergar pontos que antes passavam despercebidos. A análise foi objetiva, profissional e trouxe informações importantes para tomarmos decisões com mais segurança.", name: "Carlos Mendes", role: "Empresário" },
  { quote: "Atendimento próximo e soluções práticas. O que mais gostei foi a forma como a consultoria entendeu nossa realidade antes de apresentar qualquer solução. O atendimento foi muito transparente e as orientações foram realmente aplicáveis ao nosso negócio.", name: "Mariana Oliveira", role: "Gestora Administrativa" },
  { quote: "Mais organização e segurança para decidir. Precisávamos entender melhor nossa situação e identificar onde poderíamos melhorar. A Cenvara fez uma análise completa e apresentou as informações de maneira simples e objetiva.", name: "Rafael Almeida", role: "Diretor Comercial" },
  { quote: "Profissionalismo do início ao fim. Desde o primeiro contato, fomos muito bem atendidos. A equipe demonstrou conhecimento, organização e preocupação em entender nossas necessidades.", name: "Fernanda Costa", role: "Empresária" },
  { quote: "Uma consultoria que realmente entende a empresa. A Cenvara não ficou apenas na teoria. Entenderam nossos desafios e apresentaram caminhos possíveis para melhorar nossa operação.", name: "Lucas Ferreira", role: "Sócio-Administrador" },
  { quote: "Clareza para tomar decisões melhores. Antes da consultoria, tínhamos muitas informações, mas pouca clareza sobre o que realmente precisava ser priorizado. A análise da TMF ajudou a organizar as ideias e identificar oportunidades de melhoria.", name: "Patrícia Santos", role: "Empresária" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("show"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -42px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap nav">
          <Brand href="#top" />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#solucoes">Áreas de atuação</a>
            <a href="#processo">Método</a>
            <a href="#essencia">Essência</a>
            <a href="#duvidas">Dúvidas</a>
            <a className="nav-cta" href={whatsappUrl("Quero agendar um diagnóstico fiscal.")} target="_blank" rel="noreferrer">Agendar diagnóstico <ArrowUpRight size={15} /></a>
          </nav>
          <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile"><a href="#solucoes" onClick={() => setMenuOpen(false)}>Áreas de atuação</a><a href="#processo" onClick={() => setMenuOpen(false)}>Método</a><a href="#essencia" onClick={() => setMenuOpen(false)}>Essência</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a><a className="nav-cta" href={whatsappUrl("Quero agendar um diagnóstico fiscal.")} target="_blank" rel="noreferrer">Agendar diagnóstico <ArrowUpRight size={15} /></a></nav>}
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-art" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span className="pulse-dot" /> Cenvara Fiscal & Estratégia</div>
              <h1>Clareza para decidir.<br />Estrutura para <em>avançar.</em></h1>
              <p className="hero-lead">Consultoria fiscal, contábil, tributária, de marketing e tecnologia para organizar riscos, avaliar oportunidades legais e transformar complexidade em direção.</p>
              <div className="hero-actions">
                <WhatsAppButton message="Quero agendar um diagnóstico fiscal para minha empresa.">Quero agendar um diagnóstico</WhatsAppButton>
                <a className="button button-quiet" href="#solucoes">Conhecer as áreas de atuação <ChevronDown size={16} /></a>
              </div>
              <div className="trust-line"><span><Check size={14} /> análise sob medida</span><span><Check size={14} /> São Paulo, SP</span><span><Check size={14} /> atuação dentro da lei</span></div>
            </div>

            <div className="hero-visual reveal" aria-label="Prévia visual de um site premium">
              <div className="orb orb-one" /><div className="orb orb-two" />
              <div className="browser-frame">
                <div className="browser-top"><span /><span /><span /><small>cenvara / diagnóstico</small></div>
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
              <article className="solution-card solution-feature reveal"><span className="card-number">01</span><div className="solution-icon"><Sparkles size={21} /></div><h3>Consultoria tributária e fiscal</h3><p>Mapeamos o cenário da empresa, identificamos riscos e avaliamos oportunidades previstas na legislação. Sem promessa genérica: cada recomendação depende dos seus dados.</p><div className="service-links"><a className="service-cta" href="/consultoria-tributaria">Ver consultoria tributária <ArrowUpRight size={16} /></a><a className="service-cta" href="/consultoria-fiscal">Ver consultoria fiscal <ArrowUpRight size={16} /></a></div></article>
              <div className="solution-stack"><article className="solution-card reveal"><span className="card-number">02</span><div><h3>Contábil e financeiro</h3><p>Organização de informações e indicadores para apoiar planejamento e gestão.</p></div><ShieldCheck size={22} className="card-trailing-icon" /></article><article className="solution-card reveal"><span className="card-number">03</span><div><h3>Marketing e tecnologia</h3><p>Posicionamento, aquisição e processos digitais para transformar estratégia em execução.</p></div><MessageCircle size={22} className="card-trailing-icon" /></article></div>
            </div>
          </div>
        </section>

        <section id="processo" className="section process-section"><div className="wrap process-wrap"><div className="section-heading reveal"><span className="section-kicker">nosso método</span><h2>Da complexidade<br /><span>à decisão segura.</span></h2></div><div className="process-list"><article className="process-row reveal"><span>01</span><div><h3>Diagnosticar</h3><p>Analisamos contexto, regime, operação, prioridades e pontos de atenção.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>02</span><div><h3>Priorizar</h3><p>Organizamos oportunidades e riscos para você saber o que merece atenção primeiro.</p></div><ArrowUpRight size={20} /></article><article className="process-row reveal"><span>03</span><div><h3>Implementar</h3><p>Você recebe uma direção prática para avançar com responsabilidade e acompanhamento.</p></div><ArrowUpRight size={20} /></article></div></div></section>

        <section id="essencia" className="section essence-section"><div className="wrap essence-layout"><div className="essence-intro reveal"><span className="section-kicker">essência Cenvara</span><h2>Uma marca criada para <span>organizar direção.</span></h2><p>Cenvara representa o centro da decisão, a leitura das variações de cada empresa e a direção que transforma informação em próximo passo.</p><div className="essence-mark" aria-hidden="true"><span>C</span><i /> <span>V</span><i /> <span>A</span></div></div><div className="essence-content"><article className="essence-opportunity reveal"><span className="card-number">base de atendimento</span><h3>Estratégia para empresas em São Paulo, com atuação responsável em todo o Brasil.</h3><p>A Cenvara parte do contexto real de cada empresa para mapear riscos, avaliar oportunidades legais e transformar informação em direção clara para a gestão.</p></article><div className="essence-cards"><article className="essence-card reveal"><span>01</span><h3>Visão</h3><p>Ser referência para empresas que buscam decisões mais claras, responsáveis e estruturadas.</p></article><article className="essence-card reveal"><span>02</span><h3>Missão</h3><p>Transformar complexidade fiscal, contábil, tecnológica e comercial em direção prática para a gestão.</p></article><article className="essence-card essence-values reveal"><span>03</span><h3>Valores</h3><p>Responsabilidade técnica, clareza aplicável, contexto antes da recomendação e parceria próxima.</p></article><article className="essence-card leadership-card reveal"><span>04 · liderança executiva</span><h3>Rusevel Barros</h3><p><strong>CEO &amp; CTO</strong><br />Une visão de negócio, tecnologia e processos para transformar complexidade em direção aplicável.</p></article><article className="essence-card leadership-card reveal"><span>05 · liderança fiscal</span><h3>Jessica Carvalho</h3><p><strong>GFS — Gestora Fiscal Sênior</strong><br />Construiu sua trajetória na gestão fiscal e contábil. A experiência ao lado de Rusevel Barros na Gomes Contabilidade consolidou uma parceria de confiança entre conhecimento fiscal e tecnologia. Na Cenvara, lidera a frente fiscal para agilizar processos, organizar mudanças regulatórias e apoiar empresas de serviços e produtos que querem crescer com mais clareza.</p></article></div></div></div></section>

        <section id="conexoes" className="section connections-section"><div className="wrap"><div className="section-heading reveal"><span className="section-kicker">rede de confiança</span><h2>Conexões que fazem parte<br /><span>da nossa trajetória.</span></h2><p>Conheça empresas e profissionais que fazem parte do nosso entorno profissional. Cada conexão mantém sua própria história, atuação e identidade.</p></div><div className="connections-grid"><article className="connection-card reveal"><span className="connection-index">01</span><div><h3>P2 Solutions</h3><p>Soluções e tecnologia para negócios.</p><a href="https://p2solutions.com.br/" target="_blank" rel="noopener noreferrer">Visitar site <ArrowUpRight size={15} /></a></div></article><article className="connection-card reveal"><span className="connection-index">02</span><div><h3>Acerta Assessoria Contábil</h3><p>Contabilidade e assessoria para empresas.</p><a href="https://acertaassessoria.com.br/" target="_blank" rel="noopener noreferrer">Visitar site <ArrowUpRight size={15} /></a></div></article><article className="connection-card reveal"><span className="connection-index">03</span><div><h3>Gomes Contabilidade</h3><p>Soluções contábeis personalizadas.</p><a href="https://www.gomescont.com.br/" target="_blank" rel="noopener noreferrer">Visitar site <ArrowUpRight size={15} /></a></div></article><article className="connection-card reveal"><span className="connection-index">04</span><div><h3>Paulibras</h3><p>Distribuição e reposição de autopeças.</p><a href="https://www.paulibras.com/" target="_blank" rel="noopener noreferrer">Visitar site <ArrowUpRight size={15} /></a></div></article></div><small className="connections-note">As conexões são apresentadas de forma institucional, sem declaração de parceria comercial ou relação de cliente nesta página.</small></div></section>

        <TestimonialCarousel testimonials={authorizedTestimonials} />

        <section id="duvidas" className="section faq-section"><div className="wrap faq-layout"><div className="section-heading reveal"><span className="section-kicker">antes de conversar</span><h2>O essencial,<br /><span>sem rodeios.</span></h2><a className="text-link" href={whatsappUrl("Tenho uma dúvida sobre o diagnóstico tributário.")} target="_blank" rel="noreferrer">Tirar uma dúvida no WhatsApp <ArrowUpRight size={16} /></a></div><div className="faq-list reveal"><details><summary>Como começa o diagnóstico?<ChevronDown size={18} /></summary><p>Você envia uma mensagem com o segmento e o principal desafio da empresa. A partir daí, alinhamos o escopo das informações necessárias para uma análise responsável.</p></details><details><summary>A consultoria garante redução de impostos?<ChevronDown size={18} /></summary><p>Não existe promessa responsável sem análise. Avaliamos oportunidades legais conforme os dados e a legislação aplicável, sempre com transparência sobre premissas, riscos e limites.</p></details><details><summary>Vocês também atuam com marketing e TI?<ChevronDown size={18} /></summary><p>Sim. A proposta é integrar inteligência fiscal e contábil com posicionamento, aquisição e processos digitais, quando isso fizer sentido para o momento da empresa.</p></details></div></div></section>

        <section className="section contact-section"><div className="wrap"><div className="contact-box reveal"><div className="contact-copy"><span className="section-kicker">diagnóstico inicial</span><h2>Quero entender<br /><em>onde melhorar.</em></h2><p>Conte o essencial da empresa. A Cenvara usa os dados somente para responder ao pedido e abrir a conversa de atendimento.</p></div><div className="contact-actions"><LeadQualificationForm /></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="wrap footer-inner"><Brand href="#top" /><span>Clareza para decidir. Estrutura para avançar.</span><a href="/politica-de-privacidade">Política de Privacidade</a><a href={whatsappUrl()} target="_blank" rel="noreferrer">+55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}
