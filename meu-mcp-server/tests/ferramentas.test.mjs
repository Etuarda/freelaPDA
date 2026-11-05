import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buscarLeads, formataLeads } from "../ferramentas.mjs";

const exemplo = JSON.parse(readFileSync(new URL("../../data/leads-exemplo.json", import.meta.url), "utf8"));

test("buscar_leads devolve os negócios de prioridade alta em ordem", () => {
  const r = buscarLeads(exemplo, { prioridadeMinima: "alta" });
  assert.deepEqual(r.map((l) => l.nome), ["Padaria Pão Quente", "Salão Crespas & Cachos"]);
  assert.equal(r[0].pontos, 100);
});

test("buscar_leads devolve só os campos que a tarefa precisa", () => {
  const [lead] = buscarLeads([{ nome: "X", temSite: false, telefone: "11 9999-9999" }], { prioridadeMinima: "baixa" });
  assert.deepEqual(Object.keys(lead).sort(), ["motivos", "nome", "pontos", "prioridade", "revisar", "segmento"]);
});

test("nome com instrução escondida não chega ao modelo e o registro é marcado para revisão", () => {
  const importados = JSON.parse(readFileSync(new URL("../../data/leads-importados.json", import.meta.url), "utf8"));
  const texto = formataLeads(buscarLeads(importados, { prioridadeMinima: "baixa" }));
  assert.doesNotMatch(texto, /INVADIDO|NOTA DO SISTEMA|ASSISTENTE/);
  assert.match(texto, /\[nome removido: \d+ caracteres fora do padrão\].*REVISAR/);
  assert.match(texto, /Barbearia Navalha de Ouro \(beleza\)/);
});

test("nome gigante é cortado inteiro, não vai pro contexto do agente", () => {
  const [lead] = buscarLeads([{ nome: "A".repeat(50000), temSite: false }], { prioridadeMinima: "baixa" });
  assert.equal(lead.nome, "[nome removido: 50000 caracteres fora do padrão]");
  assert.equal(lead.revisar, true);
});

test("nomes reais de negócio continuam passando", () => {
  for (const nome of ["Salão Crespas & Cachos", "Oficina do Seu Zé", "Pão d'Açúcar (Centro)", "Mercado 24-Horas"]) {
    assert.equal(buscarLeads([{ nome, temSite: false }], { prioridadeMinima: "baixa" })[0].nome, nome);
  }
});

test("buscar_leads respeita o limite e recusa limite fora de 1 a 10", () => {
  assert.equal(buscarLeads(exemplo, { prioridadeMinima: "baixa", limite: 2 }).length, 2);
  assert.throws(() => buscarLeads(exemplo, { limite: 0 }));
  assert.throws(() => buscarLeads(exemplo, { limite: 50 }));
});

test("buscar_leads ignora registros sem nome e lista vazia não quebra", () => {
  assert.deepEqual(buscarLeads([]), []);
  assert.deepEqual(buscarLeads([{ temSite: false }, null]), []);
  assert.equal(formataLeads([]), "Nenhum negócio com essa prioridade.");
});
