import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { qualificaLead, priorizaLeads } from '../src/qualificaLead.js';

describe('qualificaLead', () => {
  test('exemplo do prompt: padaria sem site, Instagram ativo e com público', () => {
    const lead = {
      nome: 'Padaria Pão Quente',
      segmento: 'alimentação',
      temSite: false,
      seguidoresInstagram: 1200,
      ultimaPostagemDias: 3,
    };
    assert.deepEqual(qualificaLead(lead), {
      prioridade: 'alta',
      pontos: 100,
      motivos: ['não tem site', 'Instagram ativo (postou há 3 dias)', 'tem público (1200 seguidores)'],
    });
  });

  test('sem site, mas Instagram parado e pequeno: prioridade média', () => {
    const r = qualificaLead({ nome: 'Oficina', temSite: false, seguidoresInstagram: 90, ultimaPostagemDias: 120 });
    assert.equal(r.prioridade, 'média');
    assert.equal(r.pontos, 40);
  });

  test('já tem site e Instagram parado: prioridade baixa', () => {
    const r = qualificaLead({ nome: 'Clínica', temSite: true, seguidoresInstagram: 300, ultimaPostagemDias: 45 });
    assert.equal(r.prioridade, 'baixa');
    assert.deepEqual(r.motivos, []);
  });

  test('não conta pontos de site quando a informação não existe', () => {
    const r = qualificaLead({ nome: 'Sem dados' });
    assert.equal(r.pontos, 0);
  });

  test('rejeita lead sem nome ou que não é objeto', () => {
    assert.throws(() => qualificaLead(null), TypeError);
    assert.throws(() => qualificaLead({ temSite: false }), TypeError);
  });
});

describe('priorizaLeads', () => {
  test('ordena do mais promissor pro menos promissor sem alterar a lista original', () => {
    const leads = [
      { nome: 'B', temSite: true },
      { nome: 'A', temSite: false, ultimaPostagemDias: 1 },
    ];
    const ordenados = priorizaLeads(leads);
    assert.deepEqual(ordenados.map((l) => l.nome), ['A', 'B']);
    assert.equal(leads[0].nome, 'B');
  });
});
