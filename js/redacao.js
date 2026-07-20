(function () {
  "use strict";

  const STORAGE_KEY = "cra-pr-redacao-checklist"; // legado — migrado para Store

  function loadChecklist() {
    if (window.Store) return Store.getRedacaoChecklist();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveChecklist() {
    /* persistência via Store.toggleRedacao */
  }

  function checkId(temaId, itemId) {
    return `${temaId}_${itemId}`;
  }

  function isChecked(data, temaId, itemId) {
    if (window.Store) return Store.isRedacaoChecked(temaId, itemId);
    return !!data[checkId(temaId, itemId)];
  }

  function toggleCheck(temaId, itemId) {
    if (window.Store) Store.toggleRedacao(temaId, itemId);
    else {
      const data = loadChecklist();
      const key = checkId(temaId, itemId);
      data[key] = !data[key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    updateProgress();
    updateNavBadges();
    updateTemaBadge(temaId);
  }

  function countTema(tema) {
    const data = loadChecklist();
    const total = tema.checklist.length;
    const done = tema.checklist.filter((c) => isChecked(data, tema.id, c.id)).length;
    return { done, total };
  }

  function countGlobal() {
    let done = 0;
    let total = 0;
    TEMAS_REDACAO.forEach((t) => {
      const c = countTema(t);
      done += c.done;
      total += c.total;
    });
    return { done, total };
  }

  function renderNav() {
    const nav = document.getElementById("nav-redacao");
    const items = TEMAS_REDACAO.map((t, i) => {
      const { done, total } = countTema(t);
      return `<li><a href="#red-${t.id}" data-id="${t.id}">
        <span>${i + 1}. ${truncate(t.titulo, 28)}</span>
        <span class="nav-badge">${done}/${total}</span>
      </a></li>`;
    }).join("");
    nav.innerHTML = `<ul class="nav-disciplinas-list">${items}</ul>`;
  }

  function truncate(str, n) {
    return str.length > n ? str.slice(0, n) + "…" : str;
  }

  function renderProgress() {
    const { done, total } = countGlobal();
    const pct = total ? Math.round((done / total) * 100) : 0;
    const el = document.getElementById("redacao-progress");
    if (!el) return;
    el.innerHTML = `
      <h3>Checklists</h3>
      <div class="redacao-progress-bar">
        <div class="redacao-progress-fill" style="width:${pct}%"></div>
      </div>
      <p class="progress-detail">${done} de ${total} itens · ${pct}%</p>
    `;
  }

  function updateProgress() {
    renderProgress();
    const { done, total } = countGlobal();
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = document.querySelector(".redacao-progress-fill");
    if (fill) fill.style.width = pct + "%";
    const detail = document.querySelector("#redacao-progress .progress-detail");
    if (detail) detail.textContent = `${done} de ${total} itens · ${pct}%`;
  }

  function updateNavBadges() {
    TEMAS_REDACAO.forEach((t) => {
      const link = document.querySelector(`#nav-redacao [data-id="${t.id}"]`);
      if (!link) return;
      const { done, total } = countTema(t);
      const badge = link.querySelector(".nav-badge");
      if (badge) badge.textContent = `${done}/${total}`;
    });
  }

  function updateTemaBadge(temaId) {
    const tema = TEMAS_REDACAO.find((t) => t.id === temaId);
    const section = document.getElementById(`red-${temaId}`);
    if (!tema || !section) return;
    const { done, total } = countTema(tema);
    const pct = total ? Math.round((done / total) * 100) : 0;
    section.querySelector(".redacao-progress-fill").style.width = pct + "%";
    section.querySelector(".redacao-count").textContent = `${done}/${total}`;
    tema.checklist.forEach((c) => {
      const item = section.querySelector(`[data-check="${c.id}"]`);
      if (!item) return;
      const data = loadChecklist();
      const checked = isChecked(data, temaId, c.id);
      item.classList.toggle("done", checked);
      item.querySelector("input").checked = checked;
    });
  }

  function renderTema(tema, index) {
    const data = loadChecklist();
    const { done, total } = countTema(tema);
    const pct = total ? Math.round((done / total) * 100) : 0;
    const tipoLabel = tema.tipo === "anterior" ? "Tema anterior / recorrente" : "Tema previsto (edital 2026)";
    const tipoClass = tema.tipo === "anterior" ? "tag-anterior" : "tag-previsto";

    const checklistHtml = tema.checklist.map((c) => {
      const checked = isChecked(data, tema.id, c.id) ? "checked" : "";
      const doneClass = isChecked(data, tema.id, c.id) ? "done" : "";
      return `
        <li class="redacao-check-item ${doneClass}" data-check="${c.id}">
          <input type="checkbox" class="topico-check" ${checked} aria-label="${c.texto}">
          <span>${c.texto}</span>
        </li>
      `;
    }).join("");

    return `
      <section class="redacao-tema" id="red-${tema.id}">
        <div class="redacao-tema-header">
          <div class="redacao-tema-title">
            <span class="redacao-num">${index + 1}</span>
            <div>
              <span class="redacao-tipo ${tipoClass}">${tipoLabel}</span>
              <h2>${tema.titulo}</h2>
              <p class="redacao-contexto">${tema.contexto}</p>
            </div>
          </div>
          <div class="disciplina-stats">
            <div class="disciplina-progress">
              <div class="redacao-progress-fill disciplina-progress-fill" style="width:${pct}%"></div>
            </div>
            <span class="redacao-count disciplina-count">${done}/${total}</span>
            <svg class="chevron" viewBox="0 0 16 16" fill="currentColor"><path d="M4 6l4 4 4-4"/></svg>
          </div>
        </div>
        <div class="redacao-tema-body">
          <div class="redacao-checklist-block">
            <h3>Checklist do tema</h3>
            <ul class="redacao-checklist">${checklistHtml}</ul>
          </div>
          <div class="redacao-exemplo-block">
            <div class="redacao-exemplo-head">
              <h3>Redação exemplo</h3>
              <button type="button" class="btn-toggle-exemplo" data-toggle="${tema.id}">Mostrar / ocultar</button>
            </div>
            <div class="redacao-exemplo-texto hidden" id="exemplo-${tema.id}">
              ${tema.exemplo.split("\n\n").map((p) => `<p>${p}</p>`).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderMain() {
    const intro = document.getElementById("redacao-intro");
    intro.innerHTML = `
      <section class="panel">
        <div class="panel-head">
          <h2>Prova discursiva — dissertação</h2>
          <span class="panel-sub">Analista de Sistemas · Consulplan</span>
        </div>
        <div class="redacao-info">
          <p><strong>Formato:</strong> ${REDACAO_INFO.formato}</p>
          <p><strong>Extensão:</strong> ${REDACAO_INFO.linhas}</p>
          <p><strong>Critérios de correção:</strong></p>
          <ul>${REDACAO_INFO.criterios.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
      </section>
    `;

    const container = document.getElementById("redacao-temas");
    container.innerHTML = TEMAS_REDACAO.map(renderTema).join("");

    bindEvents(container);
  }

  function bindEvents(container) {
    container.querySelectorAll(".redacao-tema-header").forEach((header) => {
      header.addEventListener("click", (e) => {
        if (e.target.closest(".topico-check") || e.target.closest(".btn-toggle-exemplo")) return;
        const tema = header.closest(".redacao-tema");
        tema.classList.toggle("collapsed");
        const body = tema.querySelector(".redacao-tema-body");
        if (!tema.classList.contains("collapsed")) {
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });

    container.querySelectorAll(".redacao-check-item input").forEach((cb) => {
      cb.addEventListener("change", (e) => {
        e.stopPropagation();
        const temaEl = cb.closest(".redacao-tema");
        const temaId = temaEl.id.replace("red-", "");
        const itemId = cb.closest(".redacao-check-item").dataset.check;
        toggleCheck(temaId, itemId);
      });
    });

    container.querySelectorAll(".btn-toggle-exemplo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const el = document.getElementById(`exemplo-${btn.dataset.toggle}`);
        el.classList.toggle("hidden");
        const tema = btn.closest(".redacao-tema");
        const body = tema.querySelector(".redacao-tema-body");
        body.style.maxHeight = body.scrollHeight + "px";
      });
    });

    container.querySelectorAll(".redacao-tema-body").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  }

  function initScrollSpy() {
    const sections = TEMAS_REDACAO.map((t) => document.getElementById(`red-${t.id}`)).filter(Boolean);
    const links = document.querySelectorAll("#nav-redacao a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id.replace("red-", "");
          links.forEach((a) => a.classList.toggle("active", a.dataset.id === id));
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  function initRedacao() {
    if (typeof TEMAS_REDACAO === "undefined" || !TEMAS_REDACAO.length) {
      console.error("TEMAS_REDACAO não carregado — verifique js/redacao-data.js");
      return;
    }
    renderNav();
    renderProgress();
    renderMain();
    initScrollSpy();
  }

  window.RedacaoApp = { initRedacao };
})();
