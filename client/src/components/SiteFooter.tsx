import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle, Pin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { Brand } from "./Brand";

export function SiteFooter({ contactMessage }: { contactMessage?: string }) {
  return <footer className="site-footer"><div className="wrap footer-inner"><Brand href="#top" /><span>Clareza para decidir. Estrutura para avançar.</span><a href="/politica-de-privacidade">Política de Privacidade</a><a href={whatsappUrl(contactMessage)} target="_blank" rel="noreferrer"><MessageCircle size={14} /> +55 11 96929-3429 <ArrowUpRight size={14} /></a><a href="https://web.facebook.com/profile.php?id=61593543042320" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("facebook_click", { placement: "footer" })}><Facebook size={14} /> Facebook <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/cenvara-consult-33445a431/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("linkedin_click", { placement: "footer" })}><Linkedin size={14} /> LinkedIn <ArrowUpRight size={14} /></a><a href="https://pin.it/2KEwvnz2X" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("pinterest_click", { placement: "footer" })}><Pin size={14} /> Pinterest <ArrowUpRight size={14} /></a><a href="https://www.instagram.com/cenvaraconsult/" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("instagram_click", { placement: "footer" })}><Instagram size={14} /> Instagram <ArrowUpRight size={14} /></a></div></footer>;
}
