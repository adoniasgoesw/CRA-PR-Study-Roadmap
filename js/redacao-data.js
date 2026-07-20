const REDACAO_INFO = {
  formato: "Dissertação argumentativa — introdução, desenvolvimento (2+ argumentos) e conclusão.",
  linhas: "Entre 25 e 30 linhas (padrão Consulplan para cargos de nível superior).",
  criterios: [
    "Adequação ao tema e ao tipo textual",
    "Coerência e coesão",
    "Domínio da norma culta (gramática e ortografia)",
    "Argumentação consistente",
  ],
};

const TEMAS_REDACAO = [
  {
    id: "r01",
    tipo: "anterior",
    titulo: "A importância da ética profissional na administração pública",
    contexto: "Tema recorrente em concursos de conselhos e órgãos públicos (perfil Consulplan).",
    checklist: [
      { id: "c1", texto: "Introdução com definição de ética e tese clara" },
      { id: "c2", texto: "Argumento 1: princípios do art. 37 da CF (moralidade, impessoalidade)" },
      { id: "c3", texto: "Argumento 2: Código de Ética do Administrador / deveres do profissional" },
      { id: "c4", texto: "Exemplo concreto (corrupção, conflito de interesses ou nepotismo)" },
      { id: "c5", texto: "Conclusão com proposta de valorização da ética" },
      { id: "c6", texto: "Revisão ortográfica e concordância" },
    ],
    exemplo: `A ética profissional constitui alicerce indispensável à administração pública, pois orienta a conduta dos agentes no trato com o patrimônio coletivo e com o cidadão. Diferentemente da mera obediência formal à lei, a ética exige postura moral que transcende o cumprimento mínimo de normas, promovendo confiança nas instituições.

Nesse sentido, os princípios constitucionais da moralidade e da impessoalidade, previstos no artigo 37 da Constituição Federal, impõem que o servidor e o profissional vinculado ao setor público atuem com probidade e sem favorecimentos. Paralelamente, o Código de Ética do Administrador reforça deveres como lealdade, sigilo profissional e respeito à dignidade das pessoas, aplicáveis também a quem presta serviços de tecnologia à gestão pública.

A ausência de ética gera danos concretos: contratações direcionadas, vazamento de dados e erosão da credibilidade institucional. Portanto, é imprescindível investir em formação continuada, canais de denúncia e fiscalização dos conselhos profissionais, de modo que a ética deixe de ser discurso e se converta em prática cotidiana no serviço público.`,
  },
  {
    id: "r02",
    tipo: "anterior",
    titulo: "O papel dos Conselhos Regionais de Administração na fiscalização profissional",
    contexto: "Tema alinhado à legislação CRA-PR / Lei 4.769/65.",
    checklist: [
      { id: "c1", texto: "Contextualizar criação do sistema CFA/CRA (Lei 4.769/65)" },
      { id: "c2", texto: "Explicar competências do CRA (registro, fiscalização, disciplina)" },
      { id: "c3", texto: "Relacionar fiscalização à proteção da sociedade" },
      { id: "c4", texto: "Mencionar registro profissional como requisito legal" },
      { id: "c5", texto: "Conclusão sobre relevância do conselho" },
      { id: "c6", texto: "Usar linguagem formal e impessoal" },
    ],
    exemplo: `Os Conselhos Regionais de Administração, criados pela Lei nº 4.769/1965, integram o sistema de fiscalização do exercício da profissão de administrador no Brasil. Sua existência responde à necessidade de garantir que apenas profissionais habilitados e registrados exerçam atividades privativas, como consultoria, assessoria e auditoria administrativa.

Compete ao CRA-PR, em especial, manter o cadastro dos profissionais em sua jurisdição, fiscalizar o cumprimento da legislação profissional e aplicar sanções em casos de infração ética ou legal. Essa atuação não se limita a cobrança de anuidades: trata-se de proteger a sociedade contra a atuação de leigos em funções que exigem conhecimento técnico e responsabilidade.

Dessa forma, o conselho regional desempenha papel fundamental na valorização da profissão e na qualificação dos serviços prestados ao setor público e à iniciativa privada. Fortalecer sua atuação fiscalizatória é, portanto, investir em gestão qualificada e em respeito ao cidadão.`,
  },
  {
    id: "r03",
    tipo: "anterior",
    titulo: "A Lei Geral de Proteção de Dados (LGPD) no setor público",
    contexto: "Tema frequente em concursos Consulplan com bloco de Informática/Adm. Pública.",
    checklist: [
      { id: "c1", texto: "Definir LGPD e seu objetivo (Lei 13.709/2018)" },
      { id: "c2", texto: "Diferenciar dados pessoais e dados sensíveis" },
      { id: "c3", texto: "Argumentar sobre responsabilidade do órgão público como controlador" },
      { id: "c4", texto: "Citar impactos de vazamentos ou tratamento irregular" },
      { id: "c5", texto: "Propor medidas: governança, DPO, políticas internas" },
      { id: "c6", texto: "Conclusão sintética" },
    ],
    exemplo: `A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) estabelece regras para o tratamento de informações de pessoas naturais, aplicando-se integralmente aos órgãos e entidades da administração pública na condição de controladores de dados. Trata-se de marco legal que alinha o Brasil a padrões internacionais de privacidade e transparência.

No setor público, a LGPD impõe que coleta, armazenamento e compartilhamento de dados ocorram com base legal, finalidade determinada e segurança adequada. Dados sensíveis — como origem racial, saúde ou filiação sindical — exigem proteção reforçada. O descumprimento pode acarretar sanções administrativas e comprometer a confiança do cidadão em serviços digitais governamentais.

Assim, os órgãos devem adotar políticas de privacidade, nomear encarregado de dados quando necessário e capacitar servidores. A conformidade com a LGPD não é obstáculo à eficiência administrativa, mas condição para a modernização responsável da gestão pública.`,
  },
  {
    id: "r04",
    tipo: "anterior",
    titulo: "Transformação digital na gestão pública brasileira",
    contexto: "Perfil CRA-PR 2022 (Quadrix) — atualidades e TI.",
    checklist: [
      { id: "c1", texto: "Definir transformação digital no contexto público" },
      { id: "c2", texto: "Benefícios: eficiência, transparência, acesso ao cidadão" },
      { id: "c3", texto: "Desafios: inclusão digital, segurança, legado tecnológico" },
      { id: "c4", texto: "Mencionar papel do analista de sistemas" },
      { id: "c5", texto: "Conclusão com proposta de integração entre TI e gestão" },
      { id: "c6", texto: "Evitar tom coloquial" },
    ],
    exemplo: `A transformação digital na gestão pública consiste na incorporação de tecnologias da informação aos processos administrativos, de modo a melhorar a prestação de serviços e a relação entre Estado e cidadão. Não se trata apenas de informatizar procedimentos antigos, mas de repensar fluxos com foco em eficiência e transparência.

Entre os benefícios, destacam-se a redução de burocracia, o acesso remoto a serviços, a rastreabilidade de decisões e o uso de dados para políticas públicas. Por outro lado, persistem desafios como desigualdade no acesso à internet, sistemas legados incompatíveis e riscos de cibersegurança. O analista de sistemas assume papel estratégico ao projetar soluções seguras, interoperáveis e alinhadas à legislação.

Portanto, a transformação digital exige planejamento, investimento continuado e capacitação de servidores. Somente com integração entre gestores e profissionais de TI será possível consolidar um Estado digital inclusivo e confiável.`,
  },
  {
    id: "r05",
    tipo: "anterior",
    titulo: "Governança de TI em órgãos públicos",
    contexto: "Cobrança recorrente em provas de analista de sistemas.",
    checklist: [
      { id: "c1", texto: "Definir governança de TI (ITIL, COBIT ou conceito geral)" },
      { id: "c2", texto: "Diferenciar governança de gestão" },
      { id: "c3", texto: "Argumentar sobre alinhamento TI ↔ objetivos institucionais" },
      { id: "c4", texto: "Citar riscos da TI sem governança (projetos falhos, desperdício)" },
      { id: "c5", texto: "Propor comitês, políticas e indicadores" },
      { id: "c6", texto: "Conclusão objetiva" },
    ],
    exemplo: `Governança de tecnologia da informação refere-se ao conjunto de estruturas, processos e práticas que asseguram que os recursos de TI sustentem os objetivos estratégicos da organização. Em órgãos públicos, essa governança é essencial para que investimentos em sistemas respondam a necessidades reais da administração e do cidadão.

Diferentemente da gestão operacional do dia a dia, a governança define responsabilidades, prioridades e critérios de avaliação de projetos. Frameworks como COBIT e ITIL oferecem referências para controle de serviços, gestão de riscos e melhoria contínua. Sem governança, proliferam sistemas redundantes, contratos onerosos e falhas de segurança.

Logo, os órgãos públicos devem instituir políticas de TI, comitês de acompanhamento e indicadores de desempenho. O analista de sistemas, nesse contexto, contribui com conhecimento técnico para decisões fundamentadas e para a prestação de contas na aplicação de recursos públicos.`,
  },
  {
    id: "r06",
    tipo: "anterior",
    titulo: "Licitações de tecnologia à luz da Lei nº 14.133/2021",
    contexto: "Edital 2026 — licitações e contratos no bloco de cargo.",
    checklist: [
      { id: "c1", texto: "Apresentar a nova lei de licitações (14.133/21)" },
      { id: "c2", texto: "Mencionar princípios: legalidade, impessoalidade, eficiência" },
      { id: "c3", texto: "Falar de ETP e Termo de Referência em contratações de TI" },
      { id: "c4", texto: "Argumentar sobre evitar direcionamento e superfaturamento" },
      { id: "c5", texto: "Conclusão sobre transparência nas contratações" },
      { id: "c6", texto: "Citar ao menos um artefato de contratação (ETP ou TR)" },
    ],
    exemplo: `A Lei nº 14.133/2021 modernizou o regime de licitações e contratos administrativos no Brasil, com impacto direto nas contratações de bens e serviços de tecnologia. A norma reforça princípios como legalidade, impessoalidade, eficiência e transparência, exigindo planejamento prévio das contratações.

Para soluções de TI, o Estudo Técnico Preliminar e o Termo de Referência tornam-se instrumentos centrais: definem necessidades, requisitos funcionais e critérios de julgamento, reduzindo risco de aquisições inadequadas ou direcionadas. A lei também valoriza critérios de sustentabilidade e inovação quando compatíveis com o interesse público.

Dessa maneira, a contratação tecnológica no setor público deve pautar-se por documentação técnica robusta e ampla competição. Respeitar o novo marco legal é condição para garantir economicidade e qualidade dos sistemas que suportam a gestão pública contemporânea.`,
  },
  {
    id: "r07",
    tipo: "anterior",
    titulo: "Segurança da informação no serviço público",
    contexto: "Tema clássico em provas de TI para órgãos públicos.",
    checklist: [
      { id: "c1", texto: "Definir segurança da informação (confidencialidade, integridade, disponibilidade)" },
      { id: "c2", texto: "Citar ameaças: ransomware, phishing, vazamento de dados" },
      { id: "c3", texto: "Relacionar com LGPD e proteção de dados de cidadãos" },
      { id: "c4", texto: "Propor controles: backup, políticas, conscientização" },
      { id: "c5", texto: "Papel do analista de sistemas na segurança" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `A segurança da informação no serviço público abrange medidas técnicas e organizacionais destinadas a proteger dados e sistemas contra acessos não autorizados, alterações indevidas e indisponibilidade. Os pilares clássicos — confidencialidade, integridade e disponibilidade — assumem relevância máxima quando se trata de informações de milhões de cidadãos.

Ataques cibernéticos, como ransomware e phishing, têm afetado prefeituras, tribunais e conselhos profissionais, paralisando serviços e expondo dados sensíveis. A Lei Geral de Proteção de Dados reforça a obrigação de os órgãos adotarem medidas de segurança compatíveis com os riscos do tratamento.

É necessário implementar políticas de segurança, backups regulares, controle de acesso e programas de conscientização dos servidores. O analista de sistemas deve atuar de forma proativa na identificação de vulnerabilidades e na adoção de boas práticas, contribuindo para a resiliência digital do Estado.`,
  },
  {
    id: "r08",
    tipo: "anterior",
    titulo: "Responsabilidade do profissional de tecnologia da informação na gestão pública",
    contexto: "Cruzamento entre ética profissional e cargo de analista.",
    checklist: [
      { id: "c1", texto: "Definir responsabilidade técnica e ética" },
      { id: "c2", texto: "Mencionar registro no CRA e habilitação" },
      { id: "c3", texto: "Argumentar sobre decisões técnicas com impacto no erário" },
      { id: "c4", texto: "Citar sigilo e integridade de dados" },
      { id: "c5", texto: "Conclusão sobre compromisso com o interesse público" },
      { id: "c6", texto: "Tom impessoal (3ª pessoa ou 'deve-se')" },
    ],
    exemplo: `O profissional de tecnologia da informação que atua na gestão pública assume responsabilidade técnica e ética pelas soluções que projeta, implementa e mantém. Suas decisões afetam diretamente a segurança de dados, a continuidade de serviços e o uso adequado de recursos públicos.

O registro no Conselho Regional de Administração, exigido para o cargo de analista de sistemas no CRA-PR, reforça que o exercício da função pressupõe formação compatível e sujeição às normas da profissão. Isso inclui observância ao Código de Ética e à legislação aplicável, como a LGPD e as normas de licitação.

Diante disso, o profissional deve priorizar soluções seguras, documentadas e alinhadas ao interesse coletivo, evitando favorecimentos e negligências. A responsabilidade na área de TI não se limita ao código-fonte: estende-se à confiança que o cidadão deposita nas instituições públicas.`,
  },
  {
    id: "r09",
    tipo: "previsto",
    titulo: "Inteligência artificial generativa na administração pública: oportunidades e riscos",
    contexto: "Tópico novo no edital 2026 — cobrança provavelmente conceitual.",
    checklist: [
      { id: "c1", texto: "Definir IA generativa de forma objetiva" },
      { id: "c2", texto: "Oportunidades: automação, atendimento, análise de dados" },
      { id: "c3", texto: "Riscos: viés, desinformação, privacidade, falta de transparência" },
      { id: "c4", texto: "Mencionar governança e ética no uso de IA" },
      { id: "c5", texto: "Propor uso responsável e supervisão humana" },
      { id: "c6", texto: "Conclusão equilibrada (não só elogio nem só crítica)" },
    ],
    exemplo: `A inteligência artificial generativa designa sistemas capazes de produzir textos, imagens e códigos a partir de modelos treinados em grandes volumes de dados. Na administração pública, essa tecnologia apresenta oportunidades de automação de atendimentos, elaboração de minutas e análise de informações, potencializando a eficiência administrativa.

Entretanto, os riscos são significativos: algoritmos podem reproduzir vieses discriminatórios, gerar conteúdo incorreto e comprometer a privacidade se alimentados com dados pessoais sem salvaguardas. A opacidade de alguns modelos dificulta a prestação de contas e a revisão de decisões automatizadas.

Por isso, o uso de IA no setor público deve observar princípios de transparência, supervisão humana e conformidade com a LGPD. Políticas institucionais devem definir casos de uso permitidos e mecanismos de auditoria. A inovação tecnológica, nesse contexto, só se legitima quando acompanha responsabilidade ética e proteção dos direitos dos cidadãos.`,
  },
  {
    id: "r10",
    tipo: "previsto",
    titulo: "DevOps e entrega contínua de software no setor público",
    contexto: "Novo no edital 2026 — Git, containers, CI/CD.",
    checklist: [
      { id: "c1", texto: "Definir DevOps (integração desenvolvimento + operações)" },
      { id: "c2", texto: "Explicar benefícios: deploys frequentes, menos falhas" },
      { id: "c3", texto: "Mencionar Git, containers ou pipelines de forma breve" },
      { id: "c4", texto: "Desafios no setor público: burocracia, homologação" },
      { id: "c5", texto: "Conclusão sobre modernização com controle" },
      { id: "c6", texto: "Linguagem técnica acessível ao corretor" },
    ],
    exemplo: `DevOps designa práticas que integram desenvolvimento de software e operações de TI, visando entregas mais rápidas, confiáveis e colaborativas. No setor público, onde sistemas críticos atendem milhões de usuários, a adoção de pipelines de integração e entrega contínua pode reduzir tempo entre correções e novas funcionalidades.

Ferramentas como controle de versão (Git), containers e automação de testes permitem ambientes reproduzíveis e rastreáveis — requisito fundamental para auditoria e conformidade. Contudo, a cultura burocrática e os longos ciclos de homologação ainda representam obstáculos à implementação plena dessas práticas.

Assim, cabe aos órgãos públicos adaptar processos de contratação e governança para permitir entregas incrementais, sem abrir mão de segurança e transparência. O analista de sistemas deve mediar entre agilidade técnica e exigências legais, promovendo modernização sustentável.`,
  },
  {
    id: "r11",
    tipo: "previsto",
    titulo: "Computação em nuvem e soberania de dados no governo",
    contexto: "Cloud computing no edital 2026.",
    checklist: [
      { id: "c1", texto: "Definir cloud (IaaS, PaaS, SaaS — ao menos um)" },
      { id: "c2", texto: "Vantagens: escalabilidade, custo, elasticidade" },
      { id: "c3", texto: "Riscos: dados fora do país, dependência de fornecedor" },
      { id: "c4", texto: "Relacionar com LGPD e contratos públicos" },
      { id: "c5", texto: "Propor critérios de contratação e localização de dados" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `A computação em nuvem permite que órgãos públicos utilizem infraestrutura, plataformas e softwares como serviço, pagando conforme o uso e escalando recursos conforme a demanda. Modelos como IaaS, PaaS e SaaS oferecem flexibilidade e potencial redução de custos com data centers próprios.

Todavia, a migração para nuvem levanta questões de soberania de dados: informações de cidadãos podem ser armazenadas em servidores sob jurisdição estrangeira, exigindo cláusulas contratuais rigorosas e conformidade com a LGPD. A dependência de um único provedor também representa risco de lock-in tecnológico.

Portanto, contratações de nuvem no setor público devem prever requisitos de segurança, portabilidade, disponibilidade e localização de dados. A nuvem é ferramenta legítima de modernização, desde que acompanhada de governança e proteção do patrimônio informacional do Estado.`,
  },
  {
    id: "r12",
    tipo: "previsto",
    titulo: "Uso de frameworks open source (como Django) em sistemas governamentais",
    contexto: "Django explicitamente no edital 2026.",
    checklist: [
      { id: "c1", texto: "Definir software open source" },
      { id: "c2", texto: "Vantagens: custo, comunidade, auditabilidade do código" },
      { id: "c3", texto: "Citar Django como framework web Python (brevemente)" },
      { id: "c4", texto: "Riscos: manutenção, suporte, vulnerabilidades" },
      { id: "c5", texto: "Relacionar com licitação e sustentabilidade do sistema" },
      { id: "c6", texto: "Conclusão favorável com ressalvas" },
    ],
    exemplo: `Software de código aberto é aquele cujo código-fonte pode ser inspecionado, modificado e redistribuído conforme licenças específicas. No governo, frameworks como Django — escrito em Python e voltado ao desenvolvimento web — têm sido utilizados para construir sistemas com rapidez, reutilizando componentes seguros e bem documentados.

As vantagens incluem redução de custos de licenciamento, independência de fornecedores exclusivos e possibilidade de auditoria do código por especialistas públicos. A comunidade ativa contribui para correções de vulnerabilidades e evolução do framework.

Por outro lado, é necessário planejar manutenção interna ou contratada, atualizações de segurança e capacitação de equipes. A escolha por open source deve constar do planejamento da contratação, com critérios técnicos claros no Termo de Referência. Bem governada, a adoção de Django e similares fortalece a autonomia tecnológica do Estado.`,
  },
  {
    id: "r13",
    tipo: "previsto",
    titulo: "Acessibilidade digital nos serviços públicos on-line",
    contexto: "Tema alinhado a inclusão e transformação digital.",
    checklist: [
      { id: "c1", texto: "Definir acessibilidade digital (WCAG ou conceito geral)" },
      { id: "c2", texto: "Relacionar com direitos de pessoas com deficiência" },
      { id: "c3", texto: "Argumentar que acessibilidade beneficia todos os usuários" },
      { id: "c4", texto: "Citar falhas comuns: contraste, leitores de tela, formulários" },
      { id: "c5", texto: "Propor testes e padrões no desenvolvimento" },
      { id: "c6", texto: "Conclusão sobre cidadania digital" },
    ],
    exemplo: `Acessibilidade digital consiste em projetar sites, aplicativos e sistemas de forma que possam ser utilizados por pessoas com deficiência visual, auditiva, motora ou cognitiva. No serviço público, onde a internet substitui filas presenciais, garantir acesso universal é questão de direito e de efetividade da cidadania.

Diretrizes como as do WCAG recomendam contraste adequado, navegação por teclado, textos alternativos em imagens e compatibilidade com leitores de tela. Essas práticas, além de atender à legislação antidiscriminatória, melhoram a experiência de todos os usuários, inclusive idosos e pessoas com conexões limitadas.

Os órgãos públicos devem incorporar requisitos de acessibilidade desde o planejamento dos sistemas, com testes com usuários reais e capacitação das equipes de desenvolvimento. Promover inclusão digital não é opcional: é dever do Estado na prestação de serviços contemporâneos.`,
  },
  {
    id: "r14",
    tipo: "previsto",
    titulo: "Interoperabilidade entre sistemas governamentais",
    contexto: "Integração de sistemas no edital (REST, Web Services).",
    checklist: [
      { id: "c1", texto: "Definir interoperabilidade" },
      { id: "c2", texto: "Problema: silos de informação, retrabalho" },
      { id: "c3", texto: "Soluções: APIs, padrões abertos, integração" },
      { id: "c4", texto: "Benefício ao cidadão (dado uma vez, usado várias)" },
      { id: "c5", texto: "Desafio: legado e falta de padrão" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `Interoperabilidade é a capacidade de sistemas distintos trocarem e utilizarem informações de maneira coordenada. Na administração pública brasileira, a fragmentação de bases de dados e aplicações isoladas gera retrabalho, inconsistências e dificulta a visão integrada das políticas públicas.

A adoção de APIs padronizadas, protocolos abertos e arquiteturas orientadas a serviços permite que cadastros, sistemas de protocolo e plataformas de atendimento comuniquem-se de forma segura. O cidadão beneficia-se quando não precisa reenviar os mesmos documentos a cada órgão.

Superar silos exige investimento em infraestrutura de integração, definição de padrões nacionais e descontinuação gradual de sistemas legados incompatíveis. O analista de sistemas tem papel central ao especificar interfaces e garantir que novas soluções sejam conectáveis, evitando ilhas tecnológicas.`,
  },
  {
    id: "r15",
    tipo: "previsto",
    titulo: "O Código de Ética do Administrador e a atuação em tecnologia da informação",
    contexto: "Resolução CFA 671/2025 — legislação do edital.",
    checklist: [
      { id: "c1", texto: "Apresentar o Código de Ética (RN CFA 671/2025)" },
      { id: "c2", texto: "Relacionar deveres éticos com TI (sigilo, integridade)" },
      { id: "c3", texto: "Mencionar conflito de interesses em projetos tecnológicos" },
      { id: "c4", texto: "Argumentar sobre responsabilidade profissional" },
      { id: "c5", texto: "Conclusão" },
      { id: "c6", texto: "Citar 'administrador' ou 'profissional' conforme o tema" },
    ],
    exemplo: `O Código de Ética do Administrador, instituído por resolução do Conselho Federal de Administração, estabelece deveres e proibições que orientam a conduta profissional em qualquer contexto de atuação, inclusive na gestão e no desenvolvimento de tecnologia da informação. Profissionais registrados nos CRAs devem observar princípios de honestidade, lealdade e respeito às pessoas.

Na área de TI, dilemas éticos surgem no tratamento de dados sigilosos, na escolha de fornecedores e na divulgação de vulnerabilidades. Aceitar vantagens indevidas ou omitir falhas de segurança viola o compromisso com a sociedade e com a profissão.

Portanto, o analista de sistemas vinculado ao CRA deve alinhar decisões técnicas ao Código de Ética, reportando conflitos de interesse e priorizando o interesse público. A ética profissional e a excelência técnica são complementares na construção de uma administração pública digital confiável.`,
  },
  {
    id: "r16",
    tipo: "previsto",
    titulo: "Trabalho remoto e gestão de equipes de TI no serviço público",
    contexto: "Tema atual pós-pandemia — gestão de projetos no edital.",
    checklist: [
      { id: "c1", texto: "Contextualizar expansão do trabalho remoto" },
      { id: "c2", texto: "Benefícios: flexibilidade, atração de talentos" },
      { id: "c3", texto: "Desafios: segurança, comunicação, produtividade" },
      { id: "c4", texto: "Mencionar ferramentas (Teams, Meet) com critério" },
      { id: "c5", texto: "Propor políticas e gestão por resultados" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `O trabalho remoto consolidou-se no serviço público como alternativa à presença física contínua, especialmente em equipes de tecnologia da informação. Essa modalidade permite continuidade de projetos, flexibilidade de horários e, em alguns casos, ampliação do pool de profissionais disponíveis.

Entretanto, a gestão à distância exige políticas claras de segurança da informação — uso de VPN, autenticação multifator e proibição de dados em dispositivos pessoais sem controle. A comunicação deve ser estruturada por meio de ferramentas oficiais, evitando dispersão e garantindo registro de decisões.

Gestores e analistas de sistemas devem combinar autonomia com metas mensuráveis, promovendo reuniões regulares e acompanhamento de entregas. O trabalho remoto, bem regulado, pode elevar a produtividade sem comprometer a transparência e a proteção dos dados públicos.`,
  },
  {
    id: "r17",
    tipo: "previsto",
    titulo: "Riscos cibernéticos em conselhos profissionais e órgãos de fiscalização",
    contexto: "CRA-PR como alvo potencial — dados de profissionais registrados.",
    checklist: [
      { id: "c1", texto: "Identificar ativos críticos (cadastro, anuidades, fiscalização)" },
      { id: "c2", texto: "Citar tipos de ataque relevantes" },
      { id: "c3", texto: "Impacto para profissionais e sociedade" },
      { id: "c4", texto: "Medidas preventivas" },
      { id: "c5", texto: "Papel da equipe de TI do conselho" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `Conselhos profissionais, como o CRA-PR, concentram dados cadastrais, financeiros e de processos disciplinares de milhares de administradores, tornando-se alvos atrativos para cibercriminosos. O comprometimento desses sistemas pode expor informações pessoais, interromper serviços de registro e prejudicar a fiscalização do exercício profissional.

Ransomware, invasões a portais de serviços e engenharia social contra servidores são ameaças concretas já observadas em instituições similares. Dado o volume de dados tratados, a conformidade com a LGPD e a implementação de controles de segurança deixam de ser opcionais.

É necessário realizar avaliações periódicas de risco, manter backups testados, segmentar redes e capacitar colaboradores. O analista de sistemas do conselho deve atuar na prevenção e na resposta a incidentes, preservando a continuidade institucional e a confiança dos profissionais registrados.`,
  },
  {
    id: "r18",
    tipo: "previsto",
    titulo: "Dados abertos, transparência e Lei de Acesso à Informação",
    contexto: "LAI no bloco de Adm. Pública — transparência ativa.",
    checklist: [
      { id: "c1", texto: "Definir dados abertos (formato aberto, reutilizável)" },
      { id: "c2", texto: "Relacionar com LAI (12.527/2011)" },
      { id: "c3", texto: "Benefícios: controle social, inovação, prestação de contas" },
      { id: "c4", texto: "Ressalva: dados pessoais e sigilo legal" },
      { id: "c5", texto: "Conclusão sobre equilíbrio transparência × privacidade" },
      { id: "c6", texto: "Mencionar portal de dados ou transparência" },
    ],
    exemplo: `Dados abertos são conjuntos de informações públicas disponibilizados em formatos legíveis por máquina, sem restrições de uso indevido, permitindo reutilização por cidadãos, empresas e pesquisadores. A Lei de Acesso à Informação reforça o dever de transparência ativa dos órgãos públicos, complementada por políticas de governo aberto.

A publicação de dados sobre contratos, folhas de pagamento agregadas e indicadores de desempenho fortalece o controle social e a accountability. Paralelamente, é imperativo anonimizar ou não divulgar dados pessoais protegidos pela LGPD e por normas de sigilo fiscal ou disciplinar.

O equilíbrio entre transparência e privacidade exige classificação adequada da informação e infraestrutura de publicação segura. O analista de sistemas contribui ao projetar portais de dados que automatizem a divulgação sem expor informações sensíveis, promovendo um Estado mais transparente e responsável.`,
  },
  {
    id: "r19",
    tipo: "previsto",
    titulo: "Sustentabilidade e TI verde no setor público",
    contexto: "Tema emergente — eficiência energética em data centers e equipamentos.",
    checklist: [
      { id: "c1", texto: "Definir TI verde / sustentabilidade digital" },
      { id: "c2", texto: "Impacto ambiental: energia, resíduos eletrônicos" },
      { id: "c3", texto: "Práticas: virtualização, cloud eficiente, descarte correto" },
      { id: "c4", texto: "Relacionar com eficiência administrativa (art. 37 CF)" },
      { id: "c5", texto: "Conclusão com proposta" },
      { id: "c6", texto: "Evitar greenwashing vazio — trazer ações concretas" },
    ],
    exemplo: `A sustentabilidade aplicada à tecnologia da informação — frequentemente chamada de TI verde — refere-se a práticas que reduzem o consumo de energia, o desperdício de recursos e o impacto ambiental de equipamentos e data centers. No setor público, onde o parque tecnológico é vasto, essa agenda alia-se ao princípio constitucional da eficiência administrativa.

Data centers demandam refrigeração e energia contínuas; a obsolescência programada gera toneladas de resíduos eletrônicos. Medidas como virtualização de servidores, migração para infraestrutura mais eficiente, políticas de desligamento de equipamentos ociosos e descarte ecológico de hardware podem reduzir custos e pegada ambiental.

Assim, gestores e profissionais de TI devem incorporar critérios ambientais ao planejar aquisições e contratos, preferindo equipamentos eficientes e fornecedores com políticas de reciclagem. A TI verde não é modismo: é responsabilidade institucional compatível com a gestão racional de recursos públicos.`,
  },
  {
    id: "r20",
    tipo: "previsto",
    titulo: "Capacitação digital de servidores públicos na era da transformação digital",
    contexto: "Tema transversal — gestão de pessoas + TI.",
    checklist: [
      { id: "c1", texto: "Problema: defasagem digital dos servidores" },
      { id: "c2", texto: "Argumentar que tecnologia sem capacitação falha" },
      { id: "c3", texto: "Propor programas continuados de formação" },
      { id: "c4", texto: "Mencionar inclusão digital interna" },
      { id: "c5", texto: "Papel do analista de sistemas como multiplicador" },
      { id: "c6", texto: "Conclusão" },
    ],
    exemplo: `A transformação digital do serviço público não se realiza apenas com a aquisição de softwares e equipamentos: depende criticamente da capacitação dos servidores que operam sistemas, atendem o cidadão e tomam decisões com base em dados. A defasagem digital interna pode neutralizar investimentos milionários em plataformas modernas.

Programas de formação continuada — que abranjam desde o uso básico de ferramentas até noções de segurança da informação e análise de dados — devem ser planejados de forma permanente, não como eventos isolados. A inclusão digital interna garante que todos os setores beneficiem-se das soluções implantadas.

O analista de sistemas pode atuar como agente de mudança, elaborando materiais, ministrando treinamentos e coletando feedback dos usuários para melhorar os sistemas. Investir em pessoas é, portanto, condição sine qua non para que a administração pública digital seja efetiva e democraticamente acessível.`,
  },
];

window.REDACAO_INFO = REDACAO_INFO;
window.TEMAS_REDACAO = TEMAS_REDACAO;
