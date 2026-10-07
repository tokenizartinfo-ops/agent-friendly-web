import test from 'node:test';
import assert from 'node:assert/strict';
import {missingIntakeQuestions,previewIntakeAnswer} from '../lib/intake-question-coach.mjs';
import {applyIntakeDraft} from '../lib/intake-draft-review.mjs';
import {normalizeIntake} from '../lib/intake.mjs';
test('asks only missing descriptive fields and leaves deferred facts untouched',()=>{
 const draft={organization:'Example',languages:['en'],authorizedResources:[]};
 assert.deepEqual(missingIntakeQuestions(draft,['hosting']),['website','siteType','goals','audience','cms']);
 assert.deepEqual(draft,{organization:'Example',languages:['en'],authorizedResources:[]});
});

test('guides explicit site type and goals without inferring capability or permission',()=>{
 const draft={siteType:'',goals:[],authorizedResources:[],control:'unknown'};
 const type=previewIntakeAnswer(draft,'siteType','commerce');
 const next=applyIntakeDraft(draft,type);
 const goals=previewIntakeAnswer(next,'goals',['content','discovery','content']);
 assert.deepEqual(applyIntakeDraft(next,goals),{...draft,siteType:'commerce',goals:['content','discovery']});
 assert.deepEqual(draft.goals,[]);
 for(const answer of ['AF5','',[],['commerce']])assert.throws(()=>previewIntakeAnswer(draft,'siteType',answer));
 for(const answer of ['improve everything',[],['AF5'],['content',2]])assert.throws(()=>previewIntakeAnswer(draft,'goals',answer));
 assert.throws(()=>previewIntakeAnswer({...draft,goals:['content']},'goals',['discovery']),/stale/);
});
test('previews one declared answer without saving or expanding permissions',()=>{
 const draft={organization:'',authorizedResources:['llms'],control:'unknown'};
 const changes=previewIntakeAnswer(draft,'organization','  Cooperativa Ejemplo  ');
 assert.equal(draft.organization,'');assert.deepEqual(changes,[{field:'organization',before:'',after:'Cooperativa Ejemplo'}]);
 assert.deepEqual(applyIntakeDraft(draft,changes),{...draft,organization:'Cooperativa Ejemplo'});
 for(const field of ['authorizedResources','control','approverEmail','notes'])assert.throws(()=>previewIntakeAnswer(draft,field,'yes'));
});
test('rejects secrets, empty or unknown answers and never silently truncates',()=>{
 for(const value of ['', '   ', 'No sé', 'I do not know', 'Não sei', 'password: example', 'x'.repeat(1201)])assert.throws(()=>previewIntakeAnswer({},'organization',value));
});
test('accepts explicit language choices, never guesses a language from prose',()=>{
 assert.deepEqual(previewIntakeAnswer({languages:[]},'languages',['es','en','es'])[0].after,['es','en']);
 for(const answer of ['English',['xx'],[],['en',2]])assert.throws(()=>previewIntakeAnswer({},'languages',answer));
});
test('normalizes a public website and rejects credentials and private parameters',()=>{
 assert.equal(previewIntakeAnswer({},'website','example.org')[0].after,'https://example.org/');
 for(const url of ['https://user:pass@example.org','http://localhost','https://example.org/?token=test','https://example.org/#private','javascript:alert(1)'])assert.throws(()=>previewIntakeAnswer({},'website',url));
});
test('does not overwrite an existing value and rejects a stale preview',()=>{
 assert.throws(()=>previewIntakeAnswer({organization:'Existing'},'organization','New'));
 const changes=previewIntakeAnswer({organization:''},'organization','New');
 assert.throws(()=>applyIntakeDraft({organization:'Changed elsewhere'},changes));
});
test('website preview survives save normalization without truncation, including encoded paths',()=>{
 for(const url of ['https://example.org/'+'a'.repeat(490),'https://example.org/'+'漢'.repeat(60)])assert.throws(()=>previewIntakeAnswer({},'website',url),/websiteLength/);
 const changes=previewIntakeAnswer({},'website','https://example.org/café/');
 assert.equal(normalizeIntake(applyIntakeDraft({},changes)).website,changes[0].after);
});
