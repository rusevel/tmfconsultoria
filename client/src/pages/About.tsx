import { ArrowLeft, ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

const principles = [
  { icon: Compass, number: "01", title: "Contexto antes da recomendação", text: "Começamos pela realidade da empresa: operação, regime, dados, riscos e prioridades." },
  { icon: ShieldCheck, number: "02", title: "Responsabilidade técnica", text: "Traduzimos complexidade fiscal e tecnológica em decisões claras, sem promessas genéricas." },
  { icon: Sparkles, number: "03", title: "Parceria próxima", text: "Construímos caminhos aplicáveis com diálogo direto, acompanhamento e respeito ao momento do negócio." },
];

export default function About() {
  return (
    <div className="site-shell about-page-shell">
      <SiteHeader contactMessage="Quero conhecer a história da Cenvara." />
      <main id="top" className="about-page">
        <section className="about-hero">
          <div className="wrap about-hero-grid">
            <div className="about-hero-copy reveal">
              <a className="back-link" href="/"><ArrowLeft size={15} /> Voltar para a home</a>
              <span className="section-kicker">sobre a Cenvara</span>
              <h1>Centro, contexto<br /><em>e direção.</em></h1>
              <p>A Cenvara nasceu da união entre experiência fiscal, visão de tecnologia e uma amizade construída no trabalho. Nossa história começa antes da marca: começa na decisão de tornar mudanças complexas mais compreensíveis para empresas que desejam crescer.</p>
              <WhatsAppButton message="Quero conhecer a história e o método da Cenvara.">Conversar com a Cenvara <ArrowUpRight size={16} /></WhatsAppButton>
            </div>
            <div className="about-hero-mark reveal" aria-label="CVA: Centro, Variação e Ação"><span>C</span><i /><span>V</span><i /><span>A</span><small>Centro · Variação · Ação</small></div>
          </div>
        </section>

        <section className="section about-story-section" aria-labelledby="about-story-title">
          <div className="wrap about-story-grid">
            <div className="section-heading reveal"><span className="section-kicker">uma trajetória compartilhada</span><h2 id="about-story-title">Duas experiências.<br /><span>Uma mesma direção.</span></h2></div>
            <div className="about-story-copy reveal"><p>A Cenvara foi criada por <strong>Rusevel Barros</strong> e <strong>Jessica Carvalho</strong>, sócios e cofundadores que se conheceram profissionalmente na Gomes Contabilidade e transformaram uma relação de confiança em uma proposta empresarial.</p><p>De um lado, a experiência fiscal, contábil e o relacionamento próximo com empresas. Do outro, tecnologia, processos, integração e visão de negócio. A combinação surgiu de uma necessidade concreta: ajudar organizações de serviços e produtos a atravessar mudanças fiscais e tecnológicas sem perder clareza, controle ou capacidade de avançar.</p><p>Hoje, a Cenvara conecta essas duas frentes para analisar o contexto real de cada empresa, organizar prioridades e construir próximos passos responsáveis.</p></div>
          </div>
        </section>

        <section className="section about-founders-section" aria-labelledby="founders-title">
          <div className="wrap"><div className="section-heading reveal"><span className="section-kicker">quem conduz</span><h2 id="founders-title">Experiência que se<br /><span>complementa na prática.</span></h2></div><div className="founders-grid">
            <article className="founder-profile reveal"><span className="card-number">01 · liderança executiva</span><h3>Rusevel Barros</h3><strong>CEO & CTO</strong><p>Consultor de tecnologia e analista de negócios, conecta processos, dados e ferramentas digitais que se tornam ativos estratégicos em mercados competitivos. Sua trajetória une operações, liderança de TI e apoio executivo, com foco em automação de fluxos, integração de sistemas, inteligência artificial e desenvolvimento web.</p><small>Na Cenvara, transforma desafios fiscais e operacionais em soluções mais ágeis, úteis e preparadas para o crescimento.</small></article>
            <article className="founder-profile reveal"><span className="card-number">02 · liderança fiscal</span><h3>Jessica Carvalho</h3><strong>GFS — Gestora Fiscal Sênior</strong><p>Sócia e cofundadora da Cenvara, reúne experiência em escrituração, apuração de tributos, obrigações acessórias e regularização de pendências para empresas de indústria, comércio e serviços.</p><small>Ao lado de Rusevel, lidera a frente fiscal para tornar mudanças tributárias mais compreensíveis e conectar organização fiscal, processos e tecnologia ao crescimento sustentável.</small></article>
          </div></div>
        </section>

        <section className="section about-principles-section" aria-labelledby="principles-title"><div className="wrap"><div className="section-heading reveal"><span className="section-kicker">o que orienta nosso trabalho</span><h2 id="principles-title">Clareza para decidir.<br /><span>Estrutura para avançar.</span></h2></div><div className="principles-grid">{principles.map(({ icon: Icon, number, title, text }) => <article className="principle-item reveal" key={number}><Icon size={20} /><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="section about-cta-section"><div className="wrap"><div className="about-cta reveal"><div><span className="section-kicker">próximo capítulo</span><h2>Vamos entender o<br /><em>seu contexto?</em></h2><p>Conheça as áreas de atuação e veja como a Cenvara organiza decisões fiscais, contábeis, tecnológicas e comerciais.</p></div><a className="button button-primary" href="/#solucoes">Conhecer áreas de atuação <ArrowUpRight size={16} /></a></div></div></section>
      </main>
      <SiteFooter contactMessage="Quero conhecer a história da Cenvara." />
      <BackToTop />
    </div>
  );
}
