# O2 inactive trigger bridge — scoped review package

BASE `7993018a0b823cbff61012061f70de093af32eb3` → HEAD `7b200bdf61eda65234e12cef008de8cae483aa6f`.

This reviews the minimum manual/push bridge only; prior Proxy fix remains accepted. No run authorized by this package. Native qualification remains HELD.

## Commit list

- 7b200bdf61eda65234e12cef008de8cae483aa6f Prepare exact manual/push diagnostic admission and actual trigger context [skip ci]

## Complete stat

- docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md: +112/-0
- scripts/diagnostics/ordinary-failure-boundaries.mjs: +2/-2

## Primary preservation

{"protectedExact":3189,"total":3191,"workflow":"c082ab9bacc8b3cf975fa611aebd95edcf144fd0","runs":0}

## Full U10 diff

```diff
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
# before_blob=2de47efbb49e7785ad0a5c33fdfb5036211dc470 after_blob=ec0a4e1adaf6d7cb3f20ffde035916f38293a69f
--- a/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
+++ b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
@@ -476,10 +476,122 @@
 
 RED: nativeError=true, getPrototypeOf trap counter=1, clasificación observada no desconocida. GREEN: 7/7. Proxy directo/anidado/revocado conservaron marca nativa con contador cero y observación desconocida; Error y TypeError ordinarios conservaron identidad conocida; getters stack/code/name/tag/cause no fueron tocados, sin canary crudo; spoof de prototipo siguió rechazado. No se imprimieron mensajes/stack ni valores de prototipo. Los controles preparados de padre/hijos y la sonda completa siguen SIN EJECUTAR. Estos resultados sólo prueban el defecto de metadata y su corrección acotada, no cualificación cloud del harness.
 
 ### Integridad y cierre de esta corrección
 
 Prewrite verificado: rama exacta todavía dee60034; workflow íntegro c082ab9bacc8b3cf975fa611aebd95edcf144fd0, manual/inactivo; Actions total_count=0. Sólo se modifican helper y este APPEND del informe. Los otros 3189 blobs/modos de FIX_BASE, incluido workflow, quedan protegidos; no hay nuevas rutas ni eliminación.
 
 Commit corrector con único padre FIX_BASE; CAS expected_sha=dee60034f5caf5087a4e2972d8dcaabee7c3fba1, force=false, sólo esta rama, mensaje [skip ci]. Readbacks externos exigidos antes de entregar: ref/commit/padre/árbol completo no truncado de 3191 blobs; exactamente dos modificaciones, 3189 tuples protegidos intactos; helper y reporte completos, prefijo del informe exacto, workflow exacto; cero runs. Los hashes propios finales informe/head/tree y el resultado efectivo de CAS/readback se entregan en el contrato externo, sin commits autorreferenciales.
 
 STOP_WRITES tras cierre externo. No hay activación/jobs/helpers/reviewers/subagentes ni cambios fuera de esas dos rutas. operationalReadiness=false; completePackage=false; PCoff=false. La misma revisión fresca de Root debe valorar FIX_BASE..FIX_HEAD; no se concede permiso de ejecución con este fix.
+
+
+## Preparación de compatibilidad de liberación — evento real validado
+
+BASE=7993018a0b823cbff61012061f70de093af32eb3; árbol 7f093e7910fba9bae62252e3a053c9df62c130ae. Helper previo f3a5a76407723657833255d697053c9ff2bfd0bc; informe previo 2de47efbb49e7785ad0a5c33fdfb5036211dc470. Esta sección es un APPEND: el prefijo íntegro anterior no cambia.
+
+Brief de la enmienda leído antes de mutar: docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-trigger-amendment.md @e1312de0c5b1e7da9433105c199b6515ee2b3ced, blob 498e7ee02c2a1f9b5d2f504502086f213dd27020.
+
+La liberación b1aa2d7ea749c1bd725f4791140ee16ecdb597e4 / brief docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-single-probe.md (blob ab147d1b7ce8c08a0741a781c55b8e402b20e4eb) exigía activar un push sin cambiar el helper fijado, mientras ese helper admitía sólo workflow_dispatch y registraba ese literal. El implementador detectó la incompatibilidad en lectura y se detuvo ANTES de escribir o ejecutar. El run único no se consumió. No se falseó GITHUB_EVENT_NAME ni se cambió main.
+
+Root declaró obsoleta esa liberación y autorizó expresamente esta preparación mínima: permitir exactamente workflow_dispatch/push con todos los gates existentes, registrar el evento real validado, conservar workflow inactivo exacto, añadir este informe y exigir revisión del mismo reviewer antes de una liberación sustituta fijada al nuevo head/helper. Es una enmienda de compatibilidad del plan de liberación; no se presenta como defecto del requisito manual original ni como autorización para ejecutar. El mensaje explícito de Root autoriza esta preparación; no se requiere paso humano ni se infiere una ventana nativa nueva.
+
+Sólo dos sustituciones únicas en helper:
+
+```json
+[
+  {
+    "from": "process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'",
+    "to": "!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)",
+    "occurrences": 1
+  },
+  {
+    "from": "trigger:'workflow_dispatch'",
+    "to": "trigger:process.env.GITHUB_EVENT_NAME",
+    "occurrences": 1
+  }
+]
+```
+
+Al revertir esas dos sustituciones en RAM se recuperó byte por byte el helper f3a5 anterior. No se alteran clasificador cualificado, stop Proxy, controles/observadores, algoritmos/callers/receiver/Promise/error/clocks, cuerpo de ejecución, caps, Node/Linux, fuente f5, repo/ref/attempt/run-id/SHA ni reglas de redacción. No hay selector de evento ni nuevo input: la lista permitida queda cerrada en código. El contexto toma process.env.GITHUB_EVENT_NAME después de validar esa lista.
+
+Helper preparado: 26552 bytes UTF-8; Git blob 4db3321be9cffe7f948446e27aae43209f6d1d4f; SHA-256 f4f71ad31c2f2e68432d92b9cb2a02447148cf5e2176f1ac0d07ac3033f67ef6.
+
+### Verificación de metadata de la enmienda
+
+Gramática del helper completo: new vm.SourceTextModule(compatHelper), sin evaluate/link/import. Sólo la línea exacta del gate existente y el campo trigger corregido se evaluaron en cinco contextos VM de metadata con process.env inerte. Cada contexto tiene timeout:100 ms impuesto por node:vm; todos retornaron sin timeout. Duración fina no medida. Host Node: unavailable_from_node_repl, limitación ya aceptada por Root. No se ejecutaron módulos/proyecto/helper completo, filesystem, red, child_process, instalación, build, tests ni jobs.
+
+Snippet exacto:
+
+```js
+const REPO='tokenizartinfo-ops/agent-friendly-web';
+const BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';
+function admit(){
+ const reject=()=>{throw 0;};
+ if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
+ return {accepted:true,trigger:process.env.GITHUB_EVENT_NAME};
+}
+try{admit();}catch{({accepted:false,trigger:null});}
+
+```
+
+Comando exacto node_repl (los valores run-id/SHA son fixtures inertes; no acreditan identidad real):
+
+```js
+var compatMetadataSnippet = "const REPO='tokenizartinfo-ops/agent-friendly-web';\nconst BRANCH='refs/heads/diag/afw-failure-boundaries-20261112';\nfunction admit(){\n const reject=()=>{throw 0;};\n if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();\n return {accepted:true,trigger:process.env.GITHUB_EVENT_NAME};\n}\ntry{admit();}catch{({accepted:false,trigger:null});}\n"; var compatCases = [["manual","workflow_dispatch",true],["push","push",true],["schedule","schedule",false],["pull_request","pull_request",false],["absent",null,false]]; var compatEnv = {"GITHUB_REPOSITORY":"tokenizartinfo-ops/agent-friendly-web","GITHUB_REF":"refs/heads/diag/afw-failure-boundaries-20261112","GITHUB_RUN_ATTEMPT":"1","GITHUB_RUN_ID":"1","AFB_WORKFLOW_SHA":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}; var compatibilityResults=compatCases.map(([name,event,expected])=>{var env={...compatEnv};if(event!==null)env.GITHUB_EVENT_NAME=event;var observed=vm.runInNewContext(compatMetadataSnippet,{process:{env}},{timeout:100});return {case:name,expectedAccepted:expected,accepted:observed.accepted,trigger:observed.trigger,pass:observed.accepted===expected&&observed.trigger===(expected?event:null)};}); nodeRepl.write(JSON.stringify({hostNodeVersion:'unavailable_from_node_repl',inertCases:5,timeoutPerContextMs:100,results:compatibilityResults,passed:compatibilityResults.filter(x=>x.pass).length}));
+```
+
+Resultados saneados reales:
+
+```json
+{
+  "hostNodeVersion": "unavailable_from_node_repl",
+  "inertCases": 5,
+  "timeoutPerContextMs": 100,
+  "results": [
+    {
+      "case": "manual",
+      "expectedAccepted": true,
+      "accepted": true,
+      "trigger": "workflow_dispatch",
+      "pass": true
+    },
+    {
+      "case": "push",
+      "expectedAccepted": true,
+      "accepted": true,
+      "trigger": "push",
+      "pass": true
+    },
+    {
+      "case": "schedule",
+      "expectedAccepted": false,
+      "accepted": false,
+      "trigger": null,
+      "pass": true
+    },
+    {
+      "case": "pull_request",
+      "expectedAccepted": false,
+      "accepted": false,
+      "trigger": null,
+      "pass": true
+    },
+    {
+      "case": "absent",
+      "expectedAccepted": false,
+      "accepted": false,
+      "trigger": null,
+      "pass": true
+    }
+  ],
+  "passed": 5
+}
+```
+
+5/5: manual y push aceptados y reportados literalmente con su evento real; schedule, pull_request y evento ausente rechazados. Estos son controles acotados del predicado/contexto, no cualificación Node 22.23.4/Ubuntu ni ejecución del diagnóstico de dos casos. La prueba cloud queda pendiente.
+
+### Publicación y cierre inactivos
+
+Sólo helper+APPEND de este informe; workflow protegido EXACTO c082ab9bacc8b3cf975fa611aebd95edcf144fd0, manual/literal false/no inputs, sin activación. Los otros 3189 blobs/modos de BASE permanecen exactos. Se prepara commit con único padre 7993018a; CAS expected_sha=7993018a0b823cbff61012061f70de093af32eb3 y force=false sobre esta rama, mensaje [skip ci].
+
+Cierre externo requerido: readback independiente ref/commit/padre/árbol completo no truncado, 3191 blobs, exactamente dos modificaciones, 3189 protegidos intactos, helper/reporte completos y prefijo exacto, workflow idéntico y cero runs. Los hashes finales propios informe/head/tree y resultados efectivos se entregan fuera del cuerpo para evitar autorreferencia. No hay liberación ni activación con esta enmienda. STOP_WRITES tras readbacks; operationalReadiness=false; completePackage=false; PCoff=false.
diff --git a/scripts/diagnostics/ordinary-failure-boundaries.mjs b/scripts/diagnostics/ordinary-failure-boundaries.mjs
# before_blob=f3a5a76407723657833255d697053c9ff2bfd0bc after_blob=4db3321be9cffe7f948446e27aae43209f6d1d4f
--- a/scripts/diagnostics/ordinary-failure-boundaries.mjs
+++ b/scripts/diagnostics/ordinary-failure-boundaries.mjs
@@ -313,25 +313,25 @@
 }
 async function preserve(output,report){
  let text=JSON.stringify(report,null,2)+'\n';
  if(Buffer.byteLength(text)>MAX_SAFE)text=JSON.stringify({purpose:'afw.failure-boundaries.diagnostic.v1',status:'safe_output_cap',...flags})+'\n';
  await writeFile(join(output,'result.json'),text,{mode:0o600});
  const manifest={purpose:'afw.failure-boundaries.manifest.v1',inventory:[{name:'result.json',bytes:Buffer.byteLength(text),sha256:hash(text)}],rawLogsUploaded:false,...flags};
  await writeFile(join(output,'manifest.json'),JSON.stringify(manifest)+'\n',{mode:0o600});
 }
 async function main(){
  if(process.argv.length!==2||process.platform!=='linux'||process.version!=='v22.23.4')reject();
- if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
+ if(process.env.GITHUB_REPOSITORY!==REPO||process.env.GITHUB_REF!==BRANCH||!['workflow_dispatch','push'].includes(process.env.GITHUB_EVENT_NAME)||process.env.GITHUB_RUN_ATTEMPT!=='1'||!/^[1-9][0-9]{0,19}$/.test(process.env.GITHUB_RUN_ID??'')||!/^[a-f0-9]{40}$/.test(process.env.AFB_WORKFLOW_SHA??''))reject();
  const subject=resolve('subject'),runner=process.env.RUNNER_TEMP;
  if(!runner||!isAbsolute(runner)||resolve(runner)===subject)reject();
  const output=resolve('failure-boundaries-safe');await mkdir(output,{recursive:true,mode:0o700});
- const context={repository:REPO,workflowRef:BRANCH,trigger:'workflow_dispatch',workflowSource:process.env.AFB_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
+ const context={repository:REPO,workflowRef:BRANCH,trigger:process.env.GITHUB_EVENT_NAME,workflowSource:process.env.AFB_WORKFLOW_SHA,testSource:SUBJECT,runId:process.env.GITHUB_RUN_ID,attempt:1,node:process.version,os:'Ubuntu24.04',group:'UNSET',childContext:'MODELED_STERILE_SYNTHETIC',workflowContextIsAdmissionAuthority:false,...flags};
  let report={purpose:'afw.failure-boundaries.diagnostic.v1',status:'incomplete',context,noRetry:true,...flags};
  await preserve(output,report);
  let before=null,leaves=null,parent=null,overlays=[];
  try{
   const helperRoot=dirname(dirname(dirname(SELF)));
   if(git(helperRoot,['rev-parse','HEAD']).trim()!==context.workflowSource)reject();
   if(git(subject,['rev-parse','HEAD']).trim()!==SUBJECT||git(subject,['status','--porcelain','--untracked-files=no']).trim()!=='')reject();
   leaves=tuples(git(subject,['ls-tree','-rz','--full-tree','HEAD']));
   if(leaves.length!==3188||leaves.find(x=>x.path==='package.json')?.sha!=='f4fd38ac380c46a149d8cf0f3bd828a28406f761'||leaves.find(x=>x.path==='package-lock.json')?.sha!=='36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b'||git(subject,['rev-parse','HEAD^{tree}']).trim()!=='7bc8b997a968dca32fc567b627de70b774d6489c')reject();
   before=await inventory(subject,leaves);
```
