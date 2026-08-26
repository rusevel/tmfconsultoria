/* Cenvara interaction layer: one source of truth for the WhatsApp destination and contextual CTA messages. */
export const WHATSAPP_NUMBER = "5511969293429";
export const DEFAULT_WHATSAPP_MESSAGE = "Quero saber mais sobre o site";

export function whatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
