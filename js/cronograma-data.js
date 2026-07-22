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
  "Período 1 (21/07–02/08): manhã 07:30–10:40 + noite 19:00–22:00 (pausa 10 min entre blocos).",
  "P1 — com Português, RLM ou Informática: 3 disciplinas (2 leves no mesmo período + 1 pesada no outro).",
  "P1 — só matérias extensas (Cargo, Adm. Pública, Legislação CRA): 2 disciplinas (1 manhã + 1 noite).",
  "Frequência semanal: Informática 1× · Português 2× · Raciocínio Lógico 2×.",
  "A partir de 03/08: 2 disciplinas/dia — tarde 16:30–18:00 + noite 19:00–22:00 (pausa 20:30–20:40).",
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

/* Período 1 — manhã 2 blocos + noite 2 blocos */
const P1 = {
  d1: (cat, titulo, desc) => slot("07:30–09:00", 1.5, cat, titulo, desc),
  d2: (cat, titulo, desc) => slot("09:10–10:40", 1.5, cat, titulo, desc),
  d3: (cat, titulo, desc) => slot("19:00–20:30", 1.5, cat, titulo, desc),
  d4: (cat, titulo, desc) => slot("20:40–22:00", 1.3, cat, titulo, desc),
};

/* A partir de 03/08 — 2 disciplinas/dia (tarde + noite) */
const P2 = {
  tarde: (cat, titulo, desc) => slot("16:30–18:00", 1.5, cat, titulo, desc),
  noite1: (cat, titulo, desc) => slot("19:00–20:30", 1.5, cat, titulo, desc),
  noite2: (cat, titulo, desc) => slot("20:40–22:00", 1.3, cat, titulo, desc),
};

function diaP1(key, sem, slots, nota) {
  set(key, { fase: 1, semana: sem, nota: nota || "", slots });
}

function p1ManhaPar(s1, s2) {
  return [P1.d1(s1[0], s1[1], s1[2]), P1.d2(s2[0], s2[1], s2[2])];
}

function p1ManhaPesada(cat, titulo, desc) {
  return [P1.d1(cat, titulo, desc), P1.d2(cat, titulo + " (cont.)", desc)];
}

function p1NoitePar(s1, s2) {
  return [P1.d3(s1[0], s1[1], s1[2]), P1.d4(s2[0], s2[1], s2[2])];
}

function p1NoitePesada(cat, titulo, desc) {
  return [P1.d3(cat, titulo, desc), P1.d4(cat, titulo + " (cont.)", desc)];
}

/** 3 disciplinas: par leve + pesada (manhã/noite ou vice-versa) */
function p1Dia3(key, sem, manhaPar, noitePesada, nota) {
  diaP1(key, sem, [...p1ManhaPar(...manhaPar), ...p1NoitePesada(...noitePesada)], nota);
}

function p1Dia3inv(key, sem, manhaPesada, noitePar, nota) {
  diaP1(key, sem, [...p1ManhaPesada(...manhaPesada), ...p1NoitePar(...noitePar)], nota);
}

/** 2 disciplinas extensas: 1 manhã + 1 noite */
function p1Dia2(key, sem, manha, noite, nota) {
  diaP1(key, sem, [...p1ManhaPesada(...manha), ...p1NoitePesada(...noite)], nota);
}

function p2Noite(cat, titulo, desc) {
  return [P2.noite1(cat, titulo, desc), P2.noite2(cat, titulo + " (cont.)", desc)];
}

/** 2 disciplinas: tarde + noite inteira */
function p2Dia2(key, sem, tarde, noite, nota, fase) {
  set(key, {
    fase: fase || 2,
    semana: sem,
    nota: nota || "",
    slots: [P2.tarde(...tarde), ...p2Noite(...noite)],
  });
}

function sabRedacaoP1(key, sem, tema) {
  diaP1(key, sem, [
    P1.d1("redacao", "Redação — rascunho", `${tema} — estrutura dissertativa`),
    P1.d2("redacao", "Redação — texto final", "25–30 linhas cronometradas"),
    P1.d3("redacao", "Correção", "Reescrever parágrafos fracos"),
    P1.d4("redacao", "Modelo", "Comparar com padrão de dissertação"),
  ]);
}

function domSimuladoP1(key, sem, n, foco) {
  diaP1(key, sem, [
    P1.d1("simulado", `Simulado — ${n} questões (1ª parte)`, `${foco} — cronometrado`),
    P1.d2("simulado", `Simulado — ${n} questões (2ª parte)`, "Continuar sem consulta"),
    P1.d3("revisao", "Correção", "Anotar erros + ler explicação do gabarito"),
    P1.d4("revisao", "Reforço", "10 questões extras nos tópicos que errou"),
  ]);
}

function sabRedacaoP2(key, sem, tema, fase) {
  p2Dia2(key, sem,
    ["redacao", "Redação — rascunho + texto final", `${tema} — 25–30 linhas cronometradas`],
    ["redacao", "Correção + autoavaliação", "Reescrever parágrafos fracos"],
    "", fase || 2);
}

function domSimuladoP2(key, sem, n, foco, fase) {
  p2Dia2(key, sem,
    ["simulado", `Simulado — ${n} questões`, `${foco} — cronometrado, sem consulta`],
    ["revisao", "Correção + reforço", "Anotar erros + 10 questões extras"],
    "", fase || 2);
}

function sabRedacaoP3(key, sem, tema) {
  sabRedacaoP2(key, sem, tema, 3);
}

function domSimuladoP3(key, sem, n, foco) {
  domSimuladoP2(key, sem, n, foco, 3);
}

function p3Dia2(key, sem, tarde, noite, nota) {
  p2Dia2(key, sem, tarde, noite, nota, 3);
}

/* ══════════════════════════════════════════════════════════════
   PERÍODO 1 — 21/07 a 02/08 · 3 ou 2 disciplinas/dia
   Port/RLM 2×/sem · Informática 1×/sem
   ══════════════════════════════════════════════════════════════ */

/* Semana 1 */
p1Dia3("2026-07-21", 1,
  [["portugues", "Língua Portuguesa", "Fonologia, ortografia e acentuação — 12 questões"],
   ["rlm", "Raciocínio Lógico", "Conjuntos e sequências lógicas — 10 questões"]],
  ["legis", "Legislação CRA-PR/CFA", "Lei 4.769/1965 — 15 questões + quadro-resumo CFA/CRAs"],
  "Opção 3 — leves de manhã, pesada à noite");

p1Dia3inv("2026-07-22", 1,
  ["especifico", "Conhecimentos do Cargo", "Item 1 — Arquitetura: numeração, CPU, interrupções (15 questões)"],
  [["rlm", "Raciocínio Lógico", "Regra de três e razões — 10 questões"],
   ["informatica", "Informática", "Hardware PC + Windows — 10 questões (1×/sem)"]],
  "Opção 1 — Cargo de manhã, leves à noite");

p1Dia2("2026-07-23", 1,
  ["adm", "Adm. Pública", "Art. 5º CF + Art. 37 CF — 12 questões"],
  ["legis", "Legislação CRA-PR/CFA", "Decreto 61.934/1967 — 15 questões (CFA × CRAs)"],
  "Dia só matérias extensas — 2 disciplinas");

p1Dia2("2026-07-24", 1,
  ["portugues", "Língua Portuguesa", "Morfologia e classes de palavras — 12 questões (2×/sem)"],
  ["especifico", "Conhecimentos do Cargo", "Item 2 — SO: processos, memória virtual (15 questões)"],
  "Dia só matérias extensas — Port + Cargo");

sabRedacaoP1("2026-07-25", 1, "Tema: ética profissional do Administrador e fiscalização do CRA-PR");
domSimuladoP1("2026-07-26", 1, 25, "Legislação + Português + RLM");

/* Semana 2 */
p1Dia3("2026-07-27", 2,
  [["portugues", "Língua Portuguesa", "Sintaxe e período composto — 12 questões"],
   ["rlm", "Raciocínio Lógico", "Progressões e combinatória — 10 questões"]],
  ["legis", "Legislação CRA-PR/CFA", "Regimento CRA-PR Arts. 1º–11º — 12 questões"],
  "Opção 3 — leves de manhã, Legislação à noite");

p1Dia2("2026-07-28", 2,
  ["especifico", "Conhecimentos do Cargo", "Item 3 — Estrutura de dados: árvores, grafos (15 questões)"],
  ["adm", "Adm. Pública", "Centralização, descentração, direta/indireta — 12 questões"],
  "Dia só matérias extensas");

p1Dia3inv("2026-07-29", 2,
  ["especifico", "Conhecimentos do Cargo", "Item 5 — Redes: TCP/IP, protocolos (15 questões)"],
  [["rlm", "Raciocínio Lógico", "Probabilidade e lógica proposicional — 10 questões"],
   ["informatica", "Informática", "Google Docs/Planilhas + Internet — 10 questões (1×/sem)"]],
  "Opção 1 — Cargo de manhã, RLM + Info à noite");

p1Dia2("2026-07-30", 2,
  ["portugues", "Língua Portuguesa", "Concordância, regência e crase — 12 questões (2×/sem)"],
  ["adm", "Adm. Pública", "LAI + LGPD + Improbidade — 12 questões"],
  "Dia só matérias extensas — Port + Adm");

p1Dia2("2026-07-31", 2,
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 12º–23º — 12 questões"],
  ["especifico", "Conhecimentos do Cargo", "Item 6 — BD: modelo ER, normalização, SQL (15 questões)"],
  "Dia só matérias extensas — Legislação + Cargo");

sabRedacaoP1("2026-08-01", 2, "Tema: papel do CFA/CRAs na regulamentação da profissão");
domSimuladoP1("2026-08-02", 2, 35, "Todas as disciplinas — aquecimento");

/* ══════════════════════════════════════════════════════════════
   A PARTIR DE 03/08 — 2 disciplinas/dia (tarde + noite)
   Port/RLM 2×/sem · Informática 1×/sem
   ══════════════════════════════════════════════════════════════ */

p2Dia2("2026-08-03", 3,
  ["legis", "Legislação CRA-PR/CFA", "2ª rodada Lei 4.769 + Decreto — 15 questões"],
  ["especifico", "Conhecimentos do Cargo", "Item 4 — Linguagens: POO, tipificação (15 questões)"],
  "Início do Período 2");

p2Dia2("2026-08-04", 3,
  ["portugues", "Língua Portuguesa", "Interpretação de texto + pontuação — 12 questões"],
  ["adm", "Adm. Pública", "Ato administrativo + agentes + poderes — 12 questões"]);

p2Dia2("2026-08-05", 3,
  ["rlm", "Raciocínio Lógico", "Bateria mista — 10 questões"],
  ["especifico", "Conhecimentos do Cargo", "Item 7 — SGBD: transação, concorrência (15 questões)"]);

p2Dia2("2026-08-06", 3,
  ["portugues", "Língua Portuguesa", "Semântica + revisão ortográfica — 12 questões (2×/sem)"],
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 24º–35º — 12 questões"]);

p2Dia2("2026-08-07", 3,
  ["informatica", "Informática", "Teams/Meet/Zoom + revisão geral — 10 questões (1×/sem)"],
  ["rlm", "Raciocínio Lógico", "Geometria e equações — 10 questões (2×/sem)"]);

sabRedacaoP2("2026-08-08", 3, "Tema: registro profissional e exercício ilegal da Administração");
domSimuladoP2("2026-08-09", 3, 40, "Todas as disciplinas");

p2Dia2("2026-08-10", 4,
  ["legis", "Legislação CRA-PR/CFA", "Regimento Arts. 36º–55º + Código de Ética RN 671/2025 — 15 questões"],
  ["especifico", "Conhecimentos do Cargo", "Item 13–15 — UML + Eng. de software (15 questões)"]);

p2Dia2("2026-08-11", 4,
  ["portugues", "Língua Portuguesa", "Bateria completa — 15 questões"],
  ["adm", "Adm. Pública", "Licitação + responsabilidade civil do Estado — 12 questões"]);

p2Dia2("2026-08-12", 4,
  ["rlm", "Raciocínio Lógico", "Matrizes, determinantes e polinômios — 10 questões"],
  ["especifico", "Conhecimentos do Cargo", "Item 16–17 — PMBOK, GED, ITIL, COBIT (15 questões)"]);

p2Dia2("2026-08-13", 4,
  ["portugues", "Língua Portuguesa", "Simulado parcial — 10 questões cronometradas (2×/sem)"],
  ["legis", "Legislação CRA-PR/CFA", "Simulado parcial — 10 questões cronometradas"]);

p2Dia2("2026-08-14", 4,
  ["informatica", "Informática", "Simulado parcial — 5 questões cronometradas (1×/sem)"],
  ["especifico", "Conhecimentos do Cargo", "Itens 18–21 — Web, Django, DevOps (15 questões)"],
  "Último dia antes da Fase 3");

/* ══════════════════════════════════════════════════════════════
   FASE 3 — 15/08 a 12/09 · 2 disciplinas/dia (simulados e revisão)
   ══════════════════════════════════════════════════════════════ */

sabRedacaoP3("2026-08-15", 5, "Tema: gestão pública e tecnologia da informação");
domSimuladoP3("2026-08-16", 5, 45, "Todas as disciplinas — ritmo de prova");

p3Dia2("2026-08-17", 5,
  ["legis", "Legislação CRA-PR/CFA", "Revisão integrada — 12 questões"],
  ["portugues", "Língua Portuguesa", "Pontos fracos — 10 questões"]);

p3Dia2("2026-08-18", 5,
  ["rlm", "Raciocínio Lógico", "Bateria mista — 8 questões"],
  ["adm", "Adm. Pública", "Revisão Art. 37 + licitações — 8 questões"]);

p3Dia2("2026-08-19", 5,
  ["informatica", "Informática", "8 questões estilo banca (1×/sem)"],
  ["especifico", "Conhecimentos do Cargo", "Itens 1–3 — SO, arquitetura, ED (12 questões)"]);

p3Dia2("2026-08-20", 5,
  ["portugues", "Língua Portuguesa", "Crase e concordância — 8 questões (2×/sem)"],
  ["legis", "Legislação CRA-PR/CFA", "Flashcards lei seca + 8 questões"]);

p3Dia2("2026-08-21", 5,
  ["especifico", "Conhecimentos do Cargo", "Itens 5–7 — Redes, BD, SGBD (12 questões)"],
  ["rlm", "Raciocínio Lógico", "8 questões (2×/sem)"]);

sabRedacaoP3("2026-08-22", 5, "Tema: responsabilidade ética do administrador de sistemas");
domSimuladoP3("2026-08-23", 5, 50, "1º simulado completo — 50 questões, corte 60%");

/* Semana 6 — reta de simulados */
p3Dia2("2026-08-24", 6,
  ["revisao", "Correção simulado", "Análise detalhada dos erros de domingo"],
  ["legis", "Legislação CRA-PR/CFA", "Flashcards express + 8 questões"]);

p3Dia2("2026-08-25", 6,
  ["simulado", "Simulado completo", "50 questões — 2º simulado integral"],
  ["portugues", "Língua Portuguesa", "8 questões direcionadas nos erros (2×/sem)"]);

p3Dia2("2026-08-26", 6,
  ["revisao", "Revisão direcionada", "Só erros dos 2 simulados — sem conteúdo novo"],
  ["especifico", "Conhecimentos do Cargo", "12 questões nos tópicos fracos"]);

p3Dia2("2026-08-27", 6,
  ["simulado", "Simulado completo", "50 questões — 3º simulado integral"],
  ["rlm", "Raciocínio Lógico", "8 questões (2×/sem)"]);

p3Dia2("2026-08-28", 6,
  ["revisao", "Revisão leve", "Quadros-resumo Legislação + Adm. Pública"],
  ["adm", "Adm. Pública", "Resumo Art. 37 + licitações — 5 questões"]);

sabRedacaoP3("2026-08-29", 6, "Tema: ética, LGPD e administração pública");
domSimuladoP3("2026-08-30", 6, 50, "4º simulado completo — 50 questões");

/* Semana 7 */
p3Dia2("2026-08-31", 7,
  ["revisao", "Correção simulado", "Última análise de erros recorrentes"],
  ["legis", "Legislação CRA-PR/CFA", "Decoreba express — CFA × CRA"]);

p3Dia2("2026-09-01", 7,
  ["simulado", "Simulado completo", "50 questões — 5º simulado integral"],
  ["portugues", "Língua Portuguesa", "Crase, concordância, regência (2×/sem)"]);

p3Dia2("2026-09-02", 7,
  ["revisao", "Revisão leve", "Passada nos resumos — sem conteúdo novo"],
  ["especifico", "Conhecimentos do Cargo", "5 questões de pontos fracos"]);

p3Dia2("2026-09-03", 7,
  ["informatica", "Informática", "5 questões de aquecimento (1×/sem)"],
  ["rlm", "Raciocínio Lógico", "5 questões (2×/sem)"]);

p3Dia2("2026-09-04", 7,
  ["revisao", "Revisão final", "Flashcards legislação + português"],
  ["adm", "Adm. Pública", "Resumo final — 5 questões"]);

sabRedacaoP3("2026-09-05", 7, "Tema livre — simular condição de prova");
domSimuladoP3("2026-09-06", 7, 30, "Aquecimento — 30 questões fáceis");

/* Semana 8 — reta final */
p3Dia2("2026-09-07", 8,
  ["revisao", "Correção", "Revisar erros do simulado de domingo"],
  ["legis", "Legislação CRA-PR/CFA", "Decoreba express"]);

p3Dia2("2026-09-08", 8,
  ["revisao", "Revisão leve", "Mapas mentais — máximo 1h de estudo"],
  ["portugues", "Língua Portuguesa", "3 questões de aquecimento"]);

p3Dia2("2026-09-09", 8,
  ["revisao", "Revisão leve", "Legislação: último quadro-resumo"],
  ["revisao", "Descanso", "Sem estudo pesado — visualizar estrutura da prova"]);

p3Dia2("2026-09-10", 8,
  ["revisao", "Revisão final", "Flashcards — 30 min no máximo"],
  ["revisao", "Preparação", "Separar documentos e material"]);

p3Dia2("2026-09-11", 8,
  ["revisao", "Descanso", "Sem estudo — preparar para amanhã"],
  ["revisao", "Descanso", "Reler anotações por 15 min (opcional)"]);

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
