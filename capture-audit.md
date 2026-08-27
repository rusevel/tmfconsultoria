# Auditoria da jornada de captura

A Home foi verificada em desktop (1280x720, página completa) e mobile (390x844, página completa). A nova seção “Sua empresa pode estar deixando margem na mesa sem perceber” aparece após as métricas, com prova objetiva, palavra-chave DIAGNÓSTICO, CTA para WhatsApp e caminho alternativo para o formulário. No mobile, a seção passa para fluxo vertical, os botões ocupam a largura disponível e o formulário permanece legível.

A captura agora persiste nome, empresa, e-mail, porte, assunto, origem e data na tabela `lead_submissions`. O consentimento LGPD continua obrigatório; dados pessoais não são enviados ao analytics. Em caso de indisponibilidade do banco, o sistema informa o usuário e abre a conversa contextual no WhatsApp como contingência, sem exibir confirmação falsa de registro.

Validação técnica: 14 testes aprovados e build de produção concluído. A saída do build mantém apenas avisos já existentes sobre ativos `/manus-storage` e tamanho de bundle.
