import { ArrowUpRight, CalendarDays, Clock3, Link2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const articles = [
  {
    slug: "mudancas-fiscais-decisoes-seguras",
    category: "Fiscal",
    date: "Agosto de 2026",
    datePublished: "2026-08-01",
    readTime: "6 min de leitura",
    title: "Como transformar mudanças fiscais em decisões mais seguras",
    excerpt: "Um roteiro prático para organizar informações, avaliar impactos e priorizar decisões antes de alterar processos da empresa.",
    body: "Mudanças fiscais exigem mais do que acompanhar notícias: é preciso entender quais regras alcançam a operação, quais dados sustentam a análise e quais decisões podem esperar. Este artigo propõe uma sequência de diagnóstico, priorização e implementação.",
    keywords: ["mudanças fiscais", "gestão tributária", "decisão empresarial"],
    relatedHref: "/consultoria-fiscal",
    relatedLabel: "Conheça a consultoria fiscal",
  },
  {
    slug: "ferramentas-digitais-operacao",
    category: "Tecnologia",
    date: "Julho de 2026",
    datePublished: "2026-07-01",
    readTime: "5 min de leitura",
    title: "Ferramentas digitais que reduzem atrito na operação",
    excerpt: "O que observar ao escolher soluções para integrar dados, automatizar tarefas e dar mais visibilidade à rotina empresarial.",
    body: "Tecnologia útil não começa pela ferramenta: começa pelo processo que precisa ser compreendido. A leitura apresenta critérios para mapear gargalos, proteger dados e escolher automações que façam sentido para a empresa.",
    keywords: ["tecnologia empresarial", "automação de processos", "integração de dados"],
    relatedHref: "/sobre-a-cenvara",
    relatedLabel: "Conheça a visão da Cenvara",
  },
  {
    slug: "crescimento-com-estrutura",
    category: "Estratégia",
    date: "Junho de 2026",
    datePublished: "2026-06-01",
    readTime: "7 min de leitura",
    title: "Crescer com estrutura: fiscal, processos e tecnologia",
    excerpt: "Por que crescimento sustentável exige conectar conformidade, informação e execução — não apenas adotar novas ferramentas.",
    body: "Crescer modifica riscos, rotinas e responsabilidades. Por isso, a estratégia precisa aproximar conformidade fiscal, organização contábil, processos e tecnologia para que a expansão não aconteça sem direção.",
    keywords: ["crescimento empresarial", "processos", "estratégia fiscal"],
    relatedHref: "/consultoria-tributaria",
    relatedLabel: "Conheça a consultoria tributária",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Caderno Cenvara",
  url: "https://cenvara-consultoria.web.app/blog",
  description: "Artigos fiscais, tecnológicos e estratégicos para decisões empresariais mais claras.",
  isPartOf: { "@type": "WebSite", name: "Cenvara Fiscal & Estratégia", url: "https://cenvara-consultoria.web.app/" },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.datePublished,
        dateModified: article.datePublished,
        url: `https://cenvara-consultoria.web.app/blog#${article.slug}`,
        keywords: article.keywords.join(", "),
        author: { "@type": "Organization", name: "Cenvara Fiscal & Estratégia" },
        publisher: { "@type": "Organization", name: "Cenvara Fiscal & Estratégia", url: "https://cenvara-consultoria.web.app/" },
      },
    })),
  },
};

export default function Blog() {
  const { data: dbPosts, isLoading } = trpc.newsletter.listPublished.useQuery();
  const displayPosts = dbPosts?.length ? dbPosts.map(p => ({
    slug: p.slug,
    category: p.category,
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "Caderno Cenvara",
    readTime: "Leitura aplicada",
    title: p.title,
    excerpt: p.excerpt,
    body: p.excerpt,
    relatedHref: `/blog/${p.slug}`,
    relatedLabel: "Ler artigo completo"
  })) : articles;

  return (
    <div className="site-shell">
      <SiteHeader home contactMessage="Quero conversar sobre os conteúdos da Cenvara." />
      <main className="blog-page" id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
              {isLoading ? <p className="article-loading">Carregando artigos…</p> : displayPosts.map((article, index) => (
                <article className="blog-card" id={article.slug} key={article.slug}>
                  <div className="blog-card-top"><span className="card-number">0{index + 1}</span><span className="blog-category">{article.category}</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <p className="blog-article-summary">{article.body}</p>
                  <div className="blog-meta"><span><CalendarDays size={14} /> {article.date}</span><span><Clock3 size={14} /> {article.readTime}</span></div>
                                      <div className="blog-card-links"><a className="service-cta" href={`/blog/${article.slug}`}>Ler artigo completo <ArrowUpRight size={16} /></a><a className="service-cta" href={article.relatedHref}><Link2 size={15} /> {article.relatedLabel}</a></div>

                </article>
              ))}
            </div>
          </div>
        </section>
        <NewsletterSignup />
        <section className="section blog-cta-section"><div className="wrap"><div className="blog-cta"><div><span className="section-kicker">próximo conteúdo</span><h2>Quer receber uma leitura<br /><em>direto na conversa?</em></h2><p>Fale com a Cenvara e conte qual tema fiscal ou tecnológico merece uma análise mais próxima da realidade da sua empresa.</p></div><WhatsAppButton message="Quero receber conteúdos da Cenvara sobre temas fiscais e tecnológicos.">Falar com a Cenvara</WhatsAppButton></div></div></section>
      </main>
      <SiteFooter contactMessage="Quero conversar sobre os conteúdos da Cenvara." />
      <BackToTop />
    </div>
  );
}
