import { useState } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setEmail("");
      setConsent(false);
      setMessage("Inscrição confirmada. Você receberá as próximas leituras da Cenvara.");
    },
    onError: () => setMessage("Não foi possível concluir agora. Verifique o e-mail e tente novamente."),
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");
    if (!email.trim() || !consent) {
      setMessage("Informe um e-mail válido e aceite receber as novidades mensais.");
      return;
    }
    subscribe.mutate({ email: email.trim(), consent: true });
  };

  return <section className="newsletter-signup" aria-labelledby="newsletter-title"><div><span className="section-kicker"><Mail size={14} /> caderno mensal</span><h2 id="newsletter-title">Uma leitura clara<br /><em>por mês.</em></h2><p>Receba análises fiscais, tecnológicas e estratégicas para acompanhar decisões importantes sem excesso de ruído.</p></div><form onSubmit={submit} noValidate><label htmlFor="newsletter-email">E-mail corporativo</label><div className="newsletter-input-row"><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@empresa.com.br" autoComplete="email" required /><button type="submit" disabled={subscribe.isPending}>{subscribe.isPending ? "Inscrevendo…" : <>Inscrever <ArrowUpRight size={15} /></>}</button></div><label className="newsletter-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>Autorizo o uso do meu e-mail para receber as novidades mensais da Cenvara, conforme a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span></label>{message && <p className="newsletter-status" role="status" aria-live="polite">{message.includes("confirmada") && <Check size={15} />} {message}</p>}</form></section>;
}
