import { clock, closed, instant, operation, readList, readRecord, ref, text } from './agent-consumption-input.mjs';

const ENTRY_KEYS = ['operationId', 'contractVersion', 'purpose', 'effect', 'availability', 'verification', 'pricingState', 'unit'];
const STATES = new Set(['planned', 'source_only', 'verified_runtime', 'temporarily_unavailable', 'retired']);
const PRICES = new Set(['unpriced', 'explicitly_free', 'quoted']);
const EFFECTS = new Set(['read', 'prepare', 'write', 'publish']);

// Caller must supply trusted, dated runtime observations. No remote verification is performed here.
export function describeAgentCatalog(input, options) {
  const config = readRecord(options, ['now']);
  const source = readRecord(input, ['revision', 'entries']);
  const entries = source && readList(source.entries, 32);
  if (!config || !clock(config.now) || !source || !ref(source.revision) || !entries) return closed('blocked', { code: 'invalid_catalog' });
  const operations = [], seen = new Set();
  for (const value of entries) {
    const entry = readRecord(value, ENTRY_KEYS);
    if (!entry || !operation(entry.operationId) || seen.has(entry.operationId) || !ref(entry.contractVersion) ||
      !text(entry.purpose) || !EFFECTS.has(entry.effect) || !STATES.has(entry.availability) ||
      !PRICES.has(entry.pricingState) || !ref(entry.unit)) return closed('blocked', { code: 'invalid_catalog' });
    seen.add(entry.operationId);
    let proof = null;
    if (entry.verification != null) {
      proof = readRecord(entry.verification, ['contractVersion', 'deploymentRef', 'observedAt', 'expiresAt']);
      if (!proof || !ref(proof.contractVersion) || !ref(proof.deploymentRef) ||
        instant(proof.observedAt) === null || instant(proof.expiresAt) === null) return closed('blocked', { code: 'invalid_catalog' });
    }
    const fresh = proof && proof.contractVersion === entry.contractVersion &&
      instant(proof.observedAt) <= config.now && instant(proof.expiresAt) > config.now;
    const availability = entry.availability === 'verified_runtime' && !fresh ? 'temporarily_unavailable' : entry.availability;
    operations.push({
      operationId: entry.operationId, contractVersion: entry.contractVersion, purpose: entry.purpose,
      effect: entry.effect, availability, pricingState: entry.pricingState, unit: entry.unit,
      verification: availability === 'verified_runtime' ? proof : null,
    });
  }
  return closed('ok', { contract: 'afw.agent-consumption.catalog.v1', catalogRevision: source.revision, operations });
}
