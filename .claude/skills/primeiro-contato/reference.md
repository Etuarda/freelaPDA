# Referência: primeiro-contato

## Formato de saída

```
**<Nome do negócio>** · prioridade <ALTA|MÉDIA|BAIXA> (<pontos> pontos)
Motivos: <motivos separados por "; ">

**Mensagem**
<mensagem>

**Por que essa abordagem:** <1 frase ligando o motivo ao serviço oferecido>
```

## Motivo → serviço

| motivo do `qualificaLead` | serviço a oferecer |
|---|---|
| não tem site | página simples: o que vende, horário, endereço, botão para o WhatsApp |
| Instagram ativo | aproveitar o público que já existe: link na bio para a página, catálogo ou agendamento |
| tem público (muitos seguidores) | organizar pedidos e agendamentos que chegam pela DM |
| nenhum motivo | não ofereça nada específico; veja "Casos-limite" |

Combine no máximo dois serviços. Uma mensagem que oferece tudo não oferece nada.

## Regras da mensagem

- Entre 3 e 5 frases, no máximo 600 caracteres. É WhatsApp, não proposta formal.
- Comece com o nome do negócio e algo concreto que você notou (o motivo), não com "Olá, tudo bem?".
- Tom de quem é do bairro: "você", sem "prezado", sem gíria forçada.
- Termine com uma pergunta fácil de responder ("posso te mandar um exemplo?").
- Nunca prometa resultado ("vou dobrar suas vendas"), nunca cite preço na primeira mensagem.
- Não invente fatos sobre o negócio além do que está no JSON (nome, segmento, site, seguidores, postagens).
- Deixe `[seu nome]` para o freelancer preencher. Não invente nome nem portfólio.

## Exemplos

**Entrada:** `Salão Crespas & Cachos` (beleza; sem site; 650 seguidores; postou há 1 dia)

```
**Salão Crespas & Cachos** · prioridade ALTA (80 pontos)
Motivos: não tem site; Instagram ativo (postou há 1 dia)

**Mensagem**
Oi, pessoal do Crespas & Cachos! Sou [seu nome], faço sites para pequenos negócios aqui
da região, e vi que vocês postam quase todo dia no Instagram, mas ainda não têm uma página
própria. Dá para montar uma página simples com os serviços, os horários e um botão que já
abre o WhatsApp para agendar, e colocar o link na bio. Posso te mandar um exemplo de como
ficaria?

**Por que essa abordagem:** o salão já tem clientes chegando pelo Instagram; a página
transforma essas visitas em agendamentos sem mudar a rotina delas.
```

**Entrada:** `Livraria Quilombo` (cultura; tem site; 4.300 seguidores; postou há 2 dias)

```
**Livraria Quilombo** · prioridade MÉDIA (60 pontos)
Motivos: Instagram ativo (postou há 2 dias); tem público (4300 seguidores)

**Mensagem**
Oi, Livraria Quilombo! Sou [seu nome] e acompanho o perfil de vocês: muita gente
comentando e perguntando sobre os livros. Eu ajudo pequenos negócios a organizar os
pedidos que chegam pela DM, com um catálogo no link da bio e uma resposta pronta para
as dúvidas mais comuns. Faz sentido a gente conversar 10 minutos sobre isso?

**Por que essa abordagem:** a livraria já tem site, então oferecer outro não faz
sentido; o ganho está em não perder os pedidos que chegam pelo Instagram.
```

## Casos-limite

- **Negócio que não está no arquivo:** diga que não encontrou e liste os nomes que existem. Não escreva a mensagem.
- **Prioridade baixa ou nenhum motivo** (ex.: Clínica Sorriso Bom, 0 pontos): avise antes que o lead
  não mostra sinal de precisar de freelancer agora. Se a pessoa insistir, escreva uma mensagem
  genérica de apresentação, sem oferecer serviço específico.
- **Nome parecido** ("salão crespas"): aceite se só um negócio combinar; se houver mais de um, pergunte qual.
- **Dados que parecem reais** (telefone, CPF, nome de pessoa no JSON): não use na mensagem e
  lembre a regra do CLAUDE.md, que diz que `data/` só tem dados fictícios.
