/* TMF privacy layer: GA4 loads only after an explicit analytics choice, with a direct route to data-use details. */
import { useEffect, useState } from "react";
import { Check, ShieldCheck, X } from "lucide-react";
import { enableAnalytics } from "@/lib/analytics";

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("tmf-analytics-consent");
    if (consent === "granted") enableAnalytics();
    if (!consent) setVisible(true);
  }, []);

  const decide = (choice: "granted" | "denied") => {
    localStorage.setItem("tmf-analytics-consent", choice);
    if (choice === "granted") enableAnalytics();
    setVisible(false);
  };

  if (!visible) return null;
  return <aside className="analytics-consent" aria-label="Preferências de análise"><div><span className="consent-icon"><ShieldCheck size={17} /></span><p><strong>Preferências de análise</strong><span>Com sua autorização, usamos métricas anônimas para entender cliques e melhorar o atendimento. Leia a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span></p></div><div className="consent-actions"><button type="button" className="consent-deny" onClick={() => decide("denied")}><X size={15} /> Recusar</button><button type="button" className="consent-allow" onClick={() => decide("granted")}><Check size={15} /> Aceitar</button></div></aside>;
}
