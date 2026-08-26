import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { Brand } from "./Brand";

export function SiteFooter({ contactMessage }: { contactMessage?: string }) {
  return <footer className="site-footer"><div className="wrap footer-inner"><Brand href="#top" /><span>Clareza para decidir. Estrutura para avançar.</span><a href="/politica-de-privacidade">Política de Privacidade</a><a href={whatsappUrl(contactMessage)} target="_blank" rel="noreferrer"><MessageCircle size={14} /> +55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>;
}
