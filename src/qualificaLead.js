// Dá uma nota a um pequeno negócio (lead) conforme a chance de ele precisar de um freelancer.
//
// Regra (v0.1):
//   sem site                              +40  (maior oportunidade de serviço)
//   Instagram ativo (postou há ≤ 7 dias)  +40  (negócio vivo, alguém lê as mensagens)
//   mais de 1.000 seguidores              +20  (tem público, consegue pagar)
//   prioridade: alta ≥ 70 · média 40–69 · baixa < 40

const DIAS_INSTAGRAM_ATIVO = 7;
const SEGUIDORES_PUBLICO = 1000;

export function qualificaLead(lead) {
  if (!lead || typeof lead !== 'object') {
    throw new TypeError('lead precisa ser um objeto');
  }
  if (typeof lead.nome !== 'string' || lead.nome.trim() === '') {
    throw new TypeError('lead precisa ter nome');
  }

  let pontos = 0;
  const motivos = [];

  if (lead.temSite === false) {
    pontos += 40;
    motivos.push('não tem site');
  }

  const dias = lead.ultimaPostagemDias;
  if (Number.isFinite(dias) && dias >= 0 && dias <= DIAS_INSTAGRAM_ATIVO) {
    pontos += 40;
    motivos.push(`Instagram ativo (postou há ${dias} ${dias === 1 ? 'dia' : 'dias'})`);
  }

  if (Number.isFinite(lead.seguidoresInstagram) && lead.seguidoresInstagram > SEGUIDORES_PUBLICO) {
    pontos += 20;
    motivos.push(`tem público (${lead.seguidoresInstagram} seguidores)`);
  }

  return { prioridade: classifica(pontos), pontos, motivos };
}

function classifica(pontos) {
  if (pontos >= 70) return 'alta';
  if (pontos >= 40) return 'média';
  return 'baixa';
}

// Ordena do lead mais promissor pro menos promissor, sem alterar a lista original.
export function priorizaLeads(leads) {
  return leads
    .map((lead) => ({ ...lead, ...qualificaLead(lead) }))
    .sort((a, b) => b.pontos - a.pontos);
}
