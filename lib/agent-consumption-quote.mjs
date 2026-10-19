import { createHash } from 'node:crypto';
import { describeAgentCatalog } from './agent-consumption-catalog.mjs';
import { clock, closed, instant, integer, operation, readList, readRecord, ref } from './agent-consumption-input.mjs';

const MODES = new Set(['agentic', 'accompanied', 'hybrid']);
const REQUEST_KEYS = ['operationId', 'contractVersion', 'serviceMode', 'scopeRef', 'scopeRevision', 'units', 'catalogRevision', 'maxTotalMinor'];
const POLICY_KEYS = ['revision', 'status', 'validFrom', 'validUntil', 'currency', 'minorUnitExponent', 'lines'];
const LINE_KEYS = ['operationId', 'contractVersion', 'serviceMode', 'catalogRevision', 'unit', 'maxUnits', 'unitMinor', 'fixedMinor'];
const blocked = code => closed('blocked', { code, totalMinor: null });

// Pure indicative calculation. Approval provenance and durable quote acceptance are NOT implemented.
export function previewAgentQuote(input, options) {
  const config = readRecord(options, ['catalog', 'policy', 'now']);
  const request = readRecord(input, REQUEST_KEYS);
  if (!config || !clock(config.now) || !request || !operation(request.operationId) || !ref(request.contractVersion) ||
    !MODES.has(request.serviceMode) || !ref(request.scopeRef) || !integer(request.scopeRevision, 1) ||
    !integer(request.units, 1, 1000000) || !ref(request.catalogRevision) || !integer(request.maxTotalMinor)) return blocked('invalid_request');
  const catalog = describeAgentCatalog(config.catalog, { now: config.now });
  if (catalog.status !== 'ok' || catalog.catalogRevision !== request.catalogRevision) return blocked('catalog_conflict');
  const capability = catalog.operations.find(row => row.operationId === request.operationId && row.contractVersion === request.contractVersion);
  if (!capability || capability.availability !== 'verified_runtime') return blocked('operation_unavailable');
  if (capability.pricingState === 'unpriced' || config.policy == null) return blocked('pricing_unavailable');
  const policy = readRecord(config.policy, POLICY_KEYS);
  if (!policy) return blocked('policy_invalid');
  if (policy.status !== 'approved') return blocked('pricing_unavailable');
  const from = instant(policy.validFrom), until = instant(policy.validUntil);
  const lines = readList(policy.lines, 64);
  if (!ref(policy.revision) || from === null || until === null || from >= until ||
    typeof policy.currency !== 'string' || !/^[A-Z]{3}$/.test(policy.currency) ||
    !integer(policy.minorUnitExponent, 0, 4) || !lines || lines.length === 0) return blocked('policy_invalid');
  if (from > config.now || until <= config.now) return blocked('pricing_unavailable');
  const normalized = [], seen = new Set();
  for (const value of lines) {
    const row = readRecord(value, LINE_KEYS);
    if (!row || !operation(row.operationId) || !ref(row.contractVersion) || !MODES.has(row.serviceMode) ||
      !ref(row.catalogRevision) || !ref(row.unit) || !integer(row.maxUnits, 1, 1000000) ||
      !integer(row.unitMinor) || !integer(row.fixedMinor)) return blocked('policy_invalid');
    const key = JSON.stringify([row.operationId, row.contractVersion, row.serviceMode, row.catalogRevision]);
    if (seen.has(key)) return blocked('policy_invalid');
    seen.add(key); normalized.push(row);
  }
  const line = normalized.find(row => row.operationId === request.operationId && row.contractVersion === request.contractVersion &&
    row.serviceMode === request.serviceMode && row.catalogRevision === request.catalogRevision);
  if (!line) return blocked('pricing_unavailable');
  if (line.unit !== capability.unit) return blocked('policy_invalid');
  if (request.units > line.maxUnits) return blocked('scope_limit');
  const variable = BigInt(line.unitMinor) * BigInt(request.units);
  const total = variable + BigInt(line.fixedMinor);
  if (total > BigInt(Number.MAX_SAFE_INTEGER) ||
    (capability.pricingState === 'quoted' && total === 0n) ||
    (capability.pricingState === 'explicitly_free' && total !== 0n)) return blocked('policy_invalid');
  if (total > BigInt(request.maxTotalMinor)) return blocked('budget_exceeded');
  const scope = [request.operationId, request.contractVersion, request.serviceMode, request.scopeRef,
    request.scopeRevision, request.units, request.catalogRevision];
  return closed('quoted_preview', {
    contract: 'afw.agent-consumption.quote-preview.v1',
    operationId: request.operationId, contractVersion: request.contractVersion, serviceMode: request.serviceMode,
    scopeHash: createHash('sha256').update(JSON.stringify(scope)).digest('hex'),
    catalogRevision: catalog.catalogRevision, policyRevision: policy.revision,
    currency: policy.currency, minorUnitExponent: policy.minorUnitExponent,
    totalMinor: Number(total), unit: line.unit,
    lines: [
      { kind: 'fixed', quantity: 1, unitMinor: line.fixedMinor, totalMinor: line.fixedMinor },
      { kind: 'work', quantity: request.units, unitMinor: line.unitMinor, totalMinor: Number(variable) },
    ],
    validUntil: new Date(Math.min(until, instant(capability.verification.expiresAt))).toISOString(),
  });
}
