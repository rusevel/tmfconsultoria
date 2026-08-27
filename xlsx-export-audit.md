# Auditoria da exportação XLSX

A rota `/gestor/leads` foi validada em desktop (1280x720) e mobile (390x844). A interface mantém os filtros existentes e apresenta uma seção “Escolha as colunas” com seleção individual para Data, Nome, Empresa, E-mail, Porte, Assunto e Origem.

A exportação XLSX usa somente os leads retornados com os filtros aplicados e somente as colunas selecionadas. O CSV existente foi mantido como alternativa. No mobile, a seleção se reorganiza no fluxo vertical e o botão “Exportar XLSX” permanece legível e acessível.

Os testes unitários e o build passaram após a inclusão da dependência `xlsx`.
