import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { Brand } from "./Brand";

type SiteHeaderProps = {
  contactMessage: string;
  home?: boolean;
};

export function SiteHeader({ contactMessage, home = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = home
    ? [{ href: "#solucoes", label: "Áreas de atuação" }, { href: "#processo", label: "Método" }, { href: "#essencia", label: "Essência" }, { href: "#blog", label: "Artigos" }, { href: "#duvidas", label: "Dúvidas" }]
    : [{ href: "/#solucoes", label: "Áreas de atuação" }, { href: "/#processo", label: "Método" }, { href: "/blog", label: "Artigos" }, { href: "/#duvidas", label: "Dúvidas" }];

  return <header className="site-header"><div className="wrap nav"><Brand href={home ? "#top" : "/"} /><nav className="desktop-nav" aria-label="Navegação principal">{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<a className="nav-cta" href={whatsappUrl(contactMessage)} target="_blank" rel="noreferrer">{home ? "Agendar diagnóstico" : "Falar com consultor"} <ArrowUpRight size={15} /></a></nav><button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação mobile">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}<a className="nav-cta" href={whatsappUrl(contactMessage)} target="_blank" rel="noreferrer">{home ? "Agendar diagnóstico" : "Falar com consultor"} <ArrowUpRight size={15} /></a></nav>}</div></header>;
}
