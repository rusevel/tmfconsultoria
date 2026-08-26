# Auditoria técnica do frontend Cenvara

A experiência pública foi revisada para preservar um único sistema visual, com navegação direta, CTA de WhatsApp e conteúdo institucional responsivo. O código usa componentes de marca e de contato já compartilhados, enquanto o cabeçalho e o rodapé foram consolidados em `SiteHeader` e `SiteFooter` para reduzir repetição entre a home e as rotas de serviço.

| Área | Estado atual | Evidência verificável |
|---|---|---|
| Navegação e estados | Links de seção, menu mobile, foco visível e progresso de rota ativos. | `SiteHeader.tsx`, `App.tsx` e `index.css`. |
| Conversão | CTAs e botão flutuante direcionam ao WhatsApp; formulário valida dados e consentimento. | `WhatsAppButton.tsx`, `FloatingWhatsApp.tsx` e `LeadQualificationForm.tsx`. |
| Conteúdo compartilhado | Marca, cabeçalho, rodapé e cartões de liderança possuem componentes próprios. | `Brand.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` e `LeadershipCard.tsx`. |
| SEO | Canonicals, sitemap, robots, páginas específicas e JSON-LD de serviço configurados. | `client/index.html` e as entry pages de serviço. |
| Movimento | Transições são interrompidas quando o sistema solicita redução de movimento. | `App.tsx`, `Home.tsx` e `index.css`. |

A validação de produção deve usar `pnpm run build:firebase`, que gera o frontend estático e confirma a presença das rotas, dos títulos de SEO e de `robots.txt`/`sitemap.xml` antes do deploy.

## Decisão de marca histórica

A pesquisa pública pelo nome **JR Consultoria** identificou múltiplas empresas e perfis ativos com essa denominação. A adoção de **Cenvara Fiscal & Estratégia** evita essa colisão de busca e oferece uma identidade mais distintiva para o posicionamento atual.
