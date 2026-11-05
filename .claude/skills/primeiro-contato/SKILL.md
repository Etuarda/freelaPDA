---
name: primeiro-contato
description: Escreve a primeira mensagem de WhatsApp ou Instagram que um freelancer da PDA manda para um pequeno negócio da lista de leads, usando a prioridade e os motivos calculados pelo projeto. Use quando pedirem a mensagem de abordagem, o primeiro contato ou o texto para oferecer serviço a um negócio de data/*.json.
allowed-tools: Read, Bash(node src/cli.js:*), PowerShell(node src/cli.js:*)
---

# Primeiro contato com um lead

## O que ela faz

Recebe o nome de um negócio que está num arquivo de leads (`data/*.json`) e devolve uma
mensagem curta, pronta para colar no WhatsApp ou na DM do Instagram, oferecendo um
serviço que faz sentido para aquele negócio. A mensagem se apoia nos motivos que o
`qualificaLead` encontrou (ex.: "não tem site"), nunca em suposições.

## Quando ela dispara (e quando não deveria)

- **Dispara:** "escreve a mensagem pra eu chamar o Salão Crespas & Cachos", "como eu abordo
  a Padaria Pão Quente?"
- **Não dispara:** "escreve um e-mail para a facilitadora do curso", "melhora a mensagem de
  commit". São mensagens, mas não são abordagem de um lead.

## Passos

1. Pegue o nome do negócio em `$ARGUMENTS`. Se vier vazio, pergunte qual negócio e de qual
   arquivo (padrão: `data/leads-exemplo.json`).
2. Rode `node src/cli.js <arquivo>` e localize o negócio na saída. Se ele não estiver lá,
   diga isso e pare. Não invente dados de negócio.
3. Leia o registro do negócio no JSON para saber o segmento.
4. Escolha o serviço a oferecer pela tabela "Motivo → serviço" do
   [reference.md](reference.md) e escreva a mensagem seguindo o formato e as regras de lá.
5. Se a prioridade for **baixa**, entregue a mensagem, mas avise antes que esse lead
   provavelmente não vale o esforço agora e diga por quê.

Para o formato exato de saída, os exemplos e os casos-limite, veja
[reference.md](reference.md).

## Exemplo de invocação

```
/primeiro-contato Salão Crespas & Cachos
```

Resultado: prioridade ALTA (80 pontos; não tem site, Instagram ativo). Mensagem de 4
frases oferecendo uma página simples com horários e agendamento pelo WhatsApp, e
terminando com uma pergunta aberta.
