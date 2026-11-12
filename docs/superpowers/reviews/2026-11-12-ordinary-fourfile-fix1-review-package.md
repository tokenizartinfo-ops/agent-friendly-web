# ORD-1 scoped fixround1 — complete FIX_BASE..FIX_HEAD package

Repo tokenizartinfo-ops/agent-friendly-web; FIX_BASEf143b866840a6d862ad63c4691c0700fa03b14e5; FIX_HEAD174eb0dc0dca90f3b274c8ccd191c3a2b36f6ccc; treea7ef8bd03ebb1095af56f4716293493622917177. Exactly1commit/2paths,3189otherblobs/modesexact;workflowinactive0f004c70/0runs. CompleteverifiedU10below, allchangedlinespresent.

## Commits
174eb0dc0dca90f3b274c8ccd191c3a2b36f6ccc fix(diag): correct ls-tree path capture in inactive ORD-1 parser

## Stat
docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md +75 -0
scripts/diagnostics/ordinary-fourfile.mjs +1 -1

## Diff
```diff
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md b/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md
# before_blob=21d6d7ef66c43ac3e260f36ef2469e342ee8852d after_blob=bdd56d50a21f82a572184f90ef963769481798da
--- a/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md
+++ b/docs/superpowers/reports/2026-11-12-ordinary-fourfile-diagnostic.es.md
@@ -240,10 +240,85 @@
 - helper `ffb470aff1e2f3d79a745e470e82a2384b88f295`;
 - informe inicial `6ca7120b056ec5dbf14019c4362d9fed1b55c7ae`.
 
 Árbol recursivo C1 no truncado: 3191 blobs = 3188 base protegidos + tres altas exactas; cero blob/modo base cambiados y ninguna eliminación. Tras publicar C1, Actions API de la rama volvió a devolver `total_count:0, workflow_runs:[]`.
 
 Este apéndice constituye un segundo commit documental sólo dentro del tercer path permitido. Workflow/helper quedan con los mismos blobs C1. Se comprobarán nuevamente ref, árbol completo, tres contenidos y cero runs; el tip/árbol/hash de este informe se entregan en el contrato externo a Root para evitar autorreferencia. No nuevas pruebas ni ejecuciones para redactarlo.
 
 Self-review final del autor: ninguna reparación de producto; A/B comparten seams y cambios de seguridad; los dos false permanecen; Source/test f5 y workflow real se distinguen; no hubo helpers/reviewer/subagentes ni contactos con el writer de Source. Root conserva la revisión independiente y decisión de ejecución. No se declara que el harness esté cualificado por esta inspección estática.
 
 **STOP_WRITES al cerrar el readback de este apéndice. Cero jobs despachados. Preparación terminada; ejecución y cualificación pendientes.**
+
+
+## ORD-1 — formal fix round 1/5 (preparación, sin ejecución cloud)
+
+FIX_BASE `f143b866840a6d862ad63c4691c0700fa03b14e5`, árbol `74dd2255bbe224c199b7ed23fce26fe915177cf0`. Nuevo brief Rootdocs `ef331c59a7ace7bbac9514b5b51461ca2f4ab027`, blob `1459c7e459472d6bb15bf6ace9e163d637a2a9f7`. Reapertura autorizada exclusivamente para este finding Important; sin Critical/Minor, cleanup o refactor.
+
+Finding confirmado: el regex de tuples captura modo m[1], SHA m[2] y ruta m[3], pero tres referencias usaban m[4], causando TypeError en todo registro válido. Se sustituyen exactamente esas tres referencias por m[3]. Regex, validaciones, default y todas las demás líneas del helper permanecen idénticos. Base helper `ffb470aff1e2f3d79a745e470e82a2384b88f295`; base informe `21d6d7ef66c43ac3e260f36ef2469e342ee8852d`. Este apartado se añade al final sin modificar ningún byte del informe anterior.
+
+Prueba cubriente permitida: herramienta existente `mcp__node_repl__js`, builtin `node:vm`. Se extrajo solamente la línea `function tuples(...)` del helper fijado; no se importó ni ejecutó el helper. Cada llamada fue exactamente:
+```js
+vm.runInNewContext(rejectSource + extractedTuples + ';tuples(raw)', {raw}, {timeout:100})
+```
+`rejectSource` define únicamente reject() que lanza un Error de mensaje fijo sintético. Los inputs fueron strings inertes NUL-delimited de git ls-tree; SHA sintético: cuarenta letras a. RED utilizó la función vieja con `100644 blob <sha>\\ttest/example.mjs\\0`: TypeError observado. GREEN utilizó la corregida y comparó modo/SHA/ruta exactos para rutas normal y con espacios; los otros cinco casos conservaron el rechazo sintético Error: registro malformado, ruta absoluta, segmento .., registro tree/no blob y registro sin campos de ruta. No se registraron stacks, objetos de error, mensajes privados ni datos del proyecto.
+
+Resultado observado:
+```json
+{
+  "causalRED": {
+    "case": "normal",
+    "errorName": "TypeError",
+    "observed": true
+  },
+  "GREEN": {
+    "passed": 7,
+    "total": 7,
+    "cases": [
+      {
+        "case": "normal",
+        "pass": true,
+        "errorName": null
+      },
+      {
+        "case": "space",
+        "pass": true,
+        "errorName": null
+      },
+      {
+        "case": "malformed",
+        "pass": true,
+        "errorName": "Error"
+      },
+      {
+        "case": "leading_slash",
+        "pass": true,
+        "errorName": "Error"
+      },
+      {
+        "case": "parent_traversal",
+        "pass": true,
+        "errorName": "Error"
+      },
+      {
+        "case": "nonblob",
+        "pass": true,
+        "errorName": "Error"
+      },
+      {
+        "case": "missing_record_fields",
+        "pass": true,
+        "errorName": "Error"
+      }
+    ]
+  },
+  "maximumVMTimeoutMs": 100,
+  "inertRecordInvocations": 8,
+  "fullHelperExecuted": false,
+  "projectImports": false
+}
+```
+
+Excepción local mínima expresa del brief: ocho invocaciones de registros inertes (RED 1 + GREEN 7), menos de diez; máximo 100 ms por VM y timeout del tool 1000 ms. Trabajo sólo en RAM, sin filesystem, red, child_process, instalación, dependencias ni imports del proyecto. Es evidencia causal del parser de metadatos, NO cualificación cloud/Node22 del harness. Ningún A/B, build, suite o test de proyecto ejecutado.
+
+Comprobación independiente del texto: exactamente tres cambios m[4]→m[3] dentro de tuples; al invertir esa única línea se recupera byte a byte el helper base. El informe conserva íntegro el prefijo base. El commit sólo puede cambiar helper e informe; se comprobarán los otros 3189 blobs/modos íntegros y árbol total 3191, ref/CAS y cero runs. Workflow debe conservar blob exacto `0f004c70976f5e4e64c1e554c0ebfad8039b9921`, manual-only, dos false. Hashes/tip finales se entregan externamente, sin autorreferencia.
+
+No otra conclusión nueva sobre las 36 fallas. El mismo reviewer de Root debe hacer re-review scoped FIX_BASE..FIX_HEAD del finding y cualquier regresión nueva antes de un probe. Cero jobs autorizados/despachados por este fix. Tras los readbacks finales: **STOP_WRITES**. `operationalReadiness=false; completePackage=false; PCoff=false`.
diff --git a/scripts/diagnostics/ordinary-fourfile.mjs b/scripts/diagnostics/ordinary-fourfile.mjs
# before_blob=ffb470aff1e2f3d79a745e470e82a2384b88f295 after_blob=ee4bbaa44edf02c10224e4e6085baa6a8e40a0bd
--- a/scripts/diagnostics/ordinary-fourfile.mjs
+++ b/scripts/diagnostics/ordinary-fourfile.mjs
@@ -199,21 +199,21 @@
    for(const [from,to]of [['tests','tests'],['passed','pass'],['failed','fail'],['cancelled','cancelled'],['skipped','skipped'],['todo','todo']]){
     const n=own(c,from);if(Number.isSafeInteger(n)&&n>=0&&n<=10000)state.summary[to]=n;
    }
   }
  }
  const result={...state,errors:Object.values(state.errors),artifacts:Object.values(state.artifacts),pinModels:Object.values(state.pinModels)};
  const text=JSON.stringify(result);
  yield Buffer.byteLength(text)<=MAX_SAFE?text+'\n':JSON.stringify({purpose:state.purpose,status:'safe_output_cap',...flags})+'\n';
 }
 function git(cwd,args){const r=spawnSync('git',args,{cwd,encoding:'utf8',timeout:10000,maxBuffer:2097152,env:{PATH:process.env.PATH,HOME:process.env.RUNNER_TEMP,GIT_CONFIG_NOSYSTEM:'1'}});if(r.status!==0)reject();return r.stdout;}
-function tuples(raw){return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[4].startsWith('/')||m[4].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[4]};});}
+function tuples(raw){return raw.split('\0').filter(Boolean).map(x=>{const m=/^([0-9]{6}) blob ([a-f0-9]{40})\t([^\n]+)$/.exec(x);if(!m||m[3].startsWith('/')||m[3].split('/').includes('..'))reject();return {mode:m[1],sha:m[2],path:m[3]};});}
 async function inventory(root,leaves){
  const rows=[];for(const leaf of leaves){const p=join(root,leaf.path),s=await lstat(p);if(!s.isFile()||s.isSymbolicLink()||((s.mode&0o111)!==0)!==(leaf.mode==='100755'))reject();const bytes=await readFile(p);if(blob(bytes)!==leaf.sha)reject();rows.push([leaf.path,leaf.mode,leaf.sha]);}
  return hash(JSON.stringify(rows));
 }
 async function runChild(cwd,arm,outDir,privateDir){
  const handles=await Promise.all(['stdout','stderr'].map(n=>open(join(privateDir,'raw.'+n),'wx',0o600)));
  const digests=[createHash('sha256'),createHash('sha256')],sizes=[0,0];let reason=null,deadline=null,killer=null;
  const env={PATH:process.env.PATH,HOME:privateDir,TMPDIR:privateDir,LANG:'C.UTF-8',ORD1_CHILD_ARM:arm,ORD1_SUBJECT:SUBJECT,GITHUB_SHA:SUBJECT};
  const child=spawn(process.execPath,['--import',pathToFileURL(SELF).href,'--test','--test-reporter='+pathToFileURL(SELF).href,...TESTS],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
  const terminate=why=>{if(reason)return;reason=why;try{process.kill(-child.pid,'SIGTERM');}catch{}killer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{}},5000);};
```
