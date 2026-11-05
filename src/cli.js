// Uso: node src/cli.js <arquivo-de-leads.json>
// Lê uma lista de negócios e imprime do mais promissor pro menos promissor.
import { readFile } from 'node:fs/promises';
import { priorizaLeads } from './qualificaLead.js';

const arquivo = process.argv[2];
if (!arquivo) {
  console.error('Uso: node src/cli.js <arquivo-de-leads.json>');
  process.exit(1);
}

const leads = JSON.parse(await readFile(arquivo, 'utf8'));

for (const lead of priorizaLeads(leads)) {
  console.log(`[${lead.prioridade.toUpperCase()}] ${lead.nome} — ${lead.pontos} pontos`);
  for (const motivo of lead.motivos) console.log(`    · ${motivo}`);
}
