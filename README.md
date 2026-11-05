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
captacao-freelas/
├── src/
│   ├── qualificaLead.js   # dá pontos a um negócio e diz prioridade (alta/média/baixa) + motivos
│   └── cli.js             # lê um JSON de negócios e imprime do mais ao menos promissor
├── tests/
│   └── qualificaLead.test.js
├── data/
│   └── leads-exemplo.json # 5 negócios fictícios
├── docs/
│   ├── PROMPT-ESQUELETO.md # prompt usado para gerar o esqueleto com o agente
│   └── DECISOES.md         # o que foi aceito, ajustado e rejeitado do plano do agente
├── CLAUDE.md              # contexto e regras para o Claude Code
└── package.json
```

## Regra de pontuação (v0.1)

| sinal | pontos |
|---|---|
| não tem site | +40 |
| Instagram ativo (postou nos últimos 7 dias) | +40 |
| mais de 1.000 seguidores | +20 |

Prioridade: **alta** ≥ 70 · **média** 40–69 · **baixa** < 40.
