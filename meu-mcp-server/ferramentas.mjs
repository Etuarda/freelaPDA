// A lógica da tool mora aqui, separada do server.
// Motivo: função pura dá pra testar com `npm test` sem abrir o Claude Code.

import { qualificaLead } from "../src/qualificaLead.js";

const ORDEM = { baixa: 0, média: 1, alta: 2 };

// Nome e segmento vêm de terceiros (perfil do Instagram, Google Maps). Só passam se forem uma
// linha curta com caracteres de nome de negócio; senão, o texto nem chega ao modelo.
const TEXTO_PERMITIDO = /^[\p{L}\p{N} &'.,()-]+$/u;
const MAX = { nome: 60, segmento: 30 };

export function limpaTextoDeTerceiro(texto, campo) {
  if (typeof texto !== "string") return { texto: "", suspeito: false };
  const t = texto.trim();
  if (t.length <= MAX[campo] && TEXTO_PERMITIDO.test(t)) return { texto: t, suspeito: false };
  return { texto: `[${campo} removido: ${t.length} caracteres fora do padrão]`, suspeito: true };
}

// Recebe a lista crua do JSON e devolve só os campos que a tarefa precisa,
// do negócio mais promissor ao menos promissor.
export function buscarLeads(leads, { prioridadeMinima = "média", limite = 5 } = {}) {
  if (!Array.isArray(leads)) throw new Error("a lista de leads precisa ser um array");
  if (!(prioridadeMinima in ORDEM)) throw new Error("prioridade_minima inválida");
  if (!Number.isInteger(limite) || limite < 1 || limite > 10) {
    throw new Error("limite precisa ser um inteiro entre 1 e 10");
  }

  return leads
    .filter((lead) => lead && typeof lead.nome === "string" && lead.nome.trim() !== "")
    .map((lead) => {
      const { prioridade, pontos, motivos } = qualificaLead(lead);
      const nome = limpaTextoDeTerceiro(lead.nome, "nome");
      const segmento = limpaTextoDeTerceiro(lead.segmento, "segmento");
      const revisar = nome.suspeito || segmento.suspeito;
      return { nome: nome.texto, segmento: segmento.texto, prioridade, pontos, motivos, revisar };
    })
    .filter((lead) => ORDEM[lead.prioridade] >= ORDEM[prioridadeMinima])
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite);
}

export function formataLeads(leads) {
  if (leads.length === 0) return "Nenhum negócio com essa prioridade.";
  const linhas = leads.map(
    (l) =>
      `[${l.prioridade.toUpperCase()}] ${l.nome} (${l.segmento}), ${l.pontos} pontos: ${l.motivos.join("; ")}` +
      (l.revisar ? " ⚠ REVISAR: registro com texto fora do padrão, avise o usuário" : ""),
  );
  return linhas.join("\n");
}
