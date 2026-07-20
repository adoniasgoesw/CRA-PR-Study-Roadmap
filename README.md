# CRA-PR Study Roadmap

A personal, offline-first study planner for the **CRA-PR 2026** public exam — **Systems Analyst** position, organized by **Consulplan**.

The app is a static single-page website (no backend, no build step) that combines a structured syllabus, progress tracking, practice quizzes, essay themes, and a day-by-day study calendar tailored to the official exam syllabus and the candidate's available study hours.

---

## Purpose

Preparing for a Brazilian public competition ("concurso público") involves:

- Many subjects with uneven weight on the exam
- A specific exam board style (how questions are worded and what they emphasize)
- Long-term repetition (especially for legislation-heavy topics)
- Objective + discursive exams on the same day

This project centralizes all of that in one place instead of scattering notes across spreadsheets, PDFs, and flashcard apps. It is built for one specific exam but structured so content can be edited in plain JavaScript data files.

**Exam reference**

| Field | Value |
|-------|-------|
| Organization | CRA-PR (Conselho Regional de Administração do Paraná) |
| Position | Analista de Sistemas (Systems Analyst) |
| Exam board | Instituto Consulplan |
| Objective exam date | September 13, 2026 |
| Objective questions | 50 multiple-choice (4 options each) |
| Discursive | 1 argumentative essay (eliminatory) |

---

## Features (4 tabs)

### 1. Conteúdo (Content)

The core study roadmap based on **Edital nº 1/2026, Annex I** and historical Consulplan patterns.

- **Exam board profile** — how Consulplan tends to test each area (literal law reading, text interpretation in Portuguese, formula-based logic, etc.)
- **Macro study order** — recommended priority across subjects
- **Question distribution** — 10 Portuguese + 5 Logic + 5 IT + 5 Public Admin + 10 CRA/CFA Legislation + 15 job-specific
- **Per-subject topic lists** with:
  - Study order (easy → hard)
  - Tags (`teoria`, `exercicio`, `revisao`, `lei`)
  - Checkboxes to mark topics as done
- **Job-specific block** split into **Block A / B / C** (easy → hard relative to a front-end/JS background)

Progress is shown per subject and globally (ring chart in the sidebar).

### 2. Exercícios (Practice quizzes)

Multiple-choice simulators in Consulplan style (4 alternatives, one correct answer).

- Per-discipline quizzes (default question count matches the real exam)
- Full **50-question mock exam** with real subject distribution
- Timer, question navigation, commented answer key after submission
- **Resume in-progress** mock exams
- History of last 50 completed attempts (score, time, answers)
- Links to official CRA-PR past papers (Quadrix 2022/2023 — same role, different board)

Question bank lives in `js/quiz-data.js` (~66 questions). Job-specific questions align with the 2026 syllabus; older CRA-PR exams are linked for full PDF practice.

### 3. Redações (Essays)

Training for the **eliminatory discursive** part.

- 20 essay themes: 8 recurring/historical + 12 predicted from the 2026 syllabus
- Per-theme **checklist** (introduction, arguments, law citations, conclusion, proofreading, etc.)
- **Sample essay** for each theme (3-paragraph argumentative text)
- Checklist progress per theme and globally

### 4. Cronograma (Schedule)

Interactive calendar from **July 20, 2026** to **exam day**, adapted to the candidate's real availability.

**Phase 1 — Intensive (Jul 20 – Aug 3)**  
8 h/day: 07:00–11:00 + 18:00–22:00  
Focus: Block C (furthest from daily work) + early CRA/CFA legislation (needs spaced repetition).

**Phase 2 — Maintenance (Aug 4 – Sep 13)**  
~19 h/week:

| Day | Hours |
|-----|-------|
| Monday / Friday | 16:00–20:00 (4 h) |
| Tuesday – Thursday | 18:00–21:00 (3 h) |
| Saturday / Sunday | 1 h |

Calendar UI:

- **Month** view with prev/next navigation
- **Week** and **Day** views
- Color-coded study blocks by category
- Mark days as completed (persisted)
- Detail panel with time slots and study content

---

## Study plan reasoning

The plan encodes several deliberate strategies:

1. **Legislation early and often** — CRA-PR/CFA law is high weight (10 questions) and decays quickly without spaced repetition; it appears in almost every review week.

2. **Block C before Block A** — Despite the candidate's strength in web/JS (Block A), architecture, operating systems, and data structures (Block C) need more time and are scheduled in Phase 1 when availability is highest.

3. **Portuguese + Logic first** — High return, relatively fast to optimize; 15 questions combined on the exam.

4. **Essays from Week 6** — Discursive is eliminatory; timed practice starts before the final mock-exam weeks.

5. **No new content in the last week** — Only light review and rest before September 13.

6. **Workload matches life** — Phase 1 uses full morning/evening blocks; Phase 2 respects reduced availability after August 3.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+, IIFEs, no frameworks) |
| Data | Static JS modules exporting `const` objects/arrays |
| Persistence | `localStorage` (browser only) |
| Build / server | None — open `index.html` in a browser |

**Why no framework?**

- Zero install, zero build, works offline after first load
- Easy to edit exam content in `*-data.js` files
- Fits a personal study tool that does not need scaling or auth

**Design**

- Compact layout inspired by Brazilian exam-prep sites (dense panels, navy + red accent, low horizontal padding)
- Responsive sidebar collapses on small screens
- UI copy is in **Brazilian Portuguese**; this documentation is in English

---

## Project structure

```
RoadMap/
├── index.html              # Shell: header, tabs, layout regions
├── css/
│   └── style.css           # All styles (topbar, tabs, panels, calendar, quiz)
├── js/
│   ├── data.js             # Syllabus: subjects, topics, study order, exam meta
│   ├── quiz-data.js        # Question bank + quiz config
│   ├── redacao-data.js     # 20 essay themes, checklists, samples
│   ├── cronograma-data.js  # Day-by-day schedule (Phase 1 + Phase 2)
│   ├── storage.js          # Unified localStorage API (Store)
│   ├── app.js              # Content tab: render, progress, navigation
│   ├── quiz.js             # Quiz flow: setup, run, finish, resume
│   ├── redacao.js          # Essay tab: themes, checklists
│   ├── cronograma.js       # Calendar: month/week/day views
└── README.md               # This file
```

### Script load order

Scripts must load in dependency order (see `index.html`):

1. Data files (`data.js`, `quiz-data.js`, `redacao-data.js`, `cronograma-data.js`)
2. `storage.js` — defines `window.Store`
3. Feature modules (`quiz.js`, `redacao.js`, `cronograma.js`)
4. `app.js` — bootstraps tabs and content tab

---

## Architecture and logic

### Separation of concerns

```
┌─────────────────────────────────────────────────────────┐
│  index.html          Structure + tab panels               │
├─────────────────────────────────────────────────────────┤
│  *-data.js           Content (what to study)            │
│  storage.js          Persistence (what user completed)  │
│  app/quiz/redacao/   Rendering + interaction            │
│  cronograma.js                                          │
├─────────────────────────────────────────────────────────┤
│  style.css           Presentation                       │
└─────────────────────────────────────────────────────────┘
```

- **Data files** are the single source of truth for syllabus, questions, essays, and schedule. No content is hard-coded in UI modules except generic labels.
- **UI modules** read data, render HTML strings, attach event listeners, and call `Store` on user actions.
- **No virtual DOM** — lists and panels are rebuilt with `innerHTML` on state changes. Simple and sufficient for this scale.

### Tab system (`app.js`)

- Top navigation toggles `.tab-panel` visibility via `data-tab` attributes
- Switching tabs can re-init a module (e.g. quiz home, redação render) to refresh UI
- Content tab uses **IntersectionObserver** scroll-spy on sidebar links

### Progress model (`storage.js`)

All user state is stored under one key: **`cra-pr-estudos`**.

```json
{
  "version": 1,
  "conteudo": { "progress": { "p1": true, "r3": true } },
  "redacao": { "checklist": { "r01_c1": true } },
  "quiz": {
    "stats": { "simulados": 3, "total": 80, "acertos": 58 },
    "historico": [ { "data", "disciplina", "acertos", "total", "respostas", ... } ],
    "emAndamento": { "disciplina", "questoesIds", "respostas", "indice", "inicio" }
  },
  "cronograma": { "diasConcluidos": { "2026-07-20": true } },
  "updatedAt": "2026-07-20T12:00:00.000Z"
}
```

**Migration:** On first load, legacy keys (`cra-pr-roadmap-progress-v2`, `cra-pr-redacao-checklist`, `cra-pr-quiz-stats`) are merged into the unified store.

**API surface (`window.Store`):**

| Method | Purpose |
|--------|---------|
| `toggleConteudo(id)` | Flip topic checkbox |
| `toggleRedacao(temaId, itemId)` | Flip essay checklist item |
| `addQuizResult(result)` | Save completed mock + update stats |
| `setQuizEmAndamento(session)` | Auto-save in-progress quiz |
| `clearQuizEmAndamento()` | Discard or finish session |
| `toggleCronogramaDia(dateKey)` | Mark schedule day done |
| `clearAll()` | Wipe all progress (with confirm) |
| `exportData()` | JSON dump for backup |

### Quiz flow (`quiz.js`)

1. **Home** — discipline cards + optional "resume" banner if `emAndamento` exists
2. **Setup** — choose question count (capped by bank size and exam default)
3. **Run** — random sample from `QUESTOES[disciplina]`; answers saved on every change
4. **Finish** — score, commented review, append to `historico`, clear `emAndamento`

Full exam mode pulls fixed counts per subject from `DISTRIBUICAO` in `data.js`.

### Calendar (`cronograma.js`)

- `CRONOGRAMA_DIAS` maps ISO date strings (`YYYY-MM-DD`) to `{ fase, semana, slots[], horas }`
- Each **slot** has: `horario`, `horas`, `cat` (category for color), `titulo`, `desc`
- Views share `cursor` (current month/week/day) and `selected` (clicked day)
- Category colors come from `CRONOGRAMA_PRIORIDADES` in `cronograma-data.js`

---

## How to run

1. Clone or copy the project folder
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. No server required; `file://` works

Optional local server (avoids rare `file://` restrictions):

```bash
npx serve .
# or
python -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Customizing content

| To change… | Edit… |
|------------|--------|
| Subjects, topics, study order | `js/data.js` |
| Questions / mock exam | `js/quiz-data.js` |
| Essay themes / samples | `js/redacao-data.js` |
| Daily schedule | `js/cronograma-data.js` |
| Colors, layout | `css/style.css` |
| Exam date in header | `EXAM_DATE` in `js/data.js` and `js/cronograma-data.js` |

After editing data files, hard-refresh the browser (`Ctrl+F5`) to bypass cache.

---

## Limitations

- **Browser-only storage** — clearing site data or switching browsers loses progress unless you export JSON manually via `Store.exportData()` in the console
- **No sync** — no cloud backup or multi-device support
- **Question bank size** — ~66 practice questions; not a full replacement for commercial question banks
- **Past papers** — CRA-PR 2022/2023 were by **Quadrix**, not Consulplan; linked for TI reference only
- **Language** — UI and study content are Portuguese; exam is in Brazil

---

## License / usage

Personal study project. Exam syllabi and legislation references belong to their respective official sources (CRA-PR, CFA, Consulplan, Brazilian federal law).

---

## Quick reference — exam subject weights

| Subject | Questions | Points |
|---------|-----------|--------|
| Portuguese | 10 | 20 |
| Logic & Math | 5 | 10 |
| IT (Informática) | 5 | 10 |
| Public Administration | 5 | 10 |
| CRA-PR / CFA Legislation | 10 | 20 |
| Job-specific (Systems Analyst) | 15 | 30 |
| **Total** | **50** | **100** |
