/* Cenvara fallback page: a clear, editorial recovery route that preserves the public brand experience. */
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";
import { Brand } from "@/components/Brand";

export default function NotFound() {
  return <div className="site-shell not-found-page"><header className="site-header"><div className="wrap nav"><Brand /><a className="nav-cta" href="/">Voltar ao início <ArrowUpRight size={15} /></a></div></header><main className="not-found-main"><div className="not-found-grid"><span className="section-kicker">rota não encontrada</span><div className="not-found-code">404</div><h1>Este caminho não faz parte do <em>diagnóstico.</em></h1><p>A página pode ter mudado ou o endereço pode estar incompleto. Volte para a Cenvara e encontre a área que procura.</p><a className="button button-primary" href="/"><ArrowLeft size={17} /> Ir para Cenvara</a><div className="not-found-signal"><Compass size={18} /><span>Clareza para decidir. Estrutura para avançar.</span></div></div></main></div>;
}
