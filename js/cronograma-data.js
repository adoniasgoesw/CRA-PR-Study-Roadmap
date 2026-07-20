/* Cronograma 20/07/2026 → 13/09/2026 — CRA-PR Analista de Sistemas */

const CRONOGRAMA_EXAM = new Date(2026, 8, 13);
const CRONOGRAMA_INICIO = new Date(2026, 6, 20);
const CRONOGRAMA_FASE1_FIM = new Date(2026, 7, 3);

const CRONOGRAMA_PRIORIDADES = [
  { cat: "legis", nome: "Legislação CRA-PR/CFA", peso: "alto", cor: "#922b21" },
  { cat: "bloco-c", nome: "Bloco C (SO, arquitetura, ED)", peso: "alto", cor: "#c0392b" },
  { cat: "bloco-b", nome: "Bloco B (BD, redes, UML)", peso: "médio", cor: "#1a5276" },
  { cat: "portugues", nome: "Português", peso: "médio", cor: "#6c3483" },
  { cat: "bloco-a", nome: "Bloco A (Web, Django)", peso: "baixo", cor: "#1e8449" },
  { cat: "simulado", nome: "Simulados", peso: "—", cor: "#7f8c8d" },
  { cat: "redacao", nome: "Discursiva", peso: "alto", cor: "#d35400" },
];

const CRONOGRAMA_REGRAS = [
  "Legislação CRA-PR/CFA em praticamente toda semana — repetição espaçada.",
  "Sem conteúdo novo na última semana. Só revisão.",
  "Se atrasar, redistribua na mesma semana — não dobre a carga.",
  "Discursiva eliminatória — treine a partir da Semana 6.",
];

function dk(y, m, d) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function slot(horario, horas, cat, titulo, desc) {
  return { horario, horas, cat, titulo, desc: desc || "" };
}

function buildDia(key, meta) {
  const horas = meta.slots.reduce((s, x) => s + x.horas, 0);
  return { ...meta, horas };
}

const CRONOGRAMA_DIAS = {};

function set(key, data) {
  CRONOGRAMA_DIAS[key] = buildDia(key, data);
}

/* ── FASE 1: INTENSIVA (8h/dia) ── */
const FASE1 = [
  { k: "2026-07-20", sem: 1, slots: [
    slot("07:00–11:00", 4, "legis", "Legislação CRA-PR/CFA", "Lei 4.769/1965 — 1ª leitura completa"),
    slot("18:00–22:00", 4, "portugues", "Português", "Ortografia, acentuação e morfologia"),
  ]},
  { k: "2026-07-21", sem: 1, slots: [
    slot("07:00–11:00", 4, "bloco-c", "Bloco C — Arquitetura de computadores", "Numeração, microprocessadores, interrupções"),
    slot("18:00–22:00", 4, "rlm", "Raciocínio Lógico", "Conjuntos, regra de três simples e composta"),
  ]},
  { k: "2026-07-22", sem: 1, slots: [
    slot("07:00–11:00", 4, "bloco-c", "Bloco C — Sistemas Operacionais", "Processos, memória virtual, paginação, deadlock"),
    slot("18:00–22:00", 4, "legis", "Legislação CRA-PR/CFA", "Decreto 61.934/1967 + Código de Ética (RN 671/2025)"),
  ]},
  { k: "2026-07-23", sem: 1, slots: [
    slot("07:00–11:00", 4, "bloco-c", "Bloco C — Estrutura de dados e algoritmos", "Árvores, grafos, hashing, complexidade"),
    slot("18:00–22:00", 4, "portugues", "Português", "Sintaxe, termos da oração, interpretação de texto"),
  ]},
  { k: "2026-07-24", sem: 1, slots: [
    slot("07:00–11:00", 4, "bloco-c", "Bloco C — Linguagens de programação / POO", "Tipificação, herança, polimorfismo, exceções"),
    slot("18:00–22:00", 4, "adm", "Adm. Pública", "Art. 37 CF, direitos fundamentais (Art. 5º), LAI"),
  ]},
  { k: "2026-07-25", sem: 1, slots: [
    slot("07:00–11:00", 4, "revisao", "Revisão da semana", "Legislação + Português + Raciocínio Lógico"),
    slot("18:00–22:00", 4, "bloco-b", "Bloco B — Redes de computadores", "Início: TCP/IP, protocolos, topologias"),
  ]},
  { k: "2026-07-26", sem: 1, slots: [
    slot("07:00–11:00", 4, "bloco-b", "Bloco B — Redes de computadores", "Continuação + segurança (firewall, VPN)"),
    slot("18:00–22:00", 4, "bloco-b", "Bloco B — Banco de Dados", "Conceitos, modelo relacional, modelagem ER"),
  ]},
  { k: "2026-07-27", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-b", "Bloco B — SQL", "ANSI e Transact-SQL — DDL, DML, consultas"),
    slot("18:00–22:00", 4, "legis", "Legislação CRA-PR/CFA", "Resoluções Normativas CFA (ementas e objetos)"),
  ]},
  { k: "2026-07-28", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-b", "Bloco B — SGBD", "Transação, triggers, views, backup, concorrência"),
    slot("18:00–22:00", 4, "rlm", "Raciocínio Lógico", "Progressões, combinatória e probabilidade"),
  ]},
  { k: "2026-07-29", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-b", "Bloco B — UML / OO", "Casos de uso, classes, sequência, atividades"),
    slot("18:00–22:00", 4, "portugues", "Português", "Concordância, regência e crase"),
  ]},
  { k: "2026-07-30", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-b", "Bloco B — Gestão de Projetos", "PMBOK: escopo, tempo, custo, qualidade, risco"),
    slot("18:00–22:00", 4, "informatica", "Informática", "Windows, Google Docs/Sheets, Teams/Meet"),
  ]},
  { k: "2026-07-31", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-c", "Bloco C — Integração de sistemas", "XML, SOAP, REST, WSDL/UDDI"),
    slot("18:00–22:00", 4, "bloco-c", "Bloco C — Cloud, IA e Licitações", "Cloud/IA generativa + Lei 14.133/21, ETP/TR"),
  ]},
  { k: "2026-08-01", sem: 2, slots: [
    slot("07:00–11:00", 4, "bloco-a", "Bloco A — Dev Web / Django", "Revisão rápida — seu ponto forte"),
    slot("18:00–22:00", 4, "bloco-a", "Bloco A — Git e DevOps", "Controle de versão, containers, CI/CD"),
  ]},
  { k: "2026-08-02", sem: 2, slots: [
    slot("07:00–11:00", 4, "simulado", "Simulado geral", "Todas as disciplinas (~50 questões, 2h) + correção"),
    slot("18:00–22:00", 4, "revisao", "Reforço pós-simulado", "Foco nos erros do simulado da manhã"),
  ]},
  { k: "2026-08-03", sem: 2, fase: 1, nota: "Último dia da fase intensiva", slots: [
    slot("07:00–11:00", 4, "legis", "Revisão final Legislação", "Leis + resoluções — quadro-resumo"),
    slot("18:00–22:00", 4, "simulado", "Simulado Cargo", "15 questões cronometradas — Conhecimentos do Cargo"),
  ]},
];

FASE1.forEach((d) => {
  set(d.k, { fase: 1, semana: d.sem, nota: d.nota || "", slots: d.slots });
});

/* ── FASE 2: helpers ── */
function f2(key, sem, slots, nota) {
  set(key, { fase: 2, semana: sem, nota: nota || "", slots });
}

function manha(cat, titulo, desc) {
  return slot("16:00–20:00", 4, cat, titulo, desc);
}
function tarde(cat, titulo, desc) {
  return slot("18:00–21:00", 3, cat, titulo, desc);
}
function fimsem(cat, titulo, desc) {
  return slot("Livre — 1h", 1, cat, titulo, desc);
}

/* Semana 3 — Legislação + Português (04/08 Ter – 10/08 Seg) */
[
  ["2026-08-04", tarde("portugues", "Português", "Revisão + bateria de questões")],
  ["2026-08-05", tarde("portugues", "Português", "Interpretação de texto e sintaxe — exercícios")],
  ["2026-08-06", tarde("portugues", "Português", "Concordância, regência, crase — questões")],
  ["2026-08-07", manha("legis", "Legislação CRA-PR/CFA", "2ª rodada — resoluções e regimento CRA-PR")],
  ["2026-08-08", fimsem("legis", "Questões de Legislação", "20 questões — decoreba de lei seca")],
  ["2026-08-09", fimsem("legis", "Questões de Legislação", "Revisão flashcards + 15 questões")],
  ["2026-08-10", manha("legis", "Legislação CRA-PR/CFA", "2ª rodada completa — Lei 4.769, Decreto, RN CFA")],
].forEach(([k, ...slots]) => f2(k, 3, slots));

/* Semana 4 — Bloco C */
[
  ["2026-08-11", manha("bloco-c", "SO + Arquitetura", "Revisão: processos, memória, numeração, CPU")],
  ["2026-08-12", tarde("bloco-c", "Estrutura de dados", "Árvores, grafos, B-trees, complexidade")],
  ["2026-08-13", tarde("bloco-c", "Linguagens / POO", "Abstrações, tipificação, herança, exceções")],
  ["2026-08-14", tarde("bloco-c", "Sistemas Operacionais", "Revisão: deadlock, paginação, escalonamento")],
  ["2026-08-15", manha("bloco-c", "Arquitetura + ED", "Revisão integrada Bloco C — pontos fracos")],
  ["2026-08-16", fimsem("rlm", "Raciocínio Lógico", "Questões: conjuntos, progressões, lógica")],
  ["2026-08-17", fimsem("rlm", "Raciocínio Lógico", "15 questões cronometradas")],
].forEach(([k, ...slots]) => f2(k, 4, slots));

/* Semana 5 — Bloco B */
[
  ["2026-08-18", manha("bloco-b", "BD / SQL + SGBD", "Revisão: normalização, SQL, transações, triggers")],
  ["2026-08-19", tarde("bloco-b", "Redes de computadores", "TCP/IP, DNS, DHCP, segurança de redes")],
  ["2026-08-20", tarde("bloco-b", "UML + PMBOK", "Diagramas UML + áreas de conhecimento PMBOK")],
  ["2026-08-21", tarde("bloco-b", "Banco de Dados", "Questões SQL e modelagem ER")],
  ["2026-08-22", manha("bloco-b", "Redes + UML", "Revisão integrada Bloco B")],
  ["2026-08-23", fimsem("adm", "Adm. Pública", "Questões: Art. 37, LAI, LGPD, licitações")],
  ["2026-08-24", fimsem("adm", "Adm. Pública", "15 questões — lei seca")],
].forEach(([k, ...slots]) => f2(k, 5, slots));

/* Semana 6 — Bloco A + Discursiva */
[
  ["2026-08-25", manha("bloco-a", "Dev Web / Django / Cloud", "Revisão rápida + APIs, integração, IA conceitual")],
  ["2026-08-26", tarde("redacao", "Prova Discursiva", "1 dissertação cronometrada (25–30 linhas)")],
  ["2026-08-27", tarde("redacao", "Prova Discursiva", "1 dissertação — tema Legislação/ética")],
  ["2026-08-28", tarde("redacao", "Prova Discursiva", "1 dissertação — tema TI/gestão pública")],
  ["2026-08-29", manha("bloco-a", "Integração / DevOps", "REST, Git, containers — revisão final Bloco A")],
  ["2026-08-30", fimsem("informatica", "Informática", "Questões Windows, G Suite, hardware")],
  ["2026-08-31", fimsem("informatica", "Informática", "10 questões estilo Consulplan")],
].forEach(([k, ...slots]) => f2(k, 6, slots));

/* Semana 7 — Simulados (01/09 Ter – 07/09 Seg) */
[
  ["2026-09-01", tarde("simulado", "Simulado parcial", "30 questões cronometradas — aquecimento")],
  ["2026-09-02", tarde("revisao", "Correção simulado", "Análise de erros + reforço por disciplina")],
  ["2026-09-03", tarde("revisao", "Correção + discursiva", "Erros do simulado + 1 dissertação")],
  ["2026-09-04", manha("simulado", "Simulado completo", "50 questões objetivas — cronometrado")],
  ["2026-09-05", fimsem("revisao", "Pontos fracos", "Revisão do que errou nos simulados")],
  ["2026-09-06", fimsem("revisao", "Pontos fracos", "Flashcards legislação + 10 questões")],
  ["2026-09-07", manha("simulado", "Simulado completo", "50 questões — 2º simulado integral")],
].forEach(([k, ...slots]) => f2(k, 7, slots));

/* Semana 8 — Reta final (08/09 Ter – 13/09 Dom) */
[
  ["2026-09-08", tarde("revisao", "Revisão leve", "Somente resumos — sem conteúdo novo")],
  ["2026-09-09", tarde("revisao", "Revisão leve", "Mapas mentais e quadros-resumo")],
  ["2026-09-10", tarde("legis", "Revisão Legislação", "Leitura final leis CRA-PR/CFA")],
  ["2026-09-11", manha("revisao", "Revisão final", "Última passada nos resumos — descansar cedo")],
  ["2026-09-12", fimsem("revisao", "1h leve", "Passada rápida nos resumos — depois descanso total")],
  ["2026-09-13", { fase: 2, semana: 8, nota: "DIA DA PROVA", slots: [
    slot("—", 0, "prova", "PROVA OBJETIVA + DISCURSIVA", "Chegar 45 min antes · Caneta azul/preta transparente"),
  ]}],
].forEach((entry) => {
  if (typeof entry[1] === "object" && entry[1].slots) {
    set(entry[0], buildDia(entry[0], entry[1]));
  } else {
    f2(entry[0], 8, entry.slice(1));
  }
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
