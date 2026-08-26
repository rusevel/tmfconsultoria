/* TMF visual system: dark editorial minimalism, emerald action color, authored display type, and proprietary diagnostic artifacts. */
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, BarChart3, Check, ClipboardCheck, FileCheck2, Gauge, MessageCircle, ShieldCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

type ServicePageProps = { kind: "tributaria" | "fiscal" };
type PageConfig = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  cta: string;
  message: string;
  questions: string[];
  sections: [string, string][];
  artifactLabel: string;
  artifactTitle: string;
  artifactNote: string;
  artifactItems: [string, string][];
};

const pages: Record<ServicePageProps["kind"], PageConfig> = {
  tributaria: {
    title: "Consultoria Tributária para Empresas | TMF",
    description: "Avalie oportunidades legais, riscos e prioridades tributárias com uma análise sob medida para a sua empresa. Fale com a TMF.",
    eyebrow: "consultoria tributária",
    heading: "Decisões tributárias mais claras para uma empresa mais preparada.",
    intro: "A TMF analisa o contexto da sua operação para identificar oportunidades previstas na legislação, pontos de atenção e caminhos de planejamento. O diagnóstico considera os dados reais da empresa — sem promessas automáticas.",
    cta: "Agendar diagnóstico tributário",
    message: "Quero agendar um diagnóstico tributário para minha empresa.",
    questions: ["Minha empresa está no regime tributário mais adequado?", "Existem oportunidades legais que ainda não avaliamos?", "Quais riscos podem afetar margem e planejamento?"],
    sections: [["Planejamento com contexto", "Antes de recomendar qualquer caminho, entendemos atividade, operação, regime, estrutura e objetivos do negócio."], ["Oportunidades dentro da lei", "Mapeamos possibilidades aplicáveis ao cenário analisado, com premissas claras e documentação para apoiar a decisão."], ["Prioridade para agir", "O resultado é organizado em próximos passos, riscos e informações que precisam ser acompanhadas pela gestão."]],
    artifactLabel: "mapa de oportunidades / 01",
    artifactTitle: "Leitura estratégica do cenário",
    artifactNote: "Indicadores para decidir onde aprofundar a análise.",
    artifactItems: [["Regime atual", "em revisão"], ["Oportunidades", "a mapear"], ["Próxima ação", "diagnóstico"]],
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
    sections: [["Visão sobre o processo", "Reunimos informações da operação para enxergar como atividades, documentos e rotinas fiscais se conectam."], ["Riscos bem explicados", "Traduzimos pontos de atenção para uma linguagem de gestão, com clareza sobre impacto, urgência e dependências."], ["Rotina mais previsível", "Estruturamos prioridades para que a empresa saiba o que acompanhar, revisar e discutir com seu time."]],
    artifactLabel: "painel de controle / 02",
    artifactTitle: "Visibilidade da rotina fiscal",
    artifactNote: "Um recorte operacional para reduzir pontos cegos.",
    artifactItems: [["Obrigações", "organizar"], ["Pontos de risco", "priorizar"], ["Próxima ação", "revisão"]],
  },
};

function Brand() {
  return <a className="brand" href="/" aria-label="TMF início"><span className="brand-mark" aria-hidden="true"><span /></span><span>TMF<span className="brand-dot">.</span></span></a>;
}

function DiagnosticArtifact({ page, kind }: { page: PageConfig; kind: ServicePageProps["kind"] }) {
  const Icon = kind === "tributaria" ? BarChart3 : ClipboardCheck;
  return <div className={`diagnostic-artifact artifact-${kind}`} aria-label={page.artifactTitle}>
    <div className="artifact-top"><span className="artifact-live"><span className="pulse-dot" /> leitura ativa</span><span>tmf / {kind === "tributaria" ? "strategy" : "control"}</span></div>
    <div className="artifact-heading"><div className="artifact-icon"><Icon size={19} /></div><div><span>{page.artifactLabel}</span><h2>{page.artifactTitle}</h2></div></div>
    <div className="artifact-graph" aria-hidden="true"><span /><span /><span /><span /><span /><i /></div>
    <p>{page.artifactNote}</p>
    <div className="artifact-items">{page.artifactItems.map(([label, value], index) => <div key={label}><span>0{index + 1} {label}</span><strong>{value}</strong></div>)}</div>
  </div>;
}

export default function ServicePage({ kind }: ServicePageProps) {
  const page = pages[kind];
  useEffect(() => {
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
  }, [page]);

  return <div className={`site-shell service-page service-${kind}`}>
    <header className="site-header"><div className="wrap nav"><Brand /><nav className="desktop-nav" aria-label="Navegação principal"><a href="/#solucoes">Áreas de atuação</a><a href="/#processo">Método</a><a href="/#duvidas">Dúvidas</a><a className="nav-cta" href={whatsappUrl(page.message)} target="_blank" rel="noopener noreferrer">Falar com consultor <ArrowUpRight size={15} /></a></nav></div></header>
    <main>
      <section className="service-hero"><div className="hero-art" aria-hidden="true" /><div className="wrap service-hero-layout"><div className="service-hero-inner"><a className="back-link" href="/"><ArrowLeft size={16} /> voltar para TMF</a><span className="eyebrow"><span className="pulse-dot" /> {page.eyebrow}</span><h1>{page.heading}</h1><p className="service-intro">{page.intro}</p><div className="hero-actions"><WhatsAppButton message={page.message}>{page.cta}</WhatsAppButton><a className="button button-quiet" href="#como-funciona">Entender a análise <ArrowUpRight size={16} /></a></div><div className="service-proof"><span><ShieldCheck size={16} /> análise responsável</span><span><Check size={16} /> foco no cenário real</span></div></div><DiagnosticArtifact page={page} kind={kind} /></div></section>
      <section id="como-funciona" className="section service-content"><div className="wrap service-content-grid"><div className="section-heading"><span className="section-kicker">quando procurar</span><h2>{kind === "tributaria" ? <>Boas perguntas<br /><span>antes do planejamento.</span></> : <>Boas perguntas<br /><span>antes da revisão.</span></>}</h2><p>Uma análise começa quando a empresa quer trocar suposições por informação organizada.</p></div><div className="question-list">{page.questions.map((question, index) => <div className="question-row" key={question}><span>0{index + 1}</span><p>{question}</p><ArrowUpRight size={16} /></div>)}</div></div></section>
      <section className="section service-pillars"><div className="wrap"><div className="section-heading"><span className="section-kicker">o que avaliamos</span><h2>{kind === "tributaria" ? <>Estratégia para<br /><span>capturar clareza.</span></> : <>Controle para<br /><span>reduzir surpresas.</span></>}</h2></div><div className="service-cards">{page.sections.map(([heading, text], index) => <article className="service-card" key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{text}</p><div className="card-signal"><span /><small>{kind === "tributaria" ? "frente estratégica" : "frente operacional"}</small></div></article>)}</div></div></section>
      <section className="section service-crosslink"><div className="wrap crosslink-box"><div><span className="section-kicker">visão integrada</span><h2>Tributos, fiscal, contábil, marketing e TI precisam conversar.</h2><p>Conheça a abordagem completa da TMF para conectar decisão, operação e crescimento.</p></div><a className="button button-primary" href="/">Conhecer a TMF <ArrowUpRight size={16} /></a></div></section>
      <section className="section contact-section service-contact"><div className="wrap"><div className="contact-box"><div className="contact-copy"><span className="section-kicker">próximo passo</span><h2>Vamos entender<br /><em>o seu cenário.</em></h2><p>Conte o principal desafio da sua empresa e fale com a TMF pelo WhatsApp.</p></div><WhatsAppButton className="contact-button" message={page.message}>{page.cta}</WhatsAppButton></div></div></section>
    </main>
    <footer className="site-footer"><div className="wrap footer-inner"><Brand /><span>Tecnologia, Marketing e Fiscal Consultoria.</span><a href={whatsappUrl(page.message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> +55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
  </div>;
}
