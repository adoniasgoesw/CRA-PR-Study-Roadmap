const EXAM_DATE = new Date(2026, 8, 13);

const INTRO = {
  base: "Baseado no Anexo I do Edital nº 1/2026 + perfil histórico da banca Consulplan.",
};

const PERFIL_BANCA = [
  { area: "Direito / Legislação", texto: "Cobrança <strong>literal da letra de lei</strong>, raramente doutrina ou jurisprudência pesada." },
  { area: "Português", texto: "Interpretação de texto é o carro-chefe, seguido de sintaxe/morfologia." },
  { area: "Raciocínio Lógico", texto: "Resolvido em boa parte com fórmulas diretas — decoreba de fórmula rende muito." },
  { area: "Informática", texto: "Foco em <strong>Windows</strong> e pacote de escritório, não costuma ser complexa." },
  { area: "Cargo (TI)", texto: "Mistura teoria clássica (SO, redes, BD) com tópicos novos do edital (Django, IA, DevOps) — cobrados de forma mais conceitual/superficial por serem novidade no programa." },
];

const ORDEM_ATAQUE = [
  { ordem: 1, titulo: "Português + Raciocínio Lógico", nota: "Base rápida, alto retorno" },
  { ordem: 2, titulo: "Informática", nota: "Curto, resolve rápido" },
  { ordem: 3, titulo: "Legislação do CRA-PR e CFA", nota: "Decoreba — comece cedo, repetição espaçada" },
  { ordem: 4, titulo: "Conhecimentos de Adm. Pública", nota: "Mistura teoria + lei seca" },
  { ordem: 5, titulo: "Conhecimentos do Cargo — Bloco A → B → C", nota: "SO, arquitetura e estrutura de dados por último" },
];

const DISTRIBUICAO = [
  { id: "portugues", nome: "Língua Portuguesa", questoes: 10, pontos: 20 },
  { id: "rlm", nome: "Raciocínio Lógico-Matemático", questoes: 5, pontos: 10 },
  { id: "informatica", nome: "Informática", questoes: 5, pontos: 10 },
  { id: "adm", nome: "Adm. Pública e Legislação", questoes: 5, pontos: 10 },
  { id: "legis", nome: "Legislação CRA-PR / CFA", questoes: 10, pontos: 20 },
  { id: "especifico", nome: "Conhecimentos do Cargo", questoes: 15, pontos: 30 },
];

const DISCIPLINAS = [
  {
    id: "portugues",
    numero: 1,
    nome: "Língua Portuguesa",
    questoes: 10,
    descricao: "Peso alto, fácil de otimizar",
    ordemLabel: "Ordem de estudo (fácil → difícil)",
    topicos: [
      { id: "p1", ordem: 1, nome: "Ortografia e acentuação", tipo: "teoria" },
      { id: "p2", ordem: 2, nome: "Divisão silábica / prosódia / ortoépia", tipo: "teoria" },
      { id: "p3", ordem: 3, nome: "Morfologia — classes de palavras", tipo: "teoria" },
      { id: "p4", ordem: 4, nome: "Semântica (significação das palavras no texto)", tipo: "teoria" },
      { id: "p5", ordem: 5, nome: "Interpretação de texto", tipo: "exercicio" },
      { id: "p6", ordem: 6, nome: "Sintaxe — termos da oração", tipo: "teoria" },
      { id: "p7", ordem: 7, nome: "Concordância verbal e nominal", tipo: "exercicio" },
      { id: "p8", ordem: 8, nome: "Regência verbal e nominal", tipo: "exercicio" },
      { id: "p9", ordem: 9, nome: "Crase", tipo: "exercicio" },
      { id: "p10", ordem: 10, nome: "Período composto / classificação das orações", nota: 'Ponto mais "decoreba", mistura tudo acima', tipo: "revisao" },
    ],
  },
  {
    id: "rlm",
    numero: 2,
    nome: "Raciocínio Lógico-Matemático",
    questoes: 5,
    ordemLabel: "Ordem de estudo",
    topicos: [
      { id: "r1", ordem: 1, nome: "Conjuntos (pertinência, inclusão, união, interseção, diferença)", tipo: "teoria" },
      { id: "r2", ordem: 2, nome: "Regra de três simples e composta", tipo: "exercicio" },
      { id: "r3", ordem: 3, nome: "Sequências lógicas (números, letras, figuras)", tipo: "exercicio" },
      { id: "r4", ordem: 4, nome: "Progressões aritmética e geométrica", tipo: "teoria" },
      { id: "r5", ordem: 5, nome: "Equações de 1º e 2º grau", tipo: "exercicio" },
      { id: "r6", ordem: 6, nome: "Análise combinatória e probabilidade", tipo: "exercicio" },
      { id: "r7", ordem: 7, nome: "Lógica dedutiva/argumentativa (proposicional)", tipo: "teoria" },
      { id: "r8", ordem: 8, nome: "Geometria plana e espacial / Trigonometria", tipo: "exercicio" },
      { id: "r9", ordem: 9, nome: "Matrizes, determinantes e sistemas lineares", tipo: "exercicio" },
      { id: "r10", ordem: 10, nome: "Polinômios", tipo: "teoria" },
    ],
  },
  {
    id: "informatica",
    numero: 3,
    nome: "Informática",
    questoes: 5,
    descricao: "Ganho fácil pro seu perfil de dev",
    ordemLabel: "Ordem de estudo",
    topicos: [
      { id: "i1", ordem: 1, nome: "Conceitos básicos de hardware (PC)", tipo: "teoria" },
      { id: "i2", ordem: 2, nome: "Conceitos de Internet", tipo: "teoria" },
      { id: "i3", ordem: 3, nome: "Ferramentas de reunião (Teams, Meet, Zoom)", tipo: "teoria" },
      { id: "i4", ordem: 4, nome: "Noções de Windows", tipo: "teoria" },
      { id: "i5", ordem: 5, nome: "Google Docs / Google Sheets", nota: "Não é Office, é G Suite — a Consulplan gosta de pegar no detalhe", tipo: "exercicio" },
    ],
  },
  {
    id: "adm",
    numero: 4,
    nome: "Conhecimentos de Administração Pública e Legislação Correlata",
    questoes: 5,
    ordemLabel: "Ordem de estudo",
    topicos: [
      { id: "a1", ordem: 1, nome: "Direitos e garantias fundamentais (Art. 5º, direto da CF)", tipo: "lei" },
      { id: "a2", ordem: 2, nome: "Art. 37 CF (princípios da Adm. Pública)", tipo: "lei" },
      { id: "a3", ordem: 3, nome: "Lei de Acesso à Informação (12.527/11)", tipo: "lei" },
      { id: "a4", ordem: 4, nome: "LGPD (13.709/18) — pontos-chave, sem aprofundar tecnicamente", tipo: "lei" },
      { id: "a5", ordem: 5, nome: "Organização administrativa (centralização/descentralização, direta/indireta)", tipo: "teoria" },
      { id: "a6", ordem: 6, nome: "Ato administrativo (requisitos, atributos, espécies)", tipo: "teoria" },
      { id: "a7", ordem: 7, nome: "Agentes públicos (conceito, espécies, cargo/emprego/função)", tipo: "teoria" },
      { id: "a8", ordem: 8, nome: "Poderes administrativos (hierárquico, disciplinar, regulamentar, polícia)", tipo: "teoria" },
      { id: "a9", ordem: 9, nome: "Licitação (princípios, modalidades, dispensa/inexigibilidade)", tipo: "lei" },
      { id: "a10", ordem: 10, nome: "Responsabilidade civil do Estado", nota: "O mais teórico/doutrinário do grupo", tipo: "teoria" },
    ],
  },
  {
    id: "legis",
    numero: 5,
    nome: "Legislação do CRA-PR e do CFA",
    questoes: 10,
    descricao: "Puro decoreba de lei seca",
    ordemLabel: "Ordem de estudo",
    dica: "Monte um quadro-resumo (nome da lei → o que regula → 3 artigos-chave) em vez de decorar artigo por artigo.",
    topicos: [
      { id: "l1", ordem: 1, nome: "Lei 4.769/1965 (cria o sistema CFA/CRA)", nota: "Leia 2x, é a base de tudo", tipo: "lei" },
      { id: "l2", ordem: 2, nome: "Decreto 61.934/1967 (regulamenta a Lei 4.769)", tipo: "lei" },
      { id: "l3", ordem: 3, nome: "Código de Ética (Resolução Normativa CFA 671/2025)", tipo: "lei" },
      { id: "l4", ordem: 4, nome: "Regimento Interno do CRA-PR", tipo: "lei" },
      { id: "l5", ordem: 5, nome: "Lei 12.514/2011 (anuidades)", tipo: "lei" },
      { id: "l6", ordem: 6, nome: "Resoluções Normativas CFA (649/2024, 670/2025, 546/2018, 626/2023, 589/2020, 651/2024, 680/2025)", nota: "Deixe por último — foque em ementas/objeto de cada uma", tipo: "lei" },
    ],
  },
  {
    id: "especifico",
    numero: 6,
    nome: "Conhecimentos do Cargo — Analista de Sistemas",
    questoes: 15,
    descricao: "Bloco mais pesado e mais decisivo",
    ordemLabel: "Reorganizado em blocos temáticos (fácil → difícil)",
    notaFinal: "Com histórico em JS/front-end, o Bloco A já dá vantagem real. Foco maior de tempo: Legislação CRA-PR/CFA e Bloco C (SO, arquitetura, estrutura de dados).",
    blocos: [
      {
        id: "A",
        nome: "Bloco A — Mais fácil pra você",
        descricao: "Aproveite a familiaridade (front-end/JS)",
        topicos: [
          { id: "e1", ordem: 1, nome: "Desenvolvimento Web (fundamentos, front-end, back-end, APIs)", tipo: "teoria" },
          { id: "e2", ordem: 2, nome: "Frameworks Python / Django (modelagem, views, admin, APIs, testes, deploy)", tipo: "teoria" },
          { id: "e3", ordem: 3, nome: "DevOps — Controle de versão (Git) e Containers (conceitos)", tipo: "teoria" },
          { id: "e4", ordem: 4, nome: "Engenharia de software — ciclos de vida (cascata, espiral, RAD, incremental) e fases", tipo: "teoria" },
        ],
      },
      {
        id: "B",
        nome: "Bloco B — Intermediário",
        descricao: "Teoria estruturada, exige memorização organizada",
        topicos: [
          { id: "e5", ordem: 5, nome: "Banco de dados — conceitos, modelo relacional, modelagem ER, normalização", tipo: "teoria" },
          { id: "e6", ordem: 6, nome: "SQL (ANSI) e Transact-SQL — definição, consulta, manipulação", tipo: "exercicio" },
          { id: "e7", ordem: 7, nome: "SGBD — transação, concorrência, backup, views, triggers, stored procedures", tipo: "teoria" },
          { id: "e8", ordem: 8, nome: "Redes de computadores — topologias, TCP/IP, protocolos (email, DNS, DHCP etc.)", tipo: "teoria" },
          { id: "e9", ordem: 9, nome: "Segurança de redes — firewall, DMZ, VPN, tipos de ataque", tipo: "teoria" },
          { id: "e10", ordem: 10, nome: "Análise orientada a objetos com UML — casos de uso, classes, sequência, atividades", tipo: "teoria" },
          { id: "e11", ordem: 11, nome: "Gestão de projetos — PMBOK (escopo, tempo, custo, qualidade, risco, integração)", tipo: "teoria" },
        ],
      },
      {
        id: "C",
        nome: "Bloco C — Mais difícil",
        descricao: "Mais técnico-conceitual — exige mais tempo e revisão",
        topicos: [
          { id: "e12", ordem: 12, nome: "Arquitetura de computadores — numeração, aritmética computacional, microprocessadores, interrupções", tipo: "teoria" },
          { id: "e13", ordem: 13, nome: "Sistemas operacionais — processos, memória virtual, paginação, deadlock", tipo: "teoria" },
          { id: "e14", ordem: 14, nome: "Algoritmos e estrutura de dados — árvores, grafos, B-trees, hashing, complexidade", tipo: "exercicio" },
          { id: "e15", ordem: 15, nome: "Linguagens de programação — abstrações, tipificação, POO, tratamento de exceções", tipo: "teoria" },
          { id: "e16", ordem: 16, nome: "Integração de sistemas — XML, Web Services, SOAP, REST, WSDL/UDDI", tipo: "teoria" },
          { id: "e17", ordem: 17, nome: "Gestão e recursos informacionais — GED, Workflow, BPM, ERP, CRM, ITIL, COBIT", nota: "Muita sigla, pouca profundidade — decoreba de conceito-chave", tipo: "revisao" },
          { id: "e18", ordem: 18, nome: "Cloud Computing e IA generativa (fundamentos, governança/ética)", nota: "Tópico novo no edital, cobrança provavelmente conceitual", tipo: "teoria" },
          { id: "e19", ordem: 19, nome: "Licitações e contratos — Lei 14.133/21, IN SGD/ME 94/22, ETP, TR", tipo: "lei" },
          { id: "e20", ordem: 20, nome: "Inglês técnico — vocabulário de TI básico", nota: "Normalmente poucas questões", tipo: "revisao" },
        ],
      },
    ],
    topicos: [],
  },
];

// Flatten blocos into topicos for especifico
(function () {
  const esp = DISCIPLINAS.find((d) => d.id === "especifico");
  if (esp && esp.blocos) {
    esp.topicos = esp.blocos.flatMap((b) => b.topicos);
  }
})();
