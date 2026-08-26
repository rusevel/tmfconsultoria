import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LeadQualificationForm } from "@/components/LeadQualificationForm";

const cases = [
  {
    number: "01",
    name: "Carlos Mendes",
    role: "Empresário",
    title: "Mais clareza para decidir",
    quote: "A Cenvara nos ajudou a enxergar pontos que antes passavam despercebidos. A análise foi objetiva, profissional e trouxe informações importantes para tomarmos decisões com mais segurança.",
    impact: ["Visão mais clara do negócio", "Pontos de atenção identificados", "Mais segurança na tomada de decisão"],
  },
  {
    number: "02",
    name: "Mariana Oliveira",
    role: "Gestora Administrativa",
    title: "Atendimento próximo e soluções práticas",
    quote: "O que mais gostei foi a forma como a consultoria entendeu nossa realidade antes de apresentar qualquer solução. O atendimento foi muito transparente e as orientações foram realmente aplicáveis ao nosso negócio.",
    impact: ["Contexto compreendido antes da recomendação", "Orientações aplicáveis", "Atendimento transparente"],
  },
  {
    number: "03",
    name: "Rafael Almeida",
    role: "Diretor Comercial",
    title: "Mais organização para decidir",
    quote: "Precisávamos entender melhor nossa situação e identificar onde poderíamos melhorar. A Cenvara fez uma análise completa e apresentou as informações de maneira simples e objetiva.",
    impact: ["Situação atual organizada", "Oportunidades de melhoria identificadas", "Informação apresentada com clareza"],
  },
  {
    number: "04",
    name: "Fernanda Costa",
    role: "Empresária",
    title: "Profissionalismo do início ao fim",
    quote: "Desde o primeiro contato, fomos muito bem atendidos. A equipe demonstrou conhecimento, organização e preocupação em entender nossas necessidades.",
    impact: ["Atendimento organizado", "Necessidades compreendidas", "Percepção de profissionalismo"],
  },
  {
    number: "05",
    name: "Lucas Ferreira",
    role: "Sócio-Administrador",
    title: "Caminhos possíveis para a operação",
    quote: "A Cenvara não ficou apenas na teoria. Entenderam nossos desafios e apresentaram caminhos possíveis para melhorar nossa operação. O atendimento próximo fez toda a diferença.",
    impact: ["Desafios operacionais compreendidos", "Caminhos possíveis apresentados", "Proximidade no atendimento"],
  },
  {
    number: "06",
    name: "Patrícia Santos",
    role: "Empresária",
    title: "Clareza para priorizar",
    quote: "Antes da consultoria, tínhamos muitas informações, mas pouca clareza sobre o que realmente precisava ser priorizado. A análise ajudou a organizar as ideias e identificar oportunidades de melhoria.",
    impact: ["Informações organizadas", "Prioridades mais claras", "Oportunidades de melhoria identificadas"],
  },
];

export default function SuccessCases() {
  return (
    <div className="site-shell">
      <SiteHeader contactMessage="Quero conhecer os casos da Cenvara." />
      <main className="success-page">
        <section className="success-hero section">
          <div className="wrap success-hero-grid">
            <div className="reveal">
              <a className="back-link" href="/"><ArrowLeft size={15} /> Voltar para a home</a>
              <span className="section-kicker">casos de sucesso</span>
              <h1>Experiências reais.<br /><em>Impactos percebidos.</em></h1>
              <p>Relatos publicados com autorização, organizados por dimensões de impacto mencionadas pelos próprios clientes. Não exibimos métricas numéricas que não tenham sido fornecidas ou verificadas.</p>
              <WhatsAppButton message="Quero entender como a Cenvara pode ajudar minha empresa.">Conversar sobre meu cenário</WhatsAppButton>
            </div>
            <div className="success-hero-note reveal">
              <span className="card-number">como lemos impacto</span>
              <strong>Clareza antes de quantidade.</strong>
              <p>Os relatos destacam clareza, organização, priorização, segurança e aplicabilidade. Esses sinais qualitativos ajudam a mostrar o valor percebido sem transformar uma experiência individual em promessa universal.</p>
            </div>
          </div>
        </section>

        <section className="success-grid-section section">
          <div className="wrap">
            <div className="section-heading reveal">
              <span className="section-kicker">relatos autorizados</span>
              <h2>O que mudou na percepção <span>de cada empresa.</span></h2>
            </div>
            <div className="success-cases-grid">
              {cases.map((item) => (
                <article className="success-case reveal" key={item.number}>
                  <div className="success-case-head"><span>{item.number}</span><span>relato real</span></div>
                  <h3>{item.title}</h3>
                  <blockquote>“{item.quote}”</blockquote>
                  <div className="success-case-person"><strong>{item.name}</strong><span>{item.role}</span></div>
                  <div className="success-impact"><span className="card-number">impacto relatado</span>{item.impact.map((point) => <div key={point}><CheckCircle2 size={15} /> <span>{point}</span></div>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="success-contact section">
          <div className="wrap success-contact-grid">
            <div className="section-heading reveal"><span className="section-kicker">próximo passo</span><h2>Vamos encontrar o centro da sua <span>próxima decisão.</span></h2><p>Conte-nos o principal desafio da sua empresa. O formulário é rápido, exige consentimento e abre o WhatsApp apenas depois da validação.</p></div>
            <div className="success-contact-form reveal"><LeadQualificationForm /></div>
          </div>
        </section>

        <section className="success-method section">
          <div className="wrap success-method-grid">
            <div className="section-heading reveal"><span className="section-kicker">interpretação responsável</span><h2>Relato é evidência de experiência, não <span>promessa de resultado.</span></h2></div>
            <div className="success-method-copy reveal"><p>Os depoimentos ajudam a mostrar como o trabalho foi percebido por cada pessoa. O impacto de uma consultoria varia conforme segmento, dados disponíveis, momento da empresa e decisões tomadas depois da análise.</p><a className="text-link" href="/#processo">Conheça o método da Cenvara <ArrowUpRight size={15} /></a></div>
          </div>
        </section>
      </main>
      <SiteFooter contactMessage="Quero conhecer os casos da Cenvara." />
    </div>
  );
}
