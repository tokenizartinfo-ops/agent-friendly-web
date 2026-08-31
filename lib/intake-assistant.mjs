export const INTAKE_ASSISTANT_ALLOWED_FIELDS = Object.freeze([
  'organization',
  'website',
  'audience',
  'goals',
  'languages',
  'cms',
  'hosting',
  'notes',
]);

const secretPattern = /(api[_ -]?key|password|senha|contrase(?:n|ñ)a|bearer\s+[a-z0-9._-]+|private[_ -]?key|chave privada|secret[_ -]?key|sk-[a-z0-9_-]{8,}|ghp_[a-z0-9]{8,})/i;

const messages = Object.freeze({
  es: { empty: 'Agrega una descripción para preparar propuestas.', blocked: 'El texto parece incluir credenciales o secretos. Retíralos antes de continuar.', review: 'Revisa cada propuesta. Nada se guarda ni se publica desde este prototipo.' },
  en: { empty: 'Add a description to prepare proposals.', blocked: 'The text appears to include credentials or secrets. Remove them before continuing.', review: 'Review every proposal. This prototype saves and publishes nothing.' },
  pt: { empty: 'Adicione uma descrição para preparar propostas.', blocked: 'O texto parece incluir credenciais ou segredos. Remova-os antes de continuar.', review: 'Revise cada proposta. Este protótipo não salva nem publica nada.' },
});

function cleanText(value, max = 500) {
  return String(value || '').replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function normalizeWebsite(value) {
  try {
    const source = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(source);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return '';
    url.hash = '';
    url.search = '';
    return url.toString();
  } catch {
    return '';
  }
}

function suggestion(field, value, sourceExcerpt, confidence = 'medium') {
  return { field, value, sourceExcerpt: cleanText(sourceExcerpt, 160), confidence };
}

export function analyzeIntakeNotes(input = '', locale = 'es') {
  const copy = messages[locale] || messages.es;
  const text = cleanText(input, 5000);
  if (!text) {
    return { contract: 'intake-assistant.v1', blocked: false, persistence: 'none', autonomousWrite: false, suggestions: [], warning: copy.empty };
  }

  if (secretPattern.test(text)) {
    return {
      contract: 'intake-assistant.v1',
      blocked: true,
      persistence: 'none',
      autonomousWrite: false,
      suggestions: [],
      warning: copy.blocked,
    };
  }

  const suggestions = [];
  const organizationMatch = text.match(/(?:somos|we are|somos a|a empresa se chama|mi empresa se llama|nuestra organizacion se llama)\s+([^.!?]{2,80})/i);
  if (organizationMatch) suggestions.push(suggestion('organization', cleanText(organizationMatch[1], 80), organizationMatch[0], 'high'));

  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z]{2,})(?:\/[^\s,;]*)?/i);
  if (websiteMatch) {
    const website = normalizeWebsite(websiteMatch[0]);
    if (website) suggestions.push(suggestion('website', website, websiteMatch[0], 'high'));
  }

  const languages = [];
  if (/espanol|español|spanish|castellano/i.test(text)) languages.push('es');
  if (/ingles|inglés|english/i.test(text)) languages.push('en');
  if (/portugues|português|portuguese/i.test(text)) languages.push('pt');
  if (languages.length) suggestions.push(suggestion('languages', languages, text, 'high'));

  const cmsMatch = text.match(/\b(wordpress|webflow|wix|squarespace|shopify|drupal|joomla|ghost)\b/i);
  if (cmsMatch) suggestions.push(suggestion('cms', cmsMatch[1], cmsMatch[0], 'high'));

  const hostingMatch = text.match(/\b(cloudflare|vercel|netlify|hostinger|godaddy|aws|azure|google cloud)\b/i);
  if (hostingMatch) suggestions.push(suggestion('hosting', hostingMatch[1], hostingMatch[0], 'medium'));

  const audienceMatch = text.match(/(?:we want|queremos que)\s+([^.!?]{3,140}?)(?:\s+to find us|\s+nos encontrem)/i)
    || text.match(/(?:nos encuentren|for|para|dirigido a|aimed at|audience(?: is|:)?|audiencia(?: es|:)?|publico(?: é|:)?|público(?: é|:)?)\s+([^.!?]{3,140})/i);
  if (audienceMatch) suggestions.push(suggestion('audience', cleanText(audienceMatch[1], 140), audienceMatch[0], 'medium'));

  const goalsMatch = text.match(/(?:queremos|we want|precisamos|objetivo(?: es|:)?)\s+([^.!?]{3,180})/i);
  if (goalsMatch) suggestions.push(suggestion('goals', [cleanText(goalsMatch[1], 180)], goalsMatch[0], 'medium'));

  suggestions.push(suggestion('notes', text, text, 'low'));

  return {
    contract: 'intake-assistant.v1',
    blocked: false,
    persistence: 'none',
    autonomousWrite: false,
    suggestions: suggestions.filter((item) => INTAKE_ASSISTANT_ALLOWED_FIELDS.includes(item.field)),
    warning: copy.review,
  };
}
