/*
 * TMF visual system: dark editorial minimalism, emerald action color, clear hierarchy.
 * SEO service pages use one H1, intent-led sections, internal links and responsible claims.
 */
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle, ShieldCheck } from "lucide-react";

type ServicePageProps = {
  kind: "tributaria" | "fiscal";
};

const phone = "5511969293429";

function wa(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const pages = {
  tributaria: {
    title: "Consultoria Tributária para Empresas | TMF",
    description: "Avalie oportunidades legais, riscos e prioridades tributárias com uma análise sob medida para a sua empresa. Fale com a TMF.",
    eyebrow: "consultoria tributária",
    heading: "Decisões tributárias mais claras para uma empresa mais preparada.",
    intro: "A TMF analisa o contexto da sua operação para identificar oportunidades previstas na legislação, pontos de atenção e caminhos de planejamento. O diagnóstico considera os dados reais da empresa — sem promessas automáticas.",
    cta: "Agendar diagnóstico tributário",
    message: "Quero agendar um diagnóstico tributário para minha empresa.",
    questions: ["Minha empresa está no regime tributário mais adequado?", "Existem oportunidades legais que ainda não avaliamos?", "Quais riscos podem afetar margem e planejamento?"],
    sections: [
      ["Planejamento com contexto", "Antes de recomendar qualquer caminho, entendemos atividade, operação, regime, estrutura e objetivos do negócio."],
      ["Oportunidades dentro da lei", "Mapeamos possibilidades aplicáveis ao cenário analisado, com premissas claras e documentação para apoiar a decisão."],
      ["Prioridade para agir", "O resultado é organizado em próximos passos, riscos e informações que precisam ser acompanhadas pela gestão."],
    ],
  },
  fiscal: {
    title: "Consultoria Fiscal para Empresas | TMF",
    description: "Organize a visão fiscal da sua empresa, identifique riscos e estabeleça prioridades com uma análise técnica e responsável da TMF.",
    eyebrow: "consultoria fiscal",
    heading: "Mais controle sobre a operação fiscal. Menos decisões no escuro.",
    intro: "A consultoria fiscal da TMF ajuda sua empresa a entender obrigações, processos e pontos de risco para tomar decisões com mais segurança. O escopo é definido conforme a realidade e a documentação disponível.",
    cta: "Conversar sobre análise fiscal",
    message: "Quero conversar sobre uma análise fiscal para minha empresa.",
    questions: ["Onde estão os principais riscos fiscais da operação?", "Como organizar melhor as obrigações e informações?", "Quais processos merecem revisão primeiro?"],
    sections: [
      ["Visão sobre o processo", "Reunimos informações da operação para enxergar como atividades, documentos e rotinas fiscais se conectam."],
      ["Riscos bem explicados", "Traduzimos pontos de atenção para uma linguagem de gestão, com clareza sobre impacto, urgência e dependências."],
      ["Rotina mais previsível", "Estruturamos prioridades para que a empresa saiba o que acompanhar, revisar e discutir com seu time."],
    ],
  },
} as const;

export default function ServicePage({ kind }: ServicePageProps) {
  const page = pages[kind];

  useEffect(() => {
    document.title = page.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", page.description);
  }, [page]);

  return (
    <div className="site-shell service-page">
      <header className="site-header"><div className="wrap nav"><a className="brand" href="/" aria-label="TMF início"><span className="brand-mark" aria-hidden="true"><span /></span><span>TMF<span className="brand-dot">.</span></span></a><nav className="desktop-nav" aria-label="Navegação principal"><a href="/#solucoes">Áreas de atuação</a><a href="/#processo">Método</a><a href="/#duvidas">Dúvidas</a><a className="nav-cta" href={wa(page.message)} target="_blank" rel="noreferrer">Falar com consultor <ArrowUpRight size={15} /></a></nav></div></header>
      <main>
        <section className="service-hero"><div className="hero-art" aria-hidden="true" /><div className="wrap service-hero-inner"><a className="back-link" href="/"><ArrowLeft size={16} /> voltar para TMF</a><span className="eyebrow"><span className="pulse-dot" /> {page.eyebrow}</span><h1>{page.heading}</h1><p className="service-intro">{page.intro}</p><div className="hero-actions"><a className="button button-primary" href={wa(page.message)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {page.cta} <ArrowUpRight size={16} /></a><a className="button button-quiet" href="#como-funciona">Entender a análise <ArrowUpRight size={16} /></a></div><div className="service-proof"><span><ShieldCheck size={16} /> análise responsável</span><span><Check size={16} /> foco no cenário real</span></div></div></section>
        <section id="como-funciona" className="section service-content"><div className="wrap service-content-grid"><div className="section-heading"><span className="section-kicker">quando procurar</span><h2>Boas perguntas<br /><span>antes da decisão.</span></h2><p>Uma análise começa quando a empresa quer trocar suposições por informação organizada.</p></div><div className="question-list">{page.questions.map((question, index) => <div className="question-row" key={question}><span>0{index + 1}</span><p>{question}</p></div>)}</div></div></section>
        <section className="section service-pillars"><div className="wrap"><div className="section-heading"><span className="section-kicker">o que avaliamos</span><h2>Estratégia com<br /><span>responsabilidade.</span></h2></div><div className="service-cards">{page.sections.map(([heading, text], index) => <article className="service-card" key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="section service-crosslink"><div className="wrap crosslink-box"><div><span className="section-kicker">visão integrada</span><h2>Tributos, fiscal, contábil, marketing e TI precisam conversar.</h2><p>Conheça a abordagem completa da TMF para conectar decisão, operação e crescimento.</p></div><a className="button button-primary" href="/">Conhecer a TMF <ArrowUpRight size={16} /></a></div></section>
        <section className="section contact-section service-contact"><div className="wrap"><div className="contact-box"><div className="contact-copy"><span className="section-kicker">próximo passo</span><h2>Vamos entender<br /><em>o seu cenário.</em></h2><p>Conte o principal desafio da sua empresa e fale com a TMF pelo WhatsApp.</p></div><a className="button button-primary contact-button" href={wa(page.message)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {page.cta}</a></div></div></section>
      </main>
      <footer className="site-footer"><div className="wrap footer-inner"><a className="brand" href="/"><span className="brand-mark" aria-hidden="true"><span /></span><span>TMF<span className="brand-dot">.</span></span></a><span>Tecnologia, Marketing e Fiscal Consultoria.</span><a href={wa(page.message)} target="_blank" rel="noreferrer">+55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}
