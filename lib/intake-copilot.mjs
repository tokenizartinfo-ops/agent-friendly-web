import { analyzeIntakeNotes, INTAKE_ASSISTANT_ALLOWED_FIELDS } from './intake-assistant.mjs';

const singleFields = new Set(['organization', 'website', 'audience', 'cms', 'hosting']);
const listFields = new Set(['goals', 'languages']);
const languageCodes = new Set(['es', 'en', 'pt', 'it', 'fr']);
const goalPatterns = {
  discover: /encontr|encuentr|descubr|find|discover|busc|search|visib|aparec/i,
  explain: /explic|inform|answer|respond|respuest|horario|faq|document/i,
  query: /consult|query|read|leer|ler\b/i,
  act: /reserv|book|schedul|agend|crear|create|actualiz|update|envi|submit/i,
  transact: /pag|pay|compr|purchas|buy|vend|sell/i,
};
const negativeGoal = /\b(no|sin|not|without|n[aã]o|sem|never|nunca)\b/i;

function reviewGoalEvidence(value, notes) {
  if (!value || typeof value !== 'object' || !Object.hasOwn(goalPatterns, value.mode)
    || typeof value.sourceExcerpt !== 'string') return null;
  const sourceExcerpt = value.sourceExcerpt.trim();
  if (!sourceExcerpt || sourceExcerpt.length > 160 || !notes.includes(sourceExcerpt)
    || !goalPatterns[value.mode].test(sourceExcerpt)) return null;
  const start = notes.indexOf(sourceExcerpt);
  const before = notes.slice(0, start).split(/[.!?;\n]/).at(-1) || '';
  const after = notes.slice(start + sourceExcerpt.length).split(/[.!?;\n]/)[0] || '';
  if (negativeGoal.test(`${before} ${sourceExcerpt} ${after}`)) return null;
  return { mode: value.mode, sourceExcerpt };
}
const languageMentions = {
  es: /\b(espa[nñ]ol|spanish|castellano)\b/i,
  en: /\b(ingl[eé]s|english)\b/i,
  pt: /\b(portugu[eê]s|portuguese)\b/i,
  it: /\b(italiano|italian)\b/i,
  fr: /\b(franc[eé]s|french|fran[cç]ais)\b/i,
};

export function validateCopilotInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || !['es', 'en', 'pt'].includes(input.locale)
    || typeof input.notes !== 'string' || input.notes.length > 5000
    || !input.notes.trim()) return { ok: false, code: 'invalid_input' };
  const safety = analyzeIntakeNotes(input.notes, input.locale);
  if (safety.blocked) return { ok: false, code: 'sensitive_input' };
  return { ok: true, notes: input.notes.trim(), locale: input.locale };
}

export function reviewCopilotOutput(raw, notes, locale = 'es') {
  if (typeof raw === 'string' && raw.length > 12000) throw new Error('invalid_model_output');
  const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.suggestions)) throw new Error('invalid_model_output');
  const seen = new Set();
  const suggestions = [];
  for (const item of payload.suggestions.slice(0, 8)) {
    if (!item || typeof item !== 'object' || !INTAKE_ASSISTANT_ALLOWED_FIELDS.includes(item.field)
      || item.field === 'notes' || seen.has(item.field)
      || typeof item.sourceExcerpt !== 'string' || !item.sourceExcerpt.trim()
      || item.sourceExcerpt.trim().length > 160
      || !notes.includes(item.sourceExcerpt.trim())) continue;
    const excerpt = item.sourceExcerpt.trim();
    let value = item.value;
    if (singleFields.has(item.field)) {
      if (typeof value !== 'string' || !value.trim() || value.length > 500) continue;
      value = value.trim();
      if (item.field !== 'website' && !excerpt.toLocaleLowerCase().includes(value.toLocaleLowerCase())) continue;
      if (item.field === 'website') {
        try {
          const url = new URL(value);
          if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) continue;
          if (!excerpt.toLocaleLowerCase().includes(url.hostname.toLocaleLowerCase())) continue;
        } catch { continue; }
      }
    } else if (listFields.has(item.field)) {
      if (!Array.isArray(value) || value.length > 5 || !value.length || value.some(v => typeof v !== 'string' || !v.trim() || v.length > 180)) continue;
      value = value.map(v => v.trim());
      if (item.field === 'goals' && value.some(v => !excerpt.toLocaleLowerCase().includes(v.toLocaleLowerCase()))) continue;
      if (item.field === 'languages' && value.some(v => !languageCodes.has(v) || !languageMentions[v].test(excerpt))) continue;
    } else continue;
    seen.add(item.field);
    suggestions.push({ field: item.field, value, sourceExcerpt: excerpt, confidence: 'needs_review' });
  }
  return {
    contract: 'intake-copilot.v1', blocked: false, persistence: 'none', autonomousWrite: false,
    suggestions,
    goalGuidance: reviewGoalEvidence(payload.goalEvidence, notes),
    warning: ({ es: 'Son hipótesis basadas en tu texto. Revisá cada dato antes de aplicarlo.', en: 'These are hypotheses based on your text. Review each detail before applying it.', pt: 'São hipóteses baseadas no seu texto. Revise cada dado antes de aplicar.' })[locale],
  };
}
