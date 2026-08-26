const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^0\./,
  /^\[?::1\]?$/,
];

export function normalizePublicUrl(value) {
  const input = String(value || '').trim();
  if (!input) throw new Error('Ingresa una URL publica.');

  if (/^[a-z][a-z\d+.-]*:\/\//i.test(input) && !/^https?:\/\//i.test(input)) {
    throw new Error('Solo se pueden auditar direcciones web publicas.');
  }

  let url;
  try {
    url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    throw new Error('Ingresa una URL publica valida.');
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Solo se pueden auditar direcciones web publicas.');
  }

  if (url.username || url.password || url.port) {
    throw new Error('La auditoria solo admite sitios publicos sin credenciales ni puertos alternativos.');
  }

  const host = url.hostname.toLowerCase();
  if (
    PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(host)) ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    throw new Error('La auditoria solo admite sitios publicos.');
  }

  url.hash = '';
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.toString();
}

const categoryDefinitions = {
  discovery: {
    label: 'Descubrimiento y rastreo',
    weight: 20,
    checks: { robots: 9, sitemap: 9, linkHeaders: 2 },
  },
  answerability: {
    label: 'Contenido listo para respuestas',
    weight: 20,
    checks: { structuredData: 14, directAnswers: 6 },
  },
  machineContent: {
    label: 'Contenido legible por agentes',
    weight: 15,
    checks: { llms: 8, markdown: 7 },
  },
  tools: {
    label: 'APIs y herramientas',
    weight: 20,
    checks: { openapi: 6, mcp: 8, skills: 6 },
  },
  experimental: {
    label: 'Interaccion web experimental',
    weight: 10,
    checks: { webmcp: 10 },
  },
  trust: {
    label: 'Identidad, evidencia y gobierno',
    weight: 10,
    checks: { ownership: 5, sources: 5 },
  },
  commerce: {
    label: 'Comercio agentico',
    weight: 5,
    checks: { payments: 5 },
  },
};

export function calculateReadiness(evidence = {}) {
  const categories = {};
  let score = 0;

  for (const [id, definition] of Object.entries(categoryDefinitions)) {
    const categoryScore = Object.entries(definition.checks).reduce(
      (sum, [check, points]) => sum + (evidence[check] === true ? points : 0),
      0,
    );
    score += categoryScore;
    categories[id] = {
      label: definition.label,
      score: categoryScore,
      weight: definition.weight,
      status:
        categoryScore === 0
          ? 'not_detected'
          : categoryScore === definition.weight
            ? 'verified'
            : 'partial',
    };
  }

  return {
    methodology: 'Gabriel Mucchiut Agent Friendly Web Method v1',
    score,
    categories,
    level: readinessLevel(score),
  };
}

export function readinessLevel(score) {
  if (score >= 90) return 'AF-5 transaccional';
  if (score >= 72) return 'AF-4 delegable';
  if (score >= 54) return 'AF-3 herramientas';
  if (score >= 36) return 'AF-2 legible';
  if (score >= 18) return 'AF-1 descubrible';
  return 'AF-0 invisible';
}

export function buildRoadmap({ control = 'unknown', goals = [] } = {}) {
  const items = [];

  if (control === 'none') {
    items.push({
      id: 'evidence-dossier',
      title: 'Publicar un expediente agent-friendly externo',
      reason:
        'Permite ordenar evidencia y contexto mientras se obtiene acceso. No reemplaza una implementacion nativa en el sitio.',
      stage: 'Ahora',
    });
    items.push({
      id: 'request-access',
      title: 'Solicitar acceso tecnico acotado',
      reason: 'Pedir control de contenidos, DNS o una ventana de implementacion al proveedor actual.',
      stage: 'Siguiente',
    });
  } else if (control === 'dns') {
    items.push({
      id: 'edge-baseline',
      title: 'Crear una capa de descubrimiento en el edge',
      reason: 'Con DNS o Cloudflare se pueden publicar rutas y cabeceras sin reconstruir el origen.',
      stage: 'Ahora',
    });
  } else {
    items.push({
      id: 'origin-baseline',
      title: 'Implementar el baseline en el sitio original',
      reason: 'Es la forma mas verificable de alinear contenido humano, metadata y recursos para agentes.',
      stage: 'Ahora',
    });
  }

  items.push({
    id: 'crawl-baseline',
    title: 'Revisar robots, sitemap y politica de crawlers',
    reason: 'Separa busqueda, solicitudes de usuario y entrenamiento antes de decidir permisos.',
    stage: 'Fundacion',
  });

  if (goals.includes('content') || goals.includes('discovery')) {
    items.push({
      id: 'answer-ready-content',
      title: 'Convertir contenido clave en respuestas citables',
      reason: 'Preguntas, fuentes, fechas, autoria y JSON-LD deben coincidir con lo visible para humanos.',
      stage: 'Contenido',
    });
  }

  if (goals.includes('tools')) {
    items.push({
      id: 'tool-contracts',
      title: 'Definir herramientas read-only antes de exponer acciones',
      reason: 'OpenAPI, MCP y skills necesitan contratos, autenticacion, limites y auditoria.',
      stage: 'Herramientas',
    });
  }

  return items;
}

export const methodologyCategories = categoryDefinitions;
