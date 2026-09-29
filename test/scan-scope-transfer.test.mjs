import test from 'node:test';
import assert from 'node:assert/strict';
import {exportScanScope, previewScanScope, MAX_SCOPE_BYTES} from '../lib/scan-scope-transfer.mjs';

const scan = {target:'https://restaurant.example/menu?private=value#part', checkedAt:'2026-09-20T12:00:00.000Z', evidence:{robots:true,sitemap:false,llms:false}, limits:['Untrusted free text']};
const options = {selected:['documents'],reviewed:true,control:'provider'};
const exported = () => exportScanScope(scan, options, 'es');

test('round trips selected scope in three languages as an untrusted local reference', () => {
  for (const locale of ['es','en','pt']) {
    const preview = previewScanScope(exportScanScope(scan,options,locale), 'https://restaurant.example/other');
    assert.equal(preview.websiteMatches,true);
    assert.equal(preview.provenance,'unverified_import');
    assert.equal(preview.requiresFreshReview,true);
    assert.equal(preview.brief.locale,locale);
    assert.deepEqual(preview.brief.actions.map(a=>a.id),['documents']);
    assert.equal(preview.brief.actions[0].signals[1].state,'unverified');
    assert.equal(preview.brief.capsulePreparation.publicationAuthorized,false);
    assert.equal(preview.persistence,'none');
  }
});

test('exports no query, arbitrary text, credentials, owner facts or permissions', () => {
  const text = exported();
  for (const excluded of ['private','value','part','Untrusted','authorizedResources','ownerRef']) assert.equal(text.includes(excluded),false);
  assert.throws(()=>exportScanScope(scan,{...options,reviewed:false}));
  assert.throws(()=>exportScanScope(scan,{...options,selected:['payments']}));
});

test('rejects unknown versions, permission fields, malformed evidence and duplicate selections', () => {
  const original = JSON.parse(exported());
  const mutations = [
    {version:2}, {publicationAuthorized:true}, {authorizedResources:['llms']},
    {evidence:{llms:'false'}}, {evidence:{llms:false,password:'secret'}},
    {selected:['documents','documents']}, {selected:['payments']}, {selected:[]},
    {locale:'xx'}, {control:'owner'}, {checkedAt:'yesterday'},
    {checkedAt:'2026-02-30T12:00:00.000Z'}, {observedUrl:'https://restaurant.example/?token=secret'},
    {observedUrl:'javascript:alert(1)'}, {observedUrl:'https://other.example/#fragment'},
  ];
  for (const mutation of mutations) assert.throws(()=>previewScanScope(JSON.stringify({...original,...mutation})),JSON.stringify(mutation));
});

test('rejects malformed, oversized and non-object inputs before preview', () => {
  for (const value of ['', 'null', '[]', '{', ' '.repeat(MAX_SCOPE_BYTES+1), JSON.stringify({text:'é'.repeat(MAX_SCOPE_BYTES/2)})]) assert.throws(()=>previewScanScope(value));
  assert.throws(()=>previewScanScope({}));
});

test('compares complete origins and never rewrites an existing dossier', () => {
  const text = exported();
  assert.equal(previewScanScope(text).websiteMatches,null);
  for(const website of ['https://other.example','http://restaurant.example']) assert.equal(previewScanScope(text,website).websiteMatches,false);
  assert.throws(()=>previewScanScope(text,'https://restaurant.example:8443'));
  assert.throws(()=>previewScanScope(text,'not a website'));
});

test('rejects imported selections whose signals are all detected', () => {
  const value = JSON.parse(exported());
  value.evidence = {llms:true,markdown:true};
  assert.throws(()=>previewScanScope(JSON.stringify(value)));
});
