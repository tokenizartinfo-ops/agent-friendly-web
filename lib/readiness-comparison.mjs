function boundedNumber(value, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return minimum;
  return Math.min(maximum, Math.max(minimum, Math.round(parsed)));
}

function cleanDate(value) {
  const text = String(value || '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : '';
}

export function normalizeReadinessSnapshot(input = {}) {
  return {
    score: boundedNumber(input.score, 0, 100),
    evidenceCount: boundedNumber(input.evidenceCount, 0, 250),
    observedAt: cleanDate(input.observedAt),
  };
}

export function compareReadinessSnapshots(baselineInput = {}, currentInput = {}) {
  const baseline = normalizeReadinessSnapshot(baselineInput);
  const current = normalizeReadinessSnapshot(currentInput);

  return {
    contract: 'readiness-comparison.v1',
    claimType: 'evidence_comparison',
    baseline,
    current,
    scoreDelta: current.score - baseline.score,
    evidenceDelta: current.evidenceCount - baseline.evidenceCount,
    direction: current.score > baseline.score ? 'improved' : current.score < baseline.score ? 'decreased' : 'unchanged',
    guaranteesRanking: false,
    persistsInput: false,
  };
}
