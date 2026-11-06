# AFW Task1 — complete review package

PROJECT AFW. Repository tokenizartinfo-ops/agent-friendly-web (public1347578006).
Task scope: SDK correlation and durable Reference before redirect; not the later cleanup/alarm consumer.
BASE 7aab233741b09f8873bf04831ca2fa9a9c2b1c4d / tree6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3.
STOPPED HEAD 2c6b5a0eb503b8d877158f85832c510b9a45f7ca / tree57ac1355a85560dee14b2f933b4b68f877911ae2.
Source branch feat/finite-native-cleanup-20261101. Root docs branch docs/finite-pcoff-continuation-20261103.
Binding brief docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task1.md at c1f69a88a055dd24430b51d0362e50736f17797e/blob40132fe17ea56ecef675324a5edd3f8de2c73892.
Implementer report docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md at HEAD/blobc74ba546c36f9ce7c922b032071cecf2d0bc4a9c.
The report is a claim to review, not the verdict.

## Root verification and boundaries

Root independently checked untruncated complete trees: 3168 BASE leaf entries ->3173 final; four modified existing JS, four new JS and one new report;3164 protected BASE entries identical by mode/type/blob. No unexpected path. All eight final JS blobs match the exact final GREEN checkout f2137bb10c599b12cef2952dd5c8efdaf301e259. Only the temporary qualifier removal and report addition followed that checkout. Main remains0c9c475b3ebaa970fc11d628b40e50a90cceb727, read independently after handoff.

All25 commits were read independently. Each has exactly its prior HEAD as sole parent and exactly one authorized own path. The manifest below includes temporary qualifier creation/modification/removal, even though it has no net diff. Full net U10 diffs follow for the entire BASE..HEAD range; this is not HEAD~1.

Root read primary Actions logs and parsed complete native marker JSON for each relevant run:
- RED42275435649/job128090446140:1FAIL after actual SDK complete and durable observation, Reference absent/302. Artifact omission preserved: scripts/metafiles generated but not archived in RED; red.tap+marker only.
- Intermediate42276424099/job128093801109:15PASS/1FAIL; principal child5065ms exceeded original5s before SDK complete. Exact operation not identified by that run. No retrospective cause invented.
- Intermediate42278023548/job128099352683:14PASS/2FAIL; principal and downstream passed, both hold tests failed BEFORE intended hold. Not counted as retention passes.
- Diagnostic42279840913/job128105646728:exactly2FAIL; evidence located consume+grant child5060/5039ms with full20ms metric/storage polling, before SDK complete. Product unchanged. Root ruled only a fixed lightweight two-signal wait projection and passive actual302 marker; full observations remain for assertions/evidence.
- FINAL42280666925/job128108468790/attempt1:16PASS/0FAIL/0cancel/0skip/0todo; changed-filelint8 PASS; actual artifact upload/download/readback32 files plus manifest/six native build graphs PASS. Final artifact13535307870 digest89e96c77772c13d93ec7b16cf167409d403ec7e9b32166e0f19cd7796906c0ac, expires2026-11-13T19:38:48Z. Qualifier snapshots below make this check inspectable.

Final principal: actual complete1, Reference1, native transaction->sync->direct get readback before actual QA302, then M token/MCP/NoticeLink. GET9254ms/POST12026ms; lookup714ms; consume+grant3612ms. Hold cases reached intended postnative outward ACK hold and consumed2970/3000ms in the preceding consume+grant child with lightweight polling. Guards/clocks were not widened. Native KV/storage I/O had already settled when the outward ACK was held; no physical pending/drain claim follows.
Final M measured c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B; principal QAffe028f7d5cc2db083507b0ea456032af33ee9325f4864da75877448820cf960/2392030B. QA varies with SYN anchors. Fixed cases reach one list/up to two gets, not all boundary sizes.
Final aggregate854 HTTP fixture responses/1037304146 bytes; SYN, not actual Cloudflare traffic/quota/cost. G1 cause, volume and real-provider feasibility remain concerns. Preserved warnings include SDK CIMD, RPC-stub disposal and dependency/actions deprecations; review their actual incidence.

Handling DONE_WITH_CONCERNS: Root read the complete report; concerns are preserved evidence/coverage/latency observations rather than a claim to have qualified operation. This permits task review, not acceptance. Reviewer judges correctness and quality independently. No Task2 requirement or operational proof is silently satisfied by Task1.
Only SOURCE/SYN/GitHub/Actions. No deployment, current credential/source renewal, OAuth/OTP/permission, real provider API, subscriptions, cron, Containers, main change, Max, mail or PC-off. operationalReadiness=false;completePackage=false;PCoff=false.

## Full commit/path manifest

| Commit | Sole parent | Path/status | Result blob | Message |
| --- | --- | --- | --- | --- |
| a8d4cff18ad68a4afb74aece0d74a124d9aa9675 | 7aab233741b09f8873bf04831ca2fa9a9c2b1c4d | test/fixtures/finite-owner-cleanup.mjs (added) | d70decbe813dce8948125ff177471dd458f36e8d | test(afw): prepare native owner reference causal fixture |
| 819a2ba68bc1f9f99a33cc0c997940c9544fdb04 | a8d4cff18ad68a4afb74aece0d74a124d9aa9675 | test/fixtures/finite-initial-entry-world.mjs (modified) | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 | test(afw): add opt-in owner reference native observation seam |
| 5131830c09c3395b4d82243ef4734061ae564ed4 | 819a2ba68bc1f9f99a33cc0c997940c9544fdb04 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs (added) | 39eeeb58a9a8260a94bbdf8a86dea51d28a9a341 | test(afw): require durable SDK reference after actual complete before redirect |
| 74086e7b0a9df597274ec0a11386f58daab1c904 | 5131830c09c3395b4d82243ef4734061ae564ed4 | .github/workflows/afw-owner-restoration-qualification.yml (added) | d357bfcb3ff14bcdb6f705f98aea577758724cd2 | ci(afw): run one causal SDK reference RED on pinned Source |
| b8ac637bae90505d9bf9d77fb9c65c93bf795db0 | 74086e7b0a9df597274ec0a11386f58daab1c904 | test/mcp-qa-finite-owner-sdk-reference.test.mjs (added) | c574034470a6e402efb10bfe3f736a2677e31c68 | test(afw): define ten strict SDK reference contracts |
| 6db444ad00043caf0124c097bfe393841a583904 | b8ac637bae90505d9bf9d77fb9c65c93bf795db0 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs (modified) | 2ed8a7f7fb116df44c61f704585f8fd25a25b496 | test(afw): cover five SDK reference native denial boundaries |
| bea0090dd9247c6772c1d203e86cb1bfe8ad904e | 6db444ad00043caf0124c097bfe393841a583904 | test/mcp-qa-finite-owner-sdk-reference.test.mjs (modified) | 554110b4b6b408d7b337560ce3ec34c9817b0524 | test(afw): pass exact correlation component inputs |
| 0d53eb3a3e8c6f58148a4e1a50927e8642f5f662 | bea0090dd9247c6772c1d203e86cb1bfe8ad904e | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs (modified) | f31ce20788633244078bd17082682f7869c95f68 | feat(afw): encode factual SDK reference and strict correlation |
| 4b6df952b5c0054a7dc9a02fdb5244cfd2649b6f | 0d53eb3a3e8c6f58148a4e1a50927e8642f5f662 | lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs (modified) | 2fad787bd05736a17cf013f41aa143264298afd2 | feat(afw): append SDK reference with transaction sync and exact readback |
| 2df03fef501974147dff11a5e8b76addfe87934f | 4b6df952b5c0054a7dc9a02fdb5244cfd2649b6f | lib/mcp-qa-finite-owner-cleanup.mjs (added) | 79b50e1a1202d5cb92c40283bb3cece3cb0b012a | feat(afw): read SDK correlation through private bounded readonly native facet |
| 8f7d6185305e56a719d52ffb593186502227912d | 2df03fef501974147dff11a5e8b76addfe87934f | lib/mcp-qa-finite-owner-phase-context.mjs (modified) | 7eb8f28760de60f143e487eeb6988705059a0a44 | feat(afw): persist actual SDK reference before finite owner redirect |
| f7f7431ee6810b40b5b24824755e19acaa882c6d | 8f7d6185305e56a719d52ffb593186502227912d | .github/workflows/afw-owner-restoration-qualification.yml (modified) | 5f33bc3eb793af6a1b9fca55aaac4d51149bf979 | ci(afw): qualify sixteen owner reference cases and preserve actual graphs |
| 201fa4a7dd8e4ab378ee3ff7b90a50494b5f6ddf | f7f7431ee6810b40b5b24824755e19acaa882c6d | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs (modified) | ee0b6c1c3730855a4be975789d990517dffa81aa | fix(afw): reject coerced SDK reference timestamp types |
| d60eaff1cd52e9d5451877eba3eba908b87e4de5 | 201fa4a7dd8e4ab378ee3ff7b90a50494b5f6ddf | lib/mcp-qa-finite-owner-cleanup.mjs (modified) | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 | fix(afw): pin original namespace get and alarm holders during SDK read |
| 6b039d5f2cf841818905bf62fffd1e17c68cb4bb | d60eaff1cd52e9d5451877eba3eba908b87e4de5 | test/mcp-qa-finite-owner-sdk-reference.test.mjs (modified) | 941ef8abc355a5df971cf10738507ba76aac830c | test(afw): reject string and boolean reference timestamps |
| e3b8324a9aaea958268f26ee7a4e3773f751d593 | 6b039d5f2cf841818905bf62fffd1e17c68cb4bb | test/fixtures/finite-owner-cleanup.mjs (modified) | db2c43b93a2694a751385ca57b3037647d02a08a | test(afw): measure native reference durability and original child spans |
| ceeffc419f8cef152474ca1692719959fc7c934c | e3b8324a9aaea958268f26ee7a4e3773f751d593 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs (modified) | 095d78940d2157790698fa05ec25793fa85910b5 | test(afw): require actual reference commit sync and readback before redirect |
| 4ff7163c582258920548a04a55706c371c34b6d3 | ceeffc419f8cef152474ca1692719959fc7c934c | .github/workflows/afw-owner-restoration-qualification.yml (modified) | 99c48aed1442bfe92ae3f88482da5d7372f84563 | ci(afw): qualify hardened checkout and verify uploaded native evidence |
| 21b6bc8b719128239101fb04c89619649cb1acb3 | 4ff7163c582258920548a04a55706c371c34b6d3 | test/fixtures/finite-owner-cleanup.mjs (modified) | 529e9116da131056fdd07ea40e0e75b8d3141142 | test(afw): preserve last sanitized state when native hold marker times out |
| 864b583913b0f5844a06ce580cf05acb8418dd3f | 21b6bc8b719128239101fb04c89619649cb1acb3 | .github/workflows/afw-owner-restoration-qualification.yml (modified) | e801670b0d643dc75824d9d3c57e68f5a6a0b5e8 | ci(afw): diagnose two native hold markers with exact artifact readback |
| b7870f6b7e396bc17f968a87fac276a0413ac836 | 864b583913b0f5844a06ce580cf05acb8418dd3f | test/fixtures/finite-owner-cleanup.mjs (modified) | 391747fb10cfecf568c921428a40424e763c66b1 | test(afw): poll fixed native hold signals without storage or metric serialization |
| 48e4ca767b23732f259aece16854610e23545f98 | b7870f6b7e396bc17f968a87fac276a0413ac836 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs (modified) | 077c8ceedf6b9689d2ddf840ad60325fc34250eb | test(afw): assert reference readback precedes actual native redirect response |
| f2137bb10c599b12cef2952dd5c8efdaf301e259 | 48e4ca767b23732f259aece16854610e23545f98 | .github/workflows/afw-owner-restoration-qualification.yml (modified) | 33b0fffb39d11791418c751393412406005493b8 | ci(afw): qualify exact sixteen-case candidate after passive observer correction |
| 28b85fa0e81a66c515a58a68342f2a612be3e3e1 | f2137bb10c599b12cef2952dd5c8efdaf301e259 | .github/workflows/afw-owner-restoration-qualification.yml (removed) | 33b0fffb39d11791418c751393412406005493b8 | ci(afw): retire terminal owner restoration qualifier after exact artifact readback |
| 2c6b5a0eb503b8d877158f85832c510b9a45f7ca | 28b85fa0e81a66c515a58a68342f2a612be3e3e1 | docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md (added) | c74ba546c36f9ce7c922b032071cecf2d0bc4a9c | docs(afw): preserve Task1 SDK reference evidence limitations and final qualification |

## Full net change inventory

| Path | BASE blob | Final blob | Lines before/after |
| --- | --- | --- | --- |
| lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs | 9231a1fbe60b6b2f3ebebc6bfa6b50f42ec916db | 2fad787bd05736a17cf013f41aa143264298afd2 | 72/79 |
| lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | b97d32e843a7829027121faec282370aab8ab589 | ee0b6c1c3730855a4be975789d990517dffa81aa | 40/50 |
| lib/mcp-qa-finite-owner-phase-context.mjs | e482ad1617adc001c3a32c94e71eeb41d27f3d1d | 7eb8f28760de60f143e487eeb6988705059a0a44 | 1084/1094 |
| test/fixtures/finite-initial-entry-world.mjs | 297b57846bbbe13bfc80ac52c5b033a382aef4b6 | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 | 323/325 |
| docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md | new | c74ba546c36f9ce7c922b032071cecf2d0bc4a9c | 0/192 |
| lib/mcp-qa-finite-owner-cleanup.mjs | new | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 | 0/99 |
| test/fixtures/finite-owner-cleanup.mjs | new | 391747fb10cfecf568c921428a40424e763c66b1 | 0/79 |
| test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | new | 077c8ceedf6b9689d2ddf840ad60325fc34250eb | 0/43 |
| test/mcp-qa-finite-owner-sdk-reference.test.mjs | new | 941ef8abc355a5df971cf10738507ba76aac830c | 0/29 |

## Full BASE..HEAD U10 diffs

### lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs

````diff
diff --git a/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs b/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs
--- a/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs
+++ b/lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs
@@ -1,57 +1,63 @@
-import {initialOwn as own,initialFields as fields,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+import {initialOwn as own,initialFields as fields,initialHex as hex,initialHash as hash} from './mcp-qa-finite-initial-material-records.mjs';
 import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
 import {FINITE_OWNER_ISSUER_PROVENANCE_PREFIX as P,FINITE_OWNER_SDK_OPERATIONS as OPS,encodeFiniteOwnerIssuerProvenanceRecord as encode,decodeFiniteOwnerIssuerProvenanceRecord as decode} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
 const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
 export function createFiniteOwnerIssuerProvenanceJournal(options){
  fields(options,['ctx','env']);const c=captureFinitePreparationIssuerContext(options);
  const prefix=id=>{if(!hex(id))fail();return P+id+':';};
  const record=(kind,value)=>decode(kind,encode(kind,value));
  async function inventory(id,guard,storage=c.storage){
   const list=storage.list;if(typeof list!=='function')fail();guard();
-  const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:9}]),guard);
-  if(!(rows instanceof Map)||rows.size>8)fail();
-  const out={root:null,grant:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}]))},entries=[];
+  const rows=await c.wait(Reflect.apply(list,storage,[{prefix:prefix(id),limit:10}]),guard);
+  if(!(rows instanceof Map)||rows.size>9)fail();
+  const out={root:null,grant:null,reference:null,operations:Object.fromEntries(OPS.map(op=>[op,{send:null,observed:null}]))},entries=[];
   for(const [key,raw]of rows){
    const suffix=key.slice(prefix(id).length);let kind,target,field;
-   if(suffix==='root'||suffix==='grant'){kind=suffix==='root'?'Root':'ExpectedGrant';target=out;field=suffix;}
+   if(['root','grant','reference'].includes(suffix)){kind=({root:'Root',grant:'ExpectedGrant',reference:'SdkGrantReference'})[suffix];target=out;field=suffix;}
    else{const parts=suffix.split(':');if(parts.length!==2||!OPS.includes(parts[0])||!['send','observed'].includes(parts[1]))fail();kind=parts[1]==='send'?'SdkSend':'SdkObserved';target=out.operations[parts[0]];field=parts[1];}
    target[field]=decode(kind,raw);entries.push(Object.freeze([key,raw]));
   }
   const root=out.root;
   if(!root){if(rows.size)fail();}
   else{
    if(root.preconnectionId!==id||root.actorId!==c.actorId||root.qaVersionId!==c.qa)fail();
    for(const op of OPS){
     const {send,observed}=out.operations[op];
     if(send&&(send.rootHash!==root.recordHash||send.operation!==op||send.issuedAt<root.createdAt||send.deadline>root.C0))fail();
     if(observed&&(!send||observed.sendHash!==send.recordHash||observed.observedAt<send.issuedAt||observed.observedAt>=send.deadline))fail();
    }
    const begin=out.operations.sdk_begin,approve=out.operations.sdk_approve,complete=out.operations.sdk_complete;
    if(approve.send&&!begin.observed||out.grant&&(!approve.observed||out.grant.rootHash!==root.recordHash||Date.parse(out.grant.createdAt)<approve.observed.observedAt||Date.parse(out.grant.expiresAt)>root.C0)||complete.send&&(!out.grant||complete.send.bindingHash!==out.grant.recordHash))fail();
   }
+  if(out.reference)qualifyReference(out.reference,out);
   for(const op of OPS)Object.freeze(out.operations[op]);Object.freeze(out.operations);
   return Object.freeze({...out,entries:Object.freeze(entries.sort(([a],[b])=>a.localeCompare(b)))});
  }
+ function qualifyReference(value,before){
+  const root=before.root,g=before.grant,complete=before.operations.sdk_complete,s=complete.send,o=complete.observed;
+  if(!root||!g||!s||!o||value.rootHash!==root.recordHash||value.expectedGrantHash!==g.recordHash||value.completeSendHash!==s.recordHash||value.completeObservedHash!==o.recordHash||value.correlationHash!==hash('afw.finite-sdk-cleanup-correlation.v1',{rootHash:root.recordHash,expectedGrantHash:g.recordHash,completeSendHash:s.recordHash,identityHash:g.identityHash})||value.createdAt<Math.floor(s.issuedAt/1000)||value.createdAt*1000>=s.deadline||value.observedAt<o.observedAt||value.observedAt>=Math.min(s.deadline,root.C0))fail();
+ }
  async function append(id,suffix,kind,input,lease){
   const value=record(kind,input),raw=encode(kind,value),guard=c.leaseGuard(lease);guard();
   try{
    const status=await c.wait(Reflect.apply(c.transaction,c.storage,[async tx=>{
     const get=tx.get,put=tx.put,list=tx.list;if([get,put,list].some(x=>typeof x!=='function'))fail();
     const check=()=>{guard();if(tx.get!==get||tx.put!==put||tx.list!==list)fail();};
     const before=await inventory(id,check,tx),root=before.root;
     const old=await c.wait(Reflect.apply(get,tx,[prefix(id)+suffix]),check);
     if(old!==undefined){if(old!==raw)fail();return 'existing';}
-    if(before.entries.length>=8)fail();
+    if(before.entries.length>=9)fail();
     if(kind==='Root'){if(root||value.preconnectionId!==id||value.actorId!==c.actorId||value.qaVersionId!==c.qa)fail();}
     else{
      if(!root)fail();
+     if(kind==='SdkGrantReference')qualifyReference(value,before);
      if(kind==='SdkSend'){
       if(value.rootHash!==root.recordHash||value.operation+':send'!==suffix||value.issuedAt<root.createdAt||value.deadline>root.C0)fail();
       if(value.operation==='sdk_approve'&&!before.operations.sdk_begin.observed||value.operation==='sdk_complete'&&(!before.grant||value.bindingHash!==before.grant.recordHash))fail();
      }
      if(kind==='SdkObserved'){
       const send=before.operations[suffix.split(':')[0]]?.send;
       if(!send||value.sendHash!==send.recordHash||value.observedAt<send.issuedAt||value.observedAt>=send.deadline)fail();
      }
      if(kind==='ExpectedGrant'&&(!before.operations.sdk_approve.observed||value.rootHash!==root.recordHash||Date.parse(value.createdAt)<before.operations.sdk_approve.observed.observedAt||Date.parse(value.expiresAt)>root.C0))fail();
     }
@@ -60,13 +66,14 @@
    await c.wait(Reflect.apply(c.sync,c.storage,[]),guard);
    if(await c.wait(Reflect.apply(c.get,c.storage,[prefix(id)+suffix]),guard)!==raw)fail();
    return Object.freeze({status,recordHash:value.recordHash});
   }catch{return Object.freeze({status:'uncertain',recordHash:value.recordHash});}
  }
  return Object.freeze({
   read(input,lease){const v=own(input);fields(v,['preconnectionId']);return inventory(v.preconnectionId,c.leaseGuard(lease));},
   appendRoot(input,lease){const r=record('Root',input);return append(r.preconnectionId,'root','Root',r,lease);},
   appendSend(input,lease){const v=own(input);fields(v,['preconnectionId','record']);const r=record('SdkSend',v.record);return append(v.preconnectionId,r.operation+':send','SdkSend',r,lease);},
   appendObserved(input,lease){const v=own(input);fields(v,['preconnectionId','operation','record']);if(!OPS.includes(v.operation))fail();return append(v.preconnectionId,v.operation+':observed','SdkObserved',v.record,lease);},
+  appendSdkReference(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'reference','SdkGrantReference',v.record,lease);},
   appendExpectedGrant(input,lease){const v=own(input);fields(v,['preconnectionId','record']);return append(v.preconnectionId,'grant','ExpectedGrant',v.record,lease);}
  });
 }

````

### lib/mcp-qa-finite-owner-issuer-provenance-records.mjs

````diff
diff --git a/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs b/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs
--- a/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs
+++ b/lib/mcp-qa-finite-owner-issuer-provenance-records.mjs
@@ -1,40 +1,50 @@
 import {initialOwn as own,initialFields as fields,initialCanonical as canonical,initialHash as hash,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
-import {issuerTime,issuerUuid,issuerScopes,issuerIso} from './mcp-qa-finite-preparation-issuer-records.mjs';
+import {issuerTime,issuerUuid,issuerScopes,issuerIso,validateFinitePreparationIssuerIdentity} from './mcp-qa-finite-preparation-issuer-records.mjs';
 // Canonical DATA commitments only. No record asserts caller identity or ownership.
 export const FINITE_OWNER_ISSUER_PROVENANCE_PREFIX='afw.finite-owner-issuer-provenance.v1:';
 export const FINITE_OWNER_SDK_OPERATIONS=Object.freeze(['sdk_begin','sdk_approve','sdk_complete']);
 const defs={
  Root:['preconnectionId','capsuleHash','enrollmentHash','sourceRevision','actorId','qaVersionId','mVersionId','originalConnectionReceiptHash','I0','C0','C1','createdAt'],
  SdkSend:['rootHash','operation','originalRequestId','originalRequestHash','issuedAt','deadline','bindingHash'],
  SdkObserved:['sendHash','resultHash','observedAt','outcome'],
+ SdkGrantReference:['rootHash','expectedGrantHash','completeSendHash','completeObservedHash','correlationHash','sdkGrantId','createdAt','expiresAt','observedAt'],
  ExpectedGrant:['rootHash','identityHash','reservationHash','authorizationHash','grantId','approvedRequestHash','scopes','createdAt','expiresAt']
 };
-const purposes={Root:'afw.finite-owner-issuer-root.v1',SdkSend:'afw.finite-owner-sdk-send.v1',SdkObserved:'afw.finite-owner-sdk-observed.v1',ExpectedGrant:'afw.finite-owner-expected-grant.v1'};
+const purposes={SdkGrantReference:'afw.finite-owner-sdk-reference.v1',Root:'afw.finite-owner-issuer-root.v1',SdkSend:'afw.finite-owner-sdk-send.v1',SdkObserved:'afw.finite-owner-sdk-observed.v1',ExpectedGrant:'afw.finite-owner-expected-grant.v1'};
 const fail=()=>{throw Error('Finite owner issuer provenance unavailable');};
 const check=v=>{if(!v)fail();};
 function validate(kind,input,sealing=false){
  check(Object.hasOwn(defs,kind));
  const v=own(input);fields(v,['purpose',...defs[kind],...(!sealing||Object.hasOwn(v,'recordHash')?['recordHash']:[])]);
  check(v.purpose===purposes[kind]&&Buffer.byteLength(canonical(v))<=16384);
  for(const [key,value]of Object.entries(v))if(key.endsWith('Hash'))check(hex(value));
  if(kind==='Root'){
   check(hex(v.preconnectionId)&&hex(v.actorId)&&hex(v.sourceRevision,40)&&issuerUuid(v.qaVersionId)&&issuerUuid(v.mVersionId));
   check(['I0','C0','C1','createdAt'].every(k=>issuerTime(v[k]))&&v.C0===v.I0+900000&&v.C1===v.C0+180000&&v.createdAt>=v.I0&&v.createdAt<v.C0);
  }
  if(kind==='SdkSend')check(FINITE_OWNER_SDK_OPERATIONS.includes(v.operation)&&issuerUuid(v.originalRequestId)&&issuerTime(v.issuedAt)&&issuerTime(v.deadline)&&v.issuedAt<v.deadline&&v.deadline-v.issuedAt<=30000);
  if(kind==='SdkObserved')check(v.outcome==='resolved'&&issuerTime(v.observedAt));
  if(kind==='ExpectedGrant')check(issuerUuid(v.grantId)&&issuerScopes(v.scopes)&&issuerIso(v.createdAt)&&issuerIso(v.expiresAt)&&Date.parse(v.createdAt)<Date.parse(v.expiresAt));
+ if(kind==='SdkGrantReference')check(typeof v.sdkGrantId==='string'&&/^[A-Za-z0-9_-]{16}$/.test(v.sdkGrantId)&&issuerTime(v.createdAt)&&issuerTime(v.createdAt*1000)&&issuerTime(v.observedAt)&&v.createdAt*1000<=v.observedAt&&(v.expiresAt===null||issuerTime(v.expiresAt)&&issuerTime(v.expiresAt*1000)&&v.expiresAt>v.createdAt));
  const body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
  if(!sealing)check(v.recordHash===hash(v.purpose,body));
  return v;
 }
 export function sealFiniteOwnerIssuerProvenanceRecord(kind,input){
  const v=validate(kind,input,true),body=Object.fromEntries(Object.entries(v).filter(([k])=>k!=='recordHash'));
  return validate(kind,{...body,recordHash:hash(v.purpose,body)});
 }
 export function encodeFiniteOwnerIssuerProvenanceRecord(kind,input){
  const raw=canonical(validate(kind,input));check(Buffer.byteLength(raw)<=16384);return raw;
 }
 export function decodeFiniteOwnerIssuerProvenanceRecord(kind,raw){
  check(typeof raw==='string'&&Buffer.byteLength(raw)<=16384);const v=validate(kind,JSON.parse(raw));check(canonical(v)===raw);return v;
+}
+
+/** Pure DATA correlation; validates provenance without admitting any effect. */
+export function finiteOwnerSdkCleanupCorrelation(input){
+ const v=own(input);fields(v,['root','expectedGrant','completeSend','identity']);
+ const root=validate('Root',v.root),g=validate('ExpectedGrant',v.expectedGrant),send=validate('SdkSend',v.completeSend),i=validateFinitePreparationIssuerIdentity(v.identity);
+ check(['preconnectionId','capsuleHash','enrollmentHash','sourceRevision','actorId','qaVersionId','I0','C0','C1'].every(k=>root[k]===i[k])&&g.rootHash===root.recordHash&&g.identityHash===i.identityHash&&g.authorizationHash===i.authorizationHash&&g.grantId===i.grantId&&g.scopes.every(s=>i.requestedScopes.includes(s))&&Date.parse(g.createdAt)>=i.reservedAt&&Date.parse(g.expiresAt)<=Math.min(i.C0,Date.parse(i.consentExpiresAt))&&send.operation==='sdk_complete'&&send.rootHash===root.recordHash&&send.bindingHash===g.recordHash&&send.originalRequestHash===g.approvedRequestHash&&send.issuedAt>=Date.parse(g.createdAt)&&send.deadline<=root.C0);
+ return hash('afw.finite-sdk-cleanup-correlation.v1',{rootHash:root.recordHash,expectedGrantHash:g.recordHash,completeSendHash:send.recordHash,identityHash:i.identityHash});
 }

````

### lib/mcp-qa-finite-owner-phase-context.mjs

````diff
diff --git a/lib/mcp-qa-finite-owner-phase-context.mjs b/lib/mcp-qa-finite-owner-phase-context.mjs
--- a/lib/mcp-qa-finite-owner-phase-context.mjs
+++ b/lib/mcp-qa-finite-owner-phase-context.mjs
@@ -1,10 +1,12 @@
+import {readPrivateQaFiniteOwnerSdkGrant} from './mcp-qa-finite-owner-cleanup.mjs';
+import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
 import {continuePrivateQaFiniteOwnerChoice,consumeFiniteOwnerStageAdmission} from './mcp-qa-finite-owner-preparation.mjs';
 import {adoptFiniteOwnerRequestStageWork} from './mcp-qa-finite-stage-work.mjs';
 import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
 import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
 import {encodeFinitePreparationCleanupRecord as enrollmentEncode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
 import {finiteNativeMetadata as connectionMetadata,qualifyFiniteOwnerChoiceRequest,finiteNativeOriginalUrl as connectionUrl,finiteNativeBytes as connectionBytes} from './mcp-qa-finite-owner-native-wire.mjs';
 import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
 import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeConsentMetadata,qualifyFiniteOwnerNoticeConsentRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
 import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';
 
@@ -386,20 +388,21 @@
     }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
     if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
     data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
     if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
     const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
     if(f.sdk.root){
      const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
      if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
      if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
      if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
+     if(f.sdk.reference&&(!i||f.sdk.reference.correlationHash!==finiteOwnerSdkCleanupCorrelation({root:f.sdk.root,expectedGrant:g,completeSend:c.send,identity:i})||f.sdk.reference.observedAt>Date.now()))fail();
      if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
     }
     const noticeFacts=await noticePrimary(f,data,issuerFacts);
     qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
     return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
    };
    const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
    const snapshot=(f,physical,q)=>({
     sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
     anchor:JSON.parse(f.anchor),physical,
@@ -699,42 +702,42 @@
     if(pendingIssuer.length&&(pendingIssuer[0]!==operation||!['issuer-send','issuer-resolved'].includes(position)))fail();
     if(pendingSdk.length&&(pendingSdk[0]!==operation||!['sdk-send','sdk-resolved'].includes(position)))fail();
     if(position.endsWith('-resolved')&&(!actualPromise||!settled||!actualResult))fail();
     const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
     check();
    }
    const fresh=async(promise,record)=>{const result=await wait(promise);if(result?.status!=='recorded'||result.recordHash!==record.recordHash)fail();return result;};
    const sdkAppend=async(kind,record,op=null)=>{
     check();
-    const suffix=kind==='Root'?'root':kind==='ExpectedGrant'?'grant':op+(kind==='SdkSend'?':send':':observed');
+    const suffix=kind==='Root'?'root':kind==='ExpectedGrant'?'grant':kind==='SdkGrantReference'?'reference':op+(kind==='SdkSend'?':send':':observed');
     if(readSdk(suffix))fail();
-    const call=kind==='Root'?sdk.appendRoot(record,clock.lease):kind==='ExpectedGrant'?sdk.appendExpectedGrant({preconnectionId:id,record},clock.lease):kind==='SdkSend'?sdk.appendSend({preconnectionId:id,record},clock.lease):sdk.appendObserved({preconnectionId:id,operation:op,record},clock.lease);
+    const call=kind==='SdkGrantReference'?sdk.appendSdkReference({preconnectionId:id,record},activeChild):kind==='Root'?sdk.appendRoot(record,clock.lease):kind==='ExpectedGrant'?sdk.appendExpectedGrant({preconnectionId:id,record},clock.lease):kind==='SdkSend'?sdk.appendSend({preconnectionId:id,record},clock.lease):sdk.appendObserved({preconnectionId:id,operation:op,record},clock.lease);
     await fresh(call,record);expected.records.sdk.push([sdkPrefix+suffix,sdkEncode(kind,record)]);expected.records.sdk.sort(([a],[b])=>a.localeCompare(b));updateAnchor();
    };
    const api=new OAuthAuthorizationServer({issuer:source.origin,resources:[source.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:alias}));
    const authData=value=>{
     const v=own(value);fields(v,['responseType','clientId','redirectUri','scope','state','codeChallenge','codeChallengeMethod','resource','issuer']);
     if(v.responseType!=='code'||v.clientId!==source.clientId||v.resource!==source.resource||v.issuer!==source.origin||v.codeChallengeMethod!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(v.codeChallenge)||!issuerScopes(v.scope)||typeof v.state!=='string'||!v.state||v.state.length>4096||typeof v.redirectUri!=='string'||v.redirectUri.length>4096)fail();
     const redirect=new URL(v.redirectUri);if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail();return v;
    };
    const authHash=v=>digest('afw.finite-owner-sdk-request.v1',authData(v));
    async function sdkCall(op,bindingHash,requestHash,call,resultHash){
     await recheckOwned();if(readSdk(op+':send'))fail();
     operation=op;actualPromise=null;actualResult=null;settled=false;position='sdk-send';
     const send=sdkSeal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:readSdk('root').recordHash,operation:op,originalRequestId:crypto.randomUUID(),originalRequestHash:requestHash,issuedAt:Date.now(),deadline:clock.end(),bindingHash});
     await sdkAppend('SdkSend',send,op);await recheckOwned();check();
-    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='sdk-pending';
+    actualPromise=retain(Promise.resolve().then(()=>{check();return call(send);}));position='sdk-pending';
     actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();
     const observed=sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:resultHash(actualResult),observedAt:Date.now(),outcome:'resolved'});
     await sdkAppend('SdkObserved',observed,op);position='sdk-observed';await recheckOwned();
-    const result=actualResult;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
+    const result=actualResult;if(op!=='sdk_complete'){actualPromise=null;actualResult=null;settled=false;}operation=null;position='settled';return result;
    }
    const issuerAppend=async(kind,record,op=null)=>{
     check();const call=kind==='Reservation'?issuer.appendReservation(record,activeChild):kind==='Send'?issuer.appendSend({preconnectionId:id,record},activeChild):issuer.appendAck({preconnectionId:id,operation:op,record},activeChild);
     await fresh(call,record);
     if(kind==='Reservation')expected.records.issuer.reservation=record;
     else expected.records.issuer.operations[op][kind==='Send'?'send':'ack']=record;
     updateAnchor();
    };
    async function issuerCall(op,window,call){
     await recheckOwned();operation=op;position='issuer-send';actualPromise=null;actualResult=null;settled=false;
@@ -818,27 +821,34 @@
     const connection=finiteOwnerConnectionRef({connectionRef,subject:identity.subject,grantId:i.grantId,clientId:source.clientId,projectId:source.project.projectId,resource:source.resource,issuedAt:linkedAt,expiresAt:Math.min(prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,Date.parse(expiresAt))});
     await recheckOwned();
     const paired=await wait(preparation.putPreconnectionConnection({relation,connection},l));
     if(paired?.status!=='recorded'||paired.recordHash!==prepHash('PreconnectionConnection',relation))fail();
     const rr=await wait(preparation.readPreconnectionConnection({preconnectionId:id},l)),cr=await wait(preparation.readConnectionRef({connectionRef},l));
     if(rr.status!=='observed'||cr.status!=='observed'||prepEncode('PreconnectionConnection',rr.record)!==prepEncode('PreconnectionConnection',relation)||prepEncode('ConnectionRef',cr.record)!==prepEncode('ConnectionRef',connection))fail();
     qualifyFiniteOwnerConnectionPair({source,identity,pre:prep.preconnection,link:grantLink,grant:{grantId:i.grantId,expiresAt},relation:rr.record,connection:cr.record,observedAt:Date.now()});
     expected.issuerRows.relation=structuredClone(relation);expected.issuerRows.connection=structuredClone(connection);
     expected.records.inventory.push([inventoryPrefix+'connection',prepEncode('PreconnectionConnection',relation)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));updateAnchor();await recheckOwned();
    });
-   const completed=await sdkCall('sdk_complete',grant.recordHash,grant.approvedRequestHash,()=>api.completeAuthorization({request:approved.request,userId:i.subject,scope:scopes,metadata:{},props:{applicationGrantId:i.grantId,userId:i.subject,projectId:i.projectId},revokeExistingGrants:false}),result=>{
+   const completed=await sdkCall('sdk_complete',grant.recordHash,grant.approvedRequestHash,send=>api.completeAuthorization({request:approved.request,userId:i.subject,scope:scopes,metadata:{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:finiteOwnerSdkCleanupCorrelation({root,expectedGrant:grant,completeSend:send,identity:i})}},props:{applicationGrantId:i.grantId,userId:i.subject,projectId:i.projectId},revokeExistingGrants:false}),result=>{
     if(typeof result?.redirectTo!=='string'||result.redirectTo.length>8192)fail();
     const target=new URL(result.redirectTo),registered=new URL(approved.request.redirectUri);
     if(target.origin!==registered.origin||target.pathname!==registered.pathname||!target.searchParams.get('code'))fail();
     return digest('afw.finite-owner-sdk-complete-result.v1',{redirectHash:sha(result.redirectTo)});
    });
-   await recheckOwned();const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
+   if(!actualPromise||!settled||actualResult!==completed)fail();
+   const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));
+   await recheckOwned();check();
+   const reference=sdkSeal('SdkGrantReference',{purpose:'afw.finite-owner-sdk-reference.v1',...summary,observedAt:Date.now()});
+   await withChild(()=>sdkAppend('SdkGrantReference',reference));
+   await recheckOwned();if(!actualPromise||!settled||actualResult!==completed)fail();
+   actualPromise=null;actualResult=null;settled=false;
+   const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
    if([...out].some(([,v])=>v.length>8192))fail();check();return new Response(null,{status:302,headers:out});
   }));
  }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
 }
 
 /** UNMOUNTED fixed GET. Only this invocation can retain its own SQL result. */
 export async function handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease){
  let clock,onAbort;
  try{
   if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();

````

### test/fixtures/finite-initial-entry-world.mjs

````diff
diff --git a/test/fixtures/finite-initial-entry-world.mjs b/test/fixtures/finite-initial-entry-world.mjs
--- a/test/fixtures/finite-initial-entry-world.mjs
+++ b/test/fixtures/finite-initial-entry-world.mjs
@@ -1,10 +1,11 @@
+import {extendFiniteOwnerCleanup,instrumentFiniteOwnerCleanup} from './finite-owner-cleanup.mjs';
 import {compileFirstConnectionCandidate,extendFirstConnectionPublication,firstConnectionWorkers,extendEnrollmentComponent,instrumentFirstConnection,instrumentFirstConnectionEngine} from './finite-first-connection-publication.mjs';
 import {extendFiniteOwnerNoticeGet,captureNoticeBundle,instrumentFiniteNoticeGet} from './finite-owner-notice-get.mjs';
 import {FINITE_PREPARATION_MONITORING_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {instrumentFiniteOwnerIo,extendFiniteOwnerIo,delayFiniteOwnerIo} from './finite-owner-io-fanout.mjs';
 import {extendFiniteOwnerQaSdk,finiteOwnerSdkWorkers,instrumentFiniteOwnerQaSdk,instrumentFiniteOwnerQaSdkLate} from './finite-owner-qa-sdk.mjs';
 import {FINITE_PREPARATION_ISSUER_SCHEMA} from '../../lib/mcp-qa-finite-preparation-issuer-store.mjs';
 import {extendFiniteOwnerPhaseContext,seedFiniteOwnerPhaseHistory} from './finite-owner-phase-context.mjs';
 import {extendPreparationCleanupFixture} from './finite-preparation-cleanup-entry.mjs';
 import assert from 'node:assert/strict';
 import {createHash} from 'node:crypto';
@@ -17,21 +18,21 @@
 import {bootstrapWorld,UUID,GH,CF} from './finite-bootstrap-world.mjs';
 import {initialHistoryFixture,seedInitialHistory} from './finite-initial-history-world.mjs';
 import {QA_CLOUD_CLOSED_PINS as realPins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
 import {initialHash} from '../../lib/mcp-qa-finite-initial-material-records.mjs';
 import {generateKeyPair,exportJWK,SignJWT} from 'jose';
 import {AFW_FIXED_WORKFLOWS} from '../../lib/mcp-fixed-terminal-workflows.mjs';
 import {restorationConfigurationHash} from '../../lib/mcp-restoration-configuration.mjs';
 import {finitePublicProfileTemplate,finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
 const sha=x=>createHash('sha256').update(x).digest('hex'),J=JSON.stringify;
 const M='c'.repeat(40),TREE='d'.repeat(40),COMMAND=9001;
-export async function initialEntryHarness(mode='normal',{negativeProfile=false}={}){
+export async function initialEntryHarness(mode='normal',{negativeProfile=false,ownerCleanup=false}={}){
  const firstConnection=mode==='first-connection-publication',firstConnectionMutation=firstConnection?(process.env.AFW_T3_MUTANT??null):null;if(![null,'public-partial','existing-ack'].includes(firstConnectionMutation))throw Error('SYN unknown negative mutation');
  const mark=stage=>{if(firstConnection)console.info('T2 native stage',stage);};mark('harness-start');
  const enrollmentComponent=mode==='first-connection-enrollment-component';
  const pair=(firstConnection||enrollmentComponent||mode.startsWith('enrollment')||mode==='private-choice'||mode.startsWith('phase-context-sdk'))?await generateKeyPair('RS256'):null,privateKey=pair?.privateKey,jwk=pair?{...await exportJWK(pair.publicKey),kid:'enrollment-SYN',alg:'RS256'}:null;
  const persist=mode.endsWith('restart')?await mkdtemp(join(tmpdir(),'afw-entry-restart-')):null;
  const sdkProfile=mode.startsWith('phase-context-sdk')?finiteWranglerProfileTemplate('qaLive'):null;
  const base={...(firstConnection?{name:'qa-first-connection'}:{}),...(sdkProfile?{name:'qa-sdk'}:{}),...(persist?{resourcePersistencePath:persist}:{}),...(firstConnection?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'first-connection-oauth'}}:mode.startsWith('phase-context')?{kvNamespaces:{AFW_FINITE_OWNER_OAUTH_KV:'finite-sdk-shared'}}:{}),modules:true,compatibilityDate:sdkProfile?.compatibility_date??'2026-09-07',compatibilityFlags:sdkProfile?.compatibility_flags??['nodejs_compat'],ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'99122',simple:{limit:1000,period:60}}},bindings:{AFW_QA_VERSION:{id:UUID},AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-native-reader',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-native-publisher'},d1Databases:{RELEASE_DB:'initial-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Initial',useSQLite:true,uniqueKey:'initial-c2a'},AFW_RELEASE_EVENTS_NODE:{className:'Node',useSQLite:true,uniqueKey:'initial-node'}}};
  const mf=new Miniflare(convertV4MiniflareOptions({...base,script:'import{DurableObject}from"cloudflare:workers";export class Initial extends DurableObject{} export class Node extends DurableObject{} export default{fetch(){return new Response(null,{status:404})}};'}));
  let failedInitializationDisposal;
  const disposeFailedInitialization=()=>failedInitializationDisposal??=mf.dispose();
@@ -40,20 +41,21 @@
  mark('M-compile-start');const firstCandidate=firstConnection?await compileFirstConnectionCandidate(M,TREE,{negativeProfile}):null;mark('M-compile-done');
  const program=firstCandidate?.program??'SYNTHETIC actual resident candidate program',script='// SYNTHETIC B1 candidate bytes\nexport default{};',bytes=firstCandidate?.bytes??Buffer.from(script),compressed=gzipSync(bytes,{level:9,mtime:0}),resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:M,sourceTree:TREE,sourceCheck:'git-inputs-before-after-v1',programHash:sha(program),module:{name:'index.mjs',sha256:sha(bytes),bytes:bytes.length},compressedSha256:sha(compressed),compressedBytes:compressed.length,content:compressed.toString('base64')};
  const w=await bootstrapWorld({sourceRevision:M,sourceTree:TREE,modules:{qaLive:{module:{name:'index.mjs',sha256:sha('export default{};'),bytes:17,exports:[...finitePublicProfileTemplate('qaLive').exports]}}},files:{'qaLive/index.mjs':'export default{};'}});
  const created=new Date(Math.floor((Date.now()-(['partial','upload-partial'].includes(mode)?40000:1000))/1000)*1000).toISOString().replace('.000Z','Z'),command={id:COMMAND,user:{id:290715446,login:'tokenizartinfo-ops',type:'User'},author_association:'OWNER',body:'/afw-qa-finite-prepare v1 '+M+' '+UUID,created_at:created,updated_at:created,issue_url:GH+'/issues/497'};w.map.set('/issues/comments/'+COMMAND,command);
  const approval=Date.now()+86400000;
  const opScript='// SYN operator closed\nexport default{};',opConfig={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat'],main_module:'index.mjs',usage_model:'standard',containers:[],exports:{default:{type:'worker'}},bindings:[{name:'RELEASE_DB',type:'d1',id:'6a728254-1494-4039-802e-b39288a55fcc'},{name:'AFW_RELEASE_EVENTS_NODE',type:'durable_object_namespace',namespace_id:'d6fc71552de7494a863aca20365a572d',class_name:'AfwOwnEventNode'},{name:'AFW_RELEASE_OPERATOR_ENABLED',type:'plain_text',text:'false'}]},opPin={...realPins.operator,module:{name:'index.mjs',bytes:Buffer.byteLength(opScript),sha256:sha(opScript)},configurationHash:restorationConfigurationHash(opConfig)},opMetadata={...opConfig,id:opPin.id,urls:[],modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(opScript).toString('base64')}]};
  const f={mf,x,w,command,nowOffset:0,activations:[],restores:[],pointerMode:'baseline',alarmMode:'normal',requests:[],uploads:[],mode,pointerReads:0,tokenReads:0,publisherReads:0,baselineReads:0,held:null,release:null,commandReads:0,approval};
  let entry="\n import{DurableObject}from'cloudflare:workers';\n import*as workflowGate from'./lib/mcp-fixed-terminal-workflows.mjs';\n import*as activationWire from'./lib/mcp-qa-finite-initial-activation-wire.mjs';\n import{readPrivateQaFiniteCandidate}from'./lib/mcp-qa-finite-candidate-residency.mjs';\n import{observeFiniteOwnerRequestWork,observeFiniteOwnerStageWork}from'./lib/mcp-qa-finite-stage-work.mjs';\n import{readPrivateQaFiniteInitialOwnerSource}from'./lib/mcp-qa-finite-initial-owner-source.mjs';\n import{preparePrivateQaFiniteOwnerChoice}from'./lib/mcp-qa-finite-owner-preparation-qa.mjs';\n import{createFiniteOwnerRequestLease}from'./lib/mcp-qa-finite-owner-preparation.mjs';\n import*as historySchema from'./lib/mcp-qa-finite-initial-history-schema.mjs';\n import*as oldGuard from'./lib/mcp-qa-finite-initial-old-guard.mjs';\n import*as custodyProbe from'./lib/mcp-qa-finite-initial-custody-probe.mjs';\n import{IndependentClosure as FiniteClosure,PrivateQaBootstrap}from'./worker/independent-closure/finite.mjs';\n import{sealFiniteInitialCapsule}from'./lib/mcp-qa-finite-initial-capsule-records.mjs';\n import{initialCanonical,hashFiniteInitialMaterialRecord}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{initialInstanceId}from'./lib/mcp-qa-finite-initial-material-records.mjs';\n import{sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as enc}from'./lib/mcp-qa-finite-initial-cleanup-records.mjs';\n const P='afw.finite-initial-cleanup.v1:';\n const KEY='afw.finite-initial-preparation.v1:entry';\n export class Node extends DurableObject{}\n export class Initial extends FiniteClosure{\n async seed(rows){for(const[k,v]of rows)await this.ctx.storage.put(k,v);await this.ctx.storage.sync();}\n async snapshot(){return[...await this.ctx.storage.list()];}\n async mutateCleanup(key,mode){const k=P+key;if(mode==='delete')await this.ctx.storage.delete(k);else{const kinds={'activation-completion':'ActivationCompletion','restore-ack':'RestoreAck',receipt:'Receipt'},fields={'activation-completion':'ackHash','restore-ack':'sendHash',receipt:'restoreAckHash'},r=JSON.parse(await this.ctx.storage.get(k));delete r.purpose;delete r.recordHash;r[fields[key]]='a'.repeat(64);await this.ctx.storage.put(k,enc(kinds[key],seal(kinds[key],r)));}await this.ctx.storage.sync();}\n async capsuleFacts(){const s=this.ctx.storage,read=async k=>JSON.parse(await s.get(k)),prefix='afw.finite-initial-preparation.v1:',entry=await read(KEY),selector=await read(prefix+'selector');return {entry,claim:await read(prefix+'once'),selector,materialAck:await read(prefix+'ack'),material:await read(prefix+'material:'+selector.materialHash),plan:await read(P+'plan'),state:await read(P+'state'),arm:await read(P+'arm-ack'),send:await read(P+'activation-send'),activationAck:await read(P+'activation-ack'),completion:await read(P+'activation-completion'),recordedAt:Date.now()};}\n async probeCapsuleFacts(input){try{return{ok:true,capsule:sealFiniteInitialCapsule(input)};}catch{return{ok:false};}}\n async seedFutureActivation(kind='complete'){\n  // SYN FUTURE INPUT: production forward activation producer is deliberately ABSENT.\n  const p=JSON.parse(await this.ctx.storage.get(P+'plan')),annotation='afw-finite-initial-activate-'+p.recordHash,body=JSON.stringify({strategy:'percentage',versions:[{version_id:p.candidateVersionId,percentage:100}],annotations:{'workers/message':annotation}});\n  const arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),issuedAt=kind==='pre-arm'?arm.acknowledgedAt-1:arm.acknowledgedAt,deadline=Math.min(p.forwardDeadline,issuedAt+5000);if(issuedAt<p.I0||deadline-issuedAt<4)throw Error('SYN forward deadline insufficient');const send=seal('ActivationSend',{planHash:p.recordHash,entryHash:p.entryHash,materialHash:p.materialHash,candidateVersionId:p.candidateVersionId,bodyHash:await crypto.subtle.digest('SHA-256',new TextEncoder().encode(body)).then(b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')),annotation,issuedAt,deadline});\n  await this.ctx.storage.put(P+'activation-send',enc('ActivationSend',send));if(kind==='send')return;\n  const ack=seal('ActivationAck',{planHash:p.recordHash,sendHash:send.recordHash,deploymentId:'66666666-6666-4666-8666-666666666666',acknowledgedAt:issuedAt+1});\n  await this.ctx.storage.put(P+'activation-ack',enc('ActivationAck',ack));if(kind==='ack')return;\n  const completion=seal('ActivationCompletion',{planHash:p.recordHash,sendHash:send.recordHash,ackHash:ack.recordHash,candidateVersionId:p.candidateVersionId,deploymentId:ack.deploymentId,settledAt:issuedAt+2,observedAt:issuedAt+3});\n  await this.ctx.storage.put(P+'activation-completion',enc('ActivationCompletion',completion));await this.ctx.storage.sync();\n }\n async probeActivationWire(metadata,mode='normal'){\n  try{\n   const plan=JSON.parse(await this.ctx.storage.get(P+'plan')),arm=JSON.parse(await this.ctx.storage.get(P+'arm-ack')),entry=JSON.parse(await this.ctx.storage.get(KEY));\n   if(mode==='arm')arm.alarmAt++;\n   const issuedAt=arm.acknowledgedAt-(mode==='issued-before-arm'?1:0),deadline=mode==='deadline-too-long'?issuedAt+5001:Math.min(plan.forwardDeadline,issuedAt+5000),wire=activationWire.prepareFiniteInitialActivationWire({plan,arm,entry,issuedAt,deadline});\n   const result={id:'66666666-6666-4666-8666-666666666666',...JSON.parse(wire.body)};\n   if(mode==='wrong-version')result.versions[0].version_id=plan.baselineVersionId;\n   if(mode==='wrong-annotation')result.annotations['workers/message']='SYN invalid';\n   const ack=activationWire.qualifyFiniteInitialActivationAck({plan,send:wire.send,result,acknowledgedAt:mode==='ack-after-deadline'?deadline:issuedAt+1});\n   if(mode==='wrong-deployment')result.id='77777777-7777-4777-8777-777777777777';\n   if(mode==='wrong-module')metadata.modules[0].content_base64='AAAA';\n   let candidateBytes=readPrivateQaFiniteCandidate().bytes;\n   if(mode==='coherent-wrong-module'){candidateBytes=new TextEncoder().encode('SYN coherently altered module');metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   if(mode==='same-size-wrong-module'){candidateBytes=candidateBytes.slice();candidateBytes[0]^=1;metadata.modules[0].content_base64=Buffer.from(candidateBytes).toString('base64');}\n   const completion=activationWire.qualifyFiniteInitialActivationCompletion({plan,send:wire.send,ack,pointer:result,metadata,bytes:candidateBytes,settledAt:issuedAt+2,observedAt:mode==='observation-after-deadline'?deadline:issuedAt+3});\n   return{status:'proposal_only',wire,ack,completion};\n  }catch{return{status:'rejected'};}\n }\n\n async ownerSourceRead(delta=400000,mode='normal',preconnectionId=null,token=null){\n  const s=this.ctx.storage,raw=JSON.parse(await s.get('afw.finite-initial-preparation.v1:capsule')),now=Date.now,get=s.get,list=s.list,alarm=s.getAlarm,put=s.put,transaction=s.transaction,sync=s.sync,fetcher=globalThis.fetch,version=this.env.AFW_QA_VERSION,node=this.env.AFW_RELEASE_EVENTS_NODE,db=this.env.RELEASE_DB,withSession=db.withSession;let offset=raw.I0+delta-now(),reads=0,capsuleReads=0;\n  Date.now=()=>now()+offset;\n  const requestAbort=new AbortController(),request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{signal:requestAbort.signal,headers:token?{'Cf-Access-Jwt-Assertion':token}:{}}),entry=createFiniteOwnerRequestLease(request);\n  if(mode==='request-budget')offset+=29900;this.ownerEffects=0;\n  const noWrite=()=>{this.ownerEffects++;throw Error('SYN owner reader attempted a write');};if(mode!=='private-choice'){s.put=noWrite;s.transaction=noWrite;s.sync=noWrite;}\n  if(['held-fetch','held-body','held-cancel'].includes(mode)){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(fetcher,globalThis,args).then(async response=>{\n   if(mode==='held-fetch')return new Promise(resolve=>{owner.releaseHeld=()=>resolve(response);});\n   await response.body.cancel();\n   if(mode==='held-cancel')return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{status:401,headers:response.headers});\n   let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers});\n  });}\n  s.get=async(...a)=>{const v=await Reflect.apply(get,s,a);reads++;if(a[0].endsWith(':capsule'))capsuleReads++;\n   if(['held-read','request-budget','nested-request-held-read'].includes(mode)&&reads===1)return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n   if(mode==='holder-drift'&&reads===1)this.env.AFW_RELEASE_EVENTS_NODE={};\n   if(mode==='backward'&&reads===1)offset-=100;\n   if(mode==='parent-deadline'&&reads===1)offset+=30001;\n   if(mode==='aborted'&&reads===1)entry.finish();if(mode==='request-abort'&&reads===1)requestAbort.abort();\n   if(mode==='missing'&&a[0].endsWith(':capsule'))return undefined;\n   if(mode==='malformed'&&a[0].endsWith(':capsule'))return v+' ';\n   if(mode==='hash'&&a[0].endsWith(':capsule')){const x=JSON.parse(v);x.bindingsHash='f'.repeat(64);return initialCanonical(x);}\n   if(mode==='material'&&a[0].includes(':material:'))return v+' ';\n   if(mode.startsWith('anchor-')&&a[0].endsWith(':'+mode.slice(7)))return v+' ';\n   if(mode==='changed-anchor'&&capsuleReads>1&&a[0].endsWith(':capsule'))return v+' ';\n   return v;\n  };\n  s.getAlarm=(...a)=>mode==='alarm'?Promise.resolve(raw.C0+1):Reflect.apply(alarm,s,a);\n  s.list=(...a)=>Reflect.apply(list,s,a).then(rows=>{if(mode.startsWith('anchor-')&&rows.has(P+mode.slice(7)))rows.set(P+mode.slice(7),rows.get(P+mode.slice(7))+' ');if(mode==='transition'&&a[0]?.prefix===P)rows.set(P+'restore-send','SYN transition');if(mode==='head'&&a[0]?.prefix==='afw.qa-finite-trial.v1:')rows.set('afw.qa-finite-trial.v1:head','SYN head');if(mode==='publication'&&a[0]?.prefix==='afw.finite-policy-effect.v1:')rows.set(a[0].prefix+'writer-head','SYN publication');return rows;});\n  if(mode==='wrong-version')this.env.AFW_QA_VERSION={id:'99999999-9999-4999-8999-999999999999'};\n  const ctx=mode==='wrong-actor'?{storage:s,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('SYN-wrong')}:this.ctx;\n  const restore=()=>{Date.now=now;s.get=get;s.list=list;s.getAlarm=alarm;s.put=put;s.transaction=transaction;s.sync=sync;globalThis.fetch=fetcher;this.env.AFW_QA_VERSION=version;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=withSession;};\n  this.ownerRestore=restore;\n  try{if(mode==='private-choice')return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>preparePrivateQaFiniteOwnerChoice({ctx,env:this.env,request},entry.lease));if(mode.startsWith('nested-request'))return await observeFiniteOwnerRequestWork({ctx,env:this.env,originalLease:entry.lease},()=>readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId}));if(mode==='untrusted-parent')return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:{signal:entry.lease.signal,assertCurrent:()=>{}},preconnectionId});return await readPrivateQaFiniteInitialOwnerSource({ctx,env:this.env,parent:entry.lease,preconnectionId});}\n  catch{return{status:'unavailable'};}finally{entry.finish();restore();}\n }\n\n async ownerEffectCount(){return this.ownerEffects??0;}\n async preEntryCustody(mode='normal'){const ctx=mode==='wrong-actor'?{storage:this.ctx.storage,id:this.env.AFW_INDEPENDENT_CLOSURE.idFromName('wrong-actor')}:this.ctx;return await custodyProbe.readFinitePreEntryCustody({ctx,env:this.env});}\n async probeStageAvailability(){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{}}),admission=Object.freeze({lease});try{await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},async()=>true);return{available:true};}catch{return{available:false};}finally{controller.abort();}}\n async probeNativeCustody(mode='normal'){const controller=new AbortController(),lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}}),admission=Object.freeze({lease});try{if(mode==='aborted')controller.abort();if(mode==='unscoped')return await custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease);return await observeFiniteOwnerStageWork({ctx:this.ctx,env:this.env,admission,originalLease:lease},()=>custodyProbe.readFiniteNativeCustodyProbe({ctx:this.ctx,env:this.env},lease));}catch{return{status:'unavailable'};}finally{controller.abort();}}\n async probeOldGuard(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await oldGuard.readFiniteInitialOldGuard({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeHistorySchema(mode='normal'){try{const controller=new AbortController();if(mode==='aborted')controller.abort();return await historySchema.readFiniteInitialHistorySchema({env:this.env},{signal:controller.signal,assertCurrent:()=>{if(mode==='expired')throw Error('SYN parent expired');}});}catch{return{status:'unavailable'};}}\n async probeInitialInventory(){try{const raw=await this.ctx.storage.get(KEY),entry=JSON.parse(raw),read=async(path,query)=>{const url='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec'+path+(query?'?'+new URLSearchParams(query):''),r=await fetch(url,{headers:{Authorization:'Bearer '+this.env.AFW_MCP_CLOSURE_READ_TOKEN}}),v=await r.json();return{value:v.result,info:v.result_info};};return await workflowGate.readFiniteInitialAfwWorkflows({read,assertCurrent:()=>{},entry});}catch{return{status:'unavailable'};}}\n async initialAlarmAt(at){const original=Date.now,offset=at-original(),db=this.env.RELEASE_DB,withSession=db.withSession;\n  // SYN time advance: keep native D1 query and data, shift only its SQL clock to match worker clock.\n  db.withSession=(...args)=>{const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=sql=>Reflect.apply(prepare,session,[sql.replace(' AS INTEGER) dbNow',' AS INTEGER)+'+offset+' dbNow')]);return session;};\n  Date.now=()=>original()+offset;try{return await this.alarm();}finally{Date.now=original;db.withSession=withSession;}}\n async alarmInfo(){return this.ctx.storage.getAlarm();}\n async initialAlarm(){return this.alarm();}\n async nominalAlarmData(){const r=await this.alarm();return {state:await r?.state};}\n async installAlarm(at){return this.ctx.storage.setAlarm(at);}\n async configure(mode){\n  this.localBodyCancelled=false;const actualFetch=globalThis.fetch;\n  if(mode==='late-body-observe'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).includes('/instances-v2?state=active'))return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){owner.localBodyCancelled=true;}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-cancel'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});return new Response(new ReadableStream({cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  if(mode==='late-activation-read'){const owner=this;globalThis.fetch=(...args)=>Reflect.apply(actualFetch,globalThis,args).then(response=>{if(!String(args[0]).endsWith('/workers/scripts/agent-friendly-web-delegated-canary/deployments')||args[1]?.method!=='POST')return response;response.body?.cancel().catch(()=>{});let requested=false;return new Response(new ReadableStream({pull(controller){if(requested)return;requested=true;return new Promise(resolve=>{owner.releaseRead=()=>{controller.enqueue(new Uint8Array([123]));resolve();};});},cancel(){return new Promise(resolve=>{owner.releaseCancel=resolve;});}}),{headers:response.headers,status:response.status});});}\n  this.fault=mode;this.transactions=0;this.syncs=0;this.callbacks=0;this.uploadStage=null;this.uploadTransactions=0;this.cleanupStage=null;this.activationStage=null;this.capsuleStage=false;this.capsuleTransactions=0;\n  const s=this.ctx.storage,nt=s.transaction,ns=s.sync,ng=s.get,db=this.env.RELEASE_DB,node=this.env.AFW_RELEASE_EVENTS_NODE,dbSession=db.withSession,nodeString=node.idFromString,publisher=this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,nga=s.getAlarm,nlist=s.list;\n  this.restore=()=>{globalThis.fetch=actualFetch;s.transaction=nt;s.sync=ns;s.get=ng;s.getAlarm=nga;s.list=nlist;this.env.RELEASE_DB=db;this.env.AFW_RELEASE_EVENTS_NODE=node;db.withSession=dbSession;node.idFromString=nodeString;this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=publisher;};\n  s.transaction=(fn,...args)=>{\n   const n=++this.transactions;\n   if(n===1&&mode==='changed-db-with-session')db.withSession=(...args)=>Reflect.apply(dbSession,db,args);\n   if(n===1&&mode==='changed-node-id-from-string')node.idFromString=(...args)=>Reflect.apply(nodeString,node,args);\n   if(mode==='never-commit'&&n===1)return Promise.reject(Error('SYN precommit failure'));\n   if(mode==='callback-retry'&&n===1)return(async()=>{\n    let candidate;\n    await Reflect.apply(nt,s,[async tx=>{this.callbacks++;await fn(tx);candidate=await tx.get(KEY);tx.rollback();}]);\n    await s.put(KEY,candidate);await Reflect.apply(ns,s,[]);\n    return Reflect.apply(nt,s,[async tx=>{this.callbacks++;return fn(tx);}]);\n   })();\n   let stage,sendPair,arm=false,armRows=[],activationStage,capsuleWrite=false;\n   const capsuleTx=this.activationStage==='completion';if(capsuleTx)this.capsuleTransactions++;\n   const wrapped=async tx=>{\n    const actual=await fn({get:async(...a)=>{\n     const value=await tx.get(...a);\n     if(capsuleTx){\n      const k=a[0],prefix='afw.finite-initial-preparation.v1:',aliases={entry:KEY,claim:prefix+'once',selector:prefix+'selector',materialAck:prefix+'ack',material:k.startsWith(prefix+'material:')?k:null,plan:P+'plan',state:P+'state',arm:P+'arm-ack',send:P+'activation-send',activationAck:P+'activation-ack',completion:P+'activation-completion',head:'afw.qa-finite-trial.v1:head'};\n      if(mode.startsWith('capsule-missing-')&&k===aliases[mode.slice(16)])return undefined;\n      if(mode.startsWith('capsule-mismatch-')&&k===aliases[mode.slice(17)])return value+' ';\n      if(mode==='capsule-coherent-ack'&&k===prefix+'ack'){const v=JSON.parse(value);v.acknowledgedAt++;return initialCanonical(v);}\n      if(mode==='capsule-coherent-claim'&&k===prefix+'once'){const v=JSON.parse(value);v.deadline--;v.claimHash=hashFiniteInitialMaterialRecord('InitialClaim',v);return initialCanonical(v);}\n      if(mode==='capsule-finite-head'&&k===aliases.head)return {intentId:'SYN conflict'};\n     }\n     return value;\n    },setAlarm:mode==='cleanup-missing-tx-alarm'?undefined:(...a)=>tx.setAlarm(...a),deleteAlarm:(...a)=>tx.deleteAlarm(...a),put:async(k,v)=>{\n     if(k==='afw.finite-initial-preparation.v1:capsule')capsuleWrite=true;\n     if(k===P+'plan'||k===P+'state'){arm=true;armRows.push([k,v]);}\n     if(k.startsWith(P+'activation-'))activationStage=k.slice((P+'activation-').length);\n     if(k.startsWith('afw.finite-initial-upload.v1:')){stage=k.split(':').at(-1);if(stage==='send'){sendPair=[k,v];this.uploadTransactions++;if(mode==='upload-publisher-drift')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';}}\n     return tx.put(k,v);\n    }});\n    if(arm&&mode==='cleanup-callback-retry')tx.rollback();\n    if(arm&&mode==='cleanup-never-commit'){tx.rollback();throw Error('SYN cleanup precommit');}\n    if(stage==='send'&&mode==='upload-callback-retry')tx.rollback();\n    if(stage==='send'&&mode==='upload-never-commit'){tx.rollback();throw Error('SYN upload precommit rejected');}\n    return actual;\n   };\n   const actual=Reflect.apply(nt,s,[mode.startsWith('upload-')||mode.startsWith('cleanup-')||mode.startsWith('activation-storage-')||mode.startsWith('capsule-')?wrapped:fn,...args]).then(v=>{this.uploadStage=stage??this.uploadStage;if(arm)this.cleanupStage='plan';if(activationStage)this.activationStage=activationStage;if(capsuleWrite)this.capsuleStage=true;return v;});\n   if(mode==='capsule-held-transaction')return actual.then(v=>capsuleWrite?new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}):v);\n   if(mode==='capsule-return-lost'||mode==='capsule-completion-return-lost')return actual.then(v=>{if(capsuleWrite||mode==='capsule-completion-return-lost'&&activationStage==='completion')throw Error('SYN journal transaction return lost');return v;});\n   if(mode==='activation-storage-return-lost')return actual.then(v=>{if(activationStage==='send')throw Error('SYN committed SEND return lost');return v;});\n   if(mode.startsWith('cleanup-'))return actual.then(async v=>{\n    if(arm&&mode==='cleanup-callback-retry'){for(const row of armRows)await s.put(...row);const p=JSON.parse(armRows.find(([k])=>k===P+'plan')[1]);await s.setAlarm(p.C0);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(arm&&mode==='cleanup-final-return-lost'){await Reflect.apply(ns,s,[]);throw Error('SYN final cleanup transaction return lost');}\n    return v;\n   });\n   if(mode.startsWith('upload-'))return actual.then(async v=>{\n    if(stage==='send'&&mode==='upload-callback-retry'){await s.put(...sendPair);await Reflect.apply(ns,s,[]);return Reflect.apply(nt,s,[fn]);}\n    if(stage==='send'&&mode==='upload-lost-send-ack'){await Reflect.apply(ns,s,[]);throw Error('SYN upload committed ACK lost');}\n    if(stage==='send'&&mode==='upload-held-send')return new Promise(resolve=>{this.releaseHeld=()=>resolve(v);});\n    return v;\n   });\n   if(mode==='lost-ack'&&n===1)return actual.then(async()=>{await Reflect.apply(ns,s,[]);throw Error('SYN committed ACK lost');});\n   if(mode==='changed-sync'&&n===1)return actual.then(v=>{s.sync=()=>Promise.resolve();return v;});\n   if(mode==='held-transaction'&&n===1)return actual.then(v=>new Promise(resolve=>{this.releaseHeld=()=>resolve(v);}));\n   return actual;\n  };\n  s.sync=(...args)=>{\n   const n=++this.syncs,actual=Reflect.apply(ns,s,args);\n   if(mode==='capsule-sync-lost'&&this.capsuleStage||mode==='capsule-completion-sync-lost'&&this.activationStage==='completion')return actual.then(()=>{throw Error('SYN capsule sync lost');});\n   if(mode==='capsule-held-sync'&&this.capsuleStage)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='capsule-holder-drift'&&this.capsuleStage)return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n   if(mode==='capsule-expired-completion'&&this.activationStage==='completion')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='activation-storage-sync-lost'&&this.activationStage==='send')return actual.then(()=>{throw Error('SYN SEND sync lost');});\n   if(mode==='cleanup-reject-sync'&&this.cleanupStage==='plan')return actual.then(()=>{throw Error('SYN cleanup sync lost');});\n   if(mode==='cleanup-hold-sync'&&this.cleanupStage==='plan')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(mode==='cleanup-nominal-conflict'&&this.uploadStage==='receipt')return actual.then(()=>s.put('afw.qa-finite-trial.v1:head',{intentId:'SYN conflict'}));\n   if(mode==='cleanup-publisher-drift'&&this.cleanupStage==='plan')return actual.then(()=>{this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-synthetic-publisher';});\n\n   if(mode==='upload-reject-sync'&&this.uploadStage==='send')return actual.then(()=>{throw Error('SYN upload sync ACK lost');});\n   if(mode==='upload-hold-sync'&&this.uploadStage==='send'||mode==='upload-hold-ack-sync'&&this.uploadStage==='ack')return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   if(['upload-chunk-tamper','upload-config-tamper'].includes(mode)&&n===3)return actual.then(async()=>{for(const[k,v]of await s.list()){if(mode==='upload-chunk-tamper'?k.includes(':chunk:'):k.endsWith(':backup')){const x=JSON.parse(v);if(mode==='upload-chunk-tamper')x.content='AAAA';else x.rawConfiguration.usage_model='changed';await s.put(k,JSON.stringify(x));break;}}});\n\n   if(mode==='reject-sync'&&n===1||mode==='post-reject-sync'&&n===2)return actual.then(()=>{throw Error('SYN sync ACK lost');});\n   if(mode==='hold-sync'&&n===1||mode==='post-hold-sync'&&n===2)return actual.then(()=>new Promise(resolve=>{this.releaseHeld=resolve;}));\n   return actual;\n  };\n  if(mode.startsWith('capsule-'))s.get=async(...a)=>{\n   const value=await Reflect.apply(ng,s,a),key=a[0];\n   if(key==='afw.finite-initial-preparation.v1:capsule'&&value!==undefined){\n    if(mode==='capsule-readback-lost')throw Error('SYN capsule readback lost');\n    if(mode==='capsule-held-readback')return new Promise(resolve=>{this.releaseHeld=()=>resolve(value);});\n   }\n   if(mode==='capsule-completion-readback-lost'&&key===P+'activation-completion'&&value!==undefined)throw Error('SYN completion readback lost');\n   return value;\n  };\n  if(mode==='upload-readback-tamper')s.get=async(...a)=>{const value=await Reflect.apply(ng,s,a);return a[0].startsWith('afw.finite-initial-upload.v1:')&&a[0].endsWith(':send')&&value!==undefined?value+' ':value;};\n  if(mode==='gate-retention'){\n   db.withSession=(...args)=>{\n    const session=Reflect.apply(dbSession,db,args),prepare=session.prepare;\n    session.prepare=(sql,...more)=>{\n     const statement=Reflect.apply(prepare,session,[sql,...more]);\n     if(sql.includes('FROM sqlite_schema')){\n      const all=statement.all;\n      statement.all=(...params)=>Reflect.apply(all,statement,params).then(value=>new Promise(resolve=>{this.releaseHeld=()=>resolve(value);}));\n     }\n     return statement;\n    };\n    return session;\n   };\n  }\n  if(mode==='missing-get-alarm')s.getAlarm=undefined;\n  if(mode==='late-initial-journal'||mode==='preexisting-send'){let reads=0;s.list=(...args)=>Reflect.apply(nlist,s,args).then(async rows=>{if(++reads===3){if(mode==='preexisting-send')await s.put(P+'activation-send','SYN conflict');rows.set(P+'activation-send','SYN conflict');}return rows;});}\n  if(mode==='missing-list')s.list=undefined;\n  if(mode==='cleanup-alarm-ack-lost')s.getAlarm=(...a)=>this.cleanupStage==='plan'?Promise.reject(Error('SYN native alarm ACK lost')):Reflect.apply(nga,s,a);\n  if(mode==='missing-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN=undefined;\n  if(mode==='invalid-publisher')this.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad token';\n  if(mode==='missing-sync')s.sync=undefined;\n  if(mode==='missing-db')this.env.RELEASE_DB=undefined;\n  if(mode==='missing-node')this.env.AFW_RELEASE_EVENTS_NODE=undefined;\n  if(mode==='missing-db-with-session')db.withSession=undefined;\n  if(mode==='noncallable-db-with-session')db.withSession=0;\n  if(mode==='missing-node-id-from-string')node.idFromString=undefined;\n  if(mode==='noncallable-node-id-from-string')node.idFromString=0;\n }\n async invoke(refs){return typeof this.prepareFiniteInitialMaterial==='function'?this.prepareFiniteInitialMaterial(refs):{status:'admin_pending',mayRetry:false,operationalReadiness:false};}\n async release(){this.releaseHeld?.();this.releaseHeld=null;}\n async releaseBodyCancel(){this.releaseCancel?.();this.releaseCancel=null;}\n async releaseBodyRead(){this.releaseRead?.();this.releaseRead=null;}\n async stats(){return{transactions:this.transactions,capsuleTransactions:this.capsuleTransactions,capsuleStage:this.capsuleStage,syncs:this.syncs,callbacks:this.callbacks,uploadTransactions:this.uploadTransactions,uploadStage:this.uploadStage,held:typeof this.releaseHeld==='function',bodyCancelled:this.localBodyCancelled===true,cancelHeld:typeof this.releaseCancel==='function',readHeld:typeof this.releaseRead==='function'};}\n async restoreMethods(){this.releaseHeld?.();this.releaseRead?.();this.releaseCancel?.();this.restore?.();}\n\n }export default{async fetch(request,env){const refs=await request.json();\n  const event={payload:{operation:'finite_initial_preparation',commandId:refs.commandId,sourceRevision:refs.sourceRevision,qaVersionId:refs.qaVersionId},timestamp:new Date(refs.createdAt),instanceId:refs.initialInstanceId,workflowName:refs.workflowName};\n  // Explicit SYN event/step delivery; actual production Workflow class/run and DO RPC.\n  let config;const step={do:async(name,options,fn)=>{config={name,options};return fn();}};\n  const result=await PrivateQaBootstrap.prototype.run.call({env:env},event,step);return Response.json({result,config});}};\n";
  if(mode.startsWith('enrollment')||enrollmentComponent)entry=extendPreparationCleanupFixture(entry);
  if(firstConnection)entry=extendFirstConnectionPublication(entry);
+ if(ownerCleanup){assert(firstConnection);entry=extendFiniteOwnerCleanup(entry);}
  if(enrollmentComponent)entry=extendEnrollmentComponent(entry,await readFile('lib/mcp-qa-finite-preparation-enrollment-writer.mjs','utf8').then(()=>true,()=>false));
  if(mode.startsWith('phase-context'))entry=extendFiniteOwnerPhaseContext(entry);
  if(mode.startsWith('phase-context-sdk'))entry=extendFiniteOwnerQaSdk(entry,{observed:mode.startsWith('phase-context-sdk-observed'),noticeGet:mode==='phase-context-sdk-token-notice-get'});
  if(mode==='phase-context-sdk-io'||mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerIo(entry);
  if(mode==='phase-context-sdk-token-notice-get')entry=extendFiniteOwnerNoticeGet(entry);
  let product;try{product=await readFile('lib/mcp-qa-finite-initial-material.mjs','utf8');}catch{product='export function createPrivateQaFiniteInitialMaterial(){return{collect:async()=>({status:"admin_pending"}),assertCurrent(){throw Error("missing original factual producer");}};}';}
  const approvalDecl="CEILING=Date.parse('2026-11-03T02:59:00Z')";
  if(product.includes(approvalDecl)){assert.equal(product.split(approvalDecl).length,2);product=product.replace(approvalDecl,'CEILING='+approval);}
  const sources=new Map();
  for(const p of ['mcp-qa-finite-initial-entry.mjs','mcp-qa-finite-initial-entry-records.mjs','mcp-qa-finite-initial-capsule-records.mjs','mcp-qa-finite-initial-cleanup.mjs']){try{const s=await readFile('lib/'+p,'utf8');sources.set(p,s.replaceAll("Date.parse('2026-11-03T02:59:00Z')",String(approval)));}catch{/* RED: finite class has no entry yet. */}}
@@ -78,21 +80,21 @@
    let initial=sources.get('mcp-qa-finite-initial-entry.mjs');
    const declaration='async function http(method,suffix,token,body,l,cap=3145728){',readLoop='for(;;){const read=await track(stream.read());guard(l);if(read.done)break;',ending='}finally{if(stream)track(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)track(response.body.cancel()).catch(()=>{});}';
    for(const needle of [declaration,readLoop,ending])assert.equal(initial.split(needle).length,2,'SYN original upload HTTP seam');
    initial=initial.replace(declaration,()=>declaration+"const observed={reads:0,bytes:0,readMs:0,postReadGuardMs:0};");
    initial=initial.replace(readLoop,()=>"for(;;){const readAt=performance.now(),read=await track(stream.read());observed.readMs+=performance.now()-readAt;observed.reads++;observed.bytes+=read.value?.byteLength??0;const guardAt=performance.now();try{guard(l);}finally{observed.postReadGuardMs+=performance.now()-guardAt;}if(read.done)break;");
    initial=initial.replace(ending,()=>"}finally{console.info('T2 original upload HTTP scalars',JSON.stringify({method,path:suffix.split('?')[0],...observed}));"+ending.slice('}finally{'.length));
    sources.set('mcp-qa-finite-initial-entry.mjs',initial);
   }
  }
  const plugin={name:'explicit-SYN-external-data-not-whole-facts',setup(b){
-  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFirstConnection(await readFile(args.path,'utf8'),{mutation:firstConnectionMutation}),loader:'js'}));
+  if(firstConnection)b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:(ownerCleanup?instrumentFiniteOwnerCleanup:x=>x)(instrumentFirstConnection(await readFile(args.path,'utf8'),{mutation:firstConnectionMutation})),loader:'js'}));
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-fixed-policy-engine\.mjs$/},async args=>({contents:instrumentFirstConnectionEngine(await readFile(args.path,'utf8')),loader:'js'}));
   if(firstConnection)b.onLoad({filter:/mcp-qa-finite-initial-lease\.mjs$/},()=>({contents:sources.get('mcp-qa-finite-initial-lease.mjs'),loader:'js'}));
   if(mode==='phase-context-sdk-token-notice-get')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteNoticeGet(instrumentFiniteOwnerIo(await readFile(args.path,'utf8'))),loader:'js'}));
   if(mode==='phase-context-sdk-io')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerIo(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode==='phase-context-sdk-token-late')b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdkLate(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('phase-context-sdk-observed'))b.onLoad({filter:/mcp-qa-finite-owner-phase-context\.mjs$/},async args=>({contents:instrumentFiniteOwnerQaSdk(await readFile(args.path,'utf8')),loader:'js'}));
   if(mode.startsWith('enrollment-pin-'))b.onLoad({filter:/mcp-qa-finite-initial-anchors\.mjs$/},async args=>{
    let contents=await readFile(args.path,'utf8');
    const needle='const compiledResidency=globalThis.__AFW_FINITE_CANDIDATE_RESIDENCY__??null;';
    assert.equal(contents.split(needle).length,2);

````

### docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md

````diff
diff --git a/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md
--- a/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md
+++ b/docs/superpowers/reports/2026-11-06-finite-owner-restoration-task1.md
@@ -0,0 +1,192 @@
+# AFW native owner restoration Task1 — SOURCE/SYN report
+
+Task1 only: factual SDK correlation, bounded readonly SDK lookup, and durable SDK reference before the actual redirect. Task2, third CLOSED, prearm, full setup, nominal handoff, operational readiness and PC-off are not completed or authorized here.
+
+## Scope and immutable authority
+
+PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web (public1347578006); ENVIRONMENT=SOURCE/SYN GitHub+Actions; ORIGIN=GitHub connector; RESOURCE_TYPE=existing isolated source branch; RESOURCE_ID=feat/finite-native-cleanup-20261101; ALLOWED_ACTION=Task1 exact source/test changes and bounded credential-free qualification. ROLLBACK=own commits only with exact parent/ref/blob/content readback; preserve existing history. Never main, operational resources, Source/Access/identity/clock refresh, OAuth/OTP/real credentials, DDL, Cron, Containers, consumers, Max or support mail.
+
+Binding brief docs/superpowers/briefs/2026-11-06-finite-owner-restoration-task1.md at c1f69a88a055dd24430b51d0362e50736f17797e/blob40132fe17ea56ecef675324a5edd3f8de2c73892 was read first. Specific design sections 5, 7 and 12 at ead56350882d81e3edf4952cb2658587b5fdd118/blobcf42e203d07a5e528e64eecd239491686cb73021 resolved SDK summary/correlation and bounded facet behavior. Source AGENTS current sections and installed TDD/good-tests/systematic-debugging/verification skills were read. No full old plan/history, helpers, subagents, reviewers, local clone/git/deps/build/test/container or runtime/provider effect.
+
+BASE=7aab233741b09f8873bf04831ca2fa9a9c2b1c4d; BASEtree=6eb4241fb4451e7f74ba1b0fd9ad2a02a52cb0f3. Protected main=0c9c475b3ebaa970fc11d628b40e50a90cceb727. Owner ceiling 2026-11-03T02:59:00Z remains expired. Original I0/C0/C1, 30s Root and clipped <=5s children, three slots, alarm/actor/counter remain unchanged. No production expiry or timeout was widened.
+
+## Implementation and causality
+
+- SdkGrantReference has exactly the approved purpose and fields, canonical own-data codec, 16384B limit, SDK16 grammar, hash binding and explicit seconds-vs-ms checks. String/bool timestamp coercions are rejected.
+- Pure finiteOwnerSdkCleanupCorrelation validates Root/ExpectedGrant/complete SEND/issuer Identity and hashes exactly the four approved commitments. This is DATA, never approval.
+- Journal adds only reference, max9 rows/list10; original eight rows remain valid. Reference requires complete normal observation and exact Root/ExpectedGrant/complete/correlation links, append-once native transaction, sync, exact readback. Unknown remains uncertain; no overwrite or ACK reconstruction.
+- The actual complete SEND determines exact metadata before SDK effect. Existing props/scopes/revokeExistingGrants:false remain. Actual result/promise and independent actual SDK summary are kept separate through reference durability; 302 waits for the durable reference and renewed ownership/context checks under the original Root.
+- New cleanup module exports only readPrivateQaFiniteOwnerSdkGrant. Its constructor/facet is private and readonly list/get for original subject grant keys only. Captured alias and all relevant holders, original genuine Root/current child, Source/actor/QA/capsule/enrollment/issuer are checked before/after I/O. Same SDK1.2.1 issuer/resource/scopes; no ordinary store fallback, put/delete/client/token operations or caller selector.
+- Each native list is limit100 even if SDK omits limit. Native internal legacy pagination counts toward max2 pages; max200 gets and a private concurrency2 queue. Sticky error/budget/lease denial rejects queued work before I/O, retaining already-started actual promises. No retry after unknown.
+- Only optional existing-fixture seam: test/fixtures/finite-initial-entry-world.mjs imports new helper, adds ownerCleanup=false option, opt-in class extension and opt-in passive phase instrumentation. Other modes and existing firstConnection fixture engine are preserved. test/fixtures/finite-first-connection-publication.mjs is unchanged.
+- Test wrappers separately observe actual native transaction fulfillment, native sync fulfillment and direct exact reference readback, in order before 302. Root/child elapsed and source-pair/native body-read guard metrics are passive. Held lookup and sync are explicitly outward ACK holds AFTER native settlement, not physical KV/storage-pending claims. Another genuine LIVE Root on the same ctx is denied until original held chain settles; dispose is not treated as drain.
+
+Official SDK1.2.1 source used for API shape: cloudflare/workers-oauth-provider src/oauth-provider.ts at v1.2.1/blob10274b62aad09ea0e9d058cc1e3d41a9f8cb7d97, matching design commit1fafae23a0328f49ec3a30c433dfbe502ab3d1a6. listUserGrants has hidden legacy pagination and Promise.all(get) fanout; completeAuthorization returns redirect, not grant ID. No secret/code/token format is parsed for selection.
+
+## Frozen tests and commands
+
+Exactly 10 contract tests:
+1. R1 records roundtrip
+2. R1 reference hash rejects drift
+3. R1 reference rejects foreign root
+4. R1 reference rejects foreign expected grant
+5. R1 reference requires complete observation
+6. R1 reference rejects invalid SDK id
+7. R1 reference seconds and milliseconds stay separate
+8. R1 reference rejects accessor and extra fields
+9. R1 reference journal is append once
+10. R1 reference journal preserves prior eight rows
+
+Exactly 6 native tests:
+1. R1 SDK reference is durable before redirect
+2. R1 foreign SDK metadata cannot redirect
+3. R1 duplicate SDK correlation cannot redirect
+4. R1 unknown reference commit cannot redirect or repeat SDK
+5. R1 held SDK lookup retains original scope
+6. R1 aborted reference sync cannot return late redirect
+
+All remote jobs: one Ubuntu24.04 job, timeout15min, Node22, checkout exact github.sha, fetch-depth1, persist-credentials:false, contents:read; Source frozen throughout each job. Dependencies/SDK/lock unchanged; no routine full suite or broad publish gates.
+
+Commands:
+- npm ci --ignore-scripts --no-audit --no-fund
+- RED: node --test --test-reporter=tap --test-name-pattern="^R1 SDK reference is durable before redirect$" test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
+- GREEN: node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
+- Changed-file lint: npx eslint lib/mcp-qa-finite-owner-issuer-provenance-records.mjs lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-cleanup.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
+- Existing actual build path: initialEntryHarness('first-connection-publication',{ownerCleanup:true}) -> compileFirstConnectionCandidate -> buildMcpNodeProgram and esbuild M/QA graph. Current source files, never old bundle bytes.
+- Final qualifier inline Node inventories output/owner-reference and output/t2-native-graphs, validates actual M/QA metafile inputs, hashes every file. Uploaded artifact is downloaded in that same job and hashes/bytes/manifest compared independently before qualifier removal.
+- Only local commands read small installed skill metadata; no project execution or project data written locally.
+- GitHub reads: exact refs, commits, files, compare(BASE...HEAD), recursive trees, runs/jobs/logs/artifacts. Every Source Contents API create/update/delete is sequential, explicit existing branch/current blob, verified sole parent/exact own path/new ref/blob/content. Prior GraphQL INTERNAL methods, auth changes, force, CLI and main were not retried.
+
+## RED primary
+
+Source74086e7b0a9df597274ec0a11386f58daab1c904/tree de7294f82ca761867618aaedb424f9cf65f6a4d1.
+Test blob39eeeb58a9a8260a94bbdf8a86dea51d28a9a341; helperd70decbe813dce8948125ff177471dd458f36e8d; optional seam302bd34f641ff6d2f7998b08633db0adcd1c5aa7; qualifierd357bfcb3ff14bcdb6f705f98aea577758724cd2.
+Run42275435649/job128090446140/attempt1, 2026-11-06T18:58:07Z–18:59:23Z, expected failure, exit1; executed1/pass0/fail1/cancel0/skip0/todo0; focal53376.907077ms, whole53975.660422ms.
+Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42275435649
+Exact cause: R1 missing durable SDK Reference AFTER actual completeAuthorization. Actual completeWrites1/completeNormal1, durable sdk_complete observation, Reference0, response302. Reached actual SDK complete, not missing import/module/old clock/hash.
+Measured current M=c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B; QA=a0d12a7be2b4f4a0638f30c65bc33d37a1ba64c707c6ccf0c0aed21689cffcdd/2373893B. These were measurements; no c493 literal is a new premise and no old M was built.
+Artifact13532153177, zip sha2562c9bbb4108363c9077995c0d27df563ab8c188227ae4f398a6b8e10c02112d74, 2597B, seven days.
+Limitation: RED uploaded only red.tap and sanitized principal marker. Scripts/metafiles were generated under output/t2-native-graphs but an incorrect artifact path omitted them. Root explicitly ruled not to repeat RED just for this omission. Do not claim RED graph/script preservation or substitute GREEN graph bytes for it.
+
+## Intermediate first GREEN: failed principal
+
+Sourcef7f7431ee6810b40b5b24824755e19acaa882c6d/tree8dc7758bb7e446336d7656acbdc0033c593cfe07; code8f7d6185305e56a719d52ffb593186502227912d.
+Run42276424099/job128093801109/attempt1, 19:04:39Z–19:10:37Z; executed16/pass15/fail1/cancel0/skip0/todo0, exit1; whole334454.279563ms. Ten contracts and five native negatives passed; lint skipped because tests failed.
+Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42276424099
+Principal failed pre-SDK complete, actual completeWrites0/completeNormal0/Reference0/status503. Original child rejected at wall1793991954658 with began1793991949593/until1793991954593: 5065ms, 65ms over original5000. Aggregate observer HTTP504/611859240B. Its exact child operation and split native/validation cost cannot be established from that job's insufficient per-child markers. Do not attribute it to consume+grant or pairing by inference. This is not a positive principal result.
+Other native cases genuinely reached complete1. Foreign metadata rejected; duplicate lookup list1/get2/peak2; unknown reference had native reference row1 and no redirect/repeat; held lookup retained original outward ACK and denied otherRoot until settlement; aborted reference sync preserved reference1 without late redirect.
+Artifact13532234922, 7284015B, sha256b951fa8657d4bb09127f884f3f756dd0af904a3dace152cf5df2118f24f0ba72, corrected scripts/metafiles path. No claim of final validation.
+Selfreview (separate from observed failures) found explicit timestamp type coercion and missing self.get/getAlarm lifetime pins; approved fixes and passive durability/child/HTTP diagnostics motivated the next checkout. No timeout/guard/functional phase boundary was reduced to mask this failure.
+
+## Intermediate second qualification: principal passed, two hold-premise failures
+
+Source4ff7163c582258920548a04a55706c371c34b6d3/tree4338d43418afcba0e77fc268affc4d04efc4ab11; codeceeffc419f8cef152474ca1692719959fc7c934c. Run42278023548/job128099352683/attempt1,19:15:31Z–19:22:39Z: executed16/pass14/fail2/cancel0/skip0/todo0, exit1; changed-filelint PASS.
+Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42278023548
+Principal PASS: complete1/reference1/direct readback1, then actual M token/MCP/NoticeLink. GET9288ms/POST12361ms, readonlychild919ms, consume+grantchild3744ms with eight source-pairs434–456ms, pairing1800ms. All before original deadlines. Other passed negatives: foreign metadata, duplicate correlation and unknown reference ACK.
+Both hold tests failed in their FIRST marker wait (native test lines27 and36), before either hold was observed. They are NOT retention passes. Secondary closed-parent messages do not independently identify the first cause.
+Artifact13533618905,7313295B,digest87508d09e81aefc5ad8c6be2efd42ff5092c4fbb4293595c961e69401c252173. Inline manifest uploaded/downloaded/verified exactly30 files and6 native graphs; lint8paths PASS. No product clock/guard reduction.
+
+## Authorized two-case DIAGNOSTIC
+
+Source864b583913b0f5844a06ce580cf05acb8418dd3f/tree3fd2af08c9ee80c291dfbda72f856eb53585fe36. Run42279840913/job128105646728/attempt1,19:27:53Z–19:31:12Z. Expected/executed2,pass0/fail2/cancel0/skip0/todo0,exit1,157053.274706ms. This was DIAGNOSTIC, never final GREEN. Only timeout evidence preservation changed; product,20ms polling and clocks were unchanged.
+Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42279840913
+Both completeWrites0/completeNormal0/held=false/lookupChild=null/list0/get0; SDK suffixes stop at Root/ExpectedGrant plus begin/approve SEND+observed, with no sdk_complete SEND.
+Exact exhausted original child: consume+grant,5060ms and5039ms,aborted=true. Six already-finished source-pairs consumed799/800/775/768/769/765ms and793/792/767/791/768/759ms respectively before5s cutoff; normal second-run principal had eight pairs434–456ms in3744ms total. GET(no polling)9657/9732ms; POST(with full polling)10725/10788ms before returning503. These are actual invocation/pair measurements, not real-account provider latency. The initial G1 overshoot still lacks an exact operation marker and is not retrospectively assigned to this group.
+The new diagnostic proved the intended fault was never reached because this pre-SDK group expired. The test's original polling requested full growing child/activeMetric trees and SDK rows, including a native storage.list, every20ms. Root authorized correcting this observation mechanism: fixed signalsOnly boolean returns synchronously exactly {held,actualSettled}, with no storage/metric-tree access; full default remains for assertions/evidence and one sanitized timeout snapshot. No product budget repair is claimed.
+Root also approved a passive actual QA302 marker after the tested critical span, with readback-before302 assertion. No I/O or Response mutation at that marker.
+Diagnostic artifact13534643461,2432019B,digest36cf404c3e71b8498b603b88b085f51f3bc10b9dd82309eb39c5bf832354f3a1; actual download readback11files2graphs and changed-filelint PASS. Last states were sanitized; no raw rows/headers/codes/tokens/bodies were printed.
+
+## Final GREEN and evidence readback
+
+Final tested Source=f2137bb10c599b12cef2952dd5c8efdaf301e259/treea378afd61b213c4d4e568352f9e1e2af9c66b76d; final code/test candidate48e4ca767b23732f259aece16854610e23545f98/treedf980bed1beb9a0eddf25899638e9a8e12431895. All production blobs are unchanged from second qualification; only the authorized fixture observation correction and passive response-order assertion changed.
+Run42280666925/job128108468790/attempt1 SUCCESS,19:33:29Z–19:38:54Z. Executed top-level16 (10contract+6native), nested0,pass16/fail0/cancel0/skip0/todo0,exit0;296711.574668ms. Exact changed-filelint8paths passed with no lint output/errors/warnings. Primary: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42280666925
+Artifact13535307870,7324309B,digest89e96c77772c13d93ec7b16cf167409d403ec7e9b32166e0f19cd7796906c0ac,expires2026-11-13T19:38:48Z. Same job downloaded the uploaded artifact and independently compared32 manifest-listed files plus the manifest itself;6 actual native builder graphs, all hashes/bytes exact. Steps inventory/upload/download/verify all SUCCESS, before qualifier removal.
+Artifact: https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/42280666925/artifacts/13535307870
+
+Principal completeWrites1/completeNormal1/reference1/exact direct readback1/status302, metadata exact. Native order is actual grant put -> actual complete normal -> readonly list/get -> reference put fulfilled -> native transaction fulfilled -> sync fulfilled -> direct readback fulfilled -> actual QA302. The marker performs no I/O and returns the same Response. Actual token M exchange, actual MCP summary and actual GET/POST NoticeLink passed afterward.
+Principal original GET9254ms/POST12026ms, each <=30000ms; readonly child714ms; consume+grant3612ms. M measured c49303bee6b3a97fa1e022bfb697bb2e94fd1e37bcdd925ae9d86c774537cc32/1988061B; initial->connection same actual bytes asserted without a c493 premise. Principal QA measured ffe028f7d5cc2db083507b0ea456032af33ee9325f4864da75877448820cf960/2392030B. All six current M/QA scripts/metafiles are preserved; QA hashes differ with SYN anchors/fixture times and are not treated as operational source authority.
+Principal aggregate factual/observer HTTP before reference assertion672responses/816239328B; downstream final854/1037304146B. These are cumulative repeated SYN body bytes, not real provider traffic, physical bandwidth, operational capacity or an SLA. Per-native-call spans/body-read guard metrics remain in artifact; elapsed whole source-pair is not equated to network time.
+
+| Case | Response | Actual complete | Reference rows/readbacks | KV lists/gets/peak | consume+grant ms | readonly actual ms |
+| --- | --- | --- | --- | --- | --- | --- |
+| principal-before-reference-assert | 302 | 1 | 1/1 | 1/1/1 | 3612 | 714 |
+| foreign-metadata | 503 | 1 | 0/0 | 1/1/1 | 2894 | 358 |
+| duplicate | 503 | 1 | 0/0 | 1/2/2 | 2771 | 355 |
+| unknown-reference | 503 | 1 | 1/0 | 1/1/1 | 3317 | 1165 |
+| held-lookup-ack | 503 | 1 | 0/0 | 1/0/1 | 2970 | 5024 retained/aborted |
+| aborted-reference-sync | 503 | 1 | 1/0 | 1/1/1 | 3000 | 714 |
+
+Duplicate peak2 proves two concurrent native gets remain bounded; every actual list uses100. Across all cases actual lists<=2/gets<=200/peak<=2. The fixed cases exercise one native list and up to two gets, not an assertion that arbitrary users fit two pages.
+Held lookup reached actual SDK complete and the intended postnative ACK hold. Same-ctx other genuine LIVE Root denied before and after logical child expiry; after real outward-chain settlement availability returned. Late lookup emitted zero gets. Its5024ms is the retained actual chain ending after logical5s expiry, not an extended admission/deadline or a physically pending native KV call.
+Aborted reference case reached actual complete, actual reference transaction+sync fulfillment, then held sync ACK and genuine native Request abort. Reference persisted but readback0, no302, no duplicate SDK effect; final reference child actual73ms/aborted=true. Other same-ctx Root denied until the original held chain settled. No ACK reconstructed from readback or global drain claim.
+With lightweight signal polling, corresponding consume+grant children were2970ms (held lookup) and3000ms (aborted sync), versus5060/5039ms in DIAGNOSTIC with full metric/storage polling. Both intended holds were reached. This verifies the narrower test-observation mechanism under these runs; it does not repair or qualify the product's original5s budget for real operations. The first G1 overshoot remains a separate unknown cause and operational risk.
+
+Total recorded qualification executions: RED1 + intermediate16 + intermediate16 + diagnostic2 + final16 =51. Final16 is the only complete accepted candidate result; do not combine passes across failed runs.
+
+
+## Actual versus SYN and limits
+
+Actual in GitHub Actions: pinned checkout, actual current builder graphs and bytes, ephemeral Miniflare/workerd, real SDK1.2.1 begin/approve/complete, native KV/D1/DO transaction/sync/get, actual fixed firstConnection/owner handlers and M token/MCP/NoticeLink pipelines when explicitly reported passing. Native Request AbortController and original promise retention are real within that test isolate.
+SYN: history/provider/custody/Access signing inputs/approval clock fixtures and account data, cloud provider responses/uploads/pointers and all business subjects. No deployed SDK account, real provider effect, real Source/Access renewal or human consent is established.
+The complete normal result is never reconstructed from a journal. Metadata/ref and test facts never confer operational permission. Original held ACK chains settle before same-ctx availability is accepted; no distributed/global drain or namespace absence proof is claimed.
+Known limits: scoped16 tests, not full integration/publish gates; finite own-subject enumeration blocks on excess/unknown rather than proving two pages cover arbitrary users. High aggregate SYN observer HTTP volume and observed original5s sensitivity remain operational risks even after a later scoped pass. No incidental SDK/dependency upgrade or guard removal.
+operationalReadiness=false; completePackage=false; PCoff=false; globalNativeDrainVerified=false; sdkNamespaceEmptyVerified=false. Task2 is not begun. Fresh Root review is required before Task2.
+
+## Warnings
+
+Preserved without upgrades: SDK CIMD/global_fetch_strictly_public notice under existing profiles; existing workerd RPC-stub disposal warning during fixture flow; npm deprecations for @esbuild-kit/esm-loader, @esbuild-kit/core-utils and eslint9.39.4; Actions punycode/legacy url.parse/Buffer() deprecations and Node20-target actions forced to Node24. These are not granted capabilities or hidden failures. Exact final lint/test warnings appear in final primary logs.
+
+## Exact path blobs and sequential Source preservation
+
+Pre-report HEAD28b85fa0e81a66c515a58a68342f2a612be3e3e1/tree9826087a641bcf1a5ae3a90c72656d75a1ad5ddc. Qualifier33b0fffb39d11791418c751393412406005493b8 removed only after terminal final job/artifact readback. Deletion independently verified sole parentf2137bb10c599b12cef2952dd5c8efdaf301e259/exact one removed path, final ref, recursive-tree absence and all3172 other blobs unchanged.
+
+| Path | BASE blob | Final tested blob (unchanged after qualifier retirement) |
+| --- | --- | --- |
+| lib/mcp-qa-finite-owner-cleanup.mjs | new | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 |
+| lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs | 9231a1fbe60b6b2f3ebebc6bfa6b50f42ec916db | 2fad787bd05736a17cf013f41aa143264298afd2 |
+| lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | b97d32e843a7829027121faec282370aab8ab589 | ee0b6c1c3730855a4be975789d990517dffa81aa |
+| lib/mcp-qa-finite-owner-phase-context.mjs | e482ad1617adc001c3a32c94e71eeb41d27f3d1d | 7eb8f28760de60f143e487eeb6988705059a0a44 |
+| test/fixtures/finite-initial-entry-world.mjs | 297b57846bbbe13bfc80ac52c5b033a382aef4b6 | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 |
+| test/fixtures/finite-owner-cleanup.mjs | new | 391747fb10cfecf568c921428a40424e763c66b1 |
+| test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | new | 077c8ceedf6b9689d2ddf840ad60325fc34250eb |
+| test/mcp-qa-finite-owner-sdk-reference.test.mjs | new | 941ef8abc355a5df971cf10738507ba76aac830c |
+
+All writes through retirement (every write independently checked sole parent=prior HEAD, exact one own path, new ref/blob/content; deletion checked recursive absence/all other blobs):
+| # | Path | Commit | Result blob | Tree |
+| --- | --- | --- | --- | --- |
+| 1 | test/fixtures/finite-owner-cleanup.mjs | a8d4cff18ad68a4afb74aece0d74a124d9aa9675 | d70decbe813dce8948125ff177471dd458f36e8d | 3070979066952013955412680195d8715666e917 |
+| 2 | test/fixtures/finite-initial-entry-world.mjs | 819a2ba68bc1f9f99a33cc0c997940c9544fdb04 | 302bd34f641ff6d2f7998b08633db0adcd1c5aa7 | 278b36f9a7cc096cf59a3dd4046c66c79aebe8df |
+| 3 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 5131830c09c3395b4d82243ef4734061ae564ed4 | 39eeeb58a9a8260a94bbdf8a86dea51d28a9a341 | fbe6e8f0ee8315e8d004dcc732da67941918bd99 |
+| 4 | .github/workflows/afw-owner-restoration-qualification.yml | 74086e7b0a9df597274ec0a11386f58daab1c904 | d357bfcb3ff14bcdb6f705f98aea577758724cd2 | de7294f82ca761867618aaedb424f9cf65f6a4d1 |
+| 5 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | b8ac637bae90505d9bf9d77fb9c65c93bf795db0 | c574034470a6e402efb10bfe3f736a2677e31c68 | 91d977b2e841fbe2f5df8bdf91b71479f4489681 |
+| 6 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 6db444ad00043caf0124c097bfe393841a583904 | 2ed8a7f7fb116df44c61f704585f8fd25a25b496 | 2c46d7601126ce7e658713672dbcf2a5e7f03ff9 |
+| 7 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | bea0090dd9247c6772c1d203e86cb1bfe8ad904e | 554110b4b6b408d7b337560ce3ec34c9817b0524 | 432404f289f18bf8e55d2ea78453071f0b5f4b3d |
+| 8 | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | 0d53eb3a3e8c6f58148a4e1a50927e8642f5f662 | f31ce20788633244078bd17082682f7869c95f68 | aa62a847a775f621bb360d7a25c6a6620e8cc007 |
+| 9 | lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs | 4b6df952b5c0054a7dc9a02fdb5244cfd2649b6f | 2fad787bd05736a17cf013f41aa143264298afd2 | 503591cb739a29e86912c1ca60fd0fddcd091bb2 |
+| 10 | lib/mcp-qa-finite-owner-cleanup.mjs | 2df03fef501974147dff11a5e8b76addfe87934f | 79b50e1a1202d5cb92c40283bb3cece3cb0b012a | bdf60976f84c472646dd8eb89250bb8c1ab24e8a |
+| 11 | lib/mcp-qa-finite-owner-phase-context.mjs | 8f7d6185305e56a719d52ffb593186502227912d | 7eb8f28760de60f143e487eeb6988705059a0a44 | a560a59f014ce410bfee9408e225e31027822bbb |
+| 12 | .github/workflows/afw-owner-restoration-qualification.yml | f7f7431ee6810b40b5b24824755e19acaa882c6d | 5f33bc3eb793af6a1b9fca55aaac4d51149bf979 | 8dc7758bb7e446336d7656acbdc0033c593cfe07 |
+| 13 | lib/mcp-qa-finite-owner-issuer-provenance-records.mjs | 201fa4a7dd8e4ab378ee3ff7b90a50494b5f6ddf | ee0b6c1c3730855a4be975789d990517dffa81aa | 42700674b200351ff7b03d04e8356d58193b6155 |
+| 14 | lib/mcp-qa-finite-owner-cleanup.mjs | d60eaff1cd52e9d5451877eba3eba908b87e4de5 | 44b5906757b19f47933c6c6f9f85ed2abd15d9f3 | f80e24ea31e9ffc8d94bc3783d33b9764df55a30 |
+| 15 | test/mcp-qa-finite-owner-sdk-reference.test.mjs | 6b039d5f2cf841818905bf62fffd1e17c68cb4bb | 941ef8abc355a5df971cf10738507ba76aac830c | 3d93e190e2c75cc24a167502e8ec38c45735687d |
+| 16 | test/fixtures/finite-owner-cleanup.mjs | e3b8324a9aaea958268f26ee7a4e3773f751d593 | db2c43b93a2694a751385ca57b3037647d02a08a | 60b540760fc1bccaffa993e6d6779f5ff0c07b6e |
+| 17 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | ceeffc419f8cef152474ca1692719959fc7c934c | 095d78940d2157790698fa05ec25793fa85910b5 | afff056ec70f6e3f4b1e4cfe8a50107d605b55f2 |
+| 18 | .github/workflows/afw-owner-restoration-qualification.yml | 4ff7163c582258920548a04a55706c371c34b6d3 | 99c48aed1442bfe92ae3f88482da5d7372f84563 | 4338d43418afcba0e77fc268affc4d04efc4ab11 |
+| 19 | test/fixtures/finite-owner-cleanup.mjs | 21b6bc8b719128239101fb04c89619649cb1acb3 | 529e9116da131056fdd07ea40e0e75b8d3141142 | 45d966fd76e69c1b97382a14f4426e32bef4b61c |
+| 20 | .github/workflows/afw-owner-restoration-qualification.yml | 864b583913b0f5844a06ce580cf05acb8418dd3f | e801670b0d643dc75824d9d3c57e68f5a6a0b5e8 | 3fd2af08c9ee80c291dfbda72f856eb53585fe36 |
+| 21 | test/fixtures/finite-owner-cleanup.mjs | b7870f6b7e396bc17f968a87fac276a0413ac836 | 391747fb10cfecf568c921428a40424e763c66b1 | 45fe752fd53362bc0146c5c1558e953e0dfcef0d |
+| 22 | test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | 48e4ca767b23732f259aece16854610e23545f98 | 077c8ceedf6b9689d2ddf840ad60325fc34250eb | df980bed1beb9a0eddf25899638e9a8e12431895 |
+| 23 | .github/workflows/afw-owner-restoration-qualification.yml | f2137bb10c599b12cef2952dd5c8efdaf301e259 | 33b0fffb39d11791418c751393412406005493b8 | a378afd61b213c4d4e568352f9e1e2af9c66b76d |
+| 24 | .github/workflows/afw-owner-restoration-qualification.yml | 28b85fa0e81a66c515a58a68342f2a612be3e3e1 | removed | 9826087a641bcf1a5ae3a90c72656d75a1ad5ddc |
+
+No unknown write/ref interference occurred. No GraphQL retry/auth change/force/CLI/main write. A few orchestration calls were interrupted before dispatch by controller messages; the next reads verified ref unchanged before any write. No mutation result was unknown and no blind retry was used.
+
+
+## Selfreview, preservation and handoff
+
+Full BASE..tested-HEAD patches and all added/modified own files were self-reviewed. Retention, correlation, readonly limits/sticky failure, exact response order, partial eight-row compatibility, unknown ACK and unchanged closure boundaries were checked against the binding brief. Selfreview fixes were exercised by final16. Existing firstConnection engine and all other source paths were preserved.
+Full recursive tree comparison (not just a changed-file list), untruncated: BASE3168blobs -> pre-report3172blobs; exactly8 authorized JavaScript paths differ (4existing/4new);3164 protected BASE blobs identical; no unexpected path; qualifier absent. Report creation adds only its exact authorized docs path, and the containing commit/final ref/full tree are independently checked after write. Main was last verified0c9c475b3ebaa970fc11d628b40e50a90cceb727 and is rechecked in the final receipt. Source tests/production blobs match final GREEN exactly after qualifier retirement/report.
+All build/test artifacts reside in the authorized GitHub Actions destination with seven-day retention. No project files, caches, dependencies or persistent processes were created locally. No remote runtime state or historic project records were changed. Reversal material is the exact prior commits/blobs in the CAS table, with existing history intact.
+Status for Root: DONE_WITH_CONCERNS, pending independent review. Concerns: RED graph artifact omission; initial G1 original-child latency cause unknown; high repeated SYN observation volume; scoped coverage and preserved external/fixture warnings. None authorizes runtime, Task2 or Unit2b closure.
+
+The report's containing commit is the final Source HEAD. Its own commit hash cannot be embedded self-referentially in its contents: exact final HEAD/tree/report blob and independently verified parent/ref/content/full-tree receipt are supplied in the handoff to Root for durable recording on the separate Rootdocs branch. No Source writes after that verified report handoff. No ledger Root edits, new chats, merge, publication, runtime operation or Task2.

````

### lib/mcp-qa-finite-owner-cleanup.mjs

````diff
diff --git a/lib/mcp-qa-finite-owner-cleanup.mjs b/lib/mcp-qa-finite-owner-cleanup.mjs
--- a/lib/mcp-qa-finite-owner-cleanup.mjs
+++ b/lib/mcp-qa-finite-owner-cleanup.mjs
@@ -0,0 +1,99 @@
+import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
+import {captureFinitePreparationIssuerContext,createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
+import {createFiniteOwnerIssuerProvenanceJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
+import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
+import {readPrivateQaFiniteOwnerContext} from './mcp-qa-finite-owner-phase-context.mjs';
+import {readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
+import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
+import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
+const fail=()=>{throw Error('Finite owner SDK grant unavailable');};
+const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
+/** Private, single-call readonly facade. Sticky denial stops queued I/O; started
+ * native promises remain retained through actual settlement, including failures.
+ * SDK1.2.1 may paginate legacy keys and fan out get() internally. */
+function readonlyGrantKv(alias,methods,subject,guard){
+ const prefix='grant:'+subject+':',queue=[];let active=0,lists=0,gets=0,failed=null,nextCursor;
+ const stop=error=>{failed??=error;for(const q of queue.splice(0))q.reject(failed);};
+ const check=()=>{if(failed)throw failed;guard();};
+ const pump=()=>{
+  while(active<2&&queue.length){
+   try{check();}catch(error){stop(error);return;}
+   const q=queue.shift();active++;
+   const actual=retain(Promise.resolve().then(()=>{
+    check();const native=Reflect.apply(methods[q.method],alias,q.args);return retain(native);
+   }));
+   actual.then(value=>{
+    try{check();
+     if(q.method==='list'){
+      if(!value||!Array.isArray(value.keys)||value.keys.length>100||typeof value.list_complete!=='boolean'||value.keys.some(k=>typeof k?.name!=='string'||!k.name.startsWith(prefix))||!value.list_complete&&(typeof value.cursor!=='string'||!value.cursor||value.cursor.length>2048))fail();
+      nextCursor=value.list_complete?undefined:value.cursor;
+     }
+     q.resolve(value);
+    }catch(error){stop(error);q.reject(error);}
+   },error=>{stop(error);q.reject(error);}).finally(()=>{active--;pump();}).catch(()=>{});
+  }
+ };
+ const enqueue=(method,args)=>{
+  try{
+   check();
+   if(method==='list'){
+    const v=own(args[0]);fields(v,['prefix',...Object.hasOwn(v,'limit')?['limit']:[],...Object.hasOwn(v,'cursor')?['cursor']:[]]);
+    if(v.prefix!==prefix||Object.hasOwn(v,'limit')&&v.limit!==100||v.cursor!==nextCursor||lists>=2)fail();lists++;
+    args=[{...v,limit:100}];
+   }else{
+    if(typeof args[0]!=='string'||!args[0].startsWith(prefix)||!/^[A-Za-z0-9_-]{16}$/.test(args[0].slice(prefix.length))||canonical(own(args[1]))!==canonical({type:'json'})||gets>=200)fail();gets++;
+   }
+   return retain(new Promise((resolve,reject)=>{queue.push({method,args,resolve,reject});pump();}));
+  }catch(error){stop(error);return Promise.reject(error);}
+ };
+ return Object.freeze({list:options=>enqueue('list',[options]),get:(key,options)=>enqueue('get',[key,options])});
+}
+/** Factual SDK summary only. Genuine original request Root and its current child
+ * remain live throughout; no writer, selector from caller, or exported facet. */
+export async function readPrivateQaFiniteOwnerSdkGrant(options,lease){
+ fields(options,['ctx','env','preconnectionId','parent']);
+ const {ctx,env,preconnectionId,parent}=options;
+ if(!hex(preconnectionId)||readFiniteOwnerRequestContext(parent).root!==parent||lease===parent)fail();
+ fields(lease,['signal','assertCurrent']);const signal=lease.signal,assertCurrent=lease.assertCurrent,parentSignal=parent.signal,parentAssert=parent.assertCurrent,deadline=readFiniteOwnerRequestContext(parent).deadline;
+ const c=captureFinitePreparationIssuerContext({ctx,env}),alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
+ const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,getAlarm=c.storage?.getAlarm;
+ const node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},db=env.RELEASE_DB,prepare=db?.prepare,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
+ if([assertCurrent,selfGet,getAlarm,...Object.values(methods),...Object.values(nodeMethods),prepare].some(v=>typeof v!=='function')||!(signal instanceof AbortSignal))fail();
+ let ceiling=deadline;
+ const guard=()=>{
+  current(parent);current(lease);c.holders();
+  if(options.ctx!==ctx||options.env!==env||options.parent!==parent||options.preconnectionId!==preconnectionId||lease.signal!==signal||lease.assertCurrent!==assertCurrent||parent.signal!==parentSignal||parent.assertCurrent!==parentAssert||readFiniteOwnerRequestContext(parent).deadline!==deadline||Date.now()>=ceiling||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||c.storage.getAlarm!==getAlarm||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.RELEASE_DB!==db||db.prepare!==prepare||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
+ };
+ const wait=async promise=>{const value=await retain(promise);guard();return value;};
+ guard();
+ return observeFiniteFactualReadWork({ctx,env,originalLease:lease,requestLease:parent},async()=>{
+  const source=await wait(readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId})),anchors=await wait(readPrivateQaFiniteInitialAnchors({ctx,env},lease));
+  const sdk=await wait(createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read({preconnectionId},lease)),issuer=await wait(createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease));
+  const root=sdk.root,expectedGrant=sdk.grant,complete=sdk.operations.sdk_complete,identity=issuer.reservation?.identity,capsule=anchors.capsule;
+  if(!root||!expectedGrant||!complete.send||!complete.observed||!identity||issuer.freeze||issuer.operations.grant.ack?.outcome!=='applied'||source.source.phase!=='read_consent'||source.preconnectionId!==preconnectionId||capsule.preconnectionId!==preconnectionId||source.capsuleHash!==capsule.capsuleHash||root.capsuleHash!==capsule.capsuleHash||root.enrollmentHash!==identity.enrollmentHash||root.actorId!==c.actorId||root.qaVersionId!==c.qa||root.sourceRevision!==source.source.sourceRevision||root.mVersionId!==source.source.currentPublication.versionId||identity.subject!==anchors.material.ownerSelection.subject||identity.clientId!==source.source.clientId||identity.resource!==source.source.resource||identity.projectId!==source.source.project.projectId||identity.projectRevision!==source.source.project.revision||anchors.alarm!==capsule.C0)fail();
+  ceiling=Math.min(ceiling,root.C0,Date.parse(identity.consentExpiresAt),Date.parse(expectedGrant.expiresAt));guard();
+  const correlationHash=finiteOwnerSdkCleanupCorrelation({root,expectedGrant,completeSend:complete.send,identity}),metadataValue={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}};
+  const facet=readonlyGrantKv(alias,methods,identity.subject,guard),api=new OAuthAuthorizationServer({issuer:source.source.origin,resources:[identity.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:facet}));
+  let cursor,found=null;
+  do{
+   guard();const result=await wait(api.listUserGrants(identity.subject,{limit:100,...cursor===undefined?{}:{cursor}}));
+   if(!result||!Array.isArray(result.items)||result.items.length>100||result.cursor!==undefined&&(typeof result.cursor!=='string'||!result.cursor||result.cursor.length>2048))fail();
+   for(const input of result.items){
+    // Read real own SDK properties before normalizing only undefined expiry.
+    const summary={};for(const key of ['id','clientId','userId','scope','metadata','createdAt','expiresAt','redirectUri','resource']){
+     const d=Object.getOwnPropertyDescriptor(input,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();summary[key]=key==='expiresAt'&&d.value===undefined?null:d.value;
+    }
+    if(Reflect.ownKeys(input).length!==9)fail();const value=own(summary);
+    if(canonical(value.metadata)!==canonical(metadataValue))continue;
+    if(found||typeof value.id!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(value.id)||value.userId!==identity.subject||value.clientId!==identity.clientId||value.resource!==identity.resource||canonical(value.scope)!==canonical(expectedGrant.scopes)||!Number.isSafeInteger(value.createdAt)||value.createdAt<Math.floor(complete.send.issuedAt/1000)||value.createdAt*1000>=complete.send.deadline||value.createdAt*1000>Date.now()||value.expiresAt!==null&&(!Number.isSafeInteger(value.expiresAt)||value.expiresAt<=value.createdAt)||typeof value.redirectUri!=='string'||value.redirectUri.length>4096)fail();
+    found=value;
+   }
+   cursor=result.cursor;
+  }while(cursor!==undefined);
+  if(!found)fail();guard();
+  const again=await wait(readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId})),after=await wait(readPrivateQaFiniteInitialAnchors({ctx,env},lease)),afterSdk=await wait(createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read({preconnectionId},lease)),afterIssuer=await wait(createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease));
+  if(canonical(again)!==canonical(source)||canonical(after)!==canonical(anchors)||canonical(afterSdk)!==canonical(sdk)||canonical(afterIssuer)!==canonical(issuer))fail();guard();
+  return Object.freeze({rootHash:root.recordHash,expectedGrantHash:expectedGrant.recordHash,completeSendHash:complete.send.recordHash,completeObservedHash:complete.observed.recordHash,correlationHash,sdkGrantId:found.id,createdAt:found.createdAt,expiresAt:found.expiresAt});
+ });
+}

````

### test/fixtures/finite-owner-cleanup.mjs

````diff
diff --git a/test/fixtures/finite-owner-cleanup.mjs b/test/fixtures/finite-owner-cleanup.mjs
--- a/test/fixtures/finite-owner-cleanup.mjs
+++ b/test/fixtures/finite-owner-cleanup.mjs
@@ -0,0 +1,79 @@
+import assert from 'node:assert/strict';
+import {createHash} from 'node:crypto';
+import {mkdir,writeFile} from 'node:fs/promises';
+import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
+import {initialEntryHarness} from './finite-initial-entry-world.mjs';
+import {plain,approveFirstConnection,readFirstConnectionProbe} from './finite-first-connection-publication.mjs';
+import {sealFiniteOwnerIssuerProvenanceRecord as seal} from '../../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {sealFinitePreparationIssuerRecord as issuerSeal} from '../../lib/mcp-qa-finite-preparation-issuer-records.mjs';
+export const O='https://delegated-canary.agentfriendlyweb.dev';
+export function extendFiniteOwnerCleanup(entry){
+ const methods="\n async ownerReferenceConfigure(mode='normal'){\n  this.ownerReferenceRestore?.();const kv=this.env.AFW_FINITE_OWNER_OAUTH_KV,s=this.ctx.storage,native={get:kv.get,list:kv.list,put:kv.put,storageGet:s.get,sync:s.sync,transaction:s.transaction};\n  const state=this.ownerReferenceState={mode,completeWrites:0,completeNormal:0,lists:0,gets:0,active:0,peak:0,held:false,released:false,actualSettled:false,abort:false,referenceCommits:0,referenceSyncs:0,referenceReadbacks:0,requests:[],children:[],trace:[]};globalThis.__r1ReferenceState=state;let referencePending=false;\n  const held=value=>{state.held=true;return new Promise(resolve=>{const tick=()=>{if(state.released){state.actualSettled=true;resolve(value);return;}setTimeout(tick,10);};tick();});};\n  this.ownerReferenceRestore=()=>{kv.get=native.get;kv.list=native.list;kv.put=native.put;s.get=native.storageGet;s.sync=native.sync;s.transaction=native.transaction;globalThis.__r1ReferenceState=null;};\n  kv.put=async(key,raw,...more)=>{\n   if(!key.startsWith('grant:'))return Reflect.apply(native.put,kv,[key,raw,...more]);\n   state.completeWrites++;state.trace.push('actual-grant-put');\n   if(mode==='foreign-metadata'){const value=JSON.parse(raw);value.metadata={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:'f'.repeat(64)}};raw=JSON.stringify(value);}\n   const actual=Reflect.apply(native.put,kv,[key,raw,...more]),result=await actual;\n   if(mode==='duplicate'){const value=JSON.parse(raw),id=value.id==='AAAAAAAAAAAAAAAA'?'BBBBBBBBBBBBBBBB':'AAAAAAAAAAAAAAAA';value.id=id;await Reflect.apply(native.put,kv,[key.slice(0,key.lastIndexOf(':')+1)+id,JSON.stringify(value),...more]);}\n   return result;\n  };\n  for(const method of ['get','list'])kv[method]=async(...args)=>{\n   const grant=method==='get'?String(args[0]).startsWith('grant:'):String(args[0]?.prefix).startsWith('grant:');\n   if(!grant)return Reflect.apply(native[method],kv,args);\n   state[method==='get'?'gets':'lists']++;if(method==='list'){if(args[0].limit!==100)throw Error('SYN native list limit');state.nativeListLimit=args[0].limit;}state.active++;state.peak=Math.max(state.peak,state.active);\n   const actual=Reflect.apply(native[method],kv,args);let value;try{value=await actual;state.trace.push('actual-'+method+'-settled');}finally{state.active--;}\n   // Held outward ACK chain AFTER native settlement; not physical KV latency.\n   if(method==='list'&&mode==='hold-lookup-ack'&&!state.held)return held(value);\n   return value;\n  };\n  s.transaction=(callback,...args)=>{\n   let wrote=false;const actual=Reflect.apply(native.transaction,s,[async tx=>{\n    const put=tx.put;tx.put=async(key,raw,...rest)=>{const value=await Reflect.apply(put,tx,[key,raw,...rest]);if(String(key).endsWith(':reference')){referencePending=true;wrote=true;state.trace.push('reference-put-native-settled');}return value;};return callback(tx);\n   },...args]);\n   return actual.then(value=>{if(wrote){state.referenceCommits++;state.trace.push('reference-transaction-native-settled');}return value;});\n  };\n  s.get=async(...args)=>{const value=await Reflect.apply(native.storageGet,s,args);if(String(args[0]).endsWith(':reference')&&value!==undefined&&state.referenceSyncs){state.referenceReadbacks++;state.trace.push('reference-readback-native-settled');}return value;};\n  s.sync=async(...args)=>{const actual=Reflect.apply(native.sync,s,args),value=await actual;if(referencePending){referencePending=false;state.referenceSyncs++;state.trace.push('reference-sync-native-settled');if(mode==='unknown-reference')throw Error('SYN reference sync ACK unknown');if(mode==='abort-reference-sync-ack')return held(value);}return value;};\n }\n async ownerReferenceObserve(signalsOnly=false){if(typeof signalsOnly!=='boolean')throw Error('SYN fixed signal projection');const state=this.ownerReferenceState??{};if(signalsOnly)return {held:state.held===true,actualSettled:state.actualSettled===true};return {...state,rows:[...await this.ctx.storage.list({prefix:'afw.finite-owner-issuer-provenance.v1:'})]};}\n async ownerReferenceControl(key){if(!['released','abort'].includes(key))throw Error('SYN control');this.ownerReferenceState[key]=true;}\n async ownerReferenceFetch(request,forward){\n  const state=this.ownerReferenceState;if(!state||request.url!=='https://afw-private.invalid/_finite-owner/authorize')return forward(request);\n  const began=performance.now(),startedAt=Date.now(),method=request.headers.get('x-afw-finite-original-method'),boundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));const controller=new AbortController(),abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});let done=false,timer;\n  const tick=()=>{if(done)return;if(state.abort){controller.abort();return;}timer=setTimeout(tick,10);};tick();\n  try{const response=await forward(new Request(request,{signal:controller.signal}));state.trace.push('native-authorize-response:'+response.status);return response;}finally{state.requests.push({method,startedAt,elapsedMs:performance.now()-began,wallElapsedMs:Date.now()-startedAt,budgetMs:boundary.deadline-boundary.startedAt,aborted:controller.signal.aborted});done=true;clearTimeout(timer);request.signal.removeEventListener('abort',abort);}\n }\n";
+ const marker=' export class Initial extends FiniteClosure{';assert.equal(entry.split(marker).length,2);
+ const original='actual=super.fetch(request);';assert.equal(entry.split(original).length,2);
+ return entry.replace(marker,()=>marker+methods).replace(original,()=>'actual=this.ownerReferenceFetch(request,r=>super.fetch(r));');
+}
+export function instrumentFiniteOwnerCleanup(source){
+ const marker="actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();";assert.equal(source.split(marker).length,2);
+ source=source.replace(marker,()=>marker+"if(op==='sdk_complete'&&globalThis.__r1ReferenceState){globalThis.__r1ReferenceState.completeNormal++;globalThis.__r1ReferenceState.trace.push('actual-sdk-complete-normal');}");
+ const lookup="const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));";
+ if(source.includes(lookup)){assert.equal(source.split(lookup).length,2);source=source.replace(lookup,()=>"const summary=await withChild(async l=>{const state=globalThis.__r1ReferenceState,at=performance.now(),metric={budgetMs:5000};if(state)state.lookupChild=metric;try{return await readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l);}finally{metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;}});");}
+ const child="const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});";
+ assert.equal(source.split(child).length,2);source=source.replace(child,()=>"const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const state=globalThis.__r1ReferenceState,at=performance.now(),metric={position,startedAt:Date.now(),deadline:until,steps:[]};if(state){state.children.push(metric);state.activeMetric=metric;}try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{metric.endPosition=position;metric.actualElapsedMs=performance.now()-at;metric.aborted=l.signal.aborted;if(state)state.activeMetric=null;activeChild=null;}});");
+ for(const marker of ["async function issuerCall(op,window,call){","async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){"]){assert.equal(source.split(marker).length,2);const name=marker.includes('issuerCall')?'op':'kind';source=source.replace(marker,()=>marker+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:"+name+",at:performance.now()});");}
+ const pair="(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});";assert.equal(source.split(pair).length,2);
+ source=source.replace(pair,()=>pair+"globalThis.__r1ReferenceState?.activeMetric?.steps.push({operation:'source-pair',elapsedMs:performance.now()-observedAt,at:performance.now()});");
+ const io="const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};";assert.equal(source.split(io).length,2);source=source.replace(io,()=>io+"io.enteredAt=performance.now();io.childStartedAt=globalThis.__r1ReferenceState?.activeMetric?.startedAt??null;");
+ const guard="io.reads++;io.bytes+=part.value?.byteLength??0;current(l);";assert.equal(source.split(guard).length,2);source=source.replace(guard,()=>"io.reads++;io.bytes+=part.value?.byteLength??0;const guardAt=performance.now();try{current(l);}finally{io.bodyGuardMs=(io.bodyGuardMs??0)+performance.now()-guardAt;}");
+ const settled="io.settled=true;}";assert.equal(source.split(settled).length,2);source=source.replace(settled,()=>"io.elapsedMs=performance.now()-io.enteredAt;io.settled=true;}");
+ return source;
+}
+export async function ownerReferenceFixture(t){
+ const f=await initialEntryHarness('first-connection-publication',{ownerCleanup:true});
+ t.after(async()=>{try{await f.stub.ownerReferenceControl('released').catch(()=>{});await f.stub.firstConnectionRestore();await f.stub.restoreMethods();}finally{await f.mf.dispose();await f.cleanup();}});
+ await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await f.mountFirstConnection();await f.stub.firstConnectionConfigure('normal');
+ const initial=f.firstConnectionBuild.M;assert.equal(initial.sha256,f.resident.module.sha256);assert(initial.inputs.includes('worker/mcp-own/finite.mjs'));
+ const connected=await approveFirstConnection(f);assert.equal(connected.status,200);await connected.body?.cancel();const probe=await readFirstConnectionProbe(f),receipt=JSON.parse(probe.rows.find(([k])=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt'))[1]);assert.equal(receipt.moduleHash,initial.sha256);
+ const closed=f.providerRegistry.versions[receipt.baselineVersionId],installed=f.providerRegistry.versions[receipt.versionId];assert.equal(installed.modules[0].content_base64,closed.modules[0].content_base64,'initial and connection share actual current bytes');
+ await f.adoptConnectionConfiguration({upstream:true});const context=await plain(f.stub.firstConnectionContext());assert.equal(context.source?.phase,'read_consent');f.source=context.source;
+ f.kv=await f.mf.getKVNamespace('OAUTH_KV','canary-first-connection');await f.kv.put('client:'+f.source.clientId,JSON.stringify({clientId:f.source.clientId,redirectUris:['https://client.example/cb'],clientName:'SYN reference client',grantTypes:['authorization_code'],responseTypes:['code'],tokenEndpointAuthMethod:'none',authMethodExplicit:true,registrationDate:Math.floor(Date.now()/1000)}));return f;
+}
+export async function prepareOwnerReference(f,fault='normal'){
+ await f.stub.ownerReferenceConfigure(fault);const verifier='v'.repeat(64),challenge=createHash('sha256').update(verifier).digest('base64url'),headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:f.choice.cookie};
+ const screen=await f.call('/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-reference-state',code_challenge:challenge,code_challenge_method:'S256'}),{redirect:'manual',headers});
+ assert.equal(screen.status,200);const text=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(text)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
+ const issue=()=>f.call('/authorize',{method:'POST',redirect:'manual',headers:{...headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});return {issue,headers,verifier};
+}
+export async function assertActualComplete(f,{reference=false}={}){
+ const observed=await plain(f.stub.ownerReferenceObserve()),rows=observed.rows;
+ assert.equal(observed.completeWrites,1,'one actual SDK grant effect');assert.equal(observed.completeNormal,1,'actual SDK complete fulfilled normally');assert(rows.some(([k])=>k.endsWith(':sdk_complete:observed')),'actual complete observation durable');
+ const ref=rows.find(([k])=>k.endsWith(':reference'));if(reference)assert(ref,'R1 missing durable SDK Reference AFTER actual completeAuthorization');return {observed,reference:ref?JSON.parse(ref[1]):null};
+}
+export async function recordOwnerReference(f,label,extra={}){
+ const o=await plain(f.stub.ownerReferenceObserve()),state=await plain(f.stub.firstConnectionState());
+ assert(o.lists<=2&&o.gets<=200&&o.peak<=2,'native KV calls stay within fixed budget');
+ const result={label,testRevision:process.env.GITHUB_SHA??null,M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes},completeWrites:o.completeWrites,completeNormal:o.completeNormal,referenceRows:o.rows.filter(([k])=>k.endsWith(':reference')).length,lists:o.lists,gets:o.gets,peak:o.peak,listLimit:o.nativeListLimit??null,trace:o.trace,requests:o.requests,children:o.children,lookupChild:o.lookupChild??null,referenceReadbacks:o.referenceReadbacks,sdkSuffixes:o.rows.map(([key])=>key.split(':').slice(2).join(':')),roots:(await plain(f.stub.firstConnectionProbe())).calls.map(c=>({method:c.originalMethod,windowMs:c.boundary.deadline-c.boundary.startedAt})),httpSpans:state.http.filter(v=>Number.isSafeInteger(v.childStartedAt)).map(v=>({kind:v.kind,bytes:v.bytes,elapsedMs:v.elapsedMs,bodyGuardMs:v.bodyGuardMs??0,childStartedAt:v.childStartedAt})),http:state.http.reduce((a,v)=>({requests:a.requests+1,bytes:a.bytes+v.bytes}),{requests:0,bytes:0}),completePackage:false,operationalReadiness:false,PCoff:false,custodyReal:false,...extra};
+ await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/'+label+'.json',JSON.stringify(result,null,2));console.info('R1 sanitized native marker',JSON.stringify(result));return result;
+}
+export async function downstreamOwnerReference(f,response,prepared){
+ const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);await response.body?.cancel();
+ const tokenResponse=await f.call('/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code,code_verifier:prepared.verifier})});assert.equal(tokenResponse.status,200);const token=await tokenResponse.json();assert.equal(typeof token.access_token,'string');
+ const client=new Client({name:'SYN-owner-reference',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
+ try{await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token.access_token,Host:new URL(O).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));const result=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.data.id,f.source.project.projectId);}finally{await client.close();}
+ const screen=await f.call('/monitoring',{headers:prepared.headers});assert.equal(screen.status,200);const html=await screen.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=screen.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
+ const posted=await f.call('/monitoring/grant',{method:'POST',headers:{...prepared.headers,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:f.choice.cookie+'; '+cookie},body:new URLSearchParams({handle})});assert.equal(posted.status,200);await posted.body?.cancel();
+ const rows=await plain(f.stub.snapshot()),root=JSON.parse(rows.find(([key])=>key.endsWith(':root')&&key.startsWith('afw.finite-owner-issuer-provenance.v1:'))[1]);assert(rows.some(([k])=>k==='connection-preparation:'+root.preconnectionId+':notice'));
+}
+export async function waitReferenceState(f,predicate){
+ const until=performance.now()+30000;for(;;){let v=await plain(f.stub.ownerReferenceObserve(true));if(predicate(v))return v;if(performance.now()>=until){v=await plain(f.stub.ownerReferenceObserve());const data={purpose:'afw.owner-reference-timeout-diagnostic.syn.v1',mode:v.mode,completeWrites:v.completeWrites,completeNormal:v.completeNormal,held:v.held,actualSettled:v.actualSettled,referenceCommits:v.referenceCommits,referenceSyncs:v.referenceSyncs,referenceReadbacks:v.referenceReadbacks,requests:v.requests,lookupChild:v.lookupChild??null,children:v.children,sdkSuffixes:v.rows.map(([key])=>key.split(':').slice(2).join(':')),lists:v.lists,gets:v.gets,peak:v.peak,trace:v.trace,operationalReadiness:false,completePackage:false,PCoff:false};await mkdir('output/owner-reference',{recursive:true});await writeFile('output/owner-reference/diagnostic-timeout-'+v.mode+'.json',JSON.stringify(data,null,2));console.info('R1 DIAGNOSTIC last collected state',JSON.stringify({...data,children:data.children?.map(c=>({ms:c.actualElapsedMs??null,aborted:c.aborted??null,operations:c.steps.filter(s=>s.operation!=='source-pair').map(s=>s.operation),sourcePairs:c.steps.filter(s=>s.operation==='source-pair').map(s=>s.elapsedMs)}))}));assert.fail('bounded native marker wait');}await new Promise(resolve=>setTimeout(resolve,20));}
+}
+export function syntheticSdkReferenceComponent(){
+ const h=x=>x.repeat(64),I0=1800000000000,C0=I0+900000,C1=C0+180000,qa='11111111-1111-4111-8111-111111111111';
+ const identity=issuerSeal('Identity',{preconnectionId:h('1'),enrollmentHash:h('2'),capsuleHash:h('3'),sourceRevision:'a'.repeat(40),qaVersionId:qa,actorId:h('4'),subject:'SYN-component-owner',accessRealmHash:h('5'),projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:O+'/mcp',authorizationHash:h('6'),grantId:'22222222-2222-4222-8222-222222222222',requestedScopes:['afw:project:read'],consentExpiresAt:new Date(C0).toISOString(),I0,C0,C1,reservedAt:I0+10});
+ const root=seal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:identity.preconnectionId,capsuleHash:identity.capsuleHash,enrollmentHash:identity.enrollmentHash,sourceRevision:identity.sourceRevision,actorId:identity.actorId,qaVersionId:qa,mVersionId:qa,originalConnectionReceiptHash:h('7'),I0,C0,C1,createdAt:I0});
+ const makeSend=(operation,bindingHash,at)=>seal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:root.recordHash,operation,originalRequestId:qa,originalRequestHash:'9'.repeat(64),issuedAt:at,deadline:at+5000,bindingHash});
+ const makeObserved=(send,at)=>seal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:h('9'),observedAt:at,outcome:'resolved'});
+ const begin=makeSend('sdk_begin',h('9'),I0+1),beginObserved=makeObserved(begin,I0+2),approve=makeSend('sdk_approve',identity.authorizationHash,I0+20),approveObserved=makeObserved(approve,I0+21);
+ const expectedGrant=seal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:identity.identityHash,reservationHash:h('a'),authorizationHash:identity.authorizationHash,grantId:identity.grantId,approvedRequestHash:approveObserved.resultHash,scopes:identity.requestedScopes,createdAt:new Date(I0+22).toISOString(),expiresAt:new Date(C0).toISOString()});
+ const completeSend=makeSend('sdk_complete',expectedGrant.recordHash,I0+23),completeObserved=makeObserved(completeSend,I0+24);return {identity,root,expectedGrant,completeSend,completeObserved,begin,beginObserved,approve,approveObserved};
+}

````

### test/mcp-qa-finite-owner-sdk-reference-native.test.mjs

````diff
diff --git a/test/mcp-qa-finite-owner-sdk-reference-native.test.mjs b/test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
--- a/test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
+++ b/test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
@@ -0,0 +1,43 @@
+import {plain} from './fixtures/finite-first-connection-publication.mjs';
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference,downstreamOwnerReference,waitReferenceState} from './fixtures/finite-owner-cleanup.mjs';
+test('R1 SDK reference is durable before redirect',{timeout:120000},async t=>{
+ const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f),response=await prepared.issue();
+ await recordOwnerReference(f,'principal-before-reference-assert',{status:response.status});
+ const {observed,reference}=await assertActualComplete(f,{reference:true});
+ assert.equal(response.status,302);assert.equal(observed.referenceCommits,1);assert.equal(observed.referenceSyncs,1);assert.equal(observed.referenceReadbacks,1);assert(observed.trace.indexOf('reference-transaction-native-settled')<observed.trace.indexOf('reference-sync-native-settled'));assert(observed.trace.indexOf('reference-sync-native-settled')<observed.trace.indexOf('reference-readback-native-settled'));assert(observed.trace.indexOf('reference-readback-native-settled')<observed.trace.indexOf('native-authorize-response:302'),'actual native QA302 follows exact reference readback');assert(observed.lookupChild.actualElapsedMs<5000);assert(observed.requests.every(r=>r.elapsedMs<30000&&r.budgetMs<=30000));
+ const keys=await f.kv.list({prefix:'grant:'});assert.equal(keys.keys.length,1);const actual=await f.kv.get(keys.keys[0].name,'json');
+ assert.deepEqual(actual.metadata,{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:reference.correlationHash}});assert.equal(actual.id,reference.sdkGrantId);assert.equal(actual.createdAt,reference.createdAt);assert.equal(actual.expiresAt??null,reference.expiresAt);
+ assert(observed.lists<=2&&observed.gets<=200&&observed.peak<=2);await downstreamOwnerReference(f,response,prepared);await recordOwnerReference(f,'principal-final',{tokenM:true,MCP:true,NoticeLink:true});
+});
+
+for(const [name,fault]of [
+ ['R1 foreign SDK metadata cannot redirect','foreign-metadata'],
+ ['R1 duplicate SDK correlation cannot redirect','duplicate'],
+ ['R1 unknown reference commit cannot redirect or repeat SDK','unknown-reference']
+])test(name,{timeout:120000},async t=>{
+ const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,fault),response=await prepared.issue();assert.notEqual(response.status,302);await response.body?.cancel();const result=await assertActualComplete(f);
+ if(fault==='unknown-reference')assert.equal(result.observed.referenceCommits,1,'native reference commit may exist after unknown sync ACK');
+ else assert.equal(result.reference,null);
+ const retried=await prepared.issue();assert.notEqual(retried.status,302);await retried.body?.cancel();assert.equal((await assertActualComplete(f)).observed.completeWrites,1,'no repeated SDK effect from ledger');
+ await recordOwnerReference(f,fault,{status:response.status,retryRedirect:false});
+});
+test('R1 held SDK lookup retains original scope',{timeout:120000},async t=>{
+ const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,'hold-lookup-ack'),pending=prepared.issue();await waitReferenceState(f,s=>s.held);
+ assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'another genuine LIVE Root same ctx denied during actual outward SDK ACK hold');
+ const response=await pending;assert.notEqual(response.status,302);await response.body?.cancel();
+ assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'logical child expiry does not drain original ACK promise');
+ await f.stub.ownerReferenceControl('released');await waitReferenceState(f,s=>s.actualSettled);await waitAvailability(f);
+ const {observed,reference}=await assertActualComplete(f);assert.equal(reference,null);assert.equal(observed.lists,1);assert.equal(observed.gets,0,'expired facet cannot emit queued gets after late ACK');
+ await recordOwnerReference(f,'held-lookup-ack',{postnativeAckHold:true,physicalKvPending:false,otherRootDenied:true,releasedByActualSettlement:true});
+});
+test('R1 aborted reference sync cannot return late redirect',{timeout:120000},async t=>{
+ const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,'abort-reference-sync-ack'),pending=prepared.issue();await waitReferenceState(f,s=>s.held);
+ assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.ownerReferenceControl('abort');
+ const response=await pending;assert.notEqual(response.status,302);await response.body?.cancel();assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'actual sync ACK still retained after genuine native request abort');
+ await f.stub.ownerReferenceControl('released');await waitReferenceState(f,s=>s.actualSettled);await waitAvailability(f);
+ const {observed}=await assertActualComplete(f);assert.equal(observed.referenceCommits,1);assert.equal(observed.referenceSyncs,1);const retry=await prepared.issue();assert.notEqual(retry.status,302);await retry.body?.cancel();assert.equal((await assertActualComplete(f)).observed.completeWrites,1);
+ await recordOwnerReference(f,'aborted-reference-sync',{postnativeAckHold:true,physicalStoragePending:false,nativeRequestAborted:true,lateRedirect:false});
+});
+async function waitAvailability(f){const end=performance.now()+10000;while(!(await plain(f.stub.firstConnectionAvailability())).available){assert(performance.now()<end,'actual settlement must release original scope');await new Promise(resolve=>setTimeout(resolve,20));}}

````

### test/mcp-qa-finite-owner-sdk-reference.test.mjs

````diff
diff --git a/test/mcp-qa-finite-owner-sdk-reference.test.mjs b/test/mcp-qa-finite-owner-sdk-reference.test.mjs
--- a/test/mcp-qa-finite-owner-sdk-reference.test.mjs
+++ b/test/mcp-qa-finite-owner-sdk-reference.test.mjs
@@ -0,0 +1,29 @@
+import test from 'node:test';
+import assert from 'node:assert/strict';
+import * as codec from '../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs';
+import {createFiniteOwnerIssuerProvenanceJournal} from '../lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs';
+import {syntheticSdkReferenceComponent} from './fixtures/finite-owner-cleanup.mjs';
+const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=codec;
+function component(){
+ const f=syntheticSdkReferenceComponent(),correlationHash=codec.finiteOwnerSdkCleanupCorrelation({root:f.root,expectedGrant:f.expectedGrant,completeSend:f.completeSend,identity:f.identity}),reference=seal('SdkGrantReference',{purpose:'afw.finite-owner-sdk-reference.v1',rootHash:f.root.recordHash,expectedGrantHash:f.expectedGrant.recordHash,completeSendHash:f.completeSend.recordHash,completeObservedHash:f.completeObserved.recordHash,correlationHash,sdkGrantId:'abcdefghijklmnop',createdAt:Math.floor(f.completeSend.issuedAt/1000),expiresAt:null,observedAt:f.completeObserved.observedAt+1});
+ return {...f,reference};
+}
+function journal(f){
+ const prefix=codec.FINITE_OWNER_ISSUER_PROVENANCE_PREFIX+f.root.preconnectionId+':',rows=new Map(),limits=[],log=[];
+ const storage={get:async key=>rows.get(key),list:async({prefix,limit})=>{limits.push(limit);return new Map([...rows].filter(([k])=>k.startsWith(prefix)).slice(0,limit));},sync:async()=>{log.push('sync');},transaction:async callback=>{const next=new Map(rows),tx={get:async key=>next.get(key),list:async({prefix,limit})=>{limits.push(limit);return new Map([...next].filter(([k])=>k.startsWith(prefix)).slice(0,limit));},put:async(key,raw)=>{next.set(key,raw);log.push('put');}};const result=await callback(tx);rows.clear();for(const row of next)rows.set(...row);log.push('commit');return result;}};
+ const ctx={storage,id:{toString:()=>f.root.actorId}},env={AFW_INDEPENDENT_CLOSURE:{idFromName:()=>ctx.id},AFW_QA_VERSION:{id:f.root.qaVersionId},RELEASE_DB:{withSession(){throw Error('SYN unused SQL');}}},lease={signal:new AbortController().signal,assertCurrent(){}};
+ for(const [suffix,kind,record]of [['root','Root',f.root],['sdk_begin:send','SdkSend',f.begin],['sdk_begin:observed','SdkObserved',f.beginObserved],['sdk_approve:send','SdkSend',f.approve],['sdk_approve:observed','SdkObserved',f.approveObserved],['grant','ExpectedGrant',f.expectedGrant],['sdk_complete:send','SdkSend',f.completeSend],['sdk_complete:observed','SdkObserved',f.completeObserved]])rows.set(prefix+suffix,encode(kind,record));
+ const api=createFiniteOwnerIssuerProvenanceJournal({ctx,env});return {api,lease,rows,prefix,limits,log,append:r=>api.appendSdkReference({preconnectionId:f.root.preconnectionId,record:r},lease)};
+}
+test('R1 records roundtrip',()=>{
+ const f=component(),raw=encode('SdkGrantReference',f.reference);assert.deepEqual(decode('SdkGrantReference',raw),f.reference);assert.equal(JSON.parse(raw).expiresAt,null);assert.throws(()=>codec.finiteOwnerSdkCleanupCorrelation({root:f.root,expectedGrant:f.expectedGrant,completeSend:f.completeSend,identity:{...f.identity,subject:'foreign'}}));
+});
+test('R1 reference hash rejects drift',()=>{const f=component();assert.throws(()=>encode('SdkGrantReference',{...f.reference,correlationHash:'f'.repeat(64)}));assert.throws(()=>decode('SdkGrantReference',encode('SdkGrantReference',f.reference)+' '));});
+test('R1 reference rejects foreign root',async()=>{const f=component(),j=journal(f),r=seal('SdkGrantReference',{...f.reference,rootHash:'f'.repeat(64)});assert.equal((await j.append(r)).status,'uncertain');assert.equal(j.rows.size,8);});
+test('R1 reference rejects foreign expected grant',async()=>{const f=component(),j=journal(f),r=seal('SdkGrantReference',{...f.reference,expectedGrantHash:'f'.repeat(64)});assert.equal((await j.append(r)).status,'uncertain');assert.equal(j.rows.size,8);});
+test('R1 reference requires complete observation',async()=>{const f=component(),j=journal(f);j.rows.delete(j.prefix+'sdk_complete:observed');assert.equal((await j.append(f.reference)).status,'uncertain');assert(!j.rows.has(j.prefix+'reference'));});
+test('R1 reference rejects invalid SDK id',()=>{const f=component();for(const sdkGrantId of ['short','abcdefghijklmnop:','a'.repeat(17),'a'.repeat(15),'a'.repeat(15)+'!'])assert.throws(()=>seal('SdkGrantReference',{...f.reference,sdkGrantId}));});
+test('R1 reference seconds and milliseconds stay separate',()=>{const f=component();assert.equal(f.reference.createdAt,1800000000);assert.equal(f.reference.observedAt,1800000000025);for(const delta of [{createdAt:'1800000000'},{createdAt:true},{expiresAt:'1800000001'},{expiresAt:false},{observedAt:'1800000000025'},{observedAt:true},{createdAt:f.reference.observedAt},{observedAt:f.reference.createdAt},{createdAt:1.1},{expiresAt:1.1},{expiresAt:f.reference.createdAt-1}])assert.throws(()=>seal('SdkGrantReference',{...f.reference,...delta}));});
+test('R1 reference rejects accessor and extra fields',()=>{const f=component();let reads=0;const v={...f.reference};Object.defineProperty(v,'sdkGrantId',{get(){reads++;return 'abcdefghijklmnop';},enumerable:true});assert.throws(()=>encode('SdkGrantReference',v));assert.equal(reads,0);assert.throws(()=>seal('SdkGrantReference',{...f.reference,secret:'forbidden'}));});
+test('R1 reference journal is append once',async()=>{const f=component(),j=journal(f);assert.equal((await j.append(f.reference)).status,'recorded');assert.deepEqual(j.log,['put','commit','sync']);assert.equal((await j.append(f.reference)).status,'existing');assert.equal((await j.append(seal('SdkGrantReference',{...f.reference,sdkGrantId:'ponmlkjihgfedcba'}))).status,'uncertain');assert.equal(JSON.parse(j.rows.get(j.prefix+'reference')).sdkGrantId,'abcdefghijklmnop');});
+test('R1 reference journal preserves prior eight rows',async()=>{const f=component(),j=journal(f),before=[...j.rows];assert.equal((await j.api.read({preconnectionId:f.root.preconnectionId},j.lease)).reference,null);assert.equal((await j.append(f.reference)).status,'recorded');const after=await j.api.read({preconnectionId:f.root.preconnectionId},j.lease);assert.equal(after.entries.length,9);for(const[k,v]of before)assert.equal(j.rows.get(k),v);assert(j.limits.every(limit=>limit===10));j.rows.set(j.prefix+'unknown','SYN overflow');await assert.rejects(j.api.read({preconnectionId:f.root.preconnectionId},j.lease));});

````


## Immutable qualifier snapshots (net-zero path)

### Causal RED at74086e7b0a9df597274ec0a11386f58daab1c904

````yaml
name: AFW owner restoration qualification
on:
  push:
    branches: [feat/finite-native-cleanup-20261101]
    paths:
      - .github/workflows/afw-owner-restoration-qualification.yml
permissions:
  contents: read
jobs:
  qualify:
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.sha }}
          persist-credentials: false
          fetch-depth: 1
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci --ignore-scripts --no-audit --no-fund
      - name: RED one actual SDK reference case
        shell: bash
        run: |
          mkdir -p output/owner-reference
          set -o pipefail
          node --test --test-reporter=tap --test-name-pattern="^R1 SDK reference is durable before redirect$" test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | tee output/owner-reference/red.tap
      - name: Preserve bounded SOURCE SYN evidence
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: afw-owner-reference-${{ github.sha }}
          path: |
            output/owner-reference/
            output/task3/
          if-no-files-found: warn
          retention-days: 7

````

### Final GREEN atf2137bb10c599b12cef2952dd5c8efdaf301e259

````yaml
name: AFW owner restoration qualification
on:
  push:
    branches: [feat/finite-native-cleanup-20261101]
    paths:
      - .github/workflows/afw-owner-restoration-qualification.yml
permissions:
  contents: read
jobs:
  qualify:
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.sha }}
          persist-credentials: false
          fetch-depth: 1
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci --ignore-scripts --no-audit --no-fund
      - name: GREEN final sixteen cases after test signal projection correction
        shell: bash
        run: |
          mkdir -p output/owner-reference
          set -o pipefail
          node --test --test-concurrency=1 --test-reporter=tap test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs | tee output/owner-reference/green.tap
      - name: Lint exact changed JavaScript files
        if: always()
        run: |
          npx eslint lib/mcp-qa-finite-owner-issuer-provenance-records.mjs lib/mcp-qa-finite-owner-issuer-provenance-journal.mjs lib/mcp-qa-finite-owner-phase-context.mjs lib/mcp-qa-finite-owner-cleanup.mjs test/fixtures/finite-initial-entry-world.mjs test/fixtures/finite-owner-cleanup.mjs test/mcp-qa-finite-owner-sdk-reference.test.mjs test/mcp-qa-finite-owner-sdk-reference-native.test.mjs
      - name: Inventory exact SOURCE SYN artifact files
        if: always()
        shell: bash
        run: |
          node --input-type=module <<'NODE'
          import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
          import {createHash} from 'node:crypto';
          import assert from 'node:assert/strict';
          const files=[];
          async function walk(path){for(const e of await readdir(path,{withFileTypes:true})){const p=path+'/'+e.name;if(e.isDirectory())await walk(p);else{const b=await readFile(p);files.push({path:p.slice(7),bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});}}}
          await mkdir('output/owner-reference',{recursive:true});
          for(const path of ['output/owner-reference','output/t2-native-graphs']){try{await walk(path);}catch(e){if(e.code!=='ENOENT')throw e;}}
          const graphs=files.filter(f=>f.path.endsWith('/metafiles.json'));
          for(const f of graphs){const m=JSON.parse(await readFile('output/'+f.path,'utf8'));assert(Object.keys(m.M.inputs).includes('worker/mcp-own/finite.mjs'));assert(Object.keys(m.QA.inputs).some(p=>p.endsWith('mcp-qa-finite-owner-cleanup.mjs')));}
          const manifest={source:process.env.GITHUB_SHA,files:files.sort((a,b)=>a.path.localeCompare(b.path)),graphs:graphs.length,actual:true,custodyReal:false,operationalReadiness:false,completePackage:false,PCoff:false};
          await writeFile('output/owner-reference/artifact-manifest.json',JSON.stringify(manifest,null,2));
          console.info('R1 artifact SOURCE SYN inventory',JSON.stringify({source:manifest.source,files:files.length,graphs:graphs.length}));
          NODE
      - name: Preserve bounded SOURCE SYN evidence
        if: always()
        id: evidence
        uses: actions/upload-artifact@v4
        with:
          name: afw-owner-reference-${{ github.sha }}
          path: |
            output/owner-reference/
            output/t2-native-graphs/
          if-no-files-found: warn
          retention-days: 7
      - name: Read back uploaded artifact
        if: always()
        uses: actions/download-artifact@v4
        with:
          name: afw-owner-reference-${{ github.sha }}
          path: output/artifact-readback
      - name: Verify uploaded scripts metafiles and markers
        if: always()
        shell: bash
        run: |
          node --input-type=module <<'NODE'
          import {readFile} from 'node:fs/promises';
          import {createHash} from 'node:crypto';
          import assert from 'node:assert/strict';
          const before=JSON.parse(await readFile('output/owner-reference/artifact-manifest.json','utf8')),after=JSON.parse(await readFile('output/artifact-readback/owner-reference/artifact-manifest.json','utf8'));assert.deepEqual(after,before);assert.equal(after.source,process.env.GITHUB_SHA);assert.equal(after.graphs,6);
          for(const file of after.files){const b=await readFile('output/artifact-readback/'+file.path);assert.equal(b.length,file.bytes);assert.equal(createHash('sha256').update(b).digest('hex'),file.sha256);}
          console.info('R1 uploaded artifact exact readback',JSON.stringify({source:after.source,verifiedFiles:after.files.length,graphs:after.graphs,manifestVerified:true}));
          NODE

````
