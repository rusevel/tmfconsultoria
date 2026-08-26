import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle, Music2, Pin, Youtube } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";
import { Brand } from "./Brand";

type SocialLinkProps = {
  href: string;
  label: string;
  tooltip: string;
  eventName: string;
  icon: React.ReactNode;
};

function SocialLink({ href, label, tooltip, eventName, icon }: SocialLinkProps) {
  return (
    <a
      className="social-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${tooltip}`}
      data-tooltip={tooltip}
      onClick={() => trackEvent(eventName, { placement: "footer" })}
    >
      {icon}
      <span>{label}</span>
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export function SiteFooter({ contactMessage }: { contactMessage?: string }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Brand href="#top" />
        <span>Clareza para decidir. Estrutura para avançar.</span>
        <a href="/politica-de-privacidade">Política de Privacidade</a>
        <a className="footer-contact-link" href={whatsappUrl(contactMessage)} target="_blank" rel="noreferrer">
          <MessageCircle size={14} aria-hidden="true" /> +55 11 96929-3429 <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <nav className="footer-socials" aria-label="Canais sociais da Cenvara">
          <SocialLink
            href="https://www.instagram.com/cenvaraconsult/"
            label="Instagram"
            tooltip="Acompanhe análises e novidades da Cenvara"
            eventName="instagram_click"
            icon={<Instagram size={14} aria-hidden="true" />}
          />
          <SocialLink
            href="https://www.linkedin.com/in/cenvara-consult-33445a431/"
            label="LinkedIn"
            tooltip="Conecte-se com a Cenvara no LinkedIn"
            eventName="linkedin_click"
            icon={<Linkedin size={14} aria-hidden="true" />}
          />
          <SocialLink
            href="https://web.facebook.com/profile.php?id=61593543042320"
            label="Facebook"
            tooltip="Veja as atualizações da Cenvara no Facebook"
            eventName="facebook_click"
            icon={<Facebook size={14} aria-hidden="true" />}
          />
          <SocialLink
            href="https://www.tiktok.com/@cenvaraconsult"
            label="TikTok"
            tooltip="Acompanhe vídeos e novidades da Cenvara"
            eventName="tiktok_click"
            icon={<Music2 size={14} aria-hidden="true" />}
          />
          <SocialLink
            href="https://www.youtube.com/channel/UCYKzfZw0S-WiJ1WdHTgo2ww"
            label="YouTube"
            tooltip="Assista aos conteúdos da Cenvara no YouTube"
            eventName="youtube_click"
            icon={<Youtube size={14} aria-hidden="true" />}
          />
          <SocialLink
            href="https://pin.it/2KEwvnz2X"
            label="Pinterest"
            tooltip="Explore referências e conteúdos visuais da Cenvara"
            eventName="pinterest_click"
            icon={<Pin size={14} aria-hidden="true" />}
          />
        </nav>
      </div>
    </footer>
  );
}
