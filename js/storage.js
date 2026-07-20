(function () {
  "use strict";

  const KEY = "cra-pr-estudos";
  const VERSION = 1;

  const LEGACY_KEYS = [
    "cra-pr-roadmap-progress-v2",
    "cra-pr-redacao-checklist",
    "cra-pr-quiz-stats",
  ];

  function defaultData() {
    return {
      version: VERSION,
      conteudo: { progress: {} },
      redacao: { checklist: {} },
      quiz: {
        stats: { simulados: 0, total: 0, acertos: 0 },
        historico: [],
        emAndamento: null,
      },
      cronograma: { diasConcluidos: {} },
      updatedAt: null,
    };
  }

  function loadRaw() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function migrateFromLegacy(data) {
    try {
      const prog = localStorage.getItem("cra-pr-roadmap-progress-v2");
      if (prog) data.conteudo.progress = { ...data.conteudo.progress, ...JSON.parse(prog) };

      const red = localStorage.getItem("cra-pr-redacao-checklist");
      if (red) data.redacao.checklist = { ...data.redacao.checklist, ...JSON.parse(red) };

      const quiz = localStorage.getItem("cra-pr-quiz-stats");
      if (quiz) data.quiz.stats = { ...data.quiz.stats, ...JSON.parse(quiz) };
    } catch {
      /* ignora erro de migração */
    }
    return data;
  }

  function load() {
    let data = loadRaw();
    if (!data) {
      data = defaultData();
      data = migrateFromLegacy(data);
      save(data);
      return data;
    }
    if (!data.conteudo) data.conteudo = { progress: {} };
    if (!data.redacao) data.redacao = { checklist: {} };
    if (!data.quiz) data.quiz = defaultData().quiz;
    if (!data.cronograma) data.cronograma = { diasConcluidos: {} };
    return data;
  }

  function save(data) {
    data.version = VERSION;
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function patch(mutator) {
    const data = load();
    mutator(data);
    save(data);
    return data;
  }

  /* ── Conteúdo (checklist de tópicos) ── */
  function getConteudoProgress() {
    return load().conteudo.progress;
  }

  function isConteudoDone(id) {
    return !!getConteudoProgress()[id];
  }

  function toggleConteudo(id) {
    patch((d) => {
      d.conteudo.progress[id] = !d.conteudo.progress[id];
    });
    return isConteudoDone(id);
  }

  /* ── Redações (checklist por tema) ── */
  function getRedacaoChecklist() {
    return load().redacao.checklist;
  }

  function isRedacaoChecked(temaId, itemId) {
    return !!getRedacaoChecklist()[`${temaId}_${itemId}`];
  }

  function toggleRedacao(temaId, itemId) {
    const key = `${temaId}_${itemId}`;
    patch((d) => {
      d.redacao.checklist[key] = !d.redacao.checklist[key];
    });
    return isRedacaoChecked(temaId, itemId);
  }

  /* ── Quiz / Simulados ── */
  function getQuizStats() {
    return load().quiz.stats;
  }

  function getQuizHistorico() {
    return load().quiz.historico || [];
  }

  function getQuizEmAndamento() {
    return load().quiz.emAndamento;
  }

  function setQuizEmAndamento(session) {
    patch((d) => {
      d.quiz.emAndamento = session;
    });
  }

  function clearQuizEmAndamento() {
    patch((d) => {
      d.quiz.emAndamento = null;
    });
  }

  function addQuizResult(result) {
    patch((d) => {
      d.quiz.stats.simulados = (d.quiz.stats.simulados || 0) + 1;
      d.quiz.stats.total = (d.quiz.stats.total || 0) + result.total;
      d.quiz.stats.acertos = (d.quiz.stats.acertos || 0) + result.acertos;
      d.quiz.historico.unshift({
        id: result.id || `sim-${Date.now()}`,
        data: new Date().toISOString(),
        disciplina: result.disciplina,
        disciplinaNome: result.disciplinaNome,
        acertos: result.acertos,
        total: result.total,
        pct: result.pct,
        tempoMs: result.tempoMs,
        questoes: result.questoes,
        respostas: result.respostas,
      });
      if (d.quiz.historico.length > 50) {
        d.quiz.historico = d.quiz.historico.slice(0, 50);
      }
      d.quiz.emAndamento = null;
    });
  }

  /* ── Cronograma ── */
  function isCronogramaDiaDone(dateKey) {
    return !!load().cronograma.diasConcluidos[dateKey];
  }

  function toggleCronogramaDia(dateKey) {
    patch((d) => {
      d.cronograma.diasConcluidos[dateKey] = !d.cronograma.diasConcluidos[dateKey];
    });
    return isCronogramaDiaDone(dateKey);
  }

  function getCronogramaConcluidos() {
    return load().cronograma.diasConcluidos;
  }

  /* ── Utilitários ── */
  function getLastUpdated() {
    return load().updatedAt;
  }

  function clearAll() {
    if (!confirm("Apagar TODO o progresso salvo (conteúdo, redações, simulados e cronograma)?")) return false;
    localStorage.removeItem(KEY);
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
    return true;
  }

  function exportData() {
    return JSON.stringify(load(), null, 2);
  }

  window.Store = {
    load,
    save,
    getConteudoProgress,
    isConteudoDone,
    toggleConteudo,
    getRedacaoChecklist,
    isRedacaoChecked,
    toggleRedacao,
    getQuizStats,
    getQuizHistorico,
    getQuizEmAndamento,
    setQuizEmAndamento,
    clearQuizEmAndamento,
    addQuizResult,
    isCronogramaDiaDone,
    toggleCronogramaDia,
    getCronogramaConcluidos,
    getLastUpdated,
    clearAll,
    exportData,
  };
})();
