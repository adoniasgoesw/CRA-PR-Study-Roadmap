(function () {
  "use strict";

  const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const DIAS_SEM = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  let view = "mes";
  let cursor = new Date(2026, 6, 21);
  let selected = new Date(2026, 6, 21);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function dateKey(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  function isToday(d) {
    return sameDay(d, new Date());
  }

  function isInRange(d) {
    return d >= stripTime(CRONOGRAMA_INICIO) && d <= stripTime(CRONOGRAMA_EXAM);
  }

  function stripTime(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function getDia(d) {
    return CRONOGRAMA_DIAS[dateKey(d)] || null;
  }

  function catColor(cat) {
    const p = CRONOGRAMA_PRIORIDADES.find((x) => x.cat === cat);
    return p ? p.cor : "#7f8c8d";
  }

  function catNome(cat) {
    const p = CRONOGRAMA_PRIORIDADES.find((x) => x.cat === cat);
    return p ? p.nome : cat;
  }

  function startOfWeek(d) {
    const x = new Date(d);
    const day = x.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    x.setDate(x.getDate() + diff);
    return stripTime(x);
  }

  function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }

  function formatDate(d) {
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  function formatWeekday(d) {
    const idx = d.getDay() === 0 ? 6 : d.getDay() - 1;
    return DIAS_SEM[idx];
  }

  function renderSlots(slots, compact) {
    if (!slots || !slots.length) return `<p class="cal-empty">Sem estudo programado</p>`;
    return slots.map((s) => `
      <div class="cal-slot" style="--slot-color:${catColor(s.cat)}">
        <div class="cal-slot-time">${s.horario} <span>${s.horas}h</span></div>
        <div class="cal-slot-title">${s.titulo}</div>
        ${compact ? "" : `<div class="cal-slot-desc">${s.desc}</div>`}
      </div>
    `).join("");
  }

  function isDiaConcluido(key) {
    return window.Store ? Store.isCronogramaDiaDone(key) : false;
  }

  function countDiasConcluidos() {
    if (!window.Store) return { done: 0, total: 0 };
    const concluidos = Store.getCronogramaConcluidos();
    const total = Object.keys(CRONOGRAMA_DIAS).length;
    const done = Object.keys(concluidos).filter((k) => concluidos[k] && CRONOGRAMA_DIAS[k]).length;
    return { done, total };
  }

  function renderSidebar() {
    const el = document.getElementById("cronograma-sidebar");
    const hoje = getDia(new Date());
    const sel = getDia(selected);
    const prog = countDiasConcluidos();

    el.innerHTML = `
      <div class="sidebar-block">
        <h3>Progresso</h3>
        <p class="cal-side-hours"><strong>${prog.done}</strong> de ${prog.total} dias concluídos</p>
        <div class="redacao-progress-bar">
          <div class="redacao-progress-fill" style="width:${prog.total ? Math.round((prog.done / prog.total) * 100) : 0}%"></div>
        </div>
        <p class="storage-hint">Salvo no navegador</p>
      </div>
      <div class="sidebar-block">
        <h3>Hoje</h3>
        ${hoje ? `
          <p class="cal-side-date">${formatDate(new Date())}</p>
          <p class="cal-side-hours"><strong>${hoje.horas}h</strong> programadas · Fase ${hoje.fase}</p>
          <div class="cal-side-slots">${renderSlots(hoje.slots, true)}</div>
        ` : `<p class="cal-side-muted">Fora do período do cronograma</p>`}
      </div>
      <div class="sidebar-block">
        <h3>Prioridade de carga</h3>
        <ul class="cal-prioridades">
          ${CRONOGRAMA_PRIORIDADES.map((p) => `
            <li><span class="cal-dot" style="background:${p.cor}"></span>${p.nome} <em>${p.peso}</em></li>
          `).join("")}
        </ul>
      </div>
      <div class="sidebar-block">
        <h3>Fases</h3>
        <p class="cal-fase cal-fase-1"><strong>Fase 1</strong> 20/07–03/08 · 8h/dia</p>
        <p class="cal-fase cal-fase-2"><strong>Fase 2</strong> 04/08–13/09 · ~19h/sem</p>
      </div>
      <div class="sidebar-block">
        <h3>Regras</h3>
        <ul class="cal-regras">${CRONOGRAMA_REGRAS.map((r) => `<li>${r}</li>`).join("")}</ul>
      </div>
      ${sel ? `
        <div class="sidebar-block cal-selected-summary">
          <h3>Dia selecionado</h3>
          <p class="cal-side-date">${formatWeekday(selected)} ${formatDate(selected)}</p>
          <p class="cal-side-hours">Semana ${sel.semana} · Fase ${sel.fase} · ${sel.horas}h</p>
          ${sel.nota ? `<p class="cal-nota">${sel.nota}</p>` : ""}
        </div>
      ` : ""}
    `;
  }

  function renderMonth() {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    let start = startOfWeek(first);
    const cells = [];
    let d = new Date(start);

    while (d <= last || cells.length % 7 !== 0) {
      cells.push(new Date(d));
      d = addDays(d, 1);
      if (cells.length > 42) break;
    }

    const grid = cells.map((day) => {
      const inMonth = day.getMonth() === m;
      const dia = getDia(day);
      const key = dateKey(day);
      const isSel = sameDay(day, selected);
      const isExam = sameDay(day, CRONOGRAMA_EXAM);
      const inR = isInRange(day);
      const isDone = isDiaConcluido(key);
      const classes = [
        "cal-day",
        inMonth ? "" : "other-month",
        isToday(day) ? "today" : "",
        isSel ? "selected" : "",
        dia ? "has-plan" : "",
        isDone ? "dia-done" : "",
        isExam ? "exam-day" : "",
        inR ? "" : "out-range",
      ].filter(Boolean).join(" ");

      const dots = dia
        ? [...new Set(dia.slots.map((s) => s.cat))].slice(0, 4).map((c) =>
            `<span class="cal-dot-sm" style="background:${catColor(c)}"></span>`
          ).join("")
        : "";

      return `
        <button type="button" class="${classes}" data-date="${key}" ${!inMonth && !dia ? "tabindex=-1" : ""}>
          <span class="cal-day-num">${day.getDate()}</span>
          ${dia ? `<span class="cal-day-hours">${dia.horas}h</span>` : ""}
          ${isDone ? `<span class="cal-day-check">✓</span>` : ""}
          <span class="cal-day-dots">${dots}</span>
        </button>
      `;
    }).join("");

    return `
      <div class="cal-month-grid">
        ${DIAS_SEM.map((d) => `<div class="cal-weekday">${d}</div>`).join("")}
        ${grid}
      </div>
    `;
  }

  function renderWeek() {
    const start = startOfWeek(cursor);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    return `
      <div class="cal-week-grid">
        ${days.map((day) => {
          const dia = getDia(day);
          return `
            <div class="cal-week-col ${sameDay(day, selected) ? "selected" : ""} ${isToday(day) ? "today" : ""}">
              <button type="button" class="cal-week-head" data-date="${dateKey(day)}">
                <span class="cal-week-dow">${formatWeekday(day)}</span>
                <span class="cal-week-date">${pad(day.getDate())}/${pad(day.getMonth() + 1)}</span>
                ${dia ? `<span class="cal-week-h">${dia.horas}h</span>` : ""}
              </button>
              <div class="cal-week-body">
                ${dia ? renderSlots(dia.slots, false) : `<p class="cal-empty">—</p>`}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderDay() {
    const dia = getDia(cursor);
    const title = `${formatWeekday(cursor)} · ${formatDate(cursor)}`;

    return `
      <div class="cal-day-view">
        <div class="cal-day-header">
          <h2>${title}</h2>
          ${dia ? `
            <div class="cal-day-badges">
              <span class="cal-badge">Fase ${dia.fase}</span>
              <span class="cal-badge">Semana ${dia.semana}</span>
              <span class="cal-badge cal-badge-hours">${dia.horas}h total</span>
            </div>
            ${dia.nota ? `<p class="cal-nota-banner">${dia.nota}</p>` : ""}
          ` : `<p class="cal-empty">Nenhum estudo programado para este dia.</p>`}
        </div>
        <div class="cal-day-timeline">
          ${dia ? renderSlots(dia.slots, false) : ""}
        </div>
      </div>
    `;
  }

  function navLabel() {
    if (view === "mes") return `${MESES[cursor.getMonth()]} ${cursor.getFullYear()}`;
    if (view === "semana") {
      const s = startOfWeek(cursor);
      const e = addDays(s, 6);
      return `${pad(s.getDate())}/${pad(s.getMonth() + 1)} – ${pad(e.getDate())}/${pad(e.getMonth() + 1)}/${e.getFullYear()}`;
    }
    return formatDate(cursor);
  }

  function render() {
    const main = document.getElementById("cronograma-main");
    let body = "";
    if (view === "mes") body = renderMonth();
    else if (view === "semana") body = renderWeek();
    else body = renderDay();

    main.innerHTML = `
      <section class="panel cal-panel">
        <div class="cal-toolbar">
          <div class="cal-nav">
            <button type="button" class="cal-nav-btn" id="cal-prev" aria-label="Anterior">‹</button>
            <span class="cal-nav-label">${navLabel()}</span>
            <button type="button" class="cal-nav-btn" id="cal-next" aria-label="Próximo">›</button>
          </div>
          <div class="cal-views">
            <button type="button" class="cal-view-btn ${view === "mes" ? "active" : ""}" data-view="mes">Mês</button>
            <button type="button" class="cal-view-btn ${view === "semana" ? "active" : ""}" data-view="semana">Semana</button>
            <button type="button" class="cal-view-btn ${view === "dia" ? "active" : ""}" data-view="dia">Dia</button>
          </div>
          <button type="button" class="cal-today-btn" id="cal-today">Hoje</button>
        </div>
        ${body}
      </section>
      <section class="panel cal-detail" id="cal-detail"></section>
    `;

    renderDetail();
    renderSidebar();
    bindEvents();
  }

  function renderDetail() {
    const el = document.getElementById("cal-detail");
    if (!el) return;
    const dia = getDia(selected);
    const key = dateKey(selected);
    if (!dia) {
      el.innerHTML = `
        <div class="panel-head"><h2>Detalhe do dia</h2></div>
        <p class="cal-detail-empty">Selecione um dia com estudo programado no calendário.</p>
      `;
      return;
    }

    const checked = isDiaConcluido(key) ? "checked" : "";

    el.innerHTML = `
      <div class="panel-head">
        <h2>${formatWeekday(selected)} ${formatDate(selected)}</h2>
        <span class="panel-sub">Fase ${dia.fase} · Semana ${dia.semana} · ${dia.horas}h</span>
      </div>
      <label class="cal-done-label">
        <input type="checkbox" id="cal-mark-done" ${checked}>
        <span>Marcar dia como concluído</span>
      </label>
      ${dia.nota ? `<p class="cal-nota-banner">${dia.nota}</p>` : ""}
      <div class="cal-detail-slots">${renderSlots(dia.slots, false)}</div>
    `;

    document.getElementById("cal-mark-done")?.addEventListener("change", () => {
      if (window.Store) Store.toggleCronogramaDia(key);
      render();
    });
  }

  function bindEvents() {
    document.getElementById("cal-prev")?.addEventListener("click", () => navigate(-1));
    document.getElementById("cal-next")?.addEventListener("click", () => navigate(1));
    document.getElementById("cal-today")?.addEventListener("click", () => {
      const t = stripTime(new Date());
      cursor = new Date(t);
      selected = new Date(t);
      render();
    });

    document.querySelectorAll(".cal-view-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        view = btn.dataset.view;
        render();
      });
    });

    document.querySelectorAll("[data-date]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [y, m, d] = btn.dataset.date.split("-").map(Number);
        selected = new Date(y, m - 1, d);
        cursor = new Date(selected);
        if (view === "mes") renderDetail(), renderSidebar();
        else render();
      });
    });
  }

  function navigate(dir) {
    if (view === "mes") cursor = new Date(cursor.getFullYear(), cursor.getMonth() + dir, 1);
    else if (view === "semana") cursor = addDays(cursor, dir * 7);
    else cursor = addDays(cursor, dir);
    render();
  }

  function initCronograma() {
    if (typeof CRONOGRAMA_DIAS === "undefined") {
      console.error("cronograma-data.js não carregado");
      return;
    }
    const t = stripTime(new Date());
    if (isInRange(t)) {
      cursor = new Date(t);
      selected = new Date(t);
    }
    render();
  }

  window.CronogramaApp = { initCronograma, render };
})();
