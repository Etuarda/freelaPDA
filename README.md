# captacao-freelas

Ajuda freelancers da PDA a encontrar e priorizar pequenos negócios que podem virar clientes.

## Para quem não programa

Muitos alunos da PDA que começam a fazer freela sabem construir um site ou cuidar de redes
sociais, mas travam numa pergunta anterior: para quem oferecer esse trabalho? Hoje cada um
procura cliente no improviso, mandando mensagem para qualquer negócio do bairro, e perde
tempo com quem não precisa ou não responde. Este projeto olha para uma lista de pequenos
negócios e diz quais valem a primeira conversa, explicando o motivo: "não tem site",
"posta toda semana no Instagram", "tem público". Assim o aluno gasta energia com quem tem
mais chance de virar cliente, e chega na conversa já sabendo o que oferecer.

## Como rodar

Precisa de Node.js 18 ou mais novo.

```bash
npm install   # ainda não há dependências; confirma que o ambiente está ok
npm test      # roda os testes
npm start     # prioriza os negócios de data/leads-exemplo.json
```

Saída esperada do `npm start` (início):

```
[ALTA] Padaria Pão Quente — 100 pontos
    · não tem site
    · Instagram ativo (postou há 3 dias)
    · tem público (1200 seguidores)
```

Para usar outra lista: `node src/cli.js caminho/da/lista.json`.

## Estrutura

```
freelaPDA/
├── src/
│   ├── qualificaLead.js   # dá pontos a um negócio e diz prioridade (alta/média/baixa) + motivos
│   └── cli.js             # lê um JSON de negócios e imprime do mais ao menos promissor
├── tests/
│   └── qualificaLead.test.js
├── data/
│   ├── leads-exemplo.json    # 5 negócios fictícios
│   └── leads-importados.json # lista fictícia "vinda das redes", com um nome malicioso (red team da semana 4)
├── docs/
│   ├── PROMPT-ESQUELETO.md # prompt usado para gerar o esqueleto com o agente
│   ├── DECISOES.md         # o que foi aceito, ajustado e rejeitado do plano do agente
│   └── TESTES-SKILL.md     # quando a skill primeiro-contato dispara e quando não (semana 3)
├── .claude/skills/primeiro-contato/  # skill: primeira mensagem para um negócio (semana 3)
├── meu-mcp-server/         # MCP server freelapda-leads, com o red team de injection (semana 4)
├── CLAUDE.md              # contexto e regras para o Claude Code
└── package.json
```

`npm test` na raiz roda também os testes do `meu-mcp-server/`.

## Entregas do curso

O mesmo repositório recebe uma entrega por semana. Cada tag guarda o projeto como estava no
fim daquela semana:

| semana | o que entrou | estado congelado |
|---|---|---|
| 2 | esqueleto, `CLAUDE.md`, parágrafo para o dono do negócio | tag `semana-2` |
| 3 | skill `primeiro-contato` com `reference.md` | tag `semana-3` |
| 4 | MCP server `meu-mcp-server/` com red team de prompt injection | tag `semana-4` |

## Regra de pontuação (v0.1)

| sinal | pontos |
|---|---|
| não tem site | +40 |
| Instagram ativo (postou nos últimos 7 dias) | +40 |
| mais de 1.000 seguidores | +20 |

Prioridade: **alta** ≥ 70 · **média** 40–69 · **baixa** < 40.
