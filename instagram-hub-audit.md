# Auditoria da página de links do Instagram

A entrada `client/instagram/index.html` foi criada e o build multipágina gerou `dist/public/instagram/index.html`. Porém, no servidor de desenvolvimento, `/instagram/` caiu no `NotFound` da aplicação porque a rota ainda não estava registrada no roteador React. A correção necessária é adicionar uma rota React equivalente para o preview e para o fallback SPA, mantendo a entrada HTML própria do Vite para o Firebase.

Após registrar a rota React `/instagram`, a página passou a abrir no preview. Em desktop (1280x720), a hierarquia do link da bio, CTA de diagnóstico e cinco destinos está legível. Em mobile (390x844), os botões permanecem empilhados, com textos legíveis e área de toque adequada. A versão está pronta para ser sincronizada com o Firebase.
