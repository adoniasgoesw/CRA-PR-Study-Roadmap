(function () {
  "use strict";

  const STATS_KEY = "cra-pr-quiz-stats"; // legado — migrado para Store

  let state = {
    disciplina: null,
    questoes: [],
    respostas: {},
    indice: 0,
    inicio: null,
    finalizado: false,
  };

  function loadStats() {
    if (window.Store) return Store.getQuizStats();
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function persistSession() {
    if (!window.Store || !state.questoes.length || state.finalizado) return;
    Store.setQuizEmAndamento({
      disciplina: state.disciplina,
      questoesIds: state.questoes.map((q) => q.id),
      respostas: { ...state.respostas },
      indice: state.indice,
      inicio: state.inicio,
    });
  }

  function tryResumeSession() {
    if (!window.Store) return false;
    const saved = Store.getQuizEmAndamento();
    if (!saved || !saved.questoesIds?.length) return false;

    const pool = [];
    const discIds = saved.disciplina === "completo"
      ? ["portugues", "rlm", "informatica", "adm", "legis", "especifico"]
      : [saved.disciplina];

    discIds.forEach((did) => {
      (QUESTOES[did] || []).forEach((q) => pool.push({ ...q, disciplina: did }));
    });

    const questoes = saved.questoesIds
      .map((id) => pool.find((q) => q.id === id))
      .filter(Boolean);

    if (!questoes.length) {
      Store.clearQuizEmAndamento();
      return false;
    }

    state.disciplina = saved.disciplina;
    state.questoes = questoes;
    state.respostas = saved.respostas || {};
    state.indice = saved.indice || 0;
    state.inicio = saved.inicio || Date.now();
    state.finalizado = false;
    return true;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sampleQuestions(discId, qty) {
    if (discId === "completo") {
      const ordem = ["portugues", "rlm", "informatica", "adm", "legis", "especifico"];
      const selecionadas = [];
      ordem.forEach((id) => {
        const cfg = QUIZ_CONFIG[id];
        const pool = shuffle(QUESTOES[id]);
        const n = DISTRIBUICAO.find((d) => d.id === id).questoes;
        selecionadas.push(...pool.slice(0, n).map((q) => ({ ...q, disciplina: id })));
      });
      return selecionadas;
    }

    const pool = shuffle(QUESTOES[discId] || []);
    const max = Math.min(qty, pool.length, QUIZ_CONFIG[discId].max);
    return pool.slice(0, max).map((q) => ({ ...q, disciplina: discId }));
  }

  function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function renderNavQuiz() {
    const nav = document.getElementById("nav-quiz");
    const items = Object.entries(QUIZ_CONFIG).map(([id, cfg]) => {
      const qtd = id === "completo" ? 50 : (QUESTOES[id] || []).length;
      return `<li><a href="#" data-quiz="${id}" class="${state.disciplina === id ? "active" : ""}">
        <span>${cfg.nome}</span>
        <span class="nav-badge">${id === "completo" ? "50q" : cfg.padrao + "q"}</span>
      </a></li>`;
    }).join("");

    nav.innerHTML = `<ul class="nav-disciplinas">${items}</ul>`;

    nav.querySelectorAll("[data-quiz]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showQuizSetup(link.dataset.quiz);
      });
    });
  }

  function renderStats() {
    const stats = loadStats();
    const el = document.getElementById("quiz-stats");
    const total = stats.total || 0;
    const acertos = stats.acertos || 0;
    const pct = total ? Math.round((acertos / total) * 100) : 0;
    const historico = window.Store ? Store.getQuizHistorico() : [];

    el.innerHTML = `
      <h3>Seu histórico</h3>
      <div class="stat-row"><span>Simulados feitos</span><strong>${stats.simulados || 0}</strong></div>
      <div class="stat-row"><span>Questões</span><strong>${total}</strong></div>
      <div class="stat-row"><span>Acertos</span><strong>${pct}%</strong></div>
      ${historico.length ? `
        <h3 class="stats-subtitle">Últimos simulados</h3>
        <ul class="quiz-historico">
          ${historico.slice(0, 5).map((h) => `
            <li>
              <span class="hist-date">${formatHistDate(h.data)}</span>
              <span class="hist-name">${h.disciplinaNome || h.disciplina}</span>
              <span class="hist-score">${h.pct}%</span>
            </li>
          `).join("")}
        </ul>
      ` : ""}
      <p class="storage-hint">Salvo no navegador</p>
    `;
  }

  function formatHistDate(iso) {
    const d = new Date(iso);
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function showQuizHome() {
    document.getElementById("quiz-home").classList.remove("hidden");
    document.getElementById("quiz-active").classList.add("hidden");
    document.getElementById("quiz-result").classList.add("hidden");

    const home = document.getElementById("quiz-home");
    const saved = window.Store ? Store.getQuizEmAndamento() : null;

    const cards = Object.entries(QUIZ_CONFIG)
      .filter(([id]) => id !== "completo")
      .map(([id, cfg]) => {
        const disp = DISTRIBUICAO.find((d) => d.id === id);
        const banco = (QUESTOES[id] || []).length;
        return `
          <div class="quiz-card" data-quiz="${id}">
            <div class="quiz-card-top">
              <span class="quiz-card-qty">${cfg.padrao} questões</span>
              <span class="quiz-card-banco">${banco} no banco</span>
            </div>
            <h3>${cfg.nome}</h3>
            <p class="quiz-card-sub">Peso na prova: ${disp ? disp.questoes + "q / " + disp.pontos + " pts" : "—"}</p>
            <button type="button" class="btn-quiz" data-start="${id}">Iniciar simulado</button>
          </div>
        `;
      }).join("");

    const provas = PROVAS_OFICIAIS.map((p) => `
      <div class="prova-link-item">
        <strong>${p.titulo}</strong>
        <span>${p.nota}</span>
        ${p.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join(" ")}
      </div>
    `).join("");

    const resumeBanner = saved ? `
      <section class="panel quiz-resume-panel">
        <div class="quiz-resume-body">
          <div>
            <strong>Simulado em andamento</strong>
            <p>${QUIZ_CONFIG[saved.disciplina]?.nome || saved.disciplina} — questão ${(saved.indice || 0) + 1} de ${saved.questoesIds?.length || "?"}</p>
          </div>
          <div class="quiz-resume-actions">
            <button type="button" class="btn-quiz btn-quiz-primary" id="quiz-resume">Continuar</button>
            <button type="button" class="btn-quiz btn-quiz-ghost" id="quiz-discard">Descartar</button>
          </div>
        </div>
      </section>
    ` : "";

    home.innerHTML = `
      ${resumeBanner}
      <section class="panel">
        <div class="panel-head">
          <h2>Simulados por disciplina</h2>
          <span class="panel-sub">Padrão Consulplan — 4 alternativas, como no edital 2026</span>
        </div>
        <div class="quiz-cards">${cards}</div>
      </section>

      <section class="panel quiz-card-completo">
        <div class="panel-head">
          <h2>Simulado completo</h2>
          <span class="panel-sub">50 questões — distribuição real da prova</span>
        </div>
        <div class="quiz-completo-body">
          <p>10 Português · 5 RLM · 5 Informática · 5 Adm. Pública · 10 Legislação · 15 Cargo</p>
          <button type="button" class="btn-quiz btn-quiz-primary" data-start="completo">Iniciar simulado completo</button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>Provas oficiais CRA-PR</h2>
          <span class="panel-sub">Analista de Sistemas — provas anteriores (Quadrix)</span>
        </div>
        <div class="provas-links">${provas}</div>
        <p class="quiz-aviso">O concurso 2026 será pela Consulplan. As provas CRA-PR 2022/2023 (Quadrix) servem de referência para o bloco de TI; as questões desta aba seguem o edital 2026 + estilo Consulplan.</p>
      </section>
    `;

    home.querySelectorAll("[data-start]").forEach((btn) => {
      btn.addEventListener("click", () => showQuizSetup(btn.dataset.start));
    });

    home.querySelectorAll(".quiz-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-quiz")) return;
        showQuizSetup(card.dataset.quiz);
      });
    });

    document.getElementById("quiz-resume")?.addEventListener("click", () => {
      if (tryResumeSession()) {
        document.getElementById("quiz-home").classList.add("hidden");
        document.getElementById("quiz-active").classList.remove("hidden");
        renderQuestion();
      }
    });

    document.getElementById("quiz-discard")?.addEventListener("click", () => {
      if (confirm("Descartar simulado em andamento?")) {
        if (window.Store) Store.clearQuizEmAndamento();
        showQuizHome();
      }
    });
  }

  function showQuizSetup(discId) {
    state.disciplina = discId;
    renderNavQuiz();

    const cfg = QUIZ_CONFIG[discId];
    const maxDisponivel = discId === "completo"
      ? 50
      : Math.min(cfg.max, (QUESTOES[discId] || []).length);

    document.getElementById("quiz-home").classList.add("hidden");
    document.getElementById("quiz-active").classList.remove("hidden");
    document.getElementById("quiz-result").classList.add("hidden");

    const active = document.getElementById("quiz-active");
    active.innerHTML = `
      <section class="panel quiz-setup">
        <div class="panel-head">
          <h2>${cfg.nome}</h2>
          <span class="panel-sub">Configure o simulado</span>
        </div>
        <div class="quiz-setup-body">
          <label class="quiz-label">
            Quantidade de questões
            <input type="number" id="quiz-qty" min="1" max="${maxDisponivel}" value="${Math.min(cfg.padrao, maxDisponivel)}">
            <span class="quiz-hint">Padrão da prova: ${cfg.padrao} · Disponível: ${maxDisponivel}</span>
          </label>
          <div class="quiz-setup-actions">
            <button type="button" class="btn-quiz btn-quiz-primary" id="quiz-go">Começar</button>
            <button type="button" class="btn-quiz btn-quiz-ghost" id="quiz-back">Voltar</button>
          </div>
        </div>
      </section>
    `;

    document.getElementById("quiz-go").addEventListener("click", () => {
      const qty = parseInt(document.getElementById("quiz-qty").value, 10);
      if (qty < 1 || qty > maxDisponivel) return;
      startQuiz(discId, qty);
    });

    document.getElementById("quiz-back").addEventListener("click", () => {
      state.disciplina = null;
      renderNavQuiz();
      showQuizHome();
    });
  }

  function startQuiz(discId, qty) {
    state.questoes = sampleQuestions(discId, qty);
    state.respostas = {};
    state.indice = 0;
    state.inicio = Date.now();
    state.finalizado = false;
    persistSession();
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.questoes[state.indice];
    const total = state.questoes.length;
    const active = document.getElementById("quiz-active");
    const respondida = state.respostas[q.id] !== undefined;
    const sel = state.respostas[q.id];

    const navBtns = state.questoes.map((_, i) => {
      let cls = "qnav-btn";
      if (i === state.indice) cls += " current";
      if (state.respostas[state.questoes[i].id] !== undefined) cls += " answered";
      return `<button type="button" class="${cls}" data-goto="${i}">${i + 1}</button>`;
    }).join("");

    const alts = q.alternativas.map((alt, i) => {
      let cls = "quiz-alt";
      if (respondida && i === sel) cls += " selected";
      return `
        <label class="${cls}">
          <input type="radio" name="alt" value="${i}" ${sel === i ? "checked" : ""} ${state.finalizado ? "disabled" : ""}>
          <span>${alt}</span>
        </label>
      `;
    }).join("");

    const discNome = QUIZ_CONFIG[q.disciplina]?.nome || "";

    active.innerHTML = `
      <section class="panel quiz-runner">
        <div class="quiz-runner-head">
          <div>
            <span class="quiz-runner-disc">${discNome}</span>
            <span class="quiz-runner-meta">Questão ${state.indice + 1} de ${total}</span>
          </div>
          <div class="quiz-runner-right">
            <span class="quiz-timer" id="quiz-timer">${formatTime(Date.now() - state.inicio)}</span>
            <button type="button" class="btn-quiz btn-quiz-ghost btn-sm" id="quiz-cancel">Sair</button>
          </div>
        </div>

        <div class="quiz-qnav">${navBtns}</div>

        <div class="quiz-question">
          <span class="quiz-fonte">${q.fonte}</span>
          <p class="quiz-enunciado">${q.enunciado}</p>
          <div class="quiz-alternativas">${alts}</div>
        </div>

        <div class="quiz-runner-foot">
          <button type="button" class="btn-quiz btn-quiz-ghost" id="quiz-prev" ${state.indice === 0 ? "disabled" : ""}>Anterior</button>
          ${state.indice < total - 1
            ? `<button type="button" class="btn-quiz btn-quiz-primary" id="quiz-next">Próxima</button>`
            : `<button type="button" class="btn-quiz btn-quiz-primary" id="quiz-finish">Finalizar</button>`
          }
        </div>
      </section>
    `;

    if (!state.timerInterval) {
      state.timerInterval = setInterval(() => {
        const el = document.getElementById("quiz-timer");
        if (el) el.textContent = formatTime(Date.now() - state.inicio);
      }, 1000);
    }

    active.querySelectorAll('input[name="alt"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        state.respostas[q.id] = parseInt(radio.value, 10);
        persistSession();
        renderQuestion();
      });
    });

    active.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.indice = parseInt(btn.dataset.goto, 10);
        persistSession();
        renderQuestion();
      });
    });

    document.getElementById("quiz-prev")?.addEventListener("click", () => {
      state.indice--;
      persistSession();
      renderQuestion();
    });

    document.getElementById("quiz-next")?.addEventListener("click", () => {
      state.indice++;
      persistSession();
      renderQuestion();
    });

    document.getElementById("quiz-finish")?.addEventListener("click", finishQuiz);

    document.getElementById("quiz-cancel")?.addEventListener("click", () => {
      if (confirm("Sair do simulado? O progresso fica salvo para continuar depois.")) {
        clearTimer();
        persistSession();
        showQuizHome();
      }
    });
  }

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function finishQuiz() {
    const naoRespondidas = state.questoes.filter((q) => state.respostas[q.id] === undefined).length;
    if (naoRespondidas > 0) {
      if (!confirm(`Faltam ${naoRespondidas} questão(ões). Finalizar mesmo assim?`)) return;
    }

    clearTimer();
    state.finalizado = true;

    let acertos = 0;
    state.questoes.forEach((q) => {
      if (state.respostas[q.id] === q.correta) acertos++;
    });

    const total = state.questoes.length;
    const pct = Math.round((acertos / total) * 100);
    const tempoMs = Date.now() - state.inicio;
    const tempo = formatTime(tempoMs);

    if (window.Store) {
      Store.addQuizResult({
        disciplina: state.disciplina,
        disciplinaNome: QUIZ_CONFIG[state.disciplina].nome,
        acertos,
        total,
        pct,
        tempoMs,
        questoes: state.questoes.map((q) => q.id),
        respostas: { ...state.respostas },
      });
    } else {
      const stats = loadStats();
      stats.simulados = (stats.simulados || 0) + 1;
      stats.total = (stats.total || 0) + total;
      stats.acertos = (stats.acertos || 0) + acertos;
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }
    renderStats();

    document.getElementById("quiz-active").classList.add("hidden");
    const result = document.getElementById("quiz-result");
    result.classList.remove("hidden");

    const revisao = state.questoes.map((q, i) => {
      const resp = state.respostas[q.id];
      const certa = resp === q.correta;
      const naoResp = resp === undefined;
      let cls = certa ? "rev-ok" : "rev-err";
      if (naoResp) cls = "rev-skip";

      return `
        <div class="revisao-item ${cls}">
          <div class="revisao-head">
            <span class="rev-num">${i + 1}</span>
            <span class="rev-status">${naoResp ? "Não respondida" : certa ? "Correta" : "Errada"}</span>
            <span class="rev-fonte">${q.fonte}</span>
          </div>
          <p class="rev-enun">${q.enunciado}</p>
          <p class="rev-resp"><strong>Sua resposta:</strong> ${naoResp ? "—" : q.alternativas[resp]}</p>
          ${!certa ? `<p class="rev-gab"><strong>Gabarito:</strong> ${q.alternativas[q.correta]}</p>` : ""}
          <p class="rev-exp">${q.explicacao}</p>
        </div>
      `;
    }).join("");

    result.innerHTML = `
      <section class="panel quiz-result-panel">
        <div class="panel-head">
          <h2>Resultado</h2>
          <span class="panel-sub">${QUIZ_CONFIG[state.disciplina].nome}</span>
        </div>
        <div class="result-summary">
          <div class="result-score">
            <span class="result-pct">${pct}%</span>
            <span class="result-detail">${acertos} de ${total} acertos</span>
          </div>
          <div class="result-meta">
            <span>Tempo: <strong>${tempo}</strong></span>
            <span>Mínimo edital: <strong>50%</strong> para classificação*</span>
          </div>
        </div>
        <div class="result-actions">
          <button type="button" class="btn-quiz btn-quiz-primary" id="result-retry">Refazer</button>
          <button type="button" class="btn-quiz btn-quiz-ghost" id="result-home">Voltar aos simulados</button>
        </div>
        <p class="quiz-aviso">*Conforme edital — nota mínima pode variar por fase. Consulte o edital oficial.</p>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>Gabarito comentado</h2>
        </div>
        <div class="revisao-list">${revisao}</div>
      </section>
    `;

    document.getElementById("result-retry").addEventListener("click", () => {
      result.classList.add("hidden");
      showQuizSetup(state.disciplina);
    });

    document.getElementById("result-home").addEventListener("click", () => {
      result.classList.add("hidden");
      state.disciplina = null;
      renderNavQuiz();
      showQuizHome();
    });
  }

  function initQuiz() {
    renderNavQuiz();
    renderStats();
    showQuizHome();
  }

  window.QuizApp = { initQuiz, showQuizHome };
})();
