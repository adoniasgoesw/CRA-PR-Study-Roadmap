/* Cronograma 21/07/2026 → 13/09/2026 — CRA-PR Analista de Sistemas */

const CRONOGRAMA_EXAM = new Date(2026, 8, 13);
const CRONOGRAMA_INICIO = new Date(2026, 6, 21);
const CRONOGRAMA_FASE1_FIM = new Date(2026, 7, 2);

const CRONOGRAMA_PRIORIDADES = [
  { cat: "legis", nome: "Legislação CRA-PR/CFA", peso: "25%", cor: "#922b21" },
  { cat: "portugues", nome: "Língua Portuguesa", peso: "20%", cor: "#6c3483" },
  { cat: "especifico", nome: "Conhecimentos do Cargo (TI)", peso: "20%", cor: "#1a5276" },
  { cat: "adm", nome: "Adm. Pública", peso: "15%", cor: "#2874a6" },
  { cat: "rlm", nome: "Raciocínio Lógico", peso: "10%", cor: "#b7950b" },
  { cat: "informatica", nome: "Informática", peso: "10%", cor: "#1e8449" },
  { cat: "simulado", nome: "Simulados", peso: "—", cor: "#7f8c8d" },
  { cat: "redacao", nome: "Redação discursiva", peso: "—", cor: "#d35400" },
  { cat: "revisao", nome: "Revisão", peso: "—", cor: "#95a5a6" },
];

const CRONOGRAMA_REGRAS = [
  "100% questões — gabarito comentado como teoria (só ler o que errou).",
  "Seg–Sex: 2 disciplinas por dia — manhã 4h (prioridade) + noite 3h (segunda disciplina).",
  "Manhã: Legislação ou Português (alternando). Noite: Cargo, Adm., RLM ou Informática (rodízio).",
  "Sábado: redação discursiva. Domingo: simulado + revisão dos erros.",
  "Fase 1 (21/07–02/08): 07:30–11:30 (4h) e 19:00–22:00 (3h), pausa 10 min em cada bloco.",
  "Fase 2 (03/08–12/09): 16:00–18:00 e 20:30–22:00, pausa 10 min em cada bloco.",
  "Últimas 2 semanas: simulados completos de 50 questões, cronometrados (corte 60%).",
  "Se atrasar, redistribua na mesma semana — não dobre a carga.",
];

function dk(y, m, d) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function slot(horario, horas, cat, titulo, desc) {
  return { horario, horas, cat, titulo, desc: desc || "" };
}

function buildDia(key, meta) {
  const horas = meta.slots.reduce((s, x) => s + x.horas, 0);
  return { ...meta, horas: Math.round(horas * 10) / 10 };
}

const CRONOGRAMA_DIAS = {};

function set(key, data) {
  CRONOGRAMA_DIAS[key] = buildDia(key, data);
}

const F1 = {
  manha: (cat, titulo, desc) => slot("07:30–11:30", 4, cat, titulo, desc),
  noite: (cat, titulo, desc) => slot("19:00–22:00", 3, cat, titulo, desc),
};

const F2 = {
  tarde: (cat, titulo, desc) => slot("16:00–18:00", 1.8, cat, titulo, desc),
  noite: (cat, titulo, desc) => slot("20:30–22:00", 1.3, cat, titulo, desc),
};

function diaF1(key, sem, slots, nota) {
  set(key, { fase: 1, semana: sem, nota: nota || "", slots });
}

function diaF2(key, sem, slots, nota) {
  set(key, { fase: 2, semana: sem, nota: nota || "", slots });
}

function sabRedacao(fase, key, sem, tema) {
  const slots = fase === 1
    ? [
      F1.manha("redacao", "Redação discursiva", `${tema} — rascunho + texto final (25–30 linhas)`),
      F1.noite("redacao", "Redação discursiva", "Correção pelo modelo + reescrita dos parágrafos fracos"),
    ]
    : [
      F2.tarde("redacao", "Redação discursiva", `${tema} — dissertação cronometrada (50 min)`),
      F2.noite("redacao", "Redação discursiva", "Autoavaliação: coesão, argumentação e norma culta"),
    ];
  if (fase === 1) diaF1(key, sem, slots);
  else diaF2(key, sem, slots);
}

function domSimulado(fase, key, sem, nQuestoes, foco) {
  const slots = fase === 1
    ? [
      F1.manha("simulado", `Simulado — ${nQuestoes} questões`, `${foco} — cronometrado, sem consulta`),
      F1.noite("revisao", "Revisão pós-simulado", "Corrigir erros + 15 questões extras nos tópicos que errou"),
    ]
    : [
      F2.tarde("simulado", `Simulado — ${nQuestoes} questões`, `${foco} — cronometrado, sem consulta`),
      F2.noite("revisao", "Revisão pós-simulado", "Corrigir erros + flashcards dos pontos fracos"),
    ];
  if (fase === 1) diaF1(key, sem, slots);
  else diaF2(key, sem, slots);
}

/* ══════════════════════════════════════════════════════════════
   FASE 1 — INTENSIVA (21/07 a 02/08) · 2 disciplinas/dia · 7h
   ══════════════════════════════════════════════════════════════ */

/* ── Semana 1 (21/07 Ter – 27/07 Seg) ── */
diaF1("2026-07-21", 1, [
  F1.manha("legis", "Legislação CRA-PR/CFA", "Lei 4.769/1965 — 25 questões + quadro-resumo (CFA, CRAs, registro, penalidades)"),
  F1.noite("especifico", "Cargo — Bloco C", "Arquitetura de computadores — numeração, CPU, interrupções (20 questões)"),
]);

diaF1("2026-07-22", 1, [
  F1.manha("portugues", "Língua Portuguesa", "Fonologia, ortografia e acentuação — 25 questões"),
  F1.noite("adm", "Adm. Pública", "Art. 5º CF + Art. 37 CF — 15 questões"),
]);

diaF1("2026-07-23", 1, [
  F1.manha("legis", "Legislação CRA-PR/CFA", "Decreto 61.934/1967 — 25 questões (CFA × CRAs, mandatos, competências)"),
  F1.noite("rlm", "Raciocínio Lógico", "Conjuntos, sequências e regra de três — 20 questões"),
]);

diaF1("2026-07-24", 1, [
  F1.manha("portugues", "Língua Portuguesa", "Morfologia e classes de palavras — 25 questões"),
  F1.noite("informatica", "Informática", "Hardware PC, Windows e Google Workspace — 15 questões"),
]);

sabRedacao(1, "2026-07-25", 1, "Tema: ética profissional do Administrador e fiscalização do CRA-PR");
domSimulado(1, "2026-07-26", 1, 25, "Legislação + Português + RLM");

/* ── Semana 2 (27/07 Seg – 02/08 Dom) ── */
diaF1("2026-07-27", 2, [
  F1.manha("legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 1º–11º — 25 questões"),
  F1.noite("especifico", "Cargo — Bloco C", "Sistemas operacionais — processos, memória, deadlock (20 questões)"),
]);

diaF1("2026-07-28", 2, [
  F1.manha("portugues", "Língua Portuguesa", "Sintaxe e período composto — 25 questões"),
  F1.noite("adm", "Adm. Pública", "Centralização, descentração, direta/indireta — 15 questões"),
]);

diaF1("2026-07-29", 2, [
  F1.manha("legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 12º–23º — 25 questões"),
  F1.noite("especifico", "Cargo — Bloco C", "Estrutura de dados — árvores, grafos, complexidade (20 questões)"),
]);

diaF1("2026-07-30", 2, [
  F1.manha("portugues", "Língua Portuguesa", "Concordância, regência e crase — 25 questões"),
  F1.noite("rlm", "Raciocínio Lógico", "Progressões, combinatória e probabilidade — 20 questões"),
]);

diaF1("2026-07-31", 2, [
  F1.manha("legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 24º–35º — 25 questões"),
  F1.noite("especifico", "Cargo — Bloco B", "BD, SQL, redes e segurança — 20 questões"),
]);

sabRedacao(1, "2026-08-01", 2, "Tema: papel do CFA/CRAs na regulamentação da profissão");
domSimulado(1, "2026-08-02", 2, 30, "Todas as disciplinas — aquecimento");

/* ══════════════════════════════════════════════════════════════
   FASE 2 — REDUZIDA (03/08 a 27/08) · ~3h/dia · cruzamento diário
   ══════════════════════════════════════════════════════════════ */

/* ── Semana 3 (03/08 Seg – 09/08 Dom) ── */
diaF2("2026-08-03", 3, [
  F2.tarde("portugues", "Língua Portuguesa", "Interpretação de texto + pontuação — 12 questões"),
  F2.noite("especifico", "Cargo — Bloco A", "Dev Web + Django + Git — revisão rápida (10 questões)"),
], "Início da fase reduzida");

diaF2("2026-08-04", 3, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "2ª rodada Lei 4.769 + Decreto 61.934 — 15 questões"),
  F2.noite("adm", "Adm. Pública", "Ato administrativo + agentes públicos + poderes — 8 questões"),
]);

diaF2("2026-08-05", 3, [
  F2.tarde("portugues", "Língua Portuguesa", "Revisão ortografia + interpretação — 12 questões"),
  F2.noite("rlm", "Raciocínio Lógico", "Bateria mista — 10 questões"),
]);

diaF2("2026-08-06", 3, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 1º–23º — 12 questões"),
  F2.noite("especifico", "Cargo — Bloco C", "SO + arquitetura — 10 questões"),
]);

diaF2("2026-08-07", 3, [
  F2.tarde("portugues", "Língua Portuguesa", "Concordância, regência, crase — 12 questões"),
  F2.noite("informatica", "Informática", "10 questões estilo Consulplan"),
]);

sabRedacao(2, "2026-08-08", 3, "Tema: registro profissional e exercício ilegal da Administração");
domSimulado(2, "2026-08-09", 3, 35, "Legislação + Português + Cargo");

/* ── Semana 4 (10/08 Seg – 16/08 Dom) ── */
diaF2("2026-08-10", 4, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Regimento Arts. 24º–55º — 12 questões"),
  F2.noite("especifico", "Cargo — Bloco B", "UML + PMBOK — 10 questões"),
]);

diaF2("2026-08-11", 4, [
  F2.tarde("portugues", "Língua Portuguesa", "Sintaxe + semântica + interpretação — 12 questões"),
  F2.noite("adm", "Adm. Pública", "Licitação + responsabilidade civil do Estado — 8 questões"),
]);

diaF2("2026-08-12", 4, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Código de Ética RN 640/2024 — infrações e penas (12 questões)"),
  F2.noite("especifico", "Cargo — Bloco C", "Linguagens/POO + integração REST/SOAP — 10 questões"),
]);

diaF2("2026-08-13", 4, [
  F2.tarde("especifico", "Cargo — Bloco B", "BD + SQL + redes — revisão integrada (12 questões)"),
  F2.noite("rlm", "Raciocínio Lógico", "15 questões cronometradas"),
]);

diaF2("2026-08-14", 4, [
  F2.tarde("portugues", "Língua Portuguesa", "Bateria completa — 15 questões"),
  F2.noite("informatica", "Informática", "Revisão final — 10 questões"),
]);

sabRedacao(2, "2026-08-15", 4, "Tema: gestão pública e tecnologia da informação");
domSimulado(2, "2026-08-16", 4, 40, "Todas as disciplinas");

/* ── Semana 5 (17/08 Seg – 23/08 Dom) ── */
diaF2("2026-08-17", 5, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Revisão completa — 15 questões (foco em pegadinhas CFA×CRA)"),
  F2.noite("especifico", "Cargo — Bloco C", "Cloud, IA generativa + licitações TI — 10 questões"),
]);

diaF2("2026-08-18", 5, [
  F2.tarde("portugues", "Língua Portuguesa", "Pontos fracos — 12 questões direcionadas"),
  F2.noite("adm", "Adm. Pública", "LAI, LGPD, improbidade — 8 questões"),
]);

diaF2("2026-08-19", 5, [
  F2.tarde("portugues", "Língua Portuguesa", "Pontos fracos — 12 questões direcionadas"),
  F2.noite("especifico", "Cargo — Blocos A e C", "Dev Web, Django, GED, ITIL, COBIT — 15 questões"),
]);

diaF2("2026-08-20", 5, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Flashcards + 12 questões de lei seca"),
  F2.noite("rlm", "Raciocínio Lógico", "Combinatória, probabilidade, lógica — 10 questões"),
]);

diaF2("2026-08-21", 5, [
  F2.tarde("portugues", "Língua Portuguesa", "Simulado parcial Português — 10 questões cronometradas"),
  F2.noite("informatica", "Informática", "Simulado parcial — 5 questões cronometradas"),
]);

sabRedacao(2, "2026-08-22", 5, "Tema: responsabilidade ética do administrador de sistemas");
domSimulado(2, "2026-08-23", 5, 45, "Todas as disciplinas — ritmo de prova");

/* ── Semana 6 (24/08 Seg – 30/08 Dom) ── */
diaF2("2026-08-24", 6, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Simulado parcial — 10 questões cronometradas"),
  F2.noite("portugues", "Língua Portuguesa", "Simulado parcial — 10 questões cronometradas"),
]);

diaF2("2026-08-25", 6, [
  F2.tarde("especifico", "Cargo — TI", "Simulado parcial — 15 questões cronometradas"),
  F2.noite("adm", "Adm. Pública", "Simulado parcial — 5 questões cronometradas"),
]);

diaF2("2026-08-26", 6, [
  F2.tarde("rlm", "Raciocínio Lógico", "Simulado parcial — 5 questões cronometradas"),
  F2.noite("informatica", "Informática", "Simulado parcial — 5 questões cronometradas"),
]);

diaF2("2026-08-27", 6, [
  F2.tarde("revisao", "Revisão integrada", "Mapa de pontos fracos por disciplina — sem conteúdo novo"),
  F2.noite("revisao", "Flashcards finais", "Legislação + Português — última rodada antes dos simulados"),
], "Último dia de estudo por disciplina isolada");

diaF2("2026-08-28", 6, [
  F2.tarde("legis", "Legislação CRA-PR/CFA", "Revisão express — 10 questões de lei seca"),
  F2.noite("portugues", "Língua Portuguesa", "Revisão express — 10 questões"),
]);

sabRedacao(2, "2026-08-29", 6, "Tema: ética, LGPD e administração pública");
domSimulado(2, "2026-08-30", 6, 50, "1º simulado completo — 50 questões, 2h30, corte 60%");

/* ══════════════════════════════════════════════════════════════
   FASE 2 — RETA DE SIMULADOS (31/08 a 12/09)
   ══════════════════════════════════════════════════════════════ */

/* ── Semana 7 (31/08 Seg – 06/09 Dom) ── */
diaF2("2026-08-31", 7, [
  F2.tarde("revisao", "Correção simulado", "Análise detalhada dos erros do simulado de domingo"),
  F2.noite("revisao", "Reforço por disciplina", "20 questões nos tópicos que mais errou"),
]);

diaF2("2026-09-01", 7, [
  F2.tarde("simulado", "Simulado completo", "50 questões cronometradas — 2º simulado integral"),
  F2.noite("revisao", "Correção + flashcards", "Legislação e Português — pontos fracos"),
]);

diaF2("2026-09-02", 7, [
  F2.tarde("revisao", "Revisão direcionada", "Só o que errou nos 2 simulados — sem conteúdo novo"),
  F2.noite("especifico", "Cargo — TI", "15 questões nos tópicos fracos do simulado"),
]);

diaF2("2026-09-03", 7, [
  F2.tarde("simulado", "Simulado completo", "50 questões cronometradas — 3º simulado integral"),
  F2.noite("revisao", "Correção simulado", "Mapa de erros por disciplina"),
]);

diaF2("2026-09-04", 7, [
  F2.tarde("revisao", "Revisão leve", "Quadros-resumo Legislação + Adm. Pública"),
  F2.noite("revisao", "Revisão leve", "Resumos Português + Cargo (só pontos fracos)"),
]);

sabRedacao(2, "2026-09-05", 7, "Tema livre — simular condição de prova");
domSimulado(2, "2026-09-06", 7, 50, "4º simulado completo — 50 questões");

/* ── Semana 8 — reta final (07/09 Seg – 13/09 Dom) ── */
diaF2("2026-09-07", 8, [
  F2.tarde("revisao", "Correção simulado", "Última análise de erros recorrentes"),
  F2.noite("revisao", "Flashcards finais", "Legislação CRA-PR/CFA — decoreba express"),
]);

diaF2("2026-09-08", 8, [
  F2.tarde("simulado", "Simulado completo", "50 questões — 5º e último simulado integral"),
  F2.noite("revisao", "Correção final", "Só gabarito dos erros — sem estudar tema novo"),
]);

diaF2("2026-09-09", 8, [
  F2.tarde("revisao", "Revisão leve", "Passada nos resumos — máximo 1h30 de estudo"),
  F2.noite("revisao", "Descanso ativo", "Reler anotações — sem questões novas"),
]);

diaF2("2026-09-10", 8, [
  F2.tarde("revisao", "Revisão leve", "Legislação: quadro CFA × CRA × competências"),
  F2.noite("revisao", "Revisão leve", "Português: crase, concordância, regência"),
]);

diaF2("2026-09-11", 8, [
  F2.tarde("revisao", "Revisão final", "Última passada nos flashcards — descansar cedo"),
  F2.noite("revisao", "Descanso", "Sem estudo pesado — preparar material para o dia da prova"),
]);

sabRedacao(2, "2026-09-12", 8, "Rascunho leve — 1 parágrafo de aquecimento (sem pressão)");

set("2026-09-13", {
  fase: 2,
  semana: 8,
  nota: "DIA DA PROVA",
  slots: [
    slot("—", 0, "prova", "PROVA OBJETIVA + DISCURSIVA", "Chegar 45 min antes · Caneta azul/preta transparente"),
  ],
});

window.CRONOGRAMA_DIAS = CRONOGRAMA_DIAS;
window.CRONOGRAMA_PRIORIDADES = CRONOGRAMA_PRIORIDADES;
window.CRONOGRAMA_REGRAS = CRONOGRAMA_REGRAS;
window.CRONOGRAMA_EXAM = CRONOGRAMA_EXAM;
window.CRONOGRAMA_INICIO = CRONOGRAMA_INICIO;

function cronogramaGetDia(date) {
  const key = dk(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return CRONOGRAMA_DIAS[key] || null;
}

window.cronogramaGetDia = cronogramaGetDia;
