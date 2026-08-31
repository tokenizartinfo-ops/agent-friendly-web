export const PUBLIC_PAGE_KEYS = Object.freeze([
  'methodology', 'aeo', 'evolution', 'openKnowledge', 'cli', 'mcp',
  'externalVerification', 'tokenizartCase', 'siteMap',
]);

function entry(eyebrow, title, intro, sections, limits, cta) {
  return Object.freeze({ eyebrow, title, intro, sections, limits, cta });
}

export const PUBLIC_PAGE_COPY = Object.freeze({
  methodology: {
    es: entry(
      'Metodología abierta v1',
      'Medir evidencia antes de prometer capacidades agénticas.',
      'AF-0 a AF-5 ordena una transformación progresiva desde un sitio difícil de interpretar hasta servicios delegables. La escala fue creada por Gabriel Mucchiut y no es una norma oficial ni una certificación de terceros.',
      [
        { title: 'Evidencia antes que discurso', body: 'Cada resultado debe corresponder a una señal pública observada, con URL, fecha, procedencia y responsable. Una capacidad planificada o una ruta que devuelve error no suma madurez.' },
        { title: 'Madurez acumulativa', body: 'Descubrimiento, contenido legible, herramientas, identidad, permisos y comercio se incorporan por capas. Un nivel alto no compensa una base pública confusa o desactualizada.' },
        { title: 'Cambios con control', body: 'Toda herramienta capaz de modificar datos requiere identidad, consentimiento, alcance, idempotencia, auditoría y rollback. La metodología separa claramente leer, preparar, aprobar y ejecutar.' },
      ],
      ['AF-0 a AF-5 es metodología propia, no estándar oficial.', 'Una buena puntuación no garantiza indexación, ranking ni recomendación.'],
      { label: 'Auditar evidencia pública', routeKey: 'home', hash: 'auditar' },
    ),
    en: entry(
      'Open methodology v1',
      'Measure evidence before promising agentic capabilities.',
      'AF-0 through AF-5 organizes a gradual transformation from a hard-to-interpret website into safely delegable services. Gabriel Mucchiut created the scale; it is neither an official standard nor third-party certification.',
      [
        { title: 'Evidence before narrative', body: 'Every result must map to an observed public signal with a URL, date, provenance and accountable owner. A planned capability or a route returning an error does not increase maturity.' },
        { title: 'Cumulative maturity', body: 'Discovery, machine-readable content, tools, identity, permissions and commerce are added in layers. A high-level feature cannot compensate for a confusing or outdated public foundation.' },
        { title: 'Controlled change', body: 'Any tool that can modify data needs identity, consent, scope, idempotency, audit and rollback. The method keeps reading, preparing, approving and executing as separate stages.' },
      ],
      ['AF-0 to AF-5 is a proprietary methodology, not an official standard.', 'A strong score does not guarantee indexing, ranking or recommendation.'],
      { label: 'Audit public evidence', routeKey: 'home', hash: 'auditar' },
    ),
    pt: entry(
      'Metodologia aberta v1',
      'Medir evidências antes de prometer capacidades agênticas.',
      'AF-0 a AF-5 organiza uma transformação gradual de um site difícil de interpretar até serviços delegáveis com segurança. A escala foi criada por Gabriel Mucchiut e não é uma norma oficial nem certificação de terceiros.',
      [
        { title: 'Evidência antes do discurso', body: 'Cada resultado deve corresponder a um sinal público observado, com URL, data, procedência e responsável. Uma capacidade planejada ou uma rota com erro não aumenta a maturidade.' },
        { title: 'Maturidade cumulativa', body: 'Descoberta, conteúdo legível por máquinas, ferramentas, identidade, permissões e comércio são adicionados em camadas. Um recurso avançado não compensa uma base pública confusa.' },
        { title: 'Mudança controlada', body: 'Toda ferramenta que modifica dados exige identidade, consentimento, escopo, idempotência, auditoria e rollback. A metodologia separa leitura, preparação, aprovação e execução.' },
      ],
      ['AF-0 a AF-5 é uma metodologia própria, não um padrão oficial.', 'Uma boa pontuação não garante indexação, ranking ou recomendação.'],
      { label: 'Auditar evidências públicas', routeKey: 'home', hash: 'auditar' },
    ),
  },
  aeo: {
    es: entry(
      'AEO + descubrimiento agéntico',
      'Tu web también compite por ser una fuente que un asistente pueda comprender.',
      'AEO complementa al SEO al ordenar respuestas, entidades, evidencia y límites. Agent Friendly Web ayuda a decidir por separado qué puede rastrearse para búsqueda, consultas iniciadas por personas y entrenamiento.',
      [
        { title: 'Encontrar', body: 'Robots, sitemap, origen canónico, rendimiento y enlaces internos permiten localizar las páginas relevantes sin sustituir la calidad editorial.' },
        { title: 'Entender y citar', body: 'Definiciones claras, datos estructurados, fechas y fuentes facilitan respuestas más fieles. La procedencia permite distinguir hechos, declaraciones del owner y recomendaciones.' },
        { title: 'Actuar con límites', body: 'APIs, MCP, skills o A2A solo se declaran cuando existe una capacidad real y verificable. El acceso de un crawler nunca equivale a autorización para ejecutar acciones.' },
      ],
      ['Permitir un crawler no garantiza que un proveedor use, cite o recomiende el contenido.', 'Búsqueda, recuperación por pedido del usuario y entrenamiento requieren decisiones separadas.'],
      { label: 'Revisar crawlers y política', routeKey: 'aeo' },
    ),
    en: entry(
      'AEO + agentic discovery',
      'Your website also competes to become a source an assistant can understand.',
      'AEO complements SEO by organizing answers, entities, evidence and limits. Agent Friendly Web helps owners decide separately what may be crawled for search, user-initiated retrieval and model training.',
      [
        { title: 'Be found', body: 'Robots, sitemaps, canonical origins, performance and internal links make relevant pages discoverable without replacing strong editorial content.' },
        { title: 'Be understood and cited', body: 'Clear definitions, structured data, dates and sources support more faithful answers. Provenance separates observed facts, owner declarations and recommendations.' },
        { title: 'Enable bounded action', body: 'APIs, MCP, skills or A2A are declared only when a real, verifiable capability exists. Crawler access never grants authorization to perform an operation.' },
      ],
      ['Allowing a crawler does not guarantee that a provider will use, cite or recommend the content.', 'Search, user-requested retrieval and training require separate decisions.'],
      { label: 'Review crawlers and policy', routeKey: 'aeo' },
    ),
    pt: entry(
      'AEO + descoberta agêntica',
      'Seu site também compete para ser uma fonte que um assistente consiga compreender.',
      'AEO complementa SEO ao organizar respostas, entidades, evidências e limites. Agent Friendly Web ajuda o owner a decidir separadamente sobre busca, recuperação solicitada por pessoas e treinamento.',
      [
        { title: 'Ser encontrado', body: 'Robots, sitemap, origem canônica, desempenho e links internos tornam páginas relevantes localizáveis sem substituir conteúdo editorial de qualidade.' },
        { title: 'Ser entendido e citado', body: 'Definições claras, dados estruturados, datas e fontes favorecem respostas mais fiéis. A procedência separa fatos observados, declarações do owner e recomendações.' },
        { title: 'Permitir ações limitadas', body: 'APIs, MCP, skills ou A2A são declarados apenas quando existe capacidade real e verificável. Acesso de crawler nunca autoriza uma operação.' },
      ],
      ['Permitir um crawler não garante uso, citação ou recomendação por um provedor.', 'Busca, recuperação solicitada e treinamento exigem decisões separadas.'],
      { label: 'Revisar crawlers e política', routeKey: 'aeo' },
    ),
  },
  evolution: {
    es: entry(
      'Comparador AF-0 a AF-5',
      'De una web difícil de interpretar a una plataforma nativa para agentes.',
      'La evolución agéntica es acumulativa: primero el sitio se vuelve descubrible y explicable; después expone herramientas y, finalmente, operaciones gobernadas. Los cambios se validan con evidencia pública.',
      [
        { title: 'AF-0 a AF-2: presencia y explicación', body: 'El sitio pasa de señales mínimas a contenido localizable, estructurado y comprensible. Esta base mejora tanto la experiencia humana como la recuperación por agentes.' },
        { title: 'AF-3: herramientas documentadas', body: 'Las APIs, skills, CLI o MCP cuentan únicamente cuando tienen contrato, versión, límites y superficie verificable. Un roadmap no se presenta como capacidad desplegada.' },
        { title: 'AF-4 y AF-5: delegación y operación', body: 'Identidad, consentimiento, auditoría y reversibilidad preceden a toda acción. Los pagos se incorporan solo si existe un servicio concreto y no sustituyen autorización.' },
      ],
      ['Los ejemplos de respuesta son ilustrativos y no predicen el texto de un modelo concreto.', 'No todas las organizaciones necesitan alcanzar AF-5.'],
      { label: 'Comparar la evolución', routeKey: 'evolution' },
    ),
    en: entry(
      'AF-0 to AF-5 comparison',
      'From a hard-to-interpret website to an agent-native platform.',
      'Agentic maturity is cumulative: a website first becomes discoverable and explainable, then exposes tools, and eventually supports governed operations. Every improvement is validated through public evidence.',
      [
        { title: 'AF-0 to AF-2: presence and explanation', body: 'The website moves from minimal signals to content that is discoverable, structured and understandable. This foundation serves both people and agent retrieval.' },
        { title: 'AF-3: documented tools', body: 'APIs, skills, CLI or MCP count only when they have contracts, versions, boundaries and a verifiable surface. A roadmap is never presented as a deployed capability.' },
        { title: 'AF-4 and AF-5: delegation and operation', body: 'Identity, consent, audit and reversibility come before action. Payments are added only for a concrete service and never replace authorization.' },
      ],
      ['Response examples are illustrative and do not predict a specific model output.', 'Not every organization needs to reach AF-5.'],
      { label: 'Compare the evolution', routeKey: 'evolution' },
    ),
    pt: entry(
      'Comparador AF-0 a AF-5',
      'De um site difícil de interpretar a uma plataforma nativa para agentes.',
      'A maturidade agêntica é cumulativa: primeiro o site se torna descobrível e explicável, depois expõe ferramentas e finalmente suporta operações governadas. Cada melhoria é validada por evidência pública.',
      [
        { title: 'AF-0 a AF-2: presença e explicação', body: 'O site passa de sinais mínimos para conteúdo localizável, estruturado e compreensível. Essa base atende pessoas e recuperação por agentes.' },
        { title: 'AF-3: ferramentas documentadas', body: 'APIs, skills, CLI ou MCP contam apenas com contrato, versão, limites e superfície verificável. Um roadmap não é apresentado como capacidade implantada.' },
        { title: 'AF-4 e AF-5: delegação e operação', body: 'Identidade, consentimento, auditoria e reversibilidade precedem qualquer ação. Pagamentos entram somente para um serviço concreto e não substituem autorização.' },
      ],
      ['Exemplos de resposta são ilustrativos e não preveem a saída de um modelo.', 'Nem toda organização precisa alcançar AF-5.'],
      { label: 'Comparar a evolução', routeKey: 'evolution' },
    ),
  },
  openKnowledge: {
    es: entry(
      'Conocimiento abierto OKF',
      'Metodología pública que puede descargarse, leerse y verificarse.',
      'El bundle OKF v0.2 publica conocimiento documental en Markdown con versión, procedencia, estado, revisión humana y hashes. Es una proyección pública read-only, no una base privada ni una herramienta operativa.',
      [
        { title: 'Índice pequeño y concreto', body: 'Los conceptos públicos cubren método, descubrimiento, Registry, asistencia y casos. Las fuentes se seleccionan mediante allowlist y no recorren expedientes privados.' },
        { title: 'Integridad verificable', body: 'El manifiesto declara rutas, media types, versión y hashes SHA-256. Una persona o agente puede comprobar cambios sin confiar únicamente en la interfaz.' },
        { title: 'Reutilización con atribución', body: 'La documentación usa CC BY 4.0, pero la licencia no concede la marca ni permite presentar una copia como servicio oficial de Agent Friendly Web.' },
      ],
      ['OKF expone conocimiento y no ejecuta operaciones.', 'El bundle no garantiza indexación, ranking ni recomendación.'],
      { label: 'Explorar conocimiento abierto', routeKey: 'openKnowledge' },
    ),
    en: entry(
      'Open knowledge OKF',
      'Public methodology that can be downloaded, read and independently verified.',
      'The OKF v0.2 bundle publishes documentary knowledge as Markdown with version, provenance, status, human review and hashes. It is a public read-only projection, not a private database or operational tool.',
      [
        { title: 'A small, concrete index', body: 'Public concepts cover method, discovery, Registry, assistance and cases. Sources are allowlisted and the generator never traverses private dossiers.' },
        { title: 'Verifiable integrity', body: 'The manifest declares paths, media types, versions and SHA-256 hashes. A person or agent can detect changes without relying solely on the interface.' },
        { title: 'Reuse with attribution', body: 'Documentation uses CC BY 4.0, but the license does not grant the trademark or permit a copy to be presented as an official Agent Friendly Web service.' },
      ],
      ['OKF exposes knowledge and does not execute operations.', 'The bundle does not guarantee indexing, ranking or recommendation.'],
      { label: 'Explore open knowledge', routeKey: 'openKnowledge' },
    ),
    pt: entry(
      'Conhecimento aberto OKF',
      'Metodologia pública que pode ser baixada, lida e verificada de forma independente.',
      'O bundle OKF v0.2 publica conhecimento documental em Markdown com versão, procedência, estado, revisão humana e hashes. É uma projeção pública read-only, não uma base privada nem ferramenta operacional.',
      [
        { title: 'Índice pequeno e concreto', body: 'Os conceitos públicos cobrem método, descoberta, Registry, assistência e casos. As fontes usam allowlist e o gerador não percorre dossiês privados.' },
        { title: 'Integridade verificável', body: 'O manifesto declara rotas, media types, versões e hashes SHA-256. Uma pessoa ou agente pode detectar mudanças sem depender apenas da interface.' },
        { title: 'Reutilização com atribuição', body: 'A documentação usa CC BY 4.0, mas a licença não concede a marca nem permite apresentar uma cópia como serviço oficial Agent Friendly Web.' },
      ],
      ['OKF expõe conhecimento e não executa operações.', 'O bundle não garante indexação, ranking ou recomendação.'],
      { label: 'Explorar conhecimento aberto', routeKey: 'openKnowledge' },
    ),
  },
  cli: {
    es: entry(
      'CLI pública read-only',
      'Auditoría, Registry y OKF en una interfaz previsible para agentes y scripts.',
      'La CLI oficial observa recursos públicos y devuelve JSON versionado. No usa credenciales, no escribe archivos, no modifica sitios y no reemplaza MCP.',
      [
        { title: 'Auditar un sitio público', body: 'El comando audit utiliza los mismos controles de SSRF, DNS, tiempo y tamaño del auditor web. Dry-run explica qué consultaría sin enviar solicitudes.' },
        { title: 'Consultar Registry', body: 'Registry get recupera únicamente perfiles ya publicados y valida el contrato. Los borradores, expedientes y observaciones privadas permanecen fuera.' },
        { title: 'Verificar OKF', body: 'OKF verify comprueba manifiesto, rutas, media types y SHA-256 en memoria. Cada ejecución produce una respuesta estable y un código de salida previsible.' },
      ],
      ['La CLI actual es read-only y no acepta cookies, OAuth ni claves API.', 'La distribución inicial es repo-first; otros canales requieren un gate propio.'],
      { label: 'Abrir documentación CLI', routeKey: 'cli' },
    ),
    en: entry(
      'Public read-only CLI',
      'Audit, Registry and OKF through a predictable interface for agents and scripts.',
      'The official CLI observes public resources and returns versioned JSON. It uses no credentials, writes no files, changes no websites and does not replace MCP.',
      [
        { title: 'Audit a public website', body: 'The audit command uses the web scanner DNS, SSRF, timeout and response-size controls. Dry-run explains the planned requests without sending them.' },
        { title: 'Read the Registry', body: 'Registry get retrieves only published profiles and validates their contract. Drafts, dossiers and private observations remain out of scope.' },
        { title: 'Verify OKF', body: 'OKF verify checks the manifest, routes, media types and SHA-256 values in memory. Each execution produces a stable response and predictable exit code.' },
      ],
      ['The current CLI is read-only and accepts no cookies, OAuth or API keys.', 'Initial distribution is repository-first; other channels require their own gate.'],
      { label: 'Open CLI documentation', routeKey: 'cli' },
    ),
    pt: entry(
      'CLI pública read-only',
      'Auditoria, Registry e OKF em uma interface previsível para agentes e scripts.',
      'A CLI oficial observa recursos públicos e devolve JSON versionado. Não usa credenciais, não grava arquivos, não modifica sites e não substitui MCP.',
      [
        { title: 'Auditar um site público', body: 'O comando audit usa os mesmos controles de DNS, SSRF, timeout e tamanho do scanner web. Dry-run explica as consultas sem enviá-las.' },
        { title: 'Consultar o Registry', body: 'Registry get recupera somente perfis publicados e valida o contrato. Rascunhos, dossiês e observações privadas ficam fora.' },
        { title: 'Verificar OKF', body: 'OKF verify confere manifesto, rotas, media types e SHA-256 em memória. Cada execução produz resposta estável e código de saída previsível.' },
      ],
      ['A CLI atual é read-only e não aceita cookies, OAuth ou chaves de API.', 'A distribuição inicial é repository-first; outros canais exigem gate próprio.'],
      { label: 'Abrir documentação da CLI', routeKey: 'cli' },
    ),
  },
  mcp: {
    es: entry(
      'MCP público read-only',
      'Un canal común para consultar evidencia pública sin tomar el control.',
      'El servidor MCP desplegado expone auditoría, metodología, Registry y OKF mediante herramientas pequeñas y recursos versionados. Es stateless y no accede a información owner.',
      [
        { title: 'Cuatro tools acotadas', body: 'Cada herramienta realiza una tarea pública concreta. No existe una tool genérica capaz de navegar rutas internas, ejecutar código o modificar un origen.' },
        { title: 'Recursos versionados', body: 'Capacidades, metodología, OKF y readiness tienen identificadores estables. Las rutas arbitrarias y los parámetros privados son rechazados.' },
        { title: 'Límites verificables', body: 'El servidor no usa OAuth porque no protege datos privados; tampoco conserva memoria, escribe datos, despliega cambios, cobra o actúa por el propietario.' },
      ],
      ['Este MCP solo consulta información ya pública.', 'Owner Live y cualquier acción autenticada pertenecen a otra frontera.'],
      { label: 'Consultar el MCP público', routeKey: 'mcp' },
    ),
    en: entry(
      'Public read-only MCP',
      'A common channel for consulting public evidence without taking control.',
      'The deployed MCP server exposes audit, methodology, Registry and OKF through small tools and versioned resources. It is stateless and has no access to owner information.',
      [
        { title: 'Four bounded tools', body: 'Each tool performs one concrete public task. There is no generic tool able to browse internal routes, execute code or modify an origin.' },
        { title: 'Versioned resources', body: 'Capabilities, methodology, OKF and readiness use stable identifiers. Arbitrary paths and private parameters are rejected.' },
        { title: 'Verifiable boundaries', body: 'The server needs no OAuth because it protects no private data; it also keeps no memory, writes no data, deploys no changes, charges no money and never acts for an owner.' },
      ],
      ['This MCP only reads information that is already public.', 'Owner Live and authenticated operations belong to a different boundary.'],
      { label: 'Inspect the public MCP', routeKey: 'mcp' },
    ),
    pt: entry(
      'MCP público read-only',
      'Um canal comum para consultar evidências públicas sem assumir o controle.',
      'O servidor MCP implantado expõe auditoria, metodologia, Registry e OKF por ferramentas pequenas e recursos versionados. É stateless e não acessa informações owner.',
      [
        { title: 'Quatro tools limitadas', body: 'Cada ferramenta realiza uma tarefa pública concreta. Não existe uma tool genérica capaz de navegar rotas internas, executar código ou modificar a origem.' },
        { title: 'Recursos versionados', body: 'Capacidades, metodologia, OKF e readiness usam identificadores estáveis. Rotas arbitrárias e parâmetros privados são rejeitados.' },
        { title: 'Limites verificáveis', body: 'O servidor não usa OAuth porque não protege dados privados; também não mantém memória, grava dados, publica mudanças, cobra ou atua pelo owner.' },
      ],
      ['Este MCP apenas consulta informação já pública.', 'Owner Live e operações autenticadas pertencem a outra fronteira.'],
      { label: 'Consultar o MCP público', routeKey: 'mcp' },
    ),
  },
  externalVerification: {
    es: entry(
      'AF-EV · verificación externa',
      'Mediciones de terceros separadas de la escala AF-0 a AF-5.',
      'Agent Friendly Web conserva proveedor, fecha, señales observadas y límites de cada auditoría externa. Los resultados no se presentan como certificación ni se completan con cifras que el proveedor no devolvió.',
      [
        { title: 'Baseline fechado', body: 'La primera medición permite comparar cambios posteriores sobre el mismo origen. Se conserva el resultado completo, incluso cuando muestra deficiencias.' },
        { title: 'Remediación por gates', body: 'Markdown, ARD o WebMCP pueden desplegarse cuando son útiles; DNS, OAuth, A2A y pagos requieren capacidades reales, rollback y aprobación específica.' },
        { title: 'Comparación honesta', body: 'Las auditorías externas aportan otra mirada, pero no reemplazan pruebas directas, revisión humana ni la metodología propia. Cada proveedor mide señales diferentes.' },
      ],
      ['Una auditoría externa no garantiza indexación o recomendación.', 'No se publican capacidades simuladas para aumentar un puntaje.'],
      { label: 'Ver evidencia externa', routeKey: 'externalVerification' },
    ),
    en: entry(
      'AF-EV · external verification',
      'Third-party measurements kept separate from the AF-0 to AF-5 scale.',
      'Agent Friendly Web records the provider, date, observed signals and limitations of every external audit. Results are not presented as certification, and missing scores are never invented.',
      [
        { title: 'Dated baseline', body: 'The first measurement enables comparison after changes to the same origin. The complete result is retained even when it exposes weaknesses.' },
        { title: 'Remediation through gates', body: 'Markdown, ARD or WebMCP may be deployed when useful; DNS, OAuth, A2A and payments require real capabilities, rollback and explicit approval.' },
        { title: 'Honest comparison', body: 'External audits provide another perspective but do not replace direct tests, human review or the proprietary methodology. Each provider measures different signals.' },
      ],
      ['An external audit does not guarantee indexing or recommendation.', 'Simulated capabilities are never published to increase a score.'],
      { label: 'View external evidence', routeKey: 'externalVerification' },
    ),
    pt: entry(
      'AF-EV · verificação externa',
      'Medições de terceiros separadas da escala AF-0 a AF-5.',
      'Agent Friendly Web registra provedor, data, sinais observados e limites de cada auditoria externa. Os resultados não são apresentados como certificação e pontuações ausentes nunca são inventadas.',
      [
        { title: 'Baseline datado', body: 'A primeira medição permite comparar mudanças posteriores no mesmo domínio. O resultado completo é preservado mesmo quando revela deficiências.' },
        { title: 'Remediação por gates', body: 'Markdown, ARD ou WebMCP podem ser implantados quando úteis; DNS, OAuth, A2A e pagamentos exigem capacidades reais, rollback e aprovação específica.' },
        { title: 'Comparação honesta', body: 'Auditorias externas oferecem outra perspectiva, mas não substituem testes diretos, revisão humana ou a metodologia própria. Cada provedor mede sinais diferentes.' },
      ],
      ['Uma auditoria externa não garante indexação ou recomendação.', 'Capacidades simuladas não são publicadas para elevar uma nota.'],
      { label: 'Ver evidência externa', routeKey: 'externalVerification' },
    ),
  },
  tokenizartCase: {
    es: entry(
      'Primer caso integral',
      'Tokenizart conecta conocimiento público, herramientas y futuras capacidades owner.',
      'El caso muestra una transformación verificable sin confundir Tokenizart con Atelier: Tokenizart explica el ecosistema y Atelier es la plataforma operativa. Cada capacidad se publica cuando es real, versionada y segura.',
      [
        { title: 'P0 y P1: verdad y descubrimiento', body: 'Contenido, metadata, robots, sitemap y documentos para agentes se preparan por origen. Los paquetes candidatos no cuentan hasta responder en la URL canónica.' },
        { title: 'P2: herramientas públicas', body: 'CLI, skills, OpenAPI y MCP se distribuyen con contrato, versión y límites read-only. La documentación distingue lo desplegado de un release candidate.' },
        { title: 'P3 y P4: contexto owner y acciones', body: 'Owner Live requiere identidad Atelier, consentimiento, scopes y auditoría. Mint, Certify, transferencias, vouchers y pagos conservan aprobaciones y contratos separados.' },
      ],
      ['El caso no expone datos owner, credenciales ni operaciones privadas.', 'Atelier legacy staging no es el entorno vigente de validación.'],
      { label: 'Recorrer el caso Tokenizart', routeKey: 'tokenizartCase' },
    ),
    en: entry(
      'First integral case',
      'Tokenizart connects public knowledge, tools and future owner capabilities.',
      'The case demonstrates a verifiable transformation without confusing Tokenizart with Atelier: Tokenizart explains the ecosystem, while Atelier is the operational platform. Capabilities are published only when real, versioned and safe.',
      [
        { title: 'P0 and P1: truth and discovery', body: 'Content, metadata, robots, sitemaps and agent documents are prepared for each origin. Candidate packages do not count until the canonical URL responds correctly.' },
        { title: 'P2: public tools', body: 'CLI, skills, OpenAPI and MCP are distributed with contracts, versions and read-only boundaries. Documentation distinguishes deployed assets from release candidates.' },
        { title: 'P3 and P4: owner context and actions', body: 'Owner Live requires Atelier identity, consent, scopes and audit. Mint, Certify, transfers, vouchers and payments retain separate approvals and contracts.' },
      ],
      ['The case exposes no owner data, credentials or private operations.', 'Atelier legacy staging is not the current validation environment.'],
      { label: 'Explore the Tokenizart case', routeKey: 'tokenizartCase' },
    ),
    pt: entry(
      'Primeiro caso integral',
      'Tokenizart conecta conhecimento público, ferramentas e futuras capacidades owner.',
      'O caso mostra uma transformação verificável sem confundir Tokenizart com Atelier: Tokenizart explica o ecossistema e Atelier é a plataforma operacional. Capacidades são publicadas apenas quando reais, versionadas e seguras.',
      [
        { title: 'P0 e P1: verdade e descoberta', body: 'Conteúdo, metadata, robots, sitemap e documentos para agentes são preparados por origem. Pacotes candidatos não contam até responderem na URL canônica.' },
        { title: 'P2: ferramentas públicas', body: 'CLI, skills, OpenAPI e MCP são distribuídos com contrato, versão e limites read-only. A documentação distingue ativos implantados de release candidates.' },
        { title: 'P3 e P4: contexto owner e ações', body: 'Owner Live exige identidade Atelier, consentimento, scopes e auditoria. Mint, Certify, transferências, vouchers e pagamentos mantêm aprovações separadas.' },
      ],
      ['O caso não expõe dados owner, credenciais ou operações privadas.', 'Atelier legacy staging não é o ambiente atual de validação.'],
      { label: 'Explorar o caso Tokenizart', routeKey: 'tokenizartCase' },
    ),
  },
  siteMap: {
    es: entry(
      'Mapa humano y agéntico',
      'Un índice para comprender el producto sin perderse entre sus capas.',
      'El mapa organiza auditoría, metodología, educación, herramientas, casos y superficies privadas. Los agentes también reciben sitemaps, catálogos y contratos legibles por máquinas.',
      [
        { title: 'Aprender y diagnosticar', body: 'La portada, guía, AEO, sectores, evolución y metodología explican por qué preparar un sitio y cómo se mide la evidencia pública.' },
        { title: 'Usar herramientas públicas', body: 'Auditor, comparador, asistente, Registry, CLI, MCP y OKF ofrecen recorridos concretos con límites y procedencia visibles.' },
        { title: 'Preparar cambios privados', body: 'Expedientes y cápsulas requieren identidad protegida. Allí se revisan datos y paquetes, pero ningún cambio remoto se ejecuta sin autorización posterior.' },
      ],
      ['El mapa no convierte una ruta documentada en capacidad desplegada.', 'Las superficies privadas no se indexan como conocimiento público.'],
      { label: 'Abrir el mapa completo', routeKey: 'siteMap' },
    ),
    en: entry(
      'Human and agentic map',
      'An index for understanding the product without getting lost across layers.',
      'The map organizes audit, methodology, education, tools, cases and private surfaces. Agents also receive sitemaps, catalogs and machine-readable contracts.',
      [
        { title: 'Learn and diagnose', body: 'Home, guide, AEO, sectors, evolution and methodology explain why a website should be prepared and how public evidence is measured.' },
        { title: 'Use public tools', body: 'The auditor, comparison, assistant, Registry, CLI, MCP and OKF provide concrete journeys with visible boundaries and provenance.' },
        { title: 'Prepare private changes', body: 'Dossiers and capsules require protected identity. Data and packages can be reviewed there, but no remote change runs without a later authorization.' },
      ],
      ['A documented route does not become a deployed capability merely by appearing in the map.', 'Private surfaces are not indexed as public knowledge.'],
      { label: 'Open the complete map', routeKey: 'siteMap' },
    ),
    pt: entry(
      'Mapa humano e agêntico',
      'Um índice para compreender o produto sem se perder entre suas camadas.',
      'O mapa organiza auditoria, metodologia, educação, ferramentas, casos e superfícies privadas. Agentes também recebem sitemaps, catálogos e contratos legíveis por máquina.',
      [
        { title: 'Aprender e diagnosticar', body: 'Início, guia, AEO, setores, evolução e metodologia explicam por que preparar um site e como medir evidências públicas.' },
        { title: 'Usar ferramentas públicas', body: 'Auditor, comparação, assistente, Registry, CLI, MCP e OKF oferecem jornadas concretas com limites e procedência visíveis.' },
        { title: 'Preparar mudanças privadas', body: 'Dossiês e cápsulas exigem identidade protegida. Dados e pacotes são revisados ali, mas nenhuma mudança remota ocorre sem autorização posterior.' },
      ],
      ['Uma rota documentada não se torna capacidade implantada apenas por aparecer no mapa.', 'Superfícies privadas não são indexadas como conhecimento público.'],
      { label: 'Abrir o mapa completo', routeKey: 'siteMap' },
    ),
  },
});

export function publicPageCopy(pageKey, locale = 'es') {
  return PUBLIC_PAGE_COPY[pageKey]?.[locale] || PUBLIC_PAGE_COPY[pageKey]?.es || null;
}
