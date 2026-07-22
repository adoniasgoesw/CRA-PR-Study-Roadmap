/* Cronograma 21/07/2026 → 13/09/2026 — CRA-PR Analista de Sistemas */

const CRONOGRAMA_EXAM = new Date(2026, 8, 13);
const CRONOGRAMA_INICIO = new Date(2026, 6, 21);
const CRONOGRAMA_FASE1_FIM = new Date(2026, 7, 2);
const CRONOGRAMA_FASE2_INICIO = new Date(2026, 7, 3);
const CRONOGRAMA_FASE2_FIM = new Date(2026, 7, 14);
const CRONOGRAMA_FASE3_INICIO = new Date(2026, 7, 15);

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
  "Período 1 (21/07–02/08): 4 disciplinas/dia — manhã 2 + noite 2 (pausa 10 min).",
  "Período 2 (03/08–14/08): 3 disciplinas/dia — tarde 16:30–18:00 + noite 19:00–22:00.",
  "Período 3 (15/08–12/09): 3 disciplinas/dia — tarde 16:30–18:00 + noite 19:00–22:00 (foco em simulados).",
  "Sábado: redação discursiva. Domingo: simulado + revisão dos erros.",
  "Últimas 2 semanas: simulados de 50 questões cronometrados (corte 60%).",
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

/* Período 1 — 4 disciplinas/dia */
const P1 = {
  d1: (cat, titulo, desc) => slot("07:30–09:00", 1.5, cat, titulo, desc),
  d2: (cat, titulo, desc) => slot("09:10–10:40", 1.5, cat, titulo, desc),
  rev: (desc) => slot("10:40–11:00", 0.3, "revisao", "Revisão rápida", desc),
  d3: (cat, titulo, desc) => slot("19:00–20:30", 1.5, cat, titulo, desc),
  d4: (cat, titulo, desc) => slot("20:40–22:00", 1.3, cat, titulo, desc),
};

/* Período 2 e 3 — 3 disciplinas/dia */
const P2 = {
  d1: (cat, titulo, desc) => slot("16:30–18:00", 1.5, cat, titulo, desc),
  d2: (cat, titulo, desc) => slot("19:00–20:30", 1.5, cat, titulo, desc),
  d3: (cat, titulo, desc) => slot("20:40–22:00", 1.3, cat, titulo, desc),
};

function diaP1(key, sem, slots, nota) {
  set(key, { fase: 1, semana: sem, nota: nota || "", slots });
}

function diaP2(key, sem, slots, nota) {
  set(key, { fase: 2, semana: sem, nota: nota || "", slots });
}

function diaP3(key, sem, slots, nota) {
  set(key, { fase: 3, semana: sem, nota: nota || "", slots });
}

function p1Dia(key, sem, d1, d2, d3, d4, rev, nota) {
  diaP1(key, sem, [P1.d1(...d1), P1.d2(...d2), P1.rev(rev), P1.d3(...d3), P1.d4(...d4)], nota);
}

function sabRedacaoP1(key, sem, tema) {
  diaP1(key, sem, [
    P1.d1("redacao", "Redação — rascunho", `${tema} — estrutura dissertativa`),
    P1.d2("redacao", "Redação — texto final", "25–30 linhas cronometradas"),
    P1.rev("Reler e marcar erros de coesão e norma culta"),
    P1.d3("redacao", "Correção", "Reescrever parágrafos fracos"),
    P1.d4("redacao", "Modelo", "Comparar com padrão de dissertação"),
  ]);
}

function domSimuladoP1(key, sem, n, foco) {
  diaP1(key, sem, [
    P1.d1("simulado", `Simulado — ${n} questões (1ª parte)`, `${foco} — cronometrado`),
    P1.d2("simulado", `Simulado — ${n} questões (2ª parte)`, "Continuar sem consulta"),
    P1.rev("Conferir gabarito das questões feitas"),
    P1.d3("revisao", "Correção", "Anotar erros + ler explicação do gabarito"),
    P1.d4("revisao", "Reforço", "10 questões extras nos tópicos que errou"),
  ]);
}

function sabRedacaoP2(key, sem, tema) {
  diaP2(key, sem, [
    P2.d1("redacao", "Redação — rascunho", `${tema} — estrutura dissertativa`),
    P2.d2("redacao", "Redação — texto final", "25–30 linhas cronometradas (50 min)"),
    P2.d3("redacao", "Correção", "Reescrever parágrafos fracos + autoavaliação"),
  ]);
}

function domSimuladoP2(key, sem, n, foco) {
  diaP2(key, sem, [
    P2.d1("simulado", `Simulado — ${n} questões`, `${foco} — cronometrado, sem consulta`),
    P2.d2("revisao", "Correção", "Anotar erros + ler explicação do gabarito"),
    P2.d3("revisao", "Reforço", "10 questões extras nos tópicos que errou"),
  ]);
}

function sabRedacaoP3(key, sem, tema) {
  sabRedacaoP2(key, sem, tema);
  CRONOGRAMA_DIAS[key].fase = 3;
}

function domSimuladoP3(key, sem, n, foco) {
  domSimuladoP2(key, sem, n, foco);
  CRONOGRAMA_DIAS[key].fase = 3;
}

function p3Dia(key, sem, d1, d2, d3, nota) {
  diaP3(key, sem, [P2.d1(...d1), P2.d2(...d2), P2.d3(...d3)], nota);
}

/* ══════════════════════════════════════════════════════════════
   PERÍODO 1 — 21/07 a 02/08 · 4 disciplinas/dia
   ══════════════════════════════════════════════════════════════ */

/* Semana 1 */
p1Dia("2026-07-21", 1,
  ["legis", "Legislação CRA-PR/CFA", "Lei 4.769/1965 — 15 questões + quadro-resumo CFA/CRAs"],
  ["portugues", "Língua Portuguesa", "Fonologia, ortografia e acentuação — 12 questões"],
  ["especifico", "Cargo — Bloco C", "Arquitetura — numeração, CPU, interrupções (12 questões)"],
  ["rlm", "Raciocínio Lógico", "Conjuntos e sequências lógicas — 10 questões"],
  "Flashcards dos erros da manhã");

p1Dia("2026-07-22", 1,
  ["legis", "Legislação CRA-PR/CFA", "Decreto 61.934/1967 — 15 questões (CFA × CRAs)"],
  ["adm", "Adm. Pública", "Art. 5º CF + Art. 37 CF — 12 questões"],
  ["especifico", "Cargo — Bloco C", "Sistemas operacionais — processos, memória (12 questões)"],
  ["informatica", "Informática", "Hardware PC + Windows — 10 questões"],
  "Revisar pegadinhas CFA × CRA");

p1Dia("2026-07-23", 1,
  ["portugues", "Língua Portuguesa", "Morfologia e classes de palavras — 12 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 1º–11º — 12 questões"],
  ["especifico", "Cargo — Bloco C", "Estrutura de dados — árvores, grafos (12 questões)"],
  ["rlm", "Raciocínio Lógico", "Regra de três e razões — 10 questões"],
  "Resumo do que errou ontem");

p1Dia("2026-07-24", 1,
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 1º–11º — 2ª rodada (12 questões)"],
  ["portugues", "Língua Portuguesa", "Sintaxe e período composto — 12 questões"],
  ["adm", "Adm. Pública", "Centralização, descentração, direta/indireta — 10 questões"],
  ["informatica", "Informática", "Google Docs/Planilhas — 10 questões"],
  "Quadro-resumo organização administrativa");

sabRedacaoP1("2026-07-25", 1, "Tema: ética profissional do Administrador e fiscalização do CRA-PR");
domSimuladoP1("2026-07-26", 1, 25, "Legislação + Português + RLM");

/* Semana 2 */
p1Dia("2026-07-27", 2,
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 12º–23º — 15 questões"],
  ["portugues", "Língua Portuguesa", "Concordância, regência e crase — 12 questões"],
  ["especifico", "Cargo — Bloco B", "BD, modelo ER, normalização (12 questões)"],
  ["rlm", "Raciocínio Lógico", "Progressões e combinatória — 10 questões"],
  "Flashcards regimento CRA-PR");

p1Dia("2026-07-28", 2,
  ["portugues", "Língua Portuguesa", "Interpretação de texto + pontuação — 12 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 24º–35º — 12 questões"],
  ["especifico", "Cargo — Bloco B", "SQL, SGBD e redes — 12 questões"],
  ["informatica", "Informática", "Internet + Teams/Meet/Zoom — 10 questões"],
  "Revisar erros de concordância");

p1Dia("2026-07-29", 2,
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 36º–55º — 12 questões"],
  ["adm", "Adm. Pública", "LAI + LGPD + Improbidade — 10 questões"],
  ["especifico", "Cargo — Bloco C", "Linguagens/POO + integração REST (12 questões)"],
  ["rlm", "Raciocínio Lógico", "Probabilidade e lógica proposicional — 10 questões"],
  "Mapa mental LAI × LGPD");

p1Dia("2026-07-30", 2,
  ["portugues", "Língua Portuguesa", "Semântica + interpretação — 12 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Código de Ética RN 640/2024 — 12 questões"],
  ["especifico", "Cargo — Bloco A", "Dev Web + Django + Git — 10 questões"],
  ["adm", "Adm. Pública", "Ato administrativo + agentes + poderes — 10 questões"],
  "Correlação infrações × penas (ética)");

p1Dia("2026-07-31", 2,
  ["legis", "Legislação CRA-PR/CFA", "Revisão Lei 4.769 + Decreto — 15 questões"],
  ["portugues", "Língua Portuguesa", "Bateria mista — 12 questões"],
  ["especifico", "Cargo — Bloco B", "UML + PMBOK — 10 questões"],
  ["informatica", "Informática", "Revisão geral — 10 questões"],
  "Última revisão antes do simulado");

sabRedacaoP1("2026-08-01", 2, "Tema: papel do CFA/CRAs na regulamentação da profissão");
domSimuladoP1("2026-08-02", 2, 35, "Todas as disciplinas — aquecimento");

/* ══════════════════════════════════════════════════════════════
   PERÍODO 2 — 03/08 a 14/08 · 3 disciplinas/dia
   ══════════════════════════════════════════════════════════════ */

diaP2("2026-08-03", 3, [
  P2.d1("legis", "Legislação CRA-PR/CFA", "2ª rodada Lei 4.769 + Decreto — 15 questões"),
  P2.d2("portugues", "Língua Portuguesa", "Revisão ortografia + interpretação — 12 questões"),
  P2.d3("especifico", "Cargo — Bloco A", "Dev Web + Django + Git — 10 questões"),
], "Início do Período 2");

diaP2("2026-08-04", 3, [
  P2.d1("legis", "Legislação CRA-PR/CFA", "Regimento Arts. 1º–23º — 12 questões"),
  P2.d2("adm", "Adm. Pública", "Licitação + responsabilidade civil do Estado — 10 questões"),
  P2.d3("rlm", "Raciocínio Lógico", "Bateria mista — 10 questões"),
]);

diaP2("2026-08-05", 3, [
  P2.d1("portugues", "Língua Portuguesa", "Concordância, regência, crase — 12 questões"),
  P2.d2("especifico", "Cargo — Bloco C", "SO + arquitetura — 12 questões"),
  P2.d3("informatica", "Informática", "10 questões estilo Consulplan"),
]);

diaP2("2026-08-06", 3, [
  P2.d1("legis", "Legislação CRA-PR/CFA", "Regimento Arts. 24º–55º — 12 questões"),
  P2.d2("especifico", "Cargo — Bloco B", "BD + SQL + redes — 12 questões"),
  P2.d3("adm", "Adm. Pública", "Ato administrativo + agentes — 8 questões"),
]);

diaP2("2026-08-07", 3, [
  P2.d1("portugues", "Língua Portuguesa", "Sintaxe + semântica — 12 questões"),
  P2.d2("legis", "Legislação CRA-PR/CFA", "Código de Ética RN 640/2024 — 12 questões"),
  P2.d3("rlm", "Raciocínio Lógico", "15 questões cronometradas"),
]);

sabRedacaoP2("2026-08-08", 3, "Tema: registro profissional e exercício ilegal da Administração");
domSimuladoP2("2026-08-09", 3, 40, "Todas as disciplinas");

diaP2("2026-08-10", 4, [
  P2.d1("legis", "Legislação CRA-PR/CFA", "Revisão completa — pegadinhas CFA×CRA (15 questões)"),
  P2.d2("especifico", "Cargo — Bloco C", "Cloud, IA generativa + licitações TI — 10 questões"),
  P2.d3("informatica", "Informática", "Revisão final — 10 questões"),
]);

diaP2("2026-08-11", 4, [
  P2.d1("portugues", "Língua Portuguesa", "Bateria completa — 15 questões"),
  P2.d2("especifico", "Cargo — Bloco B", "UML + PMBOK — 10 questões"),
  P2.d3("adm", "Adm. Pública", "LAI, LGPD, improbidade — 8 questões"),
]);

diaP2("2026-08-12", 4, [
  P2.d1("legis", "Legislação CRA-PR/CFA", "Flashcards + 12 questões de lei seca"),
  P2.d2("especifico", "Cargo — Blocos A e C", "Dev Web, GED, ITIL, COBIT — 12 questões"),
  P2.d3("rlm", "Raciocínio Lógico", "Combinatória e probabilidade — 10 questões"),
]);

diaP2("2026-08-13", 4, [
  P2.d1("portugues", "Língua Portuguesa", "Simulado parcial — 10 questões cronometradas"),
  P2.d2("legis", "Legislação CRA-PR/CFA", "Simulado parcial — 10 questões cronometradas"),
  P2.d3("especifico", "Cargo — TI", "Simulado parcial — 15 questões cronometradas"),
]);

diaP2("2026-08-14", 4, [
  P2.d1("adm", "Adm. Pública", "Simulado parcial — 5 questões cronometradas"),
  P2.d2("rlm", "Raciocínio Lógico", "Simulado parcial — 5 questões cronometradas"),
  P2.d3("informatica", "Informática", "Simulado parcial — 5 questões cronometradas"),
], "Último dia do Período 2");

/* ══════════════════════════════════════════════════════════════
   PERÍODO 3 — 15/08 a 12/09 · 3 disciplinas/dia (simulados e revisão)
   ══════════════════════════════════════════════════════════════ */

sabRedacaoP3("2026-08-15", 5, "Tema: gestão pública e tecnologia da informação");
domSimuladoP3("2026-08-16", 5, 45, "Todas as disciplinas — ritmo de prova");

p3Dia("2026-08-17", 5,
  ["legis", "Legislação CRA-PR/CFA", "Revisão integrada — 12 questões"],
  ["portugues", "Língua Portuguesa", "Pontos fracos — 10 questões"],
  ["especifico", "Cargo — Bloco C", "Revisão SO + arquitetura — 8 questões"]);

p3Dia("2026-08-18", 5,
  ["portugues", "Língua Portuguesa", "Interpretação + pontuação — 10 questões"],
  ["adm", "Adm. Pública", "Revisão Art. 37 + licitações — 8 questões"],
  ["rlm", "Raciocínio Lógico", "Bateria mista — 8 questões"]);

p3Dia("2026-08-19", 5,
  ["legis", "Legislação CRA-PR/CFA", "Código de Ética — infrações e penas (10 questões)"],
  ["especifico", "Cargo — Bloco B", "BD + SQL + redes — 8 questões"],
  ["informatica", "Informática", "8 questões estilo banca"]);

p3Dia("2026-08-20", 5,
  ["especifico", "Cargo — Bloco A", "Dev Web, Django, DevOps — 8 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Flashcards lei seca"],
  ["portugues", "Língua Portuguesa", "Crase e concordância — 8 questões"]);

p3Dia("2026-08-21", 5,
  ["portugues", "Língua Portuguesa", "Simulado parcial — 10 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Simulado parcial — 10 questões"],
  ["adm", "Adm. Pública", "Simulado parcial — 5 questões"]);

sabRedacaoP3("2026-08-22", 5, "Tema: responsabilidade ética do administrador de sistemas");
domSimuladoP3("2026-08-23", 5, 50, "1º simulado completo — 50 questões, corte 60%");

/* Semana 6 — reta de simulados */
p3Dia("2026-08-24", 6,
  ["revisao", "Correção simulado", "Análise detalhada dos erros de domingo"],
  ["revisao", "Reforço", "15 questões nos tópicos que mais errou"],
  ["legis", "Legislação CRA-PR/CFA", "Flashcards express"]);

p3Dia("2026-08-25", 6,
  ["simulado", "Simulado completo", "50 questões — 2º simulado integral"],
  ["revisao", "Correção", "Legislação e Português — pontos fracos"],
  ["portugues", "Língua Portuguesa", "8 questões direcionadas"]);

p3Dia("2026-08-26", 6,
  ["revisao", "Revisão direcionada", "Só erros dos 2 simulados — sem conteúdo novo"],
  ["especifico", "Cargo — TI", "12 questões nos tópicos fracos"],
  ["rlm", "Raciocínio Lógico", "8 questões"]);

p3Dia("2026-08-27", 6,
  ["simulado", "Simulado completo", "50 questões — 3º simulado integral"],
  ["revisao", "Correção simulado", "Mapa de erros por disciplina"],
  ["adm", "Adm. Pública", "Resumo Art. 37 + licitações"]);

p3Dia("2026-08-28", 6,
  ["revisao", "Revisão leve", "Quadros-resumo Legislação + Adm. Pública"],
  ["revisao", "Revisão leve", "Resumos Português + Cargo"],
  ["informatica", "Informática", "5 questões de aquecimento"]);

sabRedacaoP3("2026-08-29", 6, "Tema: ética, LGPD e administração pública");
domSimuladoP3("2026-08-30", 6, 50, "4º simulado completo — 50 questões");

/* Semana 7 */
p3Dia("2026-08-31", 7,
  ["revisao", "Correção simulado", "Última análise de erros recorrentes"],
  ["revisao", "Flashcards finais", "Legislação CRA-PR/CFA"],
  ["portugues", "Língua Portuguesa", "Crase, concordância, regência"]);

p3Dia("2026-09-01", 7,
  ["simulado", "Simulado completo", "50 questões — 5º simulado integral"],
  ["revisao", "Correção final", "Só gabarito dos erros"],
  ["legis", "Legislação CRA-PR/CFA", "Quadro CFA × CRA × competências"]);

p3Dia("2026-09-02", 7,
  ["revisao", "Revisão leve", "Passada nos resumos — sem conteúdo novo"],
  ["revisao", "Descanso ativo", "Reler anotações"],
  ["especifico", "Cargo — TI", "5 questões de pontos fracos"]);

p3Dia("2026-09-03", 7,
  ["revisao", "Revisão leve", "Flashcards legislação + português"],
  ["adm", "Adm. Pública", "Resumo final — 5 questões"],
  ["rlm", "Raciocínio Lógico", "5 questões"]);

p3Dia("2026-09-04", 7,
  ["revisao", "Revisão final", "Última passada nos flashcards"],
  ["revisao", "Descanso", "Preparar material para a prova"],
  ["informatica", "Informática", "3 questões de aquecimento"]);

sabRedacaoP3("2026-09-05", 7, "Tema livre — simular condição de prova");
domSimuladoP3("2026-09-06", 7, 30, "Aquecimento — 30 questões fáceis");

/* Semana 8 — reta final */
p3Dia("2026-09-07", 8,
  ["revisao", "Correção", "Revisar erros do simulado de domingo"],
  ["revisao", "Revisão leve", "Só o que ainda erra"],
  ["legis", "Legislação CRA-PR/CFA", "Decoreba express"]);

p3Dia("2026-09-08", 8,
  ["revisao", "Revisão leve", "Mapas mentais — máximo 1h de estudo"],
  ["revisao", "Descanso ativo", "Reler anotações finais"],
  ["portugues", "Língua Portuguesa", "3 questões de aquecimento"]);

p3Dia("2026-09-09", 8,
  ["revisao", "Revisão leve", "Legislação: último quadro-resumo"],
  ["revisao", "Descanso", "Sem estudo pesado"],
  ["revisao", "Mental", "Visualizar estrutura da prova"]);

p3Dia("2026-09-10", 8,
  ["revisao", "Revisão final", "Flashcards — 30 min no máximo"],
  ["revisao", "Descanso", "Descansar cedo"],
  ["revisao", "Preparação", "Separar documentos e material"]);

p3Dia("2026-09-11", 8,
  ["revisao", "Descanso", "Sem estudo — preparar para amanhã"],
  ["revisao", "Descanso", "Reler anotações por 15 min (opcional)"],
  ["revisao", "Descanso", "Dormir cedo"]);

sabRedacaoP3("2026-09-12", 8, "Rascunho leve — 1 parágrafo (sem pressão)");

set("2026-09-13", {
  fase: 3,
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
