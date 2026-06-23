-- Schema do banco (Neon Postgres) — registro versionado do que existe em produção.
-- Aplicado uma vez no projeto Neon "Valquiria". gen_random_uuid() é nativo no PG18 (sem extensão).
-- Para recriar do zero, rode os comandos abaixo (um por vez).

-- Submissões dos formulários (app/forms/*). Toda submissão passa pela Server Action
-- enviarFormulario → salvarSubmissao (lib/forms/salvar.ts), que insere aqui.
-- As respostas completas ficam em `respostas` (JSONB, fonte de verdade); nome/email/telefone
-- são extraídos best-effort para colunas próprias (facilita consulta/CRM) e podem ficar null.
create table form_submissions (
  id        uuid primary key default gen_random_uuid(),
  form_id   text not null,          -- slug do form: "exemplo", "raio-x", "analise-temperamento"
  titulo    text not null,          -- título humano (também vai no assunto do e-mail)
  nome      text,                   -- extraído best-effort de respostas
  email     text,                   -- idem
  telefone  text,                   -- idem (null quando o form não pede telefone)
  respostas jsonb not null,         -- fonte completa: [{ pergunta, resposta }, ...]
  criado_em timestamptz not null default now()
);

-- "Últimas submissões de um dado form" — usado pela consulta padrão do painel/CRM.
create index on form_submissions (form_id, criado_em desc);
