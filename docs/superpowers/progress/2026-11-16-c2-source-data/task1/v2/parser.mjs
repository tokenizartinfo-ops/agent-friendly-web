import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

const LIMIT = 1048576;
const decoder = new TextDecoder('utf-8', {fatal:true});
const numeric = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
const keys = (value, expected) => value !== null && typeof value === 'object' &&
  Object.keys(value).join(',') === expected;
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
export class ProtocolFailure extends Error {
  constructor(code) { super(code); this.code = code; }
}
function demand(ok, code) { if (!ok) throw new ProtocolFailure(code); }

export const scopeOrder = ['baseline-red','proposal-green','mutant-prefix','regressions'];
export function requireScopeOrder(names) {
  demand(same(names,scopeOrder), 'SCOPES_INCOMPLETE');
}

function takeFrame(raw) {
  let value;
  try { value = JSON.parse(raw); } catch { throw new ProtocolFailure('FRAME_INVALID'); }
  demand(raw === JSON.stringify(value) && keys(value,'id,status,phase,counters,code'), 'FRAME_INVALID');
  demand(['pass','fail'].includes(value.status) &&
    value.code === (value.status === 'pass' ? 'OK' : 'TEST_FAILED'), 'FRAME_INVALID');
  demand(keys(value.counters,'upload,activation,receipts') &&
    Object.values(value.counters).every(n => Number.isInteger(n) && n >= 0 && n <= 3), 'COUNTERS_INVALID');
  return value;
}

function readDetails(lines, state) {
  demand(lines[state.i++] === '  ---', 'DETAILS_MISSING');
  const fields = new Map();
  while (state.i < lines.length && lines[state.i] !== '  ...') {
    const field = /^  ([A-Za-z_][A-Za-z_0-9]*):(?: (.*))?$/.exec(lines[state.i++]);
    demand(field && !fields.has(field[1]), 'DETAILS_AMBIGUOUS');
    const nested = [];
    while (state.i < lines.length && lines[state.i].startsWith('    ')) {
      nested.push(lines[state.i++].slice(4));
    }
    fields.set(field[1], {value:field[2] ?? '', nested});
  }
  demand(lines[state.i++] === '  ...', 'DETAILS_MISSING');
  return fields;
}

function scalar(fields, key) {
  const field = fields.get(key);
  return field && !field.nested.length ? field.value : null;
}
function checkDetails(details, status) {
  demand(numeric.test(scalar(details,'duration_ms')) && scalar(details,'type') === "'test'", 'DETAILS_INVALID');
  if (status === 'pass') {
    demand(details.size === 2, 'DETAILS_AMBIGUOUS');
  } else {
    demand(scalar(details,'failureType') === "'testCodeFailure'", 'FAILURE_TYPE_INVALID');
  }
}
function noticesWitness(fields, target, selection) {
  const allowed = ['duration_ms','type','location','failureType','error','code','name','expected','actual','operator','stack'];
  demand(fields.size === allowed.length && allowed.every(k => fields.has(k)), 'NOTICES_FIELDS_MISSING_OR_AMBIGUOUS');
  const definition = join(target,selection.file);
  const driver = pathToFileURL(definition).href;
  const fixture = pathToFileURL(join(target,selection.fixture)).href;
  demand([definition, driver].some(path => scalar(fields,'location') === "'"+path+":6:30'"), 'NOTICES_DEFINITION_INVALID');
  demand(scalar(fields,'code') === "'ERR_ASSERTION'" && scalar(fields,'name') === "'AssertionError'" &&
    scalar(fields,'operator') === "'strictEqual'", 'NOTICES_ASSERTION_INVALID');
  demand(scalar(fields,'expected') === '200' && scalar(fields,'actual') === '503', 'NOTICES_HTTP_INVALID');
  const stack = fields.get('stack');
  demand(stack.value === '|-' && stack.nested.length >= 4 && stack.nested.length <= 32, 'NOTICES_STACK_MISSING');
  const expected = ['choose ('+fixture+':18:118)', 'async Object.approve ('+fixture+':39:29)',
    'async '+driver+':36:2', 'async TestContext.<anonymous> ('+driver+':9:6)'];
  // V8 can interleave native task-queue / harness frames with async user frames.
  // Only literal node:internal frames can be discarded. No suffix path matching.
  const internal = /^(?:async )?(?:[\w.$<>]+ \()?node:internal\/[\w./_-]+:\d+:\d+\)?$/;
  demand(stack.nested[0] === expected[0] && same(stack.nested.filter(line => !internal.test(line)), expected),
    'NOTICES_ACTION_CHAIN_INVALID');
  return {caseId:'C2T1_NOTICES',phase:'notices',failureType:'testCodeFailure',code:'ERR_ASSERTION',
    operator:'strictEqual',definitionFile:'S07',definitionBlob:selection.fileBlob,definitionLine:6,
    actionLine:36,fixtureFile:'S08',fixtureBlob:selection.fixtureBlob,function:'choose',line:18,
    method:'GET',route:'/connections/finite-prepare',boundary:'before-form-parse-and-post',
    actual:Number(scalar(fields,'actual')),expected:Number(scalar(fields,'expected'))};
}

function parseRecords(lines, selected, regression, state) {
  demand(lines[state.i++] === 'TAP version 13', 'TAP_HEADER_INVALID');
  const results = [], frames = [];
  let subtest = null;
  while (state.i < lines.length && !lines[state.i].startsWith('1..')) {
    const line = lines[state.i++];
    if (line.startsWith('# C2SOURCE ')) {
      demand(!regression && frames.length < selected.length, 'FRAME_COUNT_INVALID');
      frames.push(takeFrame(line.slice(11)));
    } else if (line.startsWith('# Subtest: ')) {
      demand(subtest === null && results.length < selected.length, 'TAP_SUBTEST_INVALID');
      subtest = line.slice(11);
      demand(subtest === (selected[results.length].name ?? selected[results.length].id), 'TAP_CASE_INVALID');
    } else if (line.startsWith('# ')) {
      // Reporter escapes child stdout with "# ". Keep numeric summaries strictly in the trailer.
      demand(!/^# (?:C2SOURCE|Error:|Subtest:|(?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)(?: |$))/.test(line),
        'TAP_DIAGNOSTIC_INVALID');
    } else {
      const match = /^(not )?ok ([1-9]\d*) - ([^\r\n]+)$/.exec(line);
      demand(match && subtest !== null && match[2] === String(results.length+1) && match[3] === subtest,
        'TAP_CASE_INVALID');
      const status = match[1] ? 'fail' : 'pass';
      const details = readDetails(lines,state);
      checkDetails(details,status);
      results.push({status,details});
      subtest = null;
    }
  }
  demand(subtest === null && results.length === selected.length && frames.length === (regression ? 0 : selected.length),
    'TAP_COUNT_INVALID');
  const cases = results.map(({status},i) => {
    const item = selected[i];
    if (regression) return {id:item.id,status,code:status === 'pass' ? 'OK' : 'TEST_FAILED'};
    const frame = frames[i];
    demand(frame.id === item.id && frame.phase === item.phase && frame.status === status, 'FRAME_JOIN_INVALID');
    return frame;
  });
  return {results,cases};
}
function readTotals(lines, state, cases) {
  const n = cases.length, pass = cases.filter(c => c.status === 'pass').length;
  demand(lines[state.i++] === '1..'+n, 'TAP_PLAN_INVALID');
  const totals = {tests:n,suites:0,pass,fail:n-pass,cancelled:0,skipped:0,todo:0};
  for (const [key, value] of Object.entries(totals)) {
    demand(lines[state.i++] === '# '+key+' '+value, 'TAP_TOTALS_INVALID');
  }
  const duration = /^# duration_ms (\S+)$/.exec(lines[state.i++]);
  demand(duration && numeric.test(duration[1]) && state.i === lines.length, 'TAP_TRAILER_INVALID');
  return {plan:n,...totals};
}
const boundaryCounts = (item,n) => Object.values(item.counters).every(v => v === n);
function checkCounters(mode, cases) {
  if (mode === 'baseline-red') {
    demand(cases.every(item => boundaryCounts(item,1)), 'COUNTERS_INVALID');
    return;
  }
  for (let i=1; i<17; i++) {
    demand(Object.keys(cases[i].counters).every(k => cases[i].counters[k] >= cases[i-1].counters[k]), 'COUNTERS_INVALID');
  }
  if (mode === 'proposal-green') {
    for (const [id,n] of [['C2T1_CONNECTION',1],['C2T1_OAUTH',1],['C2T1_NOTICES',2],['C2T1_FINITE',3],['C2T1_SELECTION',3]]) {
      demand(boundaryCounts(cases.find(c => c.id === id),n), 'COUNTERS_INVALID');
    }
  }
}

// The caller binds immutable selection/hash/context and emits only this finite result.
// Cases and TAP totals are retained after their respective complete checks. On failure a
// null field means there was no validated observation at that stage; it never counts as zero.
export function observe(result,target,selection,selectionHash,green) {
  const mode = selection.mode;
  const record = {mode,selectionHash,verdict:'unqualified',code:'CAPTURE_INVALID',
    exitCode:null,totals:null,cases:[],witness:null};
  try {
    demand(!result.error && result.signal === null && [0,1].includes(result.status) &&
      Buffer.isBuffer(result.stdout) && Buffer.isBuffer(result.stderr) &&
      result.stdout.length <= LIMIT && result.stderr.length <= 65536, 'CAPTURE_INVALID');
    record.exitCode = result.status;
    let data;
    try { data = decoder.decode(result.stdout); } catch { throw new ProtocolFailure('TAP_ENCODING_INVALID'); }
    demand(data.endsWith('\n') && !data.includes('\r'), 'TAP_TRAILER_INVALID');
    const lines = data.slice(0,-1).split('\n'), state = {i:0};
    const {results,cases} = parseRecords(lines,selection.selected,mode === 'regressions',state);
    record.cases = cases;
    record.totals = readTotals(lines,state,cases);
    demand(result.status === (record.totals.fail ? 1 : 0), 'EXIT_MISMATCH');
    if (mode !== 'regressions') checkCounters(mode,cases);
    if (mode === 'baseline-red') {
      demand(same(cases.map(c=>c.status),['pass','pass','fail']), 'BASE_OUTCOMES_INVALID');
      record.witness = noticesWitness(results[2].details,target,selection);
    } else if (mode === 'mutant-prefix') {
      const id = 'C2T1_EXTRA_KEY';
      demand(result.status === 1 && cases.find(c=>c.id===id)?.status === 'fail' &&
        green?.mode === 'proposal-green' && green.verdict === 'qualified' &&
        green.cases.find(c=>c.id===id)?.status === 'pass', 'MUTANT_CONTROL_INVALID');
    } else {
      demand(['proposal-green','regressions'].includes(mode) && result.status === 0 &&
        cases.every(c=>c.status==='pass'), 'GREEN_OUTCOMES_INVALID');
    }
    record.verdict = 'qualified';
    record.code = 'OK';
  } catch (error) {
    record.code = error instanceof ProtocolFailure ? error.code : 'PARSER_INTERNAL';
  }
  return record;
}
