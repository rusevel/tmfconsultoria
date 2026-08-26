/* Cenvara privacy page: the same dark editorial system presents transparent, plain-language data practices. */
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { Brand } from "@/components/Brand";

const policySections = [
  {
    title: "Quais dados podem ser informados",
    text: "Quando você preenche o formulário de qualificação, pode informar nome, empresa, e-mail corporativo, porte da empresa e principal desafio. Esses dados são fornecidos por você para viabilizar o contato solicitado.",
  },
  {
    title: "Para que usamos essas informações",
    text: "A Cenvara utiliza os dados para entender o pedido, responder à solicitação e iniciar o atendimento. O formulário não grava esses dados em uma base própria do site: ao confirmar o envio, eles são organizados para abertura da conversa no WhatsApp.",
  },
  {
    title: "Contato pelo WhatsApp",
    text: "Ao enviar o formulário, você é direcionado ao WhatsApp com uma mensagem preparada a partir dos dados que preencheu. A continuidade do atendimento e o tratamento posterior de informações seguem as regras e configurações do próprio WhatsApp, além das práticas de atendimento da Cenvara.",
  },
  {
    title: "Métricas de navegação",
    text: "Métricas analíticas são ativadas somente após seu aceite no aviso de preferências. Quando autorizadas, são usadas para compreender interações agregadas, como cliques em botões, sem enviar nome, e-mail, empresa ou outros dados pessoais preenchidos no formulário.",
  },
  {
    title: "Suas escolhas e direitos",
    text: "Você pode recusar as métricas no aviso exibido no site. Para solicitar informações, correção, exclusão ou esclarecimentos sobre os dados compartilhados durante o atendimento, entre em contato com a Cenvara pelo WhatsApp. A solicitação será analisada conforme a legislação aplicável e o contexto do atendimento.",
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Política de Privacidade | Cenvara Fiscal & Estratégia";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Entenda como a Cenvara utiliza dados de contato e preferências de análise no site.");
  }, []);

  return (
    <div className="site-shell privacy-page">
      <header className="site-header">
        <div className="wrap nav">
          <Brand />
          <a className="nav-cta" href={whatsappUrl("Quero tirar uma dúvida sobre privacidade e atendimento da Cenvara.")} target="_blank" rel="noopener noreferrer">Falar com a Cenvara <ArrowUpRight size={15} /></a>
        </div>
      </header>

      <main>
        <section className="privacy-hero">
          <div className="hero-art" aria-hidden="true" />
          <div className="wrap privacy-hero-inner">
            <a className="back-link" href="/"><ArrowLeft size={16} /> voltar para Cenvara</a>
            <span className="eyebrow"><span className="pulse-dot" /> transparência de dados</span>
            <h1>Política de <em>Privacidade.</em></h1>
            <p>Esta página explica, em linguagem direta, quais informações podem ser compartilhadas ao entrar em contato pelo site da Cenvara e como usamos suas preferências de análise.</p>
          </div>
        </section>

        <section className="section privacy-content">
          <div className="wrap privacy-layout">
            <aside className="privacy-aside">
              <span className="section-kicker">compromisso Cenvara</span>
              <h2>Dados para atender, não para adivinhar.</h2>
              <p>A Cenvara busca limitar o uso de informações ao necessário para responder a uma solicitação de atendimento e melhorar o site quando houver autorização.</p>
              <div className="privacy-note"><ShieldCheck size={20} /><span>Este texto deve ser revisado e atualizado caso as práticas de atendimento ou tecnologias do site mudem.</span></div>
            </aside>
            <div className="privacy-sections">
              {policySections.map((section, index) => (
                <article className="privacy-section" key={section.title}>
                  <span>0{index + 1}</span>
                  <div><h2>{section.title}</h2><p>{section.text}</p></div>
                </article>
              ))}
              <div className="privacy-contact"><CheckCircle2 size={21} /><div><strong>Quer conversar sobre seus dados?</strong><p>Fale diretamente com a Cenvara para orientar o seu pedido.</p></div><a href={whatsappUrl("Quero falar sobre privacidade e dados compartilhados com a Cenvara.")} target="_blank" rel="noopener noreferrer">Abrir WhatsApp <ArrowUpRight size={16} /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="wrap footer-inner"><Brand /><span>Clareza para decidir. Estrutura para avançar.</span><a href="/politica-de-privacidade">Política de Privacidade</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">+55 11 96929-3429 <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}
