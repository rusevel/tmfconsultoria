/* Cenvara conversion layer: persistent contact access across every public route. */
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a className="whatsapp-float" href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Abrir conversa no WhatsApp" onClick={() => trackEvent("whatsapp_float_click", { placement: "global_float" })}>
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  );
}
