import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createBlogPost, createLeadSubmission, ensureDelivery, getBlogPostById, getPublishedBlogPostBySlug, listActiveNewsletterSubscribers, listBlogPostsForAdmin, listNewsletterSubscribers, listPublishedBlogPosts, markDeliveryFailed, markDeliverySent, subscribeToNewsletter, updateBlogPost } from "./db";
import { newsletterHtml, sendNewsletterEmail } from "./newsletter-mailer";

const initialPosts = [
  { id: 1, slug: "mudancas-fiscais-decisoes-seguras", title: "Como transformar mudanças fiscais em decisões mais seguras", excerpt: "Um roteiro prático para organizar informações, avaliar impactos e priorizar decisões antes de alterar processos da empresa.", contentHtml: "<h2>Diagnóstico e priorização</h2><p>Mudanças fiscais exigem mais do que acompanhar notícias: é preciso entender quais regras alcançam a operação, quais dados sustentam a análise e quais decisões podem esperar. Este artigo propõe uma sequência de diagnóstico, priorização e implementação.</p><h2>Próximos passos</h2><p>Comece mapeando os processos afetados e defina um cronograma de adaptação que preserve a rotina da equipe.</p>", category: "Fiscal", keywords: "mudanças fiscais, gestão tributária, decisão empresarial", status: "published" as const, publishedAt: new Date("2026-08-01"), updatedAt: new Date("2026-08-01") },
  { id: 2, slug: "ferramentas-digitais-operacao", title: "Ferramentas digitais que reduzem atrito na operação", excerpt: "O que observar ao escolher soluções para integrar dados, automatizar tarefas e dar mais visibilidade à rotina empresarial.", contentHtml: "<h2>Processo antes da ferramenta</h2><p>Tecnologia útil não começa pela ferramenta: começa pelo processo que precisa ser compreendido. A leitura apresenta critérios para mapear gargalos, proteger dados e escolher automações que façam sentido para a empresa.</p><h2>Critérios de escolha</h2><p>Avalie a facilidade de integração, o suporte técnico e a escalabilidade da solução antes de fechar qualquer contrato.</p>", category: "Tecnologia", keywords: "tecnologia empresarial, automação de processos, integração de dados", status: "published" as const, publishedAt: new Date("2026-07-01"), updatedAt: new Date("2026-07-01") },
  { id: 3, slug: "crescimento-com-estrutura", title: "Crescer com estrutura: fiscal, processos e tecnologia", excerpt: "Por que crescimento sustentável exige conectar conformidade, informação e execução — não apenas adotar novas ferramentas.", contentHtml: "<h2>Conexão e direção</h2><p>Crescer modifica riscos, rotinas e responsabilidades. Por isso, a estratégia precisa aproximar conformidade fiscal, organização contábil, processos e tecnologia para que a expansão não aconteça sem direção.</p><h2>Sustentabilidade</h2><p>O crescimento só é sustentável quando a base administrativa e fiscal acompanha o ritmo das vendas e da operação.</p>", category: "Estratégia", keywords: "crescimento empresarial, processos, estratégia fiscal", status: "published" as const, publishedAt: new Date("2026-06-01"), updatedAt: new Date("2026-06-01") },
];

const postFields = {
  slug: z.string().min(3).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens no slug."),
  title: z.string().min(8).max(240),
  excerpt: z.string().min(20).max(700),
  contentHtml: z.string().min(20).max(40_000),
  category: z.string().min(2).max(80),
  keywords: z.string().max(500).optional(),
};

async function dispatchPost(postId: number) {
  const post = await getBlogPostById(postId);
  if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Artigo não encontrado." });
  const subscribers = await listActiveNewsletterSubscribers();
  const results = await Promise.allSettled(subscribers.map(async (subscriber) => {
    const delivery = await ensureDelivery(post.id, subscriber.id, "auto");
    if (!delivery || delivery.status === "sent") return "already-sent";
    try {
      const result = await sendNewsletterEmail({ to: subscriber.email, subject: `Caderno Cenvara: ${post.title}`, html: newsletterHtml(post) });
      await markDeliverySent(delivery.id, result.messageId);
      return "sent";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha desconhecida no provedor.";
      await markDeliveryFailed(delivery.id, message);
      return "failed";
    }
  }));
  return results.reduce((summary, result) => {
    const value = result.status === "fulfilled" ? result.value : "failed";
    summary[value] = (summary[value] || 0) + 1;
    return summary;
  }, {} as Record<string, number>);
}

export const newsletterRouter = router({
  listPublished: publicProcedure.query(async () => { const posts = await listPublishedBlogPosts(); return posts.length ? posts : initialPosts; }),
  bySlug: publicProcedure.input(z.object({ slug: z.string().min(1).max(180) })).query(async ({ input }) => {
    const post = await getPublishedBlogPostBySlug(input.slug) ?? initialPosts.find((item) => item.slug === input.slug);
    if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Artigo não encontrado." });
    return post;
  }),
  subscribe: publicProcedure.input(z.object({ email: z.string().email(), name: z.string().max(160).optional(), consent: z.literal(true) })).mutation(({ input }) => subscribeToNewsletter(input.email.trim().toLowerCase(), input.name?.trim() || null).then(() => ({ success: true as const }))),
  captureLead: publicProcedure.input(z.object({ name: z.string().min(2).max(160), company: z.string().min(2).max(200), email: z.string().email().max(320), companySize: z.string().min(2).max(80), challenge: z.string().min(2).max(120), consent: z.literal(true), source: z.string().max(80).optional() })).mutation(({ input }) => createLeadSubmission({ name: input.name.trim(), company: input.company.trim(), email: input.email.trim().toLowerCase(), companySize: input.companySize, challenge: input.challenge, source: input.source }).then(() => ({ success: true as const }))),
  admin: router({
    listPosts: adminProcedure.query(() => listBlogPostsForAdmin()),
    listSubscribers: adminProcedure.query(() => listNewsletterSubscribers()),
    createPost: adminProcedure.input(z.object(postFields)).mutation(({ input, ctx }) => createBlogPost({ ...input, authorId: ctx.user.id, status: "draft" })),
    updatePost: adminProcedure.input(z.object({ id: z.number().int().positive(), ...postFields })).mutation(({ input }) => {
      const { id, ...values } = input;
      return updateBlogPost(id, values);
    }),
    publishPost: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
      await updateBlogPost(input.id, { status: "published", publishedAt: new Date() });
      const summary = await dispatchPost(input.id);
      return { success: true as const, summary, url: `/blog/${(await getBlogPostById(input.id))?.slug}` };
    }),
    archivePost: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
      await updateBlogPost(input.id, { status: "archived" });
      return { success: true as const };
    }),
  }),
});
