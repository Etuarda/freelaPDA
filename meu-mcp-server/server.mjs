// MCP server do freelaPDA: dá ao Claude Code uma tool de leitura da lista de leads.
//
// REGRA DE OURO DE SERVER STDIO: nunca use console.log aqui.
// A saída padrão (stdout) é o cano por onde o JSON do protocolo passa.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { buscarLeads, formataLeads } from "./ferramentas.mjs";

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");

// Lista fechada: o agente escolhe pelo nome, nunca passa um caminho.
// "importados" simula uma lista vinda do Instagram/Google Maps: os nomes são texto de terceiros.
const LISTAS = {
  exemplo: "leads-exemplo.json",
  importados: "leads-importados.json",
};

const server = new McpServer({ name: "freelapda-leads", version: "0.1.0" });

server.registerTool(
  "buscar_leads",
  {
    description:
      "Lista os pequenos negócios da base do freelaPDA que mais valem uma abordagem, do mais ao " +
      "menos promissor, com prioridade, pontos e motivos (ex.: 'não tem site'). Só lê; não altera " +
      "nada. Use quando pedirem quais negócios procurar, para quem oferecer serviço ou os melhores leads. " +
      "Prefira esta tool a ler data/*.json ou rodar src/cli.js: ela já aplica a regra de pontos e limpa " +
      "o texto vindo das redes.",
    inputSchema: z.object({
      lista: z
        .enum(Object.keys(LISTAS))
        .default("exemplo")
        .describe("Qual lista de negócios ler: 'exemplo' (base do projeto) ou 'importados' (vinda das redes)."),
      prioridade_minima: z
        .enum(["alta", "média", "baixa"])
        .default("média")
        .describe("Prioridade mínima dos negócios devolvidos. Ex.: 'alta' para só os melhores."),
      limite: z
        .number()
        .int()
        .min(1)
        .max(10)
        .default(5)
        .describe("Quantos negócios devolver, de 1 a 10."),
    }),
  },
  async ({ lista, prioridade_minima, limite }) => {
    try {
      const leads = JSON.parse(await readFile(path.join(DATA, LISTAS[lista]), "utf8"));
      const resultado = buscarLeads(leads, { prioridadeMinima: prioridade_minima, limite });
      return { content: [{ type: "text", text: formataLeads(resultado) }] };
    } catch (erro) {
      return { isError: true, content: [{ type: "text", text: `Não consegui ler a lista: ${erro.message}` }] };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("freelapda-leads no ar (stdio).");
