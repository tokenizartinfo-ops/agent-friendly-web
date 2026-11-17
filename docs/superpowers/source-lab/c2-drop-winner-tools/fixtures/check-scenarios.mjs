import assert from 'node:assert/strict';
export const expectedRed = 'AFW_C2_POSITIVE_QA_M_HOST_MARKER_JOIN';
const unknown = 'UNKNOWN';
const axes = ['site', 'outer', 'publicSite'];

// The adapter returns the real Response received after each model hop, plus the
// public observation at the existing cut (absent when the lab observer is OFF).
// Future adapter MUST call the same factories used in the mounted Source test
// overlays with actual object identities. It receives no oracle/expected fields.
export async function checkScenario(defaults, row, exercise) {
  const input = Object.freeze({ ...structuredClone(defaults), ...structuredClone(row.overrides) });
  const result = await exercise(input);
  assert.ok(result && typeof result === 'object', 'ADAPTER_RESULT_REQUIRED');
  for (const key of ['qaAtM', 'atHost']) {
    assert.ok(Object.hasOwn(result, key) && (result[key] === null || result[key] instanceof Response),
      'MODEL_RECEIVED_RESPONSE_OR_EXPLICIT_NULL_REQUIRED');
  }
  const component = result.dropWinner;
  if (component != null) {
    assert.deepStrictEqual(Object.keys(component), ['case', 'site', 'outer', 'publicSite'], 'COMPONENT_SHAPE');
    assert.equal(component.case, '15:firstDROP', 'COMPONENT_CASE');
    assert.ok(Buffer.byteLength(JSON.stringify(component)) <= 512, 'COMPONENT_CAP');
  }
  const observed = {
    qaMarker: result.qaAtM?.headers.get('x-afw-lab-qa-denial') ?? null,
    mMarker: result.atHost?.headers.get('x-afw-lab-m-denial') ?? null
  };
  for (const key of axes) observed[key] = component == null ? unknown : component[key];
  for (const key of ['settlement', 'originalAssertionPropagated', 'sealedUnchanged'])
    if (Object.hasOwn(row.expected, key)) observed[key] = result[key];
  const selected = Object.fromEntries(Object.keys(row.expected).map(k => [k, observed[k]]));
  assert.deepStrictEqual(selected, row.expected, row.id === 'qa-m-host-positive' ? expectedRed : 'SCENARIO:' + row.id);
}

export async function checkAll(fixture, exercise) {
  for (const row of fixture.rows) await checkScenario(fixture.defaults, row, exercise);
}
