import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const articles = [
  {
    category: "Fiscal",
    date: "Agosto de 2026",
    readTime: "6 min de leitura",
    title: "Como transformar mudanças fiscais em decisões mais seguras",
    excerpt: "Um roteiro prático para organizar informações, avaliar impactos e priorizar decisões antes de alterar processos da empresa.",
  },
  {
    category: "Tecnologia",
    date: "Julho de 2026",
    readTime: "5 min de leitura",
    title: "Ferramentas digitais que reduzem atrito na operação",
    excerpt: "O que observar ao escolher soluções para integrar dados, automatizar tarefas e dar mais visibilidade à rotina empresarial.",
  },
  {
    category: "Estratégia",
    date: "Junho de 2026",
    readTime: "7 min de leitura",
    title: "Crescer com estrutura: fiscal, processos e tecnologia",
    excerpt: "Por que crescimento sustentável exige conectar conformidade, informação e execução — não apenas adotar novas ferramentas.",
  },
];

export default function Blog() {
  return (
    <div className="site-shell">
      <SiteHeader home contactMessage="Quero conversar sobre os conteúdos da Cenvara." />
      <main className="blog-page" id="top">
        <section className="blog-hero">
          <div className="wrap blog-hero-grid">
            <div>
              <span className="section-kicker">Caderno Cenvara</span>
              <h1>Ideias para decidir<br /><em>com mais clareza.</em></h1>
              <p>Conteúdos mensais sobre fiscal, tecnologia e estratégia para empresas que desejam crescer com mais organização e responsabilidade.</p>
            </div>
            <div className="blog-hero-note"><span>01</span><strong>Leitura aplicada</strong><small>Informação para abrir boas conversas — não respostas genéricas.</small></div>
          </div>
        </section>
        <section className="section blog-list-section" aria-labelledby="blog-title">
          <div className="wrap">
            <div className="section-heading blog-section-heading"><span className="section-kicker">artigos recentes</span><h2 id="blog-title">Conhecimento que<br /><span>vira próximo passo.</span></h2><p>Uma curadoria editorial para acompanhar mudanças, reconhecer oportunidades e estruturar decisões melhores.</p></div>
            <div className="blog-grid">
              {articles.map((article, index) => (
                <article className="blog-card" key={article.title}>
                  <div className="blog-card-top"><span className="card-number">0{index + 1}</span><span className="blog-category">{article.category}</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="blog-meta"><span><CalendarDays size={14} /> {article.date}</span><span><Clock3 size={14} /> {article.readTime}</span></div>
                  <a className="service-cta" href={`mailto:cenvaraconsult@gmail.com?subject=${encodeURIComponent(`Quero saber mais: ${article.title}`)}`}>Conversar sobre este tema <ArrowUpRight size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section blog-cta-section"><div className="wrap"><div className="blog-cta"><div><span className="section-kicker">próximo conteúdo</span><h2>Quer receber uma leitura<br /><em>direto na conversa?</em></h2><p>Fale com a Cenvara e conte qual tema fiscal ou tecnológico merece uma análise mais próxima da realidade da sua empresa.</p></div><WhatsAppButton message="Quero receber conteúdos da Cenvara sobre temas fiscais e tecnológicos.">Falar com a Cenvara</WhatsAppButton></div></div></section>
      </main>
      <SiteFooter contactMessage="Quero conversar sobre os conteúdos da Cenvara." />
    </div>
  );
}
