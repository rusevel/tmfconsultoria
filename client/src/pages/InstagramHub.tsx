const links = [
  { href: "/#diagnostico", title: "Agendar diagnóstico", detail: "Comece pela realidade da sua empresa", primary: true },
  { href: "https://wa.me/5511969293429?text=Ol%C3%A1%2C%20quero%20conhecer%20o%20diagn%C3%B3stico%20da%20Cenvara.", title: "Falar pelo WhatsApp", detail: "Envie a palavra DIAGNÓSTICO" },
  { href: "/blog/", title: "Ler o Caderno Cenvara", detail: "Artigos fiscais e tecnológicos" },
  { href: "/sobre-a-cenvara/", title: "Conhecer a Cenvara", detail: "História, método e pessoas" },
  { href: "/apresentacao/", title: "Ver a apresentação", detail: "Como podemos ajudar sua empresa" },
];

export default function InstagramHub() {
  return <main className="instagram-hub-page"><div className="instagram-hub-main"><div className="instagram-hub-mark" aria-hidden="true">C</div><p className="instagram-hub-eyebrow">Cenvara Fiscal & Estratégia</p><h1>Clareza para <span>decidir.</span></h1><p className="instagram-hub-intro">Estratégia fiscal, processos e tecnologia para empresas que querem proteger margem e avançar com estrutura.</p><nav className="instagram-hub-links" aria-label="Links principais da Cenvara">{links.map((link) => <a key={link.title} className={link.primary ? "primary" : ""} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}><span>{link.title}<small>{link.detail}</small></span><b aria-hidden="true">↗</b></a>)}</nav><p className="instagram-hub-note">Conteúdo informativo. Toda orientação específica depende de análise individual, contexto e documentação adequada.</p><p className="instagram-hub-footer">São Paulo · atuação responsável em todo o Brasil · <a href="https://www.instagram.com/cenvaraconsult/" target="_blank" rel="noreferrer">@cenvaraconsult</a></p></div></main>;
}
