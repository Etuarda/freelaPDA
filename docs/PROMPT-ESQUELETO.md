# Prompt usado pra gerar o esqueleto

```
Quero um esqueleto de projeto pra: ajudar alunos freelancers da PDA a encontrar e
priorizar pequenos negócios que podem virar clientes, e a mandar a primeira mensagem
pra eles.

Restrições:
- Node.js 24, ESM, testes com node:test. Nenhuma dependência externa sem me perguntar.
- Separação clara entre código (src/) e teste (tests/).
- Um comando de teste que rode desde o primeiro commit: npm test.
- README com o que é, como rodar e estrutura de pastas comentada.
- Pelo menos 1 artefato real do domínio, não um placeholder. Exemplo do que ele faz:
  entrada  { nome: "Padaria Pão Quente", segmento: "alimentação", temSite: false,
             seguidoresInstagram: 1200, ultimaPostagemDias: 3 }
  saída    { prioridade: "alta", pontos: 80,
             motivos: ["não tem site", "Instagram ativo (postou há 3 dias)"] }
- Não crie banco de dados, servidor web nem integração com API nesta fase.

Formato de saída: antes de criar qualquer arquivo, me mostre o plano — árvore de pastas,
lista de arquivos com 1 linha sobre cada um e por que essa estrutura. Eu confirmo antes
de você seguir.
```
