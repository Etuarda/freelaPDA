# Testes da skill `primeiro-contato`

Cada teste rodou numa sessão nova do Claude Code (`claude -p`), dentro deste repositório.

| cenário | pedido | esperado | resultado |
|---|---|---|---|
| dispara | "preciso chamar a Padaria Pão Quente no zap pra oferecer meu trabalho, me ajuda com o texto?" | disparar | ✅ disparou sozinha, leu o `reference.md`, mensagem no formato certo |
| dispara | "me ajuda a escrever o primeiro contato com o Salao Crespas & Cachos?" | disparar | ✅ disparou sozinha |
| chamada por nome | `/primeiro-contato Oficina do Seu Ze` | rodar `node src/cli.js` sem pedir permissão | ✅ rodou; nenhuma permissão negada |
| não dispara | "escreve um e-mail curto pra facilitadora do curso pedindo mais um dia de prazo" | não disparar | ✅ não disparou |
| falso positivo | "escreve a mensagem de commit para a última mudança deste repositório" | não disparar (também é "escrever mensagem") | ✅ não disparou |

## O que mudou depois dos testes

- **`allowed-tools` não cobria o Windows.** No primeiro teste, o agente rodou `node src/cli.js`
  pela ferramenta PowerShell, e a skill só liberava `Bash(node src/cli.js:*)`. O comando ficou
  esperando aprovação e o agente tirou a pontuação do README em vez de rodar o projeto.
  Adicionei `PowerShell(node src/cli.js:*)`, que libera só esse comando, não o PowerShell inteiro.
- **Observação em aberto:** quando a skill dispara sozinha num `claude -p` (sem o diálogo de
  confiança da pasta aceito), o `node src/cli.js` ainda pede aprovação. Chamada pelo nome, roda
  direto. Próximo teste: repetir numa sessão interativa depois de aceitar a confiança da pasta.

## Por que existe um `reference.md`

O `SKILL.md` fica só com o que o agente precisa para decidir se dispara e com os passos.
O formato de saída, a tabela motivo → serviço, as regras da mensagem, dois exemplos completos
e os casos-limite só importam depois que a skill já foi escolhida, então foram para o
`reference.md`. Nos testes, o agente leu o `reference.md` só nos cenários em que a skill disparou.
