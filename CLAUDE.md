# captacao-freelas

## O que é este projeto

Ajuda alunos freelancers da PDA a descobrir quais pequenos negócios têm mais chance de
virar cliente, e por quê. É para os alunos freelancers da PDA (projeto do curso de
Especialização em IA, domínio 2).

## Stack

- Node.js 24, ESM (`import`/`export`), sem dependências externas
- Testes com `node:test` + `node:assert/strict`
- `src/` = código, `tests/` = um `<arquivo>.test.js` por arquivo de `src/`, `data/` = dados fictícios

## Comandos

- Instalar: `npm install` (não há dependências ainda; serve para checar o ambiente)
- Rodar: `npm start` (prioriza os leads de `data/leads-exemplo.json`)
- Testes: `npm test`

## Regras

- Testes são a especificação. Nunca edite um teste só para fazê-lo passar.
- Só diga que terminou depois de rodar `npm test` e ver tudo verde.
- Não adicione nenhuma dependência ou biblioteca sem me perguntar antes.
- Toda função nova em `src/` ganha teste em `tests/`.
- Nomes de funções e variáveis em português (`qualificaLead`, `pontos`); `===` sempre, nunca `==`.
- Dados de negócios em `data/` são fictícios. Nunca coloque dados reais de pessoas ou empresas.

## Como eu quero trabalhar com você

- Antes de criar ou mudar arquivos, me mostre o plano e espere eu confirmar.
- Mudanças pequenas e focadas. Uma tarefa por vez.
- Se não tiver certeza sobre uma API ou lib, diga que não tem certeza em vez de inventar.
- Explique o que mudou em português, em até 5 tópicos curtos.

## Onde este projeto está

- Repositório: https://github.com/ettuarda/captacao-freelas
- Quem espera isso funcionar: os alunos da PDA que fazem freela e precisam achar clientes.
