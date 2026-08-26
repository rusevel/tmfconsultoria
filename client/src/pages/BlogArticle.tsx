import { ArrowLeft, Check, Copy, Facebook, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const { data: post, isLoading, error } = trpc.newsletter.bySlug.useQuery({ slug: params?.slug ?? "" }, { enabled: Boolean(params?.slug) });
  const [copied, setCopied] = useState(false);
  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://cenvara-consultoria.web.app/blog/${params?.slug ?? ""}`;

  const copyLink = async () => {
    await navigator.clipboard?.writeText(articleUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (isLoading) return <div className="site-shell"><SiteHeader contactMessage="Quero conversar sobre um artigo da Cenvara." /><main className="article-page"><div className="wrap article-loading">Carregando artigo…</div></main></div>;
  if (error || !post) return <div className="site-shell"><SiteHeader contactMessage="Quero conversar sobre um artigo da Cenvara." /><main className="article-page"><div className="wrap article-loading"><h1>Artigo não encontrado.</h1><a className="back-link" href="/blog"><ArrowLeft size={15} /> Voltar ao Caderno Cenvara</a></div></main><SiteFooter contactMessage="Quero conversar sobre um artigo da Cenvara." /></div>;

  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, icon: MessageCircle },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: Linkedin },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: Facebook },
  ];
  const articleStructuredData = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, dateModified: post.updatedAt, mainEntityOfPage: articleUrl, author: { "@type": "Organization", name: "Cenvara Fiscal & Estratégia" }, publisher: { "@type": "Organization", name: "Cenvara Fiscal & Estratégia", url: "https://cenvara-consultoria.web.app/" } };
  const safeContent = post.contentHtml
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript\s*:/gi, "");

  return <div className="site-shell"><SiteHeader contactMessage={`Quero conversar sobre o artigo: ${post.title}`} /><main className="article-page" id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} /><section className="article-hero"><div className="wrap article-hero-inner"><a className="back-link" href="/blog"><ArrowLeft size={15} /> Voltar ao Caderno Cenvara</a><span className="section-kicker">{post.category}</span><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p><div className="article-meta"><span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" }) : "Caderno Cenvara"}</span><span>Leitura aplicada</span></div></div></section><section className="section article-content-section"><div className="wrap article-layout"><article className="article-content" dangerouslySetInnerHTML={{ __html: safeContent }} /><aside className="article-share" aria-label="Compartilhar este artigo"><span className="section-kicker"><Share2 size={14} /> compartilhar</span>{shareLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={16} /> {label}</a>)}<button type="button" onClick={copyLink}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Link copiado" : "Copiar link"}</button></aside></div></section></main><SiteFooter contactMessage="Quero conversar sobre os artigos da Cenvara." /><BackToTop /></div>;
}
