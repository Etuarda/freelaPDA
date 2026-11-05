// Cliente MCP mínimo: abre o server.mjs, faz o handshake e chama buscar_leads com os
// argumentos em JSON. Existe porque o MCP Inspector (CLI) não consegue mandar string vazia
// nem argumento gigante pela linha de comando do Windows.
// Uso: node testes/chamar.mjs '<json dos argumentos>'   ou   node testes/chamar.mjs --gigante

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pasta = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv[2] === "--gigante"
  ? { lista: "A".repeat(20000), limite: 999999 }
  : JSON.parse(process.argv[2] ?? "{}");

const server = spawn(process.execPath, [path.join(pasta, "server.mjs")], { stdio: ["pipe", "pipe", "ignore"] });
const envia = (msg) => server.stdin.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");

let sobra = "";
server.stdout.on("data", (pedaco) => {
  const linhas = (sobra + pedaco).split("\n");
  sobra = linhas.pop();
  for (const linha of linhas) {
    const msg = JSON.parse(linha);
    if (msg.id === 1) {
      envia({ method: "notifications/initialized" });
      envia({ id: 2, method: "tools/call", params: { name: "buscar_leads", arguments: args } });
    } else if (msg.id === 2) {
      console.log(JSON.stringify(msg.result ?? msg.error, null, 2).replace(/A{50,}/g, "AAAA...(cortado)"));
      server.kill();
    }
  }
});

envia({
  id: 1,
  method: "initialize",
  params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "teste-freelapda", version: "1" } },
});
