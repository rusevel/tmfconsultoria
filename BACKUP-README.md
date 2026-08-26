# Backup do projeto Cenvara Fiscal & Estratégia

Data da cópia: 26 de agosto de 2026.

Este pacote preserva o código-fonte do site, componentes React, estilos, páginas SEO, testes Vitest, documentação, sitemap, arquivos públicos pequenos, configuração do Firebase Hosting, workflow do GitHub Actions e o histórico `todo.md`.

Por segurança e para manter o arquivo leve, esta cópia não inclui dependências instaladas (`node_modules`), builds temporários (`dist`), logs locais, arquivos `.env`, credenciais, tokens, chaves de serviço ou caches. As credenciais do Firebase e demais segredos continuam administradas separadamente no GitHub/ambiente de publicação; não devem ser adicionadas ao Drive.

## Restauração básica

1. Extraia o arquivo em uma pasta de trabalho.
2. Instale Node.js 22 e pnpm 10.
3. Execute `pnpm install`.
4. Valide com `pnpm test` e `pnpm run build:firebase`.
5. Para publicar no Firebase, use o workflow do GitHub Actions após configurar os segredos necessários no repositório. Nunca copie senhas ou tokens para este pacote.

## Estado de produção

O site público permanece em `https://cenvara-consultoria.web.app/`. O canal oficial do YouTube está em `https://www.youtube.com/channel/UCYKzfZw0S-WiJ1WdHTgo2ww` e o workflow Firebase corrigido usa `pnpm build:firebase`.

## Localização no Google Drive

A pasta dedicada está em: https://drive.google.com/drive/folders/19AApn9EEGztNbM_diYYDoEX7z43m93rF

O arquivo de backup está em: https://drive.google.com/file/d/1AWFg1gKqgewgKjRvqWupkeB36b7RFDYs/view?usp=drivesdk

A propriedade foi confirmada para `barrosrusevel@gmail.com`. Para compartilhar com `cenvaraconsult@gmail.com`, abra a pasta, selecione **Compartilhar**, adicione o e-mail e escolha **Leitor** para acesso somente leitura ou **Editor** se a pessoa também precisar reorganizar arquivos. Não use “qualquer pessoa com o link” para evitar exposição pública do backup.
