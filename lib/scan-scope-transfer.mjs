import {buildScanActionPlan, prepareScopeBrief} from './scan-action-plan.mjs';
import {normalizePublicUrl} from './methodology.mjs';

export const MAX_SCOPE_BYTES = 16384;
const fields = ['format','version','observedUrl','checkedAt','locale','evidence','selected','control'];
const signals = ['robots','sitemap','directAnswers','structuredData','llms','markdown','ownership','sources'];
const actions = ['crawl','answers','documents','trust'];

function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validate(value) {
  if (!record(value) || Object.keys(value).length !== fields.length || fields.some(key=>!Object.hasOwn(value,key))) throw new Error('Invalid scope fields');
  if (value.format !== 'afw-scan-scope' || value.version !== 1) throw new Error('Unsupported scope format');
  if (!['es','en','pt'].includes(value.locale) || !['unknown','self','provider'].includes(value.control)) throw new Error('Invalid scope choices');
  if (typeof value.checkedAt !== 'string' || !Number.isFinite(Date.parse(value.checkedAt)) || new Date(value.checkedAt).toISOString() !== value.checkedAt) throw new Error('Invalid observation timestamp');
  if (typeof value.observedUrl !== 'string') throw new Error('Invalid observed URL');
  const url = new URL(normalizePublicUrl(value.observedUrl));
  if (url.origin + url.pathname !== value.observedUrl) throw new Error('Use a canonical public URL without query or fragment');
  if (!record(value.evidence) || Object.entries(value.evidence).some(([id,state])=>!signals.includes(id) || typeof state !== 'boolean')) throw new Error('Invalid evidence');
  if (!Array.isArray(value.selected) || !value.selected.length || value.selected.length > actions.length || new Set(value.selected).size !== value.selected.length || value.selected.some(id=>!actions.includes(id))) throw new Error('Invalid selected actions');
  return value;
}

/** Export a reviewed selection, never owner identity, arbitrary text or consent. */
export function exportScanScope(scan, options, locale='es') {
  const plan = buildScanActionPlan(scan,locale);
  const brief = prepareScopeBrief(plan,options);
  const evidence = Object.fromEntries(signals.filter(id=>typeof scan.evidence?.[id] === 'boolean').map(id=>[id,scan.evidence[id]]));
  const value = validate({
    format:'afw-scan-scope',version:1,observedUrl:plan.observedUrl,
    checkedAt:new Date(plan.checkedAt).toISOString(),locale:plan.locale,evidence,
    selected:brief.actions.map(action=>action.id),
    control:brief.deliveryMode === 'self_managed' ? 'self' : brief.deliveryMode === 'assisted' ? 'provider' : 'unknown',
  });
  const text = JSON.stringify(value,null,2);
  if (new TextEncoder().encode(text).byteLength > MAX_SCOPE_BYTES) throw new Error('Scope file too large');
  return text;
}

/** Pure preview. Imported evidence is editable and unverified, even when exported by AFW.
 * This function cannot change the dossier, trigger autosave, or grant publication rights.
 */
export function previewScanScope(text, dossierWebsite='') {
  if (typeof text !== 'string' || new TextEncoder().encode(text).byteLength > MAX_SCOPE_BYTES) throw new Error('Invalid scope file size');
  const value = validate(JSON.parse(text));
  const plan = buildScanActionPlan({target:value.observedUrl,checkedAt:value.checkedAt,evidence:value.evidence},value.locale);
  // This reconstructs the exported selection; it is not a fresh user review.
  const brief = prepareScopeBrief(plan,{selected:value.selected,reviewed:true,control:value.control});
  return {
    provenance:'unverified_import',requiresFreshReview:true,persistence:'none',
    websiteMatches:dossierWebsite ? new URL(normalizePublicUrl(dossierWebsite)).origin === plan.target : null,
    originalScanLimitsIncluded:false,
    brief,
  };
}
