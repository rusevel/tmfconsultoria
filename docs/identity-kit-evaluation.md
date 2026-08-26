# Avaliação do kit de identidade Cenvara

## Decisão de uso no site

O kit `cenvara_identity_kit_v1.0.zip` foi revisado antes da implementação do blog. O site público mantém a identidade visual por meio de CSS e SVGs leves, sem copiar o snapshot completo do site ou arquivos de auditoria para a publicação Firebase.

| Grupo | Tratamento | Justificativa |
|---|---|---|
| `02_logos/*.svg` | Seguro para uso seletivo | São vetores leves e apropriados para marca, desde que usados em dimensões acessíveis e com contraste adequado. |
| `03_design_system/cenvara.tokens.css` | Seguro como referência | Os tokens documentam cores, tipografia, raios, sombras e movimento; o projeto mantém sua própria folha global compatível com o build. |
| `03_design_system/cenvara.tokens.json` | Referência de design | Útil para futuras peças e consistência visual, mas não é necessário publicar o JSON no site. |
| `source_site/index_snapshot.html` | Não publicar diretamente | É um snapshot de auditoria e pode duplicar HTML, metadados ou lógica fora da arquitetura atual. |
| `source_site/main.js` e `source_site/main.css` | Não publicar diretamente | São artefatos do site de referência e não devem ser carregados junto da aplicação React atual. |
| `05_visual_references/*.png` e exports PNG | Não embutir por padrão | Os arquivos são pesados; podem aumentar o tempo de build e o custo de transferência. Só devem ser publicados após seleção, otimização e upload compatível com o armazenamento do projeto. |
| `04_templates/*` | Uso externo/editorial | São modelos para propostas, e-mail e redes sociais; não fazem parte do runtime público do site. |

## Regra operacional

Somente ativos leves e realmente utilizados devem entrar no build estático. Imagens e vídeos não devem ser copiados para `client/public` ou `client/src`; quando necessários para uma peça pública, devem passar por otimização e pelo fluxo de armazenamento compatível do projeto. A favicon e os elementos de marca atuais permanecem vetoriais e incorporados de forma controlada.

## Identidade aplicada

A implementação atual utiliza Space Grotesk para títulos, Manrope para texto, fundo editorial escuro, verde `#31D17C` para ação e destaque, e o símbolo CVA em SVG. A nova página de blog reaproveita esses tokens por meio da folha global e não depende de JavaScript ou CSS externo do snapshot entregue no kit.
