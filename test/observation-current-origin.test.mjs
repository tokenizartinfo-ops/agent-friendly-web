import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {currentOriginObservations,observationOrigin} from '../lib/observation-current-origin.mjs';

test('a saved website change cannot display the prior site score or history',()=>{
 const old={id:'old',target:'https://old.example',checkedAt:'2026-09-29',readiness:{score:80}};
 const recent={id:'new',target:'https://new.example',checkedAt:'2026-09-29',score:25};
 assert.deepEqual(currentOriginObservations(old,[old,recent],'https://new.example/about'),{observation:null,history:[recent]});
 assert.deepEqual(currentOriginObservations(old,[old],'https://old.example/page'),{observation:old,history:[old]});
 assert.deepEqual(currentOriginObservations(old,[old],'not a site'),{observation:null,history:[]});
 assert.equal(observationOrigin('https://example.com:8443/a'),'https://example.com:8443');
 assert.notEqual(observationOrigin('http://example.com/'),observationOrigin('https://example.com/'));
});

test('an unsaved origin cannot start an observation and saved-origin changes trigger a refresh',async()=>{
 const source=await readFile('app/components/intake-workspace.tsx','utf8');
 assert.match(source,/observationOrigin\(data\.website\)===observationOrigin\(savedWebsite\)/);
 assert.match(source,/if \(!projectId \|\| !observationWebsiteIsSaved\)/);
 assert.match(source,/disabled=\{observationBusy \|\| !observationWebsiteIsSaved\}/);
 assert.match(source,/\[locale, projectId, request, savedWebsite\]/);
 assert.match(source,/currentOriginObservations\(observation,observationHistory,savedWebsite\)/);
});
