import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {observationScoreLabel} from '../lib/observation-score-copy.mjs';

test('zero is an observed score; missing or invalid values remain unknown',()=>{
 assert.equal(observationScoreLabel({score:0},'es'),'0/100');
 assert.equal(observationScoreLabel({score:72},'en'),'72/100');
 for(const score of [undefined,null,-1,101,42.5,'0',NaN])
  assert.equal(observationScoreLabel({score},'es'),'Sin puntaje');
 assert.equal(observationScoreLabel({},'en'),'No score');
 assert.equal(observationScoreLabel({},'pt'),'Sem pontuação');
});

test('the private observation history uses the same score label as its summary',async()=>{
 const source=await readFile('app/components/intake-workspace.tsx','utf8');
 assert.match(source,/currentObservations\.history\.map\(item=>.*observationScoreLabel\(\{score:item\.score\},locale\)/);
 assert.doesNotMatch(source,/item\.score===null\?'—':`\$\{item\.score\}\/100`/);
});
