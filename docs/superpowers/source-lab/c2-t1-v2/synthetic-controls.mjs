import {observe,ProtocolFailure,requireScopeOrder,scopeOrder} from './tap-protocol.mjs';

export function runSyntheticControls(vectors, selection, selectionHash) {
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
  return {accepted:1,rejected};
}
