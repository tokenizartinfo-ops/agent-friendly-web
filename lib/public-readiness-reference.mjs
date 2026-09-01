export const PUBLIC_READINESS_REFERENCE = Object.freeze({
  target: 'agentfriendlyweb.dev',
  score: 95,
  measuredAt: '2026-08-31',
  categories: Object.freeze({
    discovery: Object.freeze({ score: 20, weight: 20, status: 'verified' }),
    answerability: Object.freeze({ score: 20, weight: 20, status: 'verified' }),
    machineContent: Object.freeze({ score: 15, weight: 15, status: 'verified' }),
    tools: Object.freeze({ score: 20, weight: 20, status: 'verified' }),
    experimental: Object.freeze({ score: 10, weight: 10, status: 'verified' }),
    trust: Object.freeze({ score: 10, weight: 10, status: 'verified' }),
    commerce: Object.freeze({ score: 0, weight: 5, status: 'not_detected' }),
  }),
  level: Object.freeze({
    es: 'AF-5 · Nativo con límites',
    en: 'AF-5 · Native with limits',
    pt: 'AF-5 · Nativo com limites',
  }),
  boundary: Object.freeze({
    es: 'Referencia propia fechada. Comercio y pagos no fueron detectados.',
    en: 'Dated first-party reference. Commerce and payments were not detected.',
    pt: 'Referência própria datada. Comércio e pagamentos não foram detectados.',
  }),
});
