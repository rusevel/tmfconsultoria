# Auditoria do painel de leads

A rota `/gestor/leads` foi validada em desktop (1280x720) e mobile (390x844). O shell administrativo exibe a navegação “Redação”, “Leads captados”, “Inscritos” e “Site público”. A página apresenta contagem atual, filtros por data inicial/final, porte, assunto e origem, além das ações de atualizar e exportar CSV.

No mobile, os filtros passam para uma coluna, os botões permanecem acessíveis e a tabela fica preparada para rolagem horizontal sem cortar conteúdo. O estado vazio informa que nenhuma solicitação foi encontrada, sem criar leads de teste. O painel permanece protegido pelo `DashboardLayout` e pelo `adminProcedure`; a consulta não é pública.

Testes e build: 14 testes aprovados e build de produção concluído. O bundle público ainda exibe apenas os avisos já existentes sobre ativos `/manus-storage` e tamanho de chunk.
