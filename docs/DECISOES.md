# Decisões sobre o plano do agente

O esqueleto foi gerado com o Claude Code a partir do prompt em
[PROMPT-ESQUELETO.md](PROMPT-ESQUELETO.md). O agente mostrou o plano antes de criar
qualquer arquivo. O que aconteceu com cada parte:

## Ajustado

- **Exemplo do prompt contradizia a regra.** O prompt pedia que a Padaria Pão Quente
  (sem site, postou há 3 dias, 1.200 seguidores) desse `pontos: 80`. Pela regra proposta,
  os 1.200 seguidores somam +20, então o resultado correto é 100. Mantive o bônus de
  seguidores, porque público grande é sinal de que o negócio pode pagar, e corrigi o
  esperado no teste para 100. O prompt original ficou como estava, para registro.

## Rejeitado (por enquanto)

- **`src/mensagemContato.js`** (gerar a primeira mensagem para o negócio). Faz parte do
  domínio, mas deixaria o primeiro esqueleto maior do que precisa. Fica para uma
  próxima semana.
- **Servidor web, banco de dados e integração com APIs** (ex.: buscar negócios no Google
  Maps). Excluídos já no prompt: nesta fase seriam complexidade sem uso.

## Aceito como veio

- `src/` e `tests/` separados, um teste por arquivo de código.
- Função pura `qualificaLead`, que é fácil de testar e de evoluir.
- `cli.js` para o projeto rodar de verdade (`npm start`) desde o primeiro commit.
- Dados fictícios em `data/`, para não usar dados reais de negócios.
