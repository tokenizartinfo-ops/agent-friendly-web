export const SHARED_COPY = Object.freeze({
  es: {
    menu: { open: 'Abrir menú', close: 'Cerrar menú' },
    language: { label: 'Idioma' },
    nav: {
      audit: 'Auditar', guide: 'Guía', aeo: 'AEO', sectors: 'Sectores', evolution: 'Evolución',
      methodology: 'Método', registry: 'Registry', cli: 'CLI', mcp: 'MCP', cases: 'Casos', siteMap: 'Mapa', dossier: 'Mi expediente',
    },
    footer: {
      description: 'Diagnóstico verificable y evolución progresiva para sitios legibles por humanos y agentes.',
      product: 'Producto', agentResources: 'Recursos agénticos', project: 'Proyecto',
      audit: 'Auditar un sitio', guide: 'Guía pública', aeo: 'AEO y crawlers', sectors: 'Soluciones por sector',
      measurement: 'Medir mejora', assistant: 'Asistente de preparación', openKnowledge: 'Conocimiento abierto',
      evolution: 'Evolución agéntica', methodology: 'Metodología', registry: 'Registry público', cli: 'CLI read-only',
      mcp: 'MCP público read-only', externalVerification: 'Verificación externa', tokenizartCase: 'Caso Tokenizart',
      siteMap: 'Mapa completo', dossier: 'Mi expediente', security: 'Seguridad', repository: 'Repositorio',
      attribution: 'Creado por Gabriel Mucchiut e incubado dentro de Tokenizart.',
      limits: 'Metodología propia, evidencia pública y límites explícitos.',
    },
  },
  en: {
    menu: { open: 'Open menu', close: 'Close menu' },
    language: { label: 'Language' },
    nav: {
      audit: 'Audit', guide: 'Guide', aeo: 'AEO', sectors: 'Sectors', evolution: 'Evolution',
      methodology: 'Method', registry: 'Registry', cli: 'CLI', mcp: 'MCP', cases: 'Cases', siteMap: 'Map', dossier: 'My dossier',
    },
    footer: {
      description: 'Verifiable diagnostics and progressive improvement for websites that humans and agents can understand.',
      product: 'Product', agentResources: 'Agent resources', project: 'Project',
      audit: 'Audit a website', guide: 'Public guide', aeo: 'AEO and crawlers', sectors: 'Sector solutions',
      measurement: 'Measure improvement', assistant: 'Preparation assistant', openKnowledge: 'Open knowledge',
      evolution: 'Agentic evolution', methodology: 'Methodology', registry: 'Public Registry', cli: 'Read-only CLI',
      mcp: 'Public read-only MCP', externalVerification: 'External verification', tokenizartCase: 'Tokenizart case',
      siteMap: 'Complete site map', dossier: 'My dossier', security: 'Security', repository: 'Repository',
      attribution: 'Created by Gabriel Mucchiut and incubated within Tokenizart.',
      limits: 'Proprietary methodology, public evidence and explicit limits.',
    },
  },
  pt: {
    menu: { open: 'Abrir menu', close: 'Fechar menu' },
    language: { label: 'Idioma' },
    nav: {
      audit: 'Auditar', guide: 'Guia', aeo: 'AEO', sectors: 'Setores', evolution: 'Evolução',
      methodology: 'Método', registry: 'Registry', cli: 'CLI', mcp: 'MCP', cases: 'Casos', siteMap: 'Mapa', dossier: 'Meu dossiê',
    },
    footer: {
      description: 'Diagnóstico verificável e evolução progressiva para sites compreensíveis por pessoas e agentes.',
      product: 'Produto', agentResources: 'Recursos agênticos', project: 'Projeto',
      audit: 'Auditar um site', guide: 'Guia público', aeo: 'AEO e crawlers', sectors: 'Soluções por setor',
      measurement: 'Medir melhoria', assistant: 'Assistente de preparação', openKnowledge: 'Conhecimento aberto',
      evolution: 'Evolução agêntica', methodology: 'Metodologia', registry: 'Registry público', cli: 'CLI read-only',
      mcp: 'MCP público read-only', externalVerification: 'Verificação externa', tokenizartCase: 'Caso Tokenizart',
      siteMap: 'Mapa completo', dossier: 'Meu dossiê', security: 'Segurança', repository: 'Repositório',
      attribution: 'Criado por Gabriel Mucchiut e incubado dentro da Tokenizart.',
      limits: 'Metodologia própria, evidência pública e limites explícitos.',
    },
  },
});

export function sharedCopy(locale) {
  return SHARED_COPY[locale] || SHARED_COPY.es;
}
