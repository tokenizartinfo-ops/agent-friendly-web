const titles = {
  en: {
    'evidence-dossier': ['Publish an external discovery dossier', 'Now'],
    'request-access': ['Request limited technical access', 'Next'],
    'edge-baseline': ['Create an edge discovery layer', 'Now'],
    'origin-baseline': ['Implement the baseline on the original website', 'Now'],
    'crawl-baseline': ['Review robots, sitemap and crawler policy', 'Foundation'],
    'answer-ready-content': ['Turn key content into citable answers', 'Content'],
    'tool-contracts': ['Define read-only tools before exposing actions', 'Tools'],
  },
  pt: {
    'evidence-dossier': ['Publicar um dossie externo de descoberta', 'Agora'],
    'request-access': ['Solicitar acesso tecnico limitado', 'Proximo'],
    'edge-baseline': ['Criar uma camada de descoberta no edge', 'Agora'],
    'origin-baseline': ['Implementar a base no site original', 'Agora'],
    'crawl-baseline': ['Revisar robots, sitemap e politica de crawlers', 'Fundamentos'],
    'answer-ready-content': ['Transformar conteudo essencial em respostas citaveis', 'Conteudo'],
    'tool-contracts': ['Definir ferramentas de leitura antes de expor acoes', 'Ferramentas'],
  },
};

/** Localizes presentation only; saved roadmap evidence remains unchanged.
 * @template {{id: string, title: string, stage: string}} T
 * @param {T} item
 * @param {string} locale
 */
export function roadmapPresentation(item, locale) {
  const language = locale === 'en' || locale === 'pt' ? titles[locale] : null;
  const copy = language?.[/** @type {keyof typeof titles.en} */ (item.id)];
  return copy ? {...item, title: copy[0], stage: copy[1]} : item;
}
