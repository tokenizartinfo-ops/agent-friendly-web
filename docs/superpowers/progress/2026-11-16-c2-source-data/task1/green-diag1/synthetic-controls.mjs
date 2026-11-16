import {observe,ProtocolFailure,requireScopeOrder,scopeOrder} from './tap-protocol.mjs';

export function runSyntheticControls(vectors, selections, selectionHashes) {
  const [selection] = selections, [selectionHash] = selectionHashes;
  const capture = tap => ({status:1,signal:null,error:undefined,stdout:Buffer.from(tap),stderr:Buffer.alloc(0)});
  const read = tap => observe(capture(tap),vectors.target,selection,selectionHash,null);
  const fail = () => { throw new ProtocolFailure('SYNTHETIC_CONTROL_INVALID'); };
  const good = read(vectors.good);
  if (good.verdict !== 'qualified' || good.witness?.actual !== 503 || good.cases.length !== 3) fail();
  let rejected = 0;
  for (const {find,replace} of vectors.rejectEdits) {
    const position = vectors.good.indexOf(find);
    if (position < 0 || find === replace) fail();
    const edited = vectors.good.slice(0,position)+replace+vectors.good.slice(position+find.length);
    const result = read(edited);
    if (result.verdict !== 'unqualified' || result.code === 'PARSER_INTERNAL') fail();
    rejected++;
  }
  for (const {tap} of vectors.rejectStandalone) {
    const result = read(tap);
    if (result.verdict !== 'unqualified' || result.code === 'PARSER_INTERNAL') fail();
    rejected++;
  }
  requireScopeOrder(scopeOrder);
  for (const name of vectors.rejectAssembly) {
    const omitted = {ABSENT_MUTANT:'mutant-prefix',ABSENT_REGRESSIONS:'regressions'}[name];
    if (!omitted) fail();
    try {
      requireScopeOrder(scopeOrder.filter(scope => scope !== omitted));
    } catch (error) {
      if (!(error instanceof ProtocolFailure) || error.code !== 'SCOPES_INCOMPLETE') fail();
      rejected++;
      continue;
    }
    fail();
  }
  const controls = vectors.fullControls;
  function full(mode,edit,green) {
    const index = mode === 'proposal-green' ? 1 : 2;
    const failure = index === 1 ? controls.greenFailure : controls.mutantFailure;
    const lines = ['TAP version 13'];
    for (const [i,item] of controls.template.entries()) {
      const failed = item.id === failure;
      const counters = edit && i >= edit.first && i <= edit.last ? edit.counters : item.counters;
      const frame = {id:item.id,status:failed?'fail':'pass',phase:item.phase,counters,code:failed?'TEST_FAILED':'OK'};
      lines.push('# C2SOURCE '+JSON.stringify(frame),'# Subtest: '+item.id,
        (failed?'not ':'')+'ok '+(i+1)+' - '+item.id,'  ---','  duration_ms: 1',"  type: 'test'");
      if (failed) lines.push("  failureType: 'testCodeFailure'","  error: 'synthetic mutant'");
      lines.push('  ...');
    }
    const failures = failure === null ? 0 : 1;
    lines.push('1..20','# tests 20','# suites 0','# pass '+(20-failures),'# fail '+failures,
      '# cancelled 0','# skipped 0','# todo 0','# duration_ms 30','');
    return observe({...capture(lines.join('\n')),status:failures},vectors.target,selections[index],selectionHashes[index],green);
  }
  const green = full('proposal-green',null,null);
  if (green.verdict !== 'qualified' || full('mutant-prefix',null,green).verdict !== 'qualified') fail();
  for (const edit of controls.rejections) {
    const result = full(edit.mode,edit,green);
    if (result.verdict !== 'unqualified' || result.code !== 'COUNTERS_INVALID') fail();
    rejected++;
  }
  return {accepted:3,rejected};
}
