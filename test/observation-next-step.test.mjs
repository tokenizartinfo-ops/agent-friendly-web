import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {observationNextStep} from '../lib/observation-next-step.mjs';

const actions=[{id:'crawl',state:'not_detected'},{id:'answers',state:'not_detected'},{id:'documents',state:'not_detected'}];

test('saved draft and unknown control take priority over implementation suggestions',()=>{
 assert.deepEqual(observationNextStep({actions,control:'origin',unsaved:true}),{kind:'save_draft',target:'dossier-save'});
 assert.deepEqual(observationNextStep({actions,control:'unknown'}),{kind:'clarify_control',target:'dossier-control'});
});

test('limited control guides coordination before proposing files or technical changes',()=>{
 assert.equal(observationNextStep({actions,control:'provider'}).kind,'coordinate_provider');
 assert.equal(observationNextStep({actions,control:'none'}).kind,'request_access');
 assert.equal(observationNextStep({actions,control:'dns'}).kind,'review_action');
});

test('known control picks a foundation and never forces advanced capabilities',()=>{
 assert.deepEqual(observationNextStep({actions,control:'origin'}),{kind:'review_action',target:'dossier-capsule',actionId:'crawl'});
 assert.deepEqual(observationNextStep({actions:actions.map(action=>({...action,state:'detected'})),control:'origin'}),{kind:'choose_goal',target:'dossier-goals'});
});

test('the private guide receives current control and unsaved-draft state',async()=>{
 const workspace=await readFile('app/components/intake-workspace.tsx','utf8');
 const guide=await readFile('app/components/saved-observation-evidence.tsx','utf8');
 assert.match(workspace,/control=\{data\.control\} unsaved=\{unconfirmedChanges\}/);
 assert.match(guide,/observationNextStep\(\{actions:plan\.actions,control,unsaved\}\)/);
});
