import test from 'node:test';
import assert from 'node:assert/strict';
const ui=await import('../lib/delegated-preparation-consent-view.mjs').catch(()=>null);
const READ='afw:project:read',PREPARE='afw:capsule:prepare';
const T=Date.UTC(2026,9,20,0,0,0);
function input(overrides={}){
 return {locale:'es',projectName:'Expediente de ensayo',clientName:'Asistente de ensayo',siteHost:'example.invalid',
  handle:'synthetic_ci_handle_0123456789',styleNonce:'synthetic_style_nonce_0123456789',
  policy:{enabled:true,requestedScopes:[READ,PREPARE],transactionStartedAt:T,transactionExpiresAt:T+300000,trialStartedAt:T,trialExpiresAt:T+600000},
  clock:{now:T+1000},...overrides};
}
function render(value=input()){
 assert.equal(typeof ui?.renderPreparationConsentView,'function','consent renderer is available');
 return ui.renderPreparationConsentView(value);
}
function summary(overrides={}){
 assert.equal(typeof ui?.renderPreparationConnectionSummary,'function','connection summary is available');
 return ui.renderPreparationConnectionSummary({locale:'es',projectName:'Expediente de ensayo',clientName:'Asistente de ensayo',
  scopes:[READ,PREPARE],status:'active',expiresAt:T+300000,...overrides});
}
test('explicit read/drafts/cancel controls share one handle and never preselect or submit a scope',()=>{
 const view=render();
 assert.equal(view.code,'view_ready');assert.equal(view.status,200);
 assert.match(view.html,/<html lang="es">/);assert.match(view.html,/<form method="post" action="\/authorize">/);
 assert.deepEqual([...view.html.matchAll(/<button[^>]*name="decision" value="([^"]+)"/g)].map(x=>x[1]),['read','drafts','cancel']);
 assert.equal((view.html.match(/name="handle"/g)??[]).length,1);
 assert.doesNotMatch(view.html,/checked|selected|autofocus|name="scope"|evidence:read/);
 assert.match(view.html,/guardar/);assert.match(view.html,/no permite aprobar, instalar ni publicar/);
 assert.equal(view.consentRecorded,false);assert.equal(view.grantIssued,false);
});
test('read-only original request never offers drafts',()=>{
 const v=input();v.policy.requestedScopes=[READ];const view=render(v);
 assert.equal(view.code,'view_ready');assert.doesNotMatch(view.html,/value="drafts"/);
 assert.match(view.html,/value="read"/);assert.match(view.html,/value="cancel"/);
});
test('original absolute end is exclusive and expired view retains no private context or form',()=>{
 const v=input();v.clock.now=T+300000;const view=render(v);
 assert.equal(view.code,'expired');assert.doesNotMatch(view.html,/<form|<input|<button|Expediente de ensayo|Asistente de ensayo|synthetic_ci_handle/);
 assert.match(view.html,/no renueva|no se renueva/);
});
test('closed or invalid profile has no preparation offer, hidden handle or renewal action',()=>{
 for(const change of [{enabled:false},{requestedScopes:[READ,'afw:evidence:read']},{requestedScopes:[READ,PREPARE,PREPARE]},{transactionStartedAt:T+2000}]){
  const v=input();Object.assign(v.policy,change);const view=render(v);
  assert.equal(view.code,'unavailable');assert.doesNotMatch(view.html,/<form|<input|<button|Reconectar|synthetic_ci_handle/);
 }
});
test('private labels remain verbatim text and cannot inject HTML, attributes or script',()=>{
 const view=render(input({projectName:'<img src=x onerror="alert(1)">',clientName:'<script>alert(2)</script>'}));
 assert.equal(view.code,'view_ready');assert.match(view.html,/&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
 assert.match(view.html,/&lt;script&gt;alert\(2\)&lt;\/script&gt;/);
 assert.doesNotMatch(view.html,/<img|<script|<iframe|javascript:/);
});
test('expiry is original minimum, readable and explicitly UTC in every active language',()=>{
 const titles={es:'Conectar tu asistente',en:'Connect your assistant',pt:'Conectar seu assistente'};
 for(const locale of ['es','en','pt']){
  const v=input({locale});v.policy.trialExpiresAt=T+120000;const view=render(v);
  assert.equal(view.locale,locale);assert.match(view.html,new RegExp(titles[locale]));
  assert.ok(view.html.includes('<time datetime="'+new Date(T+120000).toISOString()+'">'));
  assert.match(view.html,/UTC/);assert.match(view.html,/Expediente de ensayo/);
 }
 assert.equal(render(input({locale:'de'})).locale,'es');
});
test('nonce and security envelope forbid scripts, external assets, framing and form redirects',()=>{
 const view=render();
 assert.equal(view.headers['Cache-Control'],'no-store');
 assert.equal(view.headers['Referrer-Policy'],'no-referrer');
 assert.equal(view.headers['X-Content-Type-Options'],'nosniff');
 assert.match(view.headers['Content-Security-Policy'],/default-src 'none'; style-src 'nonce-synthetic_style_nonce_0123456789'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'/);
 assert.match(view.html,/<style nonce="synthetic_style_nonce_0123456789">/);
 assert.doesNotMatch(view.html,/<script|<img|<link|@import|url\(/);
 assert.match(view.html,/href="#consent-main"/);assert.match(view.html,/<main id="consent-main"/);
});
test('invalid fields, bounds, origin-like host, nonce and unexpected authority fields fail closed',()=>{
 for(const changes of [{handle:'x'},{handle:'x'.repeat(257)},{styleNonce:'bad"nonce'},{siteHost:'https://example.invalid/path'},
 {siteHost:'evil.invalid:443'},{siteHost:'user@evil.invalid'},{projectName:'x'.repeat(201)},{clientName:'x'.repeat(201)},
 {projectName:'bad\nname'},{token:'never-render-this'},{subject:'never-render-this'}]){
  const view=render(input(changes));assert.equal(view.code,'unavailable');
  assert.doesNotMatch(view.html,/<form|<input|<button|never-render-this/);
 }
});
test('accessors are never evaluated and malformed clock/policy do not imply consent',()=>{
 let reads=0;const v=input();Object.defineProperty(v,'clientName',{get(){reads++;throw Error('private');},enumerable:true});
 assert.equal(render(v).code,'unavailable');assert.equal(reads,0);
 const p=input();Object.defineProperty(p.clock,'now',{get(){reads++;return T;},enumerable:true});
 assert.equal(render(p).code,'unavailable');assert.equal(reads,0);
 assert.equal(render(input({policy:null})).code,'unavailable');
});
test('rendering is immutable and confers no grant or persisted decision',()=>{
 const v=input();Object.freeze(v.policy.requestedScopes);Object.freeze(v.policy);Object.freeze(v.clock);Object.freeze(v);
 const before=JSON.stringify(v);const view=render(v);assert.equal(JSON.stringify(v),before);
 assert.ok(Object.isFrozen(view));assert.ok(Object.isFrozen(view.headers));
 assert.equal(view.consentRecorded,false);assert.equal(view.grantIssued,false);
});
test('connection summary follows exact actual scopes and states, never a generic read-only label',()=>{
 const draft=summary(),read=summary({scopes:[READ]});
 assert.match(draft.html,/Resumen y preparación de borradores/);assert.match(read.html,/>Resumen</);
 assert.doesNotMatch(read.html,/Resumen y preparación/);assert.match(draft.html,/próxima operación/);
 assert.match(draft.html,/borradores y su historial/);assert.doesNotMatch(draft.html,/<form|<input|<button/);
 assert.match(summary({status:'revoked'}).html,/Retirado/);assert.match(summary({status:'expired'}).html,/Vencido/);
 for(const locale of ['en','pt'])assert.ok(summary({locale}).html.length>100);
});
test('unknown connection scope/state or extra identity does not get mislabeled',()=>{
 for(const overrides of [{scopes:[PREPARE]},{scopes:[READ,READ]},{scopes:[READ,'afw:evidence:read']},{status:'pending'},{expiresAt:NaN},{subject:'other'}])
  assert.equal(summary(overrides),null);
});
