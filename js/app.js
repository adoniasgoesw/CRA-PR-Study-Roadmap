(function () {
  "use strict";

  const STORAGE_KEY = "cra-pr-roadmap-progress-v2"; // legado — migrado para Store

  function loadProgress() {
    if (window.Store) return Store.getConteudoProgress();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveProgress() {
    /* persistência via Store.toggleConteudo */
  }

  function isDone(id) {
    if (window.Store) return Store.isConteudoDone(id);
    return !!loadProgress()[id];
  }

  function toggleTopic(id) {
    if (window.Store) Store.toggleConteudo(id);
    else {
      const p = loadProgress();
      p[id] = !p[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    }
    updateAll();
  }

  function getAllTopicos(disc) {
    return disc.topicos;
  }

  function countTopics() {
    let total = 0;
    let done = 0;
    DISCIPLINAS.forEach((d) => {
      getAllTopicos(d).forEach((t) => {
        total++;
        if (isDone(t.id)) done++;
      });
    });
    return { total, done };
  }

  function countDisciplina(disc) {
    const topicos = getAllTopicos(disc);
    const total = topicos.length;
    const done = topicos.filter((t) => isDone(t.id)).length;
    return { total, done };
  }

  function renderIntro() {
    const el = document.getElementById("intro-base");
    if (el) el.textContent = INTRO.base;
  }

  function renderDaysLeft() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((EXAM_DATE - today) / (1000 * 60 * 60 * 24));
    document.getElementById("days-left").textContent = diff > 0 ? diff : 0;
  }

  function renderPerfil() {
    document.getElementById("perfil-list").innerHTML = PERFIL_BANCA.map((p) => `
      <li>
        <span class="perfil-area">${p.area}</span>
        <span class="perfil-texto">${p.texto}</span>
      </li>
    `).join("");
  }

  function renderOrdem() {
    document.getElementById("ordem-list").innerHTML = ORDEM_ATAQUE.map((o) => `
      <li>
        <span class="ordem-num">${o.ordem}</span>
        <div>
          <span class="ordem-titulo">${o.titulo}</span>
          <span class="ordem-nota-item">${o.nota}</span>
        </div>
      </li>
    `).join("");

    document.getElementById("ordem-nota").textContent =
      "Com histórico em JS/front-end, os itens 18–21 (Web, Django, DevOps) já dão vantagem. Foco maior de tempo: Legislação CRA-PR/CFA e itens 1–3 (arquitetura, SO, estrutura de dados).";
  }

  function renderDistribuicao() {
    const grid = document.getElementById("dist-grid");
    const maxQ = Math.max(...DISTRIBUICAO.map((d) => d.questoes));

    grid.innerHTML = DISTRIBUICAO.map((d) => `
      <div class="dist-item">
        <div class="dist-qty">${d.questoes}<span>q</span></div>
        <div class="dist-name">${d.nome}</div>
        <div class="dist-bar">
          <div class="dist-bar-fill" style="width:${(d.questoes / maxQ) * 100}%"></div>
        </div>
      </div>
    `).join("");
  }

  function renderNav() {
    const nav = document.getElementById("nav-disciplinas");
    const extras = `
      <li><a href="#sec-perfil" data-id="perfil"><span>Perfil da banca</span></a></li>
      <li><a href="#sec-ordem" data-id="ordem"><span>Ordem de ataque</span></a></li>
    `;

    nav.innerHTML = extras + DISCIPLINAS.map((d) => {
      const { done, total } = countDisciplina(d);
      const label = d.numero ? `${d.numero}. ` : "";
      return `<li><a href="#disc-${d.id}" data-id="${d.id}">
        <span>${label}${shortName(d.nome)}</span>
        <span class="nav-badge">${done}/${total}</span>
      </a></li>`;
    }).join("");
  }

  function shortName(nome) {
    return nome
      .replace("Conhecimentos de ", "")
      .replace("Conhecimentos do Cargo — ", "Cargo — ")
      .replace("Legislação do ", "Leg. ");
  }

  function renderTopicoItem(t) {
    const checked = isDone(t.id) ? "checked" : "";
    const doneClass = isDone(t.id) ? "done" : "";
    const nota = t.nota ? `<div class="topico-sub">${t.nota}</div>` : "";
    const ordem = t.ordem ? `<span class="topico-ordem">${t.ordem}</span>` : "";

    return `
      <li class="topico-item ${doneClass}" data-id="${t.id}">
        <input type="checkbox" class="topico-check" ${checked} aria-label="Marcar ${t.nome}">
        ${ordem}
        <div>
          <div class="topico-name">${t.nome}</div>
          ${nota}
        </div>
        <span class="topico-tag tag-${t.tipo}">${t.tipo}</span>
      </li>
    `;
  }

  function renderTopicosBody(d) {
    if (d.blocos) {
      return d.blocos.map((b) => `
        <div class="bloco-group">
          <div class="bloco-header bloco-${b.id.toLowerCase()}">
            <span class="bloco-label">${b.nome}</span>
            <span class="bloco-desc">${b.descricao}</span>
          </div>
          <ul class="topico-list">
            ${b.topicos.map(renderTopicoItem).join("")}
          </ul>
        </div>
      `).join("");
    }

    return `<ul class="topico-list">${d.topicos.map(renderTopicoItem).join("")}</ul>`;
  }

  function renderDisciplinas() {
    const container = document.getElementById("disciplinas-container");

    container.innerHTML = DISCIPLINAS.map((d) => {
      const { done, total } = countDisciplina(d);
      const pct = total ? Math.round((done / total) * 100) : 0;
      const desc = d.descricao ? `<span class="disciplina-desc">${d.descricao}</span>` : "";
      const ordemLabel = d.ordemLabel
        ? `<p class="disciplina-ordem-label">${d.ordemLabel}</p>`
        : "";
      const dica = d.dica
        ? `<div class="disciplina-dica"><strong>Dica:</strong> ${d.dica}</div>`
        : "";
      const notaFinal = d.notaFinal
        ? `<div class="disciplina-nota-final">${d.notaFinal}</div>`
        : "";

      return `
        <section class="disciplina" id="disc-${d.id}">
          <div class="disciplina-header">
            <div class="disciplina-title">
              <span class="disciplina-num">${d.numero}.</span>
              <div>
                <h2>${d.nome}</h2>
                ${desc}
              </div>
              <span class="disciplina-weight">${d.questoes} questões</span>
            </div>
            <div class="disciplina-stats">
              <div class="disciplina-progress">
                <div class="disciplina-progress-fill" style="width:${pct}%"></div>
              </div>
              <span class="disciplina-count">${done}/${total}</span>
              <svg class="chevron" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4"/>
              </svg>
            </div>
          </div>
          <div class="disciplina-body">
            ${ordemLabel}
            ${renderTopicosBody(d)}
            ${dica}
            ${notaFinal}
          </div>
        </section>
      `;
    }).join("");

    bindDisciplinaEvents(container);
  }

  function bindDisciplinaEvents(container) {
    container.querySelectorAll(".disciplina-header").forEach((header) => {
      header.addEventListener("click", (e) => {
        if (e.target.closest(".topico-check")) return;
        const disc = header.closest(".disciplina");
        disc.classList.toggle("collapsed");
        const body = disc.querySelector(".disciplina-body");
        if (!disc.classList.contains("collapsed")) {
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });

    container.querySelectorAll(".topico-check").forEach((cb) => {
      cb.addEventListener("change", (e) => {
        e.stopPropagation();
        toggleTopic(cb.closest(".topico-item").dataset.id);
      });
    });

    container.querySelectorAll(".disciplina-body").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  }

  function renderProgress() {
    const { total, done } = countTopics();
    const pct = total ? Math.round((done / total) * 100) : 0;
    const circumference = 2 * Math.PI * 34;

    document.getElementById("progress-pct").textContent = pct + "%";
    document.getElementById("progress-detail").textContent = `${done} de ${total} tópicos`;

    const hint = document.querySelector("#sidebar-conteudo .storage-hint");
    if (!hint && document.getElementById("sidebar-conteudo")) {
      const block = document.querySelector("#sidebar-conteudo .sidebar-progress");
      if (block && !block.querySelector(".storage-hint")) {
        block.insertAdjacentHTML("beforeend", `<p class="storage-hint">Salvo no navegador</p>`);
      }
    }

    document.getElementById("ring-fill").style.strokeDashoffset =
      circumference - (pct / 100) * circumference;
  }

  function updateNavBadges() {
    DISCIPLINAS.forEach((d) => {
      const link = document.querySelector(`.nav-disciplinas [data-id="${d.id}"]`);
      if (!link) return;
      const { done, total } = countDisciplina(d);
      const badge = link.querySelector(".nav-badge");
      if (badge) badge.textContent = `${done}/${total}`;
    });
  }

  function updateAll() {
    renderProgress();
    updateNavBadges();

    DISCIPLINAS.forEach((d) => {
      const section = document.getElementById(`disc-${d.id}`);
      if (!section) return;
      const { done, total } = countDisciplina(d);
      const pct = total ? Math.round((done / total) * 100) : 0;
      section.querySelector(".disciplina-progress-fill").style.width = pct + "%";
      section.querySelector(".disciplina-count").textContent = `${done}/${total}`;

      getAllTopicos(d).forEach((t) => {
        const item = section.querySelector(`[data-id="${t.id}"]`);
        if (!item) return;
        item.classList.toggle("done", isDone(t.id));
        item.querySelector(".topico-check").checked = isDone(t.id);
      });
    });
  }

  function initScrollSpy() {
    const ids = ["sec-perfil", "sec-ordem", ...DISCIPLINAS.map((d) => `disc-${d.id}`)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const links = document.querySelectorAll(".nav-disciplinas a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const raw = entry.target.id;
          const navId = raw.startsWith("disc-") ? raw.replace("disc-", "") : raw.replace("sec-", "");
          links.forEach((a) => a.classList.toggle("active", a.dataset.id === navId));
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".main-tab");
    const panels = {
      conteudo: document.getElementById("tab-conteudo"),
      exercicios: document.getElementById("tab-exercicios"),
      redacoes: document.getElementById("tab-redacoes"),
      cronograma: document.getElementById("tab-cronograma"),
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.tab;
        tabs.forEach((t) => t.classList.toggle("active", t === tab));
        Object.entries(panels).forEach(([key, panel]) => {
          panel.classList.toggle("active", key === id);
        });
        if (id === "exercicios" && window.QuizApp) {
          window.QuizApp.showQuizHome();
        }
        if (id === "redacoes" && window.RedacaoApp) {
          window.RedacaoApp.initRedacao();
        }
        if (id === "cronograma" && window.CronogramaApp) {
          window.CronogramaApp.initCronograma();
        }
      });
    });
  }

  function init() {
    renderIntro();
    renderDaysLeft();
    renderPerfil();
    renderOrdem();
    renderDistribuicao();
    renderNav();
    renderDisciplinas();
    renderProgress();
    initScrollSpy();
    initTabs();
    if (window.QuizApp) window.QuizApp.initQuiz();
    if (window.RedacaoApp) window.RedacaoApp.initRedacao();
    if (window.CronogramaApp) window.CronogramaApp.initCronograma();
    if (window.Store) Store.load();
  }

  init();
})();
