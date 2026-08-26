/* Cenvara visual system: reusable emerald CTA with clear focus states and contextual conversion copy. */
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "quiet";
};

export function WhatsAppButton({ message, children, className = "", variant = "primary" }: WhatsAppButtonProps) {
  return (
    <a className={`button button-${variant} ${className}`.trim()} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_cta_click", { placement: className || "primary_cta" })}>
      <MessageCircle size={18} aria-hidden="true" />
      <span>{children}</span>
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
