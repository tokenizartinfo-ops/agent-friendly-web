import test from 'node:test';
import assert from 'node:assert/strict';
import {dossierGuideStep,DOSSIER_GUIDE_COPY} from '../lib/dossier-guide.mjs';
test('guides missing context without inventing facts or treating it as permission',()=>{
  const draft={};
  for(const [field,value] of Object.entries({website:'https://example.org',organization:'Example',audience:'Visitors',languages:['en'],contentSources:['website'],control:'self'})) {
    assert.equal(dossierGuideStep(draft),field);
    draft[field]=value;
  }
  assert.equal(dossierGuideStep(draft),'review');
  draft.control='unknown';
  assert.equal(dossierGuideStep(draft),'control');
  for(const copy of Object.values(DOSSIER_GUIDE_COPY)) assert.ok(Object.values(copy.steps).every(([question,why])=>question && why));
});
