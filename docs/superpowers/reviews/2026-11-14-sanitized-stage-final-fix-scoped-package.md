# AFW — single SCOPED rereview of final fix wave — 2026-11-14

Fix base3bdefc9189c163173c324ae48c7ebb3ed3de70e8 → Source CLOSED410b37018b184f632f661cab05e44887fb6eaf57/tree94d3cf28005f753ff17a6763ad85cd2642a932a6. This is the ONE scoped rereview after the single aggregate fix wave, NOT another whole-plan review. Verdict I1–I5/M1 and new breakage in THIS DIFF only. No Source/code/test execution, mutations, extra reviewer or Native run.

Binding brief/spec latestRootdocs (see same-commit paths): docs/superpowers/briefs/2026-11-14-sanitized-stage-final-fix-wave.md; docs/superpowers/specs/2026-11-13-sanitized-stage-observations-design.md. Fullacceptedfindings: docs/superpowers/reviews/2026-11-14-sanitized-stage-plan-final-review.md. Workercomplete report: docs/superpowers/reviews/2026-11-14-sanitized-stage-final-fix-worker-report.md. Read report and diff; all priorqualifier/native runs consumed, do not repeat.

## Findings under verification
# Revisión final del plan AFW — 2026-11-14
Reviewer: /root/stage_diag_final_review, gpt-6-astra/xhigh. Solo lectura, ningún objeto/ref/Source ejecutado.
Base b5873e87d1f00ad10985171959e93015bc6045e3 → Source3bdefc9189c163173c324ae48c7ebb3ed3de70e8.
Inputs: docs/superpowers/reviews/2026-11-14-sanitized-stage-plan-final-review-package.md @12de2c06850cd962a9d2d39535418bb7577e1efd.
Verdict: Ready for Source Integration WITH FIXES; C0/I5/M1. No broad review repeats.

## Hallazgos completos
I1 runtime:68 — Identidad del getter/prepareStackTrace no evita un CallSite.prototype[Symbol.toPrimitive] instalado DESPUÉS de captura. Node22.23.4 defaultPrepareStackTrace usa ArrayPrototypeJoin(trace), que coerce frames. Garantizar conversión controlada o declinar accessor sin mutar formatter global. Fresh child must restore original formatter before projection and require hook counter0.
Primary: https://github.com/nodejs/node/blob/v22.23.4/lib/internal/errors.js#L88-L103 .
I2 projector:25–54 — Error real con message x\n    at synthetic (test/fixtures/finite-checkpoint-custody.mjs:20:1) puede poner primer frame falso antes de frames reales; d11 solo stack QUE EMPIEZA con at no cubre. Excluir cabecera completa o siteunknown ante campos multilínea; cubrir name y campos de cabecera de coded errors.
I3 D:95–105 — lstat regular→open(O_RDONLY|O_NOFOLLOW) puede bloquear si archivo cambia a FIFO sin escritor. Añadir O_NONBLOCK y mantener descriptor checks ANTES de read. Probar FIFO real con timeout independiente.
I4 candidate2c390 F7:1882/1899 y otros2jobs — summary_pair/summary_upload bloqueantes pueden volver fallido productor válido y omitir consumidores por fallo diagnóstico. Continue-on-error EXCLUSIVAMENTE esos6steps, upload solo si pair válido; ausencias unavailable. Probar fallos pair/upload contra política frozen; mantener actual_outcome original.
I5 D:59–84 — Error [ENOENT]: custody_limit contiene códigos incompatibles, hoy publica ENOENT. AssertionError [EACCES] también. Validar clase/código explícito/mensaje antes del ownedError. Conflictos unknown incluso con canonical marker válido.
M1 D:109 — línea interior A coincide con prefijo parcial y descarta evidencia válida. Limitar comprobación de prefijos truncados a bordes; probar ruido interior y prefixinicial.

## Evidencia y límites
Task1 qualification69 y Task2 qualification55 logical controls, negativos+Rootsmallreceipts. Native43608448872/1 failed, positivos/reducción write_files200, readonlycompoundfail+seal custody_limit/custody20, Bskipped, noSuite; business16NOaceptación. Ningún hallazgo se atribuye como causa observada del ensayo. Fullrestoration/F7/62WF/prefix/singleattempt preserved.
Exact readonly R1/2/3/cap y NativeNodeoutcomes siguen desconocidos; no condición live/PCoff acreditada. I1 evalúa alteración postcapture; precapture compromise sigue fuera.
Root recibió informe completo en texto. El reviewer NO movió refs.

## Adjudicación Root antes de fix
I1–I5/M1 aceptados tras lectura de Source y de Node oficial; no se descartan por guards actuales. UNA ola agregada y UNA rereviewscoped; no nuevoNative trial.
Ruling: retirar la lectura lazy de accessor en vez de tratar de probar seguros todos los hooks V8 mutables. Mantener export/interfaz readNativeStack como refusal fija sin tocar error ni ejecutar getter; real VM native errores declinan como unknown. El módulo no captura ni cambia globals. DATA-stack y enums siguen soportados. Supersede requisito d12/d13 finite-site real de Fix1 y rulings53–58 SOLOpara esa vía. Cost if wrong: menor precisión de diagnóstico, compensable con diagnóstico de logs acotado; ningún businessassert/cap relajado.


## Root rulings that bind the fix
I1 lazy accessor/nativeVM site support intentionally removed; DATA supported, optional reader never called, runtime129B null-refusal shim. This supersedes prior realVMfinite-site requirement, no globalformatter mutations. I4 

## I4 clarification / Ruling — 2026-11-14
Ruling: preserve exact safe-id/safe-digest expressions and frozen A forms. The original finding requires diagnostics not to fail business jobs and absent assignment to be unavailable; it does not require suppression of a valid artifact left by a step that later fails. My brief's unqualified 'uploadfail→unavailable' was broader than that contract and conflicted with exact bindings. Missing/invalidoutputs→unavailable. A failed step with validliteral ID/digest can yield assigned, but assigned means only outputprovided; it proves neither uploadsuccess nor contentvalidity. Root current metadata/uploader/rawZIP/schema/manifest checks remain mandatory and failclosed. Add bounded fixture for that distinction; no alternateartifact/historyfallback. Cost if wrong: attempt to inspect one bounded assigned pair from a failed diagnosticupload; inconsistent/missing evidence is rejected and no business/runtime authority follows. No A-form expansion, newoutputs or secrets.


## Stat / commits and primary closure
{
  "fixBase": "3bdefc9189c163173c324ae48c7ebb3ed3de70e8",
  "inactive": "4d30f9855e54e76b87709c28fcf42f1a2d78d137",
  "active": "0d26858762b1bb01fe3b835593bc2a544c766d99",
  "restored": "5eb6488ef61222fbf44870274217d93055b4bcab",
  "head": "410b37018b184f632f661cab05e44887fb6eaf57",
  "treeAudit": {
    "before": 3201,
    "after": 3201,
    "changed": [
      "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
      "test/finite-budget-failure-diagnostic.test.mjs",
      "test/finite-budget-stage-observer.test.mjs",
      "test/fixtures/finite-budget-failure-diagnostic.mjs",
      "test/fixtures/finite-budget-failure-runtime.mjs",
      "test/fixtures/finite-budget-stage-observer.mjs",
      "test/fixtures/finite-budget-world.mjs"
    ],
    "workflows": 62,
    "declared": 7
  },
  "report": {
    "bytes": 455837,
    "sha256": "d508392cc4222ea9953499e6a5823140c7b2e932e405acc9720e5cfd4a5857e2",
    "gitBlob": "505abef32515d38097d365c4ab18a14d1317b1b3"
  },
  "all449702BPrefixPreserved": true,
  "currentSource0runs": true,
  "consumed1run1attempt": true,
  "main": "0c9c475b3ebaa970fc11d628b40e50a90cceb727",
  "fiveActive0": true,
  "checkedUTC": "2026-11-14 16:29:01 UTC",
  "stat": [
    {
      "path": "test/fixtures/finite-budget-failure-runtime.mjs",
      "added": 2,
      "deleted": 70,
      "hunks": 1
    },
    {
      "path": "test/fixtures/finite-budget-failure-diagnostic.mjs",
      "added": 11,
      "deleted": 9,
      "hunks": 2
    },
    {
      "path": "test/finite-budget-failure-diagnostic.test.mjs",
      "added": 29,
      "deleted": 5,
      "hunks": 4
    },
    {
      "path": "test/fixtures/finite-budget-stage-observer.mjs",
      "added": 17,
      "deleted": 12,
      "hunks": 3
    },
    {
      "path": "test/finite-budget-stage-observer.test.mjs",
      "added": 19,
      "deleted": 0,
      "hunks": 2
    },
    {
      "path": "test/fixtures/finite-budget-world.mjs",
      "added": 1,
      "deleted": 1,
      "hunks": 1
    },
    {
      "path": "docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md",
      "added": 39,
      "deleted": 0,
      "hunks": 1
    }
  ]
}

## Actual current qualification / independent Root receiver
{
  "run": 43615497152,
  "attempt": 1,
  "status": "success",
  "jobs": [
    {
      "id": 132509522687,
      "name": "qualify",
      "status": "completed",
      "conclusion": "success",
      "started": "2026-11-14T16:25:12Z",
      "completed": "2026-11-14T16:25:47Z"
    },
    {
      "id": 132509690765,
      "name": "verify",
      "status": "completed",
      "conclusion": "success",
      "started": "2026-11-14T16:25:49Z",
      "completed": "2026-11-14T16:25:55Z"
    }
  ],
  "literalReceipt": {
    "context": {
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "repositoryId": "1347578006",
      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
      "source": "0d26858762b1bb01fe3b835593bc2a544c766d99",
      "tree": "132bb281fe76b49f40fa2634de9120deb67486a9",
      "workflowBlob": "2a9d38186d38dcf7e09bbb3ff12b7d19633a2f8f",
      "run": "43615497152",
      "attempt": 1,
      "node": "22.23.4"
    },
    "artifactId": "14122310798",
    "uploadedDigest": "c0ccdf66c8f1cdb56ae6dbfdca30dd68211e84aa500cb8d6c7d100186e31f327",
    "metadataSize": 7764,
    "rawBytes": 7764,
    "rawSha256": "c0ccdf66c8f1cdb56ae6dbfdca30dd68211e84aa500cb8d6c7d100186e31f327",
    "resultBytes": 6959,
    "resultSha256": "9c3c87037504d8bbe3d40a75999f380dbe7722ea46d4a60add01a2ec83096160",
    "manifestBytes": 551,
    "manifestSha256": "cf9f8c842c9f0cf3fa032935b13cf00b14ac990cf7b225b0f25f1ca5e12bfdf5",
    "tests": {
      "allUnknown": {
        "exit": 1,
        "tests": 45,
        "pass": 33,
        "fail": 12,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "diagnostic": {
        "exit": 0,
        "tests": 45,
        "pass": 45,
        "fail": 0,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "stage": {
        "exit": 0,
        "tests": 36,
        "pass": 36,
        "fail": 0,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "oldDiagnostic": {
        "exit": 1,
        "tests": 2,
        "pass": 0,
        "fail": 2,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "oldStage": {
        "exit": 1,
        "tests": 3,
        "pass": 0,
        "fail": 3,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "hooks": {
        "green": 0,
        "oldCallsite": 2
      }
    },
    "candidate": {
      "commit": "32ca318743b26a8a6d54ef743c9f101609525491",
      "tree": "c578f1b74ed69f99d22f4eef892a0d12e6257a75",
      "bytes": 367308,
      "blob": "79e3bdcaeaa729195a09897a36fca8053fbb7b13",
      "sha256": "259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278"
    },
    "programs": {
      "adapter": {
        "bytes": 63917,
        "sha256": "ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"
      },
      "controls": {
        "bytes": 63195,
        "sha256": "52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"
      },
      "verifier": {
        "bytes": 15099,
        "sha256": "94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"
      },
      "safeZip": {
        "bytes": 13305,
        "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"
      }
    },
    "integrationControls": 7,
    "receiverControls": 6,
    "nonclaims": {
      "historicalCauseProven": false,
      "receiptAuthenticated": false,
      "operationalReadiness": false,
      "completePackage": false,
      "PCoff": false,
      "globalNativeDrainVerified": false,
      "sdkNamespaceEmptyVerified": false
    }
  },
  "rootOwnPair": {
    "context": {
      "repository": "tokenizartinfo-ops/agent-friendly-web",
      "repositoryId": "1347578006",
      "ref": "refs/heads/feat/finite-native-cleanup-20261101",
      "source": "0d26858762b1bb01fe3b835593bc2a544c766d99",
      "tree": "132bb281fe76b49f40fa2634de9120deb67486a9",
      "workflowBlob": "2a9d38186d38dcf7e09bbb3ff12b7d19633a2f8f",
      "run": "43615497152",
      "attempt": 1,
      "node": "22.23.4"
    },
    "resultBytes": 6959,
    "resultSha256": "9c3c87037504d8bbe3d40a75999f380dbe7722ea46d4a60add01a2ec83096160",
    "manifestBytes": 551,
    "manifestSha256": "cf9f8c842c9f0cf3fa032935b13cf00b14ac990cf7b225b0f25f1ca5e12bfdf5",
    "tests": {
      "allUnknown": {
        "exit": 1,
        "tests": 45,
        "pass": 33,
        "fail": 12,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "diagnostic": {
        "exit": 0,
        "tests": 45,
        "pass": 45,
        "fail": 0,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "stage": {
        "exit": 0,
        "tests": 36,
        "pass": 36,
        "fail": 0,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "oldDiagnostic": {
        "exit": 1,
        "tests": 2,
        "pass": 0,
        "fail": 2,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "oldStage": {
        "exit": 1,
        "tests": 3,
        "pass": 0,
        "fail": 3,
        "cancelled": 0,
        "skipped": 0,
        "todo": 0
      },
      "hooks": {
        "green": 0,
        "oldCallsite": 2
      }
    },
    "greenFamilies": 94,
    "nonclaimsAllFalse": true
  },
  "files": [
    {
      "name": "result.json",
      "bytes": 6959,
      "sha256": "9c3c87037504d8bbe3d40a75999f380dbe7722ea46d4a60add01a2ec83096160",
      "crc32": "1cee4b7c"
    },
    {
      "name": "manifest.json",
      "bytes": 551,
      "sha256": "cf9f8c842c9f0cf3fa032935b13cf00b14ac990cf7b225b0f25f1ca5e12bfdf5",
      "crc32": "ca2cd28c"
    }
  ],
  "sourceOnly": true,
  "noNativeExecuted": true
}

## Fix diff test/fixtures/finite-budget-failure-runtime.mjs
```diff
@@ -1,70 +1,2 @@
-import {types} from 'node:util';
-import {AssertionError} from 'node:assert/strict';
-import process from 'node:process';
-
-// First trusted Source dependency; pre-capture arbitrary code is outside this contract.
-const globalObject=globalThis,descriptor=Object.getOwnPropertyDescriptor,prototype=Object.getPrototypeOf,own=Object.hasOwn,apply=Reflect.apply;
-const isProxy=types.isProxy,isNativeError=types.isNativeError,isArray=Array.isArray,byteLength=Buffer.byteLength;
-const objectPrototype=Object.prototype;
-function sameDescriptor(a,b){
- if(!a||!b)return a===b;
- for(const key of ['value','writable','get','set','enumerable','configurable']){if(own(a,key)!==own(b,key))return false;if(own(a,key)&&a[key]!==b[key])return false;}
- return true;
-}
-function data(value){return value&&own(value,'value');}
-function bounded(value){return typeof value==='string'&&value.length<=65536&&byteLength(value,'utf8')<=65536;}
-function startupAllowed(){
- if(process.versions.node!=='22.23.4')return false;
- const env=descriptor(process,'env'),args=descriptor(process,'execArgv');
- if(!data(env)||!env.value||isProxy(env.value)||!data(args)||!isArray(args.value)||isProxy(args.value))return false;
- const option=descriptor(env.value,'NODE_OPTIONS');if(option&&(!data(option)||(option.value!==undefined&&option.value!=='')))return false;
- const length=descriptor(args.value,'length');if(!data(length)||!Number.isSafeInteger(length.value)||length.value>16)return false;
- for(let index=0;index<length.value;index++){const entry=descriptor(args.value,String(index));if(!data(entry)||!['--experimental-vm-modules','--test','--test-reporter=tap','--input-type=module'].includes(entry.value))return false;}
- return true;
-}
-function capture(){
- try{
-  if(!startupAllowed())return null;
-  const globalError=descriptor(globalObject,'Error');if(!data(globalError)||typeof globalError.value!=='function'||isProxy(globalError.value))return null;
-  const ErrorConstructor=globalError.value,errorPrototypeProperty=descriptor(ErrorConstructor,'prototype'),assertionPrototypeProperty=descriptor(AssertionError,'prototype');
-  if(!data(errorPrototypeProperty)||!data(assertionPrototypeProperty))return null;
-  const errorPrototype=errorPrototypeProperty.value,assertionPrototype=assertionPrototypeProperty.value;
-  if(!errorPrototype||!assertionPrototype||isProxy(errorPrototype)||isProxy(assertionPrototype)||prototype(errorPrototype)!==objectPrototype||prototype(assertionPrototype)!==errorPrototype)return null;
-  const constructors=[];for(let cursor=ErrorConstructor;cursor!==null;cursor=prototype(cursor)){
-   if(isProxy(cursor))return null;const formatting=descriptor(cursor,'prepareStackTrace');
-   if(cursor===ErrorConstructor){if(!data(formatting)||typeof formatting.value!=='function'||isProxy(formatting.value)||formatting.enumerable||!formatting.writable||!formatting.configurable)return null;}
-   else if(formatting)return null;
-   constructors.push({object:cursor,parent:prototype(cursor),formatting});
-  }
-  const limit=descriptor(ErrorConstructor,'stackTraceLimit');if(!data(limit)||typeof limit.value!=='number'||!Number.isFinite(limit.value))return null;
-  const keys=['name','message','toString','constructor','code',Symbol.toStringTag],prototypes=[];
-  for(const object of [errorPrototype,assertionPrototype,objectPrototype]){
-   if(isProxy(object))return null;const fields=keys.map(key=>[key,descriptor(object,key)]);
-   for(const [key,value]of fields){if(!value)continue;if(key===Symbol.toStringTag||!data(value))return null;if((key==='name'||key==='message'||key==='code')&&value.value!==undefined&&!bounded(value.value))return null;if((key==='toString'||key==='constructor')&&(typeof value.value!=='function'||isProxy(value.value)))return null;}
-   prototypes.push({object,parent:prototype(object),fields});
-  }
-  const sample=new ErrorConstructor();if(!isNativeError(sample)||isProxy(sample))return null;
-  const stack=descriptor(sample,'stack');if(!stack||data(stack)||typeof stack.get!=='function'||typeof stack.set!=='function'||isProxy(stack.get)||isProxy(stack.set))return null;
-  return {globalError,ErrorConstructor,errorPrototype,assertionPrototype,errorPrototypeProperty,assertionPrototypeProperty,constructors,prototypes,limit,stack};
- }catch{return null;}
-}
-const trusted=capture();
-export function readNativeStack(error){
- try{
-  if(!trusted||!startupAllowed()||!sameDescriptor(descriptor(globalObject,'Error'),trusted.globalError))throw null;
-  if(error===null||typeof error!=='object'||isProxy(error)||!isNativeError(error))throw null;
-  if(!sameDescriptor(descriptor(trusted.ErrorConstructor,'prototype'),trusted.errorPrototypeProperty)||!sameDescriptor(descriptor(AssertionError,'prototype'),trusted.assertionPrototypeProperty)||!sameDescriptor(descriptor(trusted.ErrorConstructor,'stackTraceLimit'),trusted.limit))throw null;
-  const parent=prototype(error);if(parent!==trusted.errorPrototype&&parent!==trusted.assertionPrototype)throw null;
-  for(const entry of trusted.constructors)if(isProxy(entry.object)||prototype(entry.object)!==entry.parent||!sameDescriptor(descriptor(entry.object,'prepareStackTrace'),entry.formatting))throw null;
-  for(const entry of trusted.prototypes){
-   if(isProxy(entry.object)||prototype(entry.object)!==entry.parent)throw null;
-   for(const [key,value]of entry.fields)if(!sameDescriptor(descriptor(entry.object,key),value))throw null;
-  }
-  for(const key of ['name','message','code']){
-   const value=descriptor(error,key);if(value&&(!data(value)||(value.value!==undefined&&!bounded(value.value))))throw null;
-  }
-  for(const key of ['toString','constructor',Symbol.toStringTag])if(descriptor(error,key))throw null;
-  const stack=descriptor(error,'stack');if(!sameDescriptor(stack,trusted.stack))throw null;
-  const text=apply(trusted.stack.get,error,[]);if(!bounded(text))throw null;return text;
- }catch{throw null;}
-}
+// Lazy V8 stack accessors are unsupported: no input inspection or global hooks.
+export function readNativeStack(){return null;}

```

## Fix diff test/fixtures/finite-budget-failure-diagnostic.mjs
```diff
@@ -10,14 +10,14 @@
 const approvedPaths=new Set(FIXED_BUDGET_FAILURE_SOURCES.flatMap(row=>[row.path,root+row.path,'file://'+root+row.path]));
 const basenames=[...new Set(FIXED_BUDGET_FAILURE_SITES.map(row=>row.path.split('/').at(-1)))];
 const unavailable=()=>({code:'unknown',site:'unknown'});
 function stackValue(error,descriptor,readNativeStack){
  if(!descriptor)return undefined;
  if(Object.hasOwn(descriptor,'value'))return descriptor.value;
- if(typeof readNativeStack!=='function'||types.isProxy(readNativeStack))throw null;
- return readNativeStack(error);
+ // Decline every lazy representation, without calling even a supplied reader.
+ throw null;
 }
 function boundedLines(text){
  if(typeof text!=='string'||text.length>65536||Buffer.byteLength(text,'utf8')>65536)return null;
  const lines=text.split('\n');if(lines.at(-1)==='')lines.pop();
  if(lines.length>4096||lines.some(line=>line.length>1024||Buffer.byteLength(line,'utf8')>1024||line.includes('\r')))return null;
  return lines;
@@ -34,22 +34,24 @@
  }
  return 'unknown';
 }
 export function projectFixedBudgetFailure(error,readNativeStack){
  try{
   if(error===null||typeof error!=='object'||types.isProxy(error)||!types.isNativeError(error))return unavailable();
-  const descriptors={};for(const key of ['code','message','stack']){
+  const descriptors={};
+  // Header fields are own DATA strings only. Multiline fields can forge frames.
+  for(const key of ['name','message','code']){
    const descriptor=Object.getOwnPropertyDescriptor(error,key);
-   if(key==='stack'){descriptors[key]=stackValue(error,descriptor,readNativeStack);continue;}
    if(descriptor&&!Object.hasOwn(descriptor,'value'))return unavailable();
-   descriptors[key]=descriptor?.value;
-   if(descriptors[key]!==undefined&&!boundedLines(descriptors[key]))return unavailable();
+   const value=descriptor?.value;
+   if(value!==undefined&&(typeof value!=='string'||!boundedLines(value)||value.includes('\n')||value.includes('\r')))return unavailable();
+   descriptors[key]=value;
   }
-  const {code:rawCode,message,stack}=descriptors;
-  if((rawCode!==undefined&&typeof rawCode!=='string')||(message!==undefined&&typeof message!=='string')||(stack!==undefined&&typeof stack!=='string'))return unavailable();
-  if([rawCode,message,stack].some(value=>value!==undefined&&!boundedLines(value)))return unavailable();
+  const stack=stackValue(error,Object.getOwnPropertyDescriptor(error,'stack'),readNativeStack);
+  if(stack!==undefined&&(typeof stack!=='string'||!boundedLines(stack)))return unavailable();
+  const {code:rawCode,message}=descriptors;
   let code='unknown';
   if(rawCode==='ERR_ASSERTION')code='assertion';
   else if(['EEXIST','ENOENT','EACCES','ENOSPC','ETIMEDOUT'].includes(rawCode))code=rawCode;
   else if(['custody_format','custody_limit','custody_size','custody_destination','custody_authentication','custody_io','custody_cleanup'].includes(message))code=message;
   return {code,site:stack===undefined?'unknown':sourceSite(stack)};
  }catch{return unavailable();}

```

## Fix diff test/finite-budget-failure-diagnostic.test.mjs
```diff
@@ -23,15 +23,15 @@
 test('d06_every_finite_public_site',()=>{const rows=publicSites;for(const row of rows)assert.deepEqual(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame(row.path,row.line))),{code:'ENOENT',site:row.id});});
 test('d07_relative_public_frame',()=>assert.deepEqual(failure(error('EACCES','Error: SYN_PRIVATE\n    at synthetic ('+first+':100:2)')),{code:'EACCES',site}));
 test('d08_no_free_paths',()=>{for(const path of ['/evil/'+first,publicRoot+'../'+first,'/tmp/finite-owner-cleanup-persistence.mjs','https://evil.invalid/'+first])assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n    at synthetic ('+path+':100:1)')).site,'unknown');});
 test('d09_no_free_line_or_columns',()=>{for(const [number,column]of [[0,1],[99,1],[101,1],[999999999,1],[100,0],[100,10000]])assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame(first,number,column))).site,'unknown');});
 test('d10_normal_chain_and_ambiguous_frame',()=>{assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame()+'\n'+frame(first,128))).site,site);assert.equal(failure(error('ENOENT','Error: SYN_PRIVATE\n'+frame().slice(0,-1)+' '+frame(first,128)+')')).site,'unknown');});
 test('d11_message_cannot_forge_frame',()=>assert.deepEqual(failure(error(undefined,frame())),unknown));
-test('d12_real_vm_native_error',()=>{let value;try{new Script('throw new Error("SYN_PRIVATE native error")',{filename:first,lineOffset:99}).runInNewContext({Error});}catch(caught){value=caught;}assert(value);const descriptor=Object.getOwnPropertyDescriptor(value,'stack');assert(['value','get'].some(key=>Object.hasOwn(descriptor,key)));assert.deepEqual(failure(value),{code:'unknown',site});});
-test('d13_real_vm_assertion',()=>{let value;try{new Script('assert.equal(1,2,"SYN_PRIVATE assertion")',{filename:first,lineOffset:99}).runInNewContext({assert});}catch(caught){value=caught;}assert(value);assert.deepEqual(failure(value),{code:'assertion',site});});
-test('d14_getters_never_called',()=>{for(const key of ['code','message','stack']){let calls=0;const value=error('ENOENT');Object.defineProperty(value,key,{get(){calls++;throw Error('SYN_PRIVATE getter');}});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}
+test('d12_real_vm_native_error',()=>{let value;try{new Script('throw new Error("SYN_PRIVATE native error")',{filename:first,lineOffset:99}).runInNewContext({Error});}catch(caught){value=caught;}assert(value);const descriptor=Object.getOwnPropertyDescriptor(value,'stack');assert(['value','get'].some(key=>Object.hasOwn(descriptor,key)));assert.deepEqual(failure(value),unknown);});
+test('d13_real_vm_assertion',()=>{let value;try{new Script('assert.equal(1,2,"SYN_PRIVATE assertion")',{filename:first,lineOffset:99}).runInNewContext({assert});}catch(caught){value=caught;}assert(value);assert.deepEqual(failure(value),unknown);});
+test('d14_getters_never_called',()=>{for(const key of ['name','code','message','stack']){let calls=0;const value=error('ENOENT');Object.defineProperty(value,key,{get(){calls++;throw Error('SYN_PRIVATE getter');}});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}
  for(const key of ['name','message','toString','constructor']){let calls=0;const value=new Error('SYN_PRIVATE'),saved=Object.getOwnPropertyDescriptor(Error.prototype,key);try{Object.defineProperty(Error.prototype,key,{get(){calls++;throw Error('SYN_PRIVATE');},configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}finally{Object.defineProperty(Error.prototype,key,saved);}}
  {
   let branded;try{Buffer.from(1);}catch(error){branded=error;}assert(branded);
   const symbols=new Set();for(let cursor=branded;cursor!==null;cursor=Object.getPrototypeOf(cursor))for(const key of Object.getOwnPropertySymbols(cursor))symbols.add(key);
   assert(symbols.size>0);let calls=0;const value=new Error('SYN_PRIVATE inherited code'),saved=Object.getOwnPropertyDescriptor(Error.prototype,'code');assert.equal(Object.hasOwn(value,'code'),false);
   for(const key of symbols)Object.defineProperty(value,key,{value:true,configurable:true});
@@ -40,13 +40,13 @@
  }
  for(const accessor of [false,true]){let calls=0;const value=new Error('SYN_PRIVATE'),saved=Object.getOwnPropertyDescriptor(Error,'prepareStackTrace');try{Object.defineProperty(Error,'prepareStackTrace',accessor?{get(){calls++;throw Error('SYN_PRIVATE');},configurable:true}:{value(){calls++;return 'SYN_PRIVATE';},configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);}finally{if(saved)Object.defineProperty(Error,'prepareStackTrace',saved);else delete Error.prepareStackTrace;}}
 });
 test('d15_proxy_traps_never_called',()=>{let calls=0;const value=new Proxy(error('ENOENT'),{get(){calls++;throw Error('SYN_PRIVATE');},getOwnPropertyDescriptor(){calls++;throw Error('SYN_PRIVATE');},getPrototypeOf(){calls++;throw Error('SYN_PRIVATE');},ownKeys(){calls++;throw Error('SYN_PRIVATE');}});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);});
 test('d16_revoked_proxy',()=>{const {proxy,revoke}=Proxy.revocable(error('ENOENT'),{});revoke();assert.deepEqual(failure(proxy),unknown);});
 test('d17_arbitrary_objects_no_coercion',()=>{let calls=0;for(const value of [null,undefined,1,true,'SYN_PRIVATE',{},[],Object.create(null),{code:'ENOENT',stack:'Error\n'+frame(),toString(){calls++;return 'SYN_PRIVATE';}}])assert.deepEqual(failure(value),unknown);assert.equal(calls,0);});
-test('d18_error_private_fields_ignored',()=>{let calls=0;const value=error('ENOENT');value.actual='SYN_PRIVATE actual';value.expected='SYN_PRIVATE expected';value.toJSON=()=>{calls++;throw Error('SYN_PRIVATE');};Object.defineProperty(value,'name',{get(){calls++;throw Error('SYN_PRIVATE');}});const observed=failure(value);assert.deepEqual(observed,{code:'ENOENT',site});fixed(observed);assert.equal(calls,0);});
+test('d18_error_private_fields_ignored',()=>{let calls=0;const value=error('ENOENT');value.actual='SYN_PRIVATE actual';value.expected='SYN_PRIVATE expected';value.toJSON=()=>{calls++;throw Error('SYN_PRIVATE');};const observed=failure(value);assert.deepEqual(observed,{code:'ENOENT',site});fixed(observed);assert.equal(calls,0);});
 test('d19_huge_error_stack',()=>assert.deepEqual(failure(error('ENOENT','SYN_PRIVATE'.repeat(7000))),unknown));
 test('d20_long_error_line',()=>assert.deepEqual(failure(error('ENOENT','Error: '+'.'.repeat(1025)+'\n'+frame())),unknown));
 test('d21_canonical_fixed_log',()=>assert.deepEqual(log('SYN_PRIVATE arbitrary unrelated\n'+line({code:'ENOENT',site})),{code:'ENOENT',site}));
 test('d22_all_log_codes_and_sites',()=>{for(const code of ["unknown","assertion","EEXIST","ENOENT","EACCES","ENOSPC","ETIMEDOUT","custody_format","custody_limit","custody_size","custody_destination","custody_authentication","custody_io","custody_cleanup"])assert.deepEqual(log(line({code,site})),{code,site});for(const row of publicSites)assert.deepEqual(log(line({code:'unknown',site:row.id})),{code:'unknown',site:row.id});});
 test('d23_log_secrets_not_echoed',()=>{const observed=log('SYN_PRIVATE assertion actual=private expected=private\n');assert.deepEqual(observed,unknown);fixed(observed);});
 test('d24_log_closed_schema',()=>{for(const value of [{code:'ENOENT',site,actual:'SYN_PRIVATE'},{site,code:'ENOENT'},{code:'ENOENT'},['ENOENT',site],null,{code:'ENOENT',site:1}])assert.deepEqual(log(line(value)),unknown);});
@@ -61,13 +61,13 @@
 test('d33_nonstring_logs_no_coercion',()=>{let calls=0;for(const value of [null,undefined,{},[],new String(line({code:'ENOENT',site})),{toString(){calls++;return line({code:'ENOENT',site});}}])assert.deepEqual(log(value),unknown);assert.equal(calls,0);});
 test('d34_fresh_closed_results',()=>{const native=new Error('SYN_PRIVATE');assert.deepEqual(projectFailure(native),unknown);const firstResult=failure(null);firstResult.code='SYN_PRIVATE';assert.deepEqual(failure(null),unknown);assert.deepEqual(log(line({code:'unknown',site:'unknown'})),unknown);fixed(failure(error('ENOENT')));});
 
 const runtimeURL=new URL('./fixtures/finite-budget-failure-runtime.mjs',import.meta.url).href;
 const helperURL=new URL('./fixtures/finite-budget-failure-diagnostic.mjs',import.meta.url).href;
 function freshChild(mode,{nodeOptions,preload=false}={}){
- const source="import assert from 'node:assert/strict';\nimport {Script} from 'node:vm';\nconst mode=__MODE__,runtimeURL=__RUNTIME_URL__,helperURL=__HELPER_URL__;\nconst {readNativeStack}=await import(runtimeURL);\nconst GlobalError=Error,globalDescriptor=Object.getOwnPropertyDescriptor(globalThis,'Error'),formatterDescriptor=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nassert.equal(process.versions.node,'22.23.4');assert(formatterDescriptor&&Object.hasOwn(formatterDescriptor,'value'));assert.equal(typeof formatterDescriptor.value,'function');\nlet value;try{new Script('throw new Error(\"SYN_PRIVATE fresh native\")',{filename:'test/fixtures/finite-owner-cleanup-persistence.mjs',lineOffset:99}).runInNewContext({Error:GlobalError});}catch(error){value=error;}assert(value);\nlet calls=0;\nif(mode==='formatter_getter')Object.defineProperty(GlobalError,'prepareStackTrace',{get(){calls++;return formatterDescriptor.value;},configurable:true});\nif(mode==='formatter_proxy'){const proxy=new Proxy(formatterDescriptor.value,{apply(){calls++;return 'SYN_PRIVATE';},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;},ownKeys(){calls++;throw null;}});Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:proxy});}\nif(mode==='formatter_lookalike'){\n const text=Function.prototype.toString.call(formatterDescriptor.value);\n const replica=Function('internalPrepareStackTrace','return ('+text+')')(()=>{calls++;return 'SYN_PRIVATE';});\n assert.equal(Function.prototype.toString.call(replica),text);assert.notEqual(replica,formatterDescriptor.value);\n Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:replica});\n}\nif(mode==='Error_getter')Object.defineProperty(globalThis,'Error',{get(){calls++;return GlobalError;},configurable:true});\nif(mode==='Error_proxy'){const proxy=new Proxy(GlobalError,{construct(){calls++;throw null;},apply(){calls++;throw null;},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;}});Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:proxy});}\nif(mode==='Error_constructor'){function Substitute(){calls++;return new GlobalError('SYN_PRIVATE');}Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:Substitute});}\nconst beforeGlobal=Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeFormatter=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nconst {projectFixedBudgetFailure}=await import(helperURL);\nconst actual=projectFixedBudgetFailure(value,readNativeStack);\nassert.deepEqual(actual,mode==='default'?{code:'unknown',site:'persistence_100'}:{code:'unknown',site:'unknown'});assert.equal(calls,0);\nassert.deepEqual(Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeGlobal);assert.deepEqual(Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace'),beforeFormatter);\nif(mode==='default'){assert.deepEqual(beforeGlobal,globalDescriptor);assert.deepEqual(beforeFormatter,formatterDescriptor);}\nconsole.log('{\"ok\":true}');\n".replaceAll('__MODE__',()=>JSON.stringify(mode)).replaceAll('__RUNTIME_URL__',()=>JSON.stringify(runtimeURL)).replaceAll('__HELPER_URL__',()=>JSON.stringify(helperURL));
+ const source="import assert from 'node:assert/strict';\nimport {Script} from 'node:vm';\nconst mode=__MODE__,runtimeURL=__RUNTIME_URL__,helperURL=__HELPER_URL__;\nconst {readNativeStack}=await import(runtimeURL);\nconst GlobalError=Error,globalDescriptor=Object.getOwnPropertyDescriptor(globalThis,'Error'),formatterDescriptor=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nassert.equal(process.versions.node,'22.23.4');assert(formatterDescriptor&&Object.hasOwn(formatterDescriptor,'value'));assert.equal(typeof formatterDescriptor.value,'function');\nlet value;try{new Script('throw new Error(\"SYN_PRIVATE fresh native\")',{filename:'test/fixtures/finite-owner-cleanup-persistence.mjs',lineOffset:99}).runInNewContext({Error:GlobalError});}catch(error){value=error;}assert(value);\nlet calls=0;\nif(mode==='formatter_getter')Object.defineProperty(GlobalError,'prepareStackTrace',{get(){calls++;return formatterDescriptor.value;},configurable:true});\nif(mode==='formatter_proxy'){const proxy=new Proxy(formatterDescriptor.value,{apply(){calls++;return 'SYN_PRIVATE';},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;},ownKeys(){calls++;throw null;}});Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:proxy});}\nif(mode==='formatter_lookalike'){\n const text=Function.prototype.toString.call(formatterDescriptor.value);\n const replica=Function('internalPrepareStackTrace','return ('+text+')')(()=>{calls++;return 'SYN_PRIVATE';});\n assert.equal(Function.prototype.toString.call(replica),text);assert.notEqual(replica,formatterDescriptor.value);\n Object.defineProperty(GlobalError,'prepareStackTrace',{...formatterDescriptor,value:replica});\n}\nif(mode==='Error_getter')Object.defineProperty(globalThis,'Error',{get(){calls++;return GlobalError;},configurable:true});\nif(mode==='Error_proxy'){const proxy=new Proxy(GlobalError,{construct(){calls++;throw null;},apply(){calls++;throw null;},get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;}});Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:proxy});}\nif(mode==='Error_constructor'){function Substitute(){calls++;return new GlobalError('SYN_PRIVATE');}Object.defineProperty(globalThis,'Error',{...globalDescriptor,value:Substitute});}\nconst beforeGlobal=Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeFormatter=Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace');\nconst {projectFixedBudgetFailure}=await import(helperURL);\nconst actual=projectFixedBudgetFailure(value,readNativeStack);\nassert.deepEqual(actual,{code:'unknown',site:'unknown'});assert.equal(calls,0);\nassert.deepEqual(Object.getOwnPropertyDescriptor(globalThis,'Error'),beforeGlobal);assert.deepEqual(Object.getOwnPropertyDescriptor(GlobalError,'prepareStackTrace'),beforeFormatter);\nif(mode==='default'){assert.deepEqual(beforeGlobal,globalDescriptor);assert.deepEqual(beforeFormatter,formatterDescriptor);}\nconsole.log('{\"ok\":true}');\n".replaceAll('__MODE__',()=>JSON.stringify(mode)).replaceAll('__RUNTIME_URL__',()=>JSON.stringify(runtimeURL)).replaceAll('__HELPER_URL__',()=>JSON.stringify(helperURL));
  const env={...process.env};delete env.NODE_OPTIONS;if(nodeOptions!==undefined)env.NODE_OPTIONS=nodeOptions;
  const args=[...(preload?['--require','node:util']:[]),'--input-type=module'];
  const child=spawnSync(process.execPath,args,{input:source,encoding:'utf8',timeout:15000,maxBuffer:65536,env});
  assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.status,0);assert.equal(child.stderr,'');assert.equal(child.stdout,'{"ok":true}\n');
 }
 test('d35_fresh_default_formatter_preserved',()=>freshChild('default'));
@@ -75,6 +75,30 @@
 test('d37_fresh_formatter_proxy_before_helper',()=>freshChild('formatter_proxy'));
 test('d38_fresh_identical_text_different_closure',()=>freshChild('formatter_lookalike'));
 test('d39_fresh_global_Error_getter_before_helper',()=>freshChild('Error_getter'));
 test('d40_fresh_global_Error_proxy_before_helper',()=>freshChild('Error_proxy'));
 test('d41_fresh_global_Error_constructor_before_helper',()=>freshChild('Error_constructor'));
 test('d42_fresh_startup_options_refused',()=>{freshChild('unsafe_startup',{nodeOptions:'--no-warnings'});freshChild('unsafe_startup',{preload:true});});
+
+test('d43_fresh_callsite_coercion_refused',()=>{
+ const source="import assert from 'node:assert/strict';\nconst {readNativeStack}=await import(__RUNTIME__);\nconst saved=Object.getOwnPropertyDescriptor(Error,'prepareStackTrace');\nlet frames;\ntry{Object.defineProperty(Error,'prepareStackTrace',{...saved,value:(_error,sites)=>sites});frames=new Error('SYN_PRIVATE').stack;}finally{Object.defineProperty(Error,'prepareStackTrace',saved);}\nassert(Array.isArray(frames)&&frames.length>0);\nconst proto=Object.getPrototypeOf(frames[0]),previous=Object.getOwnPropertyDescriptor(proto,Symbol.toPrimitive);\nlet calls=0;\ntry{\n Object.defineProperty(proto,Symbol.toPrimitive,{value(){calls++;return 'SYN_PRIVATE';},configurable:true});\n const error=new Error('SYN_PRIVATE');assert.equal(typeof Object.getOwnPropertyDescriptor(error,'stack').get,'function');\n assert.deepEqual(Object.getOwnPropertyDescriptor(Error,'prepareStackTrace'),saved);\n const {projectFixedBudgetFailure}=await import(__HELPER__);\n const value=projectFixedBudgetFailure(error,readNativeStack);\n assert.equal(calls,0);assert.deepEqual(value,{code:'unknown',site:'unknown'});\n assert.deepEqual(Object.getOwnPropertyDescriptor(Error,'prepareStackTrace'),saved);\n}finally{if(previous)Object.defineProperty(proto,Symbol.toPrimitive,previous);else delete proto[Symbol.toPrimitive];}\nconsole.log('{\"ok\":true}');".replace('__RUNTIME__',JSON.stringify(runtimeURL)).replace('__HELPER__',JSON.stringify(helperURL));
+ const env={...process.env};delete env.NODE_OPTIONS;delete env.GH_ARTIFACT_TOKEN;delete env.AFW_SYN_CHECKPOINT_KEY;
+ const child=spawnSync(process.execPath,['--input-type=module'],{input:source,encoding:'utf8',env,timeout:5000,maxBuffer:65536});
+ assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.status,0);assert.equal(child.stderr,'');assert.equal(child.stdout,'{"ok":true}\n');
+});
+test('d44_multiline_header_fields_refused',()=>{
+ for(const key of ['name','message','code'])for(const separator of ['\n','\r']){
+  const value=error('ENOENT','Error: x\n    at synthetic (test/fixtures/finite-checkpoint-custody.mjs:20:1)\n'+frame());
+  Object.defineProperty(value,key,{value:'x'+separator+'    at synthetic (test/fixtures/finite-checkpoint-custody.mjs:20:1)',configurable:true,writable:true});
+  assert.deepEqual(failure(value),unknown);
+  const native=new Error('safe');Object.defineProperty(native,key,{value:value[key],configurable:true,writable:true});assert.deepEqual(failure(native),unknown);
+ }
+});
+test('d45_header_values_without_hooks',()=>{
+ for(const key of ['name','message','code']){
+  let calls=0;const value=error('ENOENT');Object.defineProperty(value,key,{get(){calls++;throw null;},configurable:true});
+  assert.deepEqual(failure(value),unknown);assert.equal(calls,0);
+  const proxy=new Proxy({},{get(){calls++;throw null;},getOwnPropertyDescriptor(){calls++;throw null;},getPrototypeOf(){calls++;throw null;},ownKeys(){calls++;throw null;}});
+  Object.defineProperty(value,key,{value:proxy,configurable:true});assert.deepEqual(failure(value),unknown);assert.equal(calls,0);
+ }
+ let calls=0;const value=error('ENOENT');assert.deepEqual(projectFailure(value,()=>{calls++;throw null;}),{code:'ENOENT',site});assert.equal(calls,0);
+});

```

## Fix diff test/fixtures/finite-budget-stage-observer.mjs
```diff
@@ -51,22 +51,25 @@
   if(next===STAGES.length)return {stage:{state:'complete',stage:STAGES.at(-1)},http:status};
   return {stage:unknownStage(),http:null};
  }catch{return {stage:unknownStage(),http:null};}
 }
 function legacy(lines,P){
  const codes=P.FIXED_BUDGET_FAILURE_CODES;
+ const semantic=code=>code==='ERR_ASSERTION'||code==='assertion'?'assertion':codes.includes(code)&&code!=='unknown'?code:null;
+ const conflict=()=>({value:unknown(),count:2});
  const observations=[];
  for(let n=0;n<lines.length;n++){
-  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[(ERR_ASSERTION|EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT)\])?: (.*)$/.exec(line);
+  const line=lines[n],header=/^(Error|AssertionError|CustodyError)(?: \[([^\]\r\n]*)\])?: (.*)$/.exec(line);
   if(!header)continue;
-  const message=header[3];let code=header[2]??null,custody=null;
-  if(codes.includes(message)&&message.startsWith('custody_'))custody=message;
-  const system=/^(EEXIST|ENOENT|EACCES|ENOSPC|ETIMEDOUT): /.exec(message);if(system){if(code&&code!==system[1])return {value:unknown(),count:2};code=system[1];}
-  if(header[1]==='CustodyError'&&(!custody||code!==null))continue;
-  if(header[1]==='AssertionError'&&code===null)code='ERR_ASSERTION';
-  if(!code&&!custody)continue;
+  const message=header[3],explicit=semantic(header[2]),exact=semantic(message),token=/^([A-Za-z_]+): /.exec(message),messageCode=exact??semantic(token?.[1]);
+  if(header[2]!==undefined&&explicit===null)return conflict();
+  const claims=[header[1]==='AssertionError'?'assertion':null,explicit,messageCode].filter(Boolean);
+  if(header[1]==='CustodyError'&&(!exact?.startsWith('custody_')||header[2]!==undefined))return conflict();
+  if(new Set(claims).size>1)return conflict();
+  if(!claims.length)continue;
+  const recognized=claims[0],custody=recognized.startsWith('custody_')?recognized:null,code=recognized==='assertion'?'ERR_ASSERTION':custody?null:recognized;
   const frames=[];let unrecognizedSourceFrame=false;
   for(let k=n+1;k<lines.length&&/^ {4}at /.test(lines[k]);k++){
    const match=/^ {4}at (?:async )?(?:new )?(?:(?:[A-Za-z0-9_$.[\]<>]+) \(([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3})\)|([^()\s]+):([1-9][0-9]{0,5}):([1-9][0-9]{0,3}))$/.exec(lines[k]);
    if(!match){if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>lines[k].includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;continue;}
    const path=match[1]??match[4],root='/home/runner/work/agent-friendly-web/agent-friendly-web/';
    if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>[s.path,root+s.path,'file://'+root+s.path].includes(path)))frames.push(lines[k]);else if(P.FIXED_BUDGET_FAILURE_SOURCES.some(s=>path.includes(s.path.split('/').at(-1))))unrecognizedSourceFrame=true;
@@ -94,22 +97,24 @@
 }
 async function readOwned(root,name,io){
  let fd;const path=join(root,name);
  try{
   const parents=await controlledRoot(root,io),before=await io.lstat(path);if(!regular(before)||before.isSymbolicLink())return {availability:'unsafe'};
   if(before.size>1048576)return {availability:'oversized'};
-  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW);const initial=await fd.stat();
+  fd=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);const initial=await fd.stat();
   if(!regular(initial)||JSON.stringify(identity(initial))!==JSON.stringify(identity(before)))return {availability:'racing'};
   const size=Math.min(initial.size,65536),bytes=Buffer.alloc(size),read=await fd.read(bytes,0,size,initial.size-size);
   const after=await fd.stat(),pathAfter=await io.lstat(path);let parentStable=false;try{parentStable=JSON.stringify(parents)===JSON.stringify(await controlledRoot(root,io));}catch{}
   if(!parentStable||read.bytesRead!==size||JSON.stringify(identity(initial))!==JSON.stringify(identity(after))||JSON.stringify(identity(after))!==JSON.stringify(identity(pathAfter)))return {availability:'racing'};
   if(initial.size>65536)return {availability:'truncated'};
   if(size&&bytes[size-1]!==10)return {availability:'truncated'};
   let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(text).equals(bytes));linesOf(text);}catch{return {availability:'malformed'};}
-  // A partial marker at either edge is unavailable, including an initial prefix.
-  for(const line of text.split('\n'))for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
+  // Physical first/last nonempty lines only; empty means exactly zero bytes.
+  // Interior noise, including a partial prefix, is not evidence of truncation.
+  const nonempty=text.slice(0,-1).split('\n').filter(line=>line!=='');
+  for(const line of [nonempty[0],nonempty.at(-1)])for(const prefix of ['AFW_SYN_STAGE/1','AFW_SYN_HTTP/1','AFW_SYN_FAILURE/1'])if(line&&prefix.startsWith(line)&&line!==prefix)return {availability:'truncated'};
   return {availability:'available',text};
  }catch(error){const code=Object.getOwnPropertyDescriptor(error??{},'code')?.value;return {availability:code==='ENOENT'?'missing':['ELOOP','ENOTDIR'].includes(code)?'unsafe':'unavailable'};}
  finally{if(fd)try{await fd.close();}catch{}}
 }
 // Explicit library-only test boundary: an owned synthetic root/IO can be passed
 // here. Production collection below exposes no root, IO, argv or env path override.
@@ -122,14 +127,14 @@
  }
  const metadata=observations[2],count=logs[3];
  return {logs,stage:logs[2].availability==='available'?metadata.stage:unknownStage(),http:logs[2].availability==='available'?metadata.http:null,countCheck:count.availability==='missing'||count.availability==='available'&&count.code==='unknown'&&observations[3].stage.state==='not_observed'?'not_observed':count.availability==='available'&&count.code==='assertion'?'coded_assertion':'unknown'};
 }
 async function projector(){
  const bytes=await fs.readFile(join(process.cwd(),'test/fixtures/finite-budget-failure-diagnostic.mjs'));
- same(bytes.length,7927);same(sha(bytes),'97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2');
- same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f');
+ same(bytes.length,7871);same(sha(bytes),'6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c');
+ same(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),'62965a9d5836e54563550fe29dff23abe9a62054');
  return import('data:text/javascript;base64,'+bytes.toString('base64'));
 }
 export async function collectFixedStagePair({context,job,rawOutcome}){
  const e=process.env;assert(e.NODE_OPTIONS===undefined&&e.AFW_SYN_CHECKPOINT_KEY===undefined&&e.GH_ARTIFACT_TOKEN===undefined,'stage_evidence_rejected');
  assert(typeof e.RUNNER_TEMP==='string'&&isAbsolute(e.RUNNER_TEMP),'stage_evidence_rejected');
  const P=await projector(),pair=makeStagePair({context,job,rawOutcome,observation:await collectOwnedLogRoot(join(e.RUNNER_TEMP,'afw-native-private','logs'),P)});validateStagePairWithProjector(pair,context,job,P);return pair;

```

## Fix diff test/finite-budget-stage-observer.test.mjs
```diff
@@ -1,11 +1,12 @@
 import test from 'node:test';
 import assert from 'node:assert/strict';
 import * as fs from 'node:fs/promises';
 import {join} from 'node:path';
 import {tmpdir} from 'node:os';
+import {spawnSync} from 'node:child_process';
 import * as D from './fixtures/finite-budget-stage-observer.mjs';
 import * as P from './fixtures/finite-budget-failure-diagnostic.mjs';
 
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/feat/finite-native-cleanup-20261101',source:'a'.repeat(40),tree:'b'.repeat(40),workflowBlob:'c'.repeat(40),run:'123',attempt:1,node:'22.23.4'};
 const stage=(s,state)=>'AFW_SYN_STAGE/1 '+JSON.stringify({stage:s,state})+'\n';
 const http=n=>'AFW_SYN_HTTP/1 '+JSON.stringify({status:n})+'\n';
@@ -45,6 +46,24 @@
 test('s28_fd_mutation_race',async()=>owned(async root=>{const path=join(root,'command-output.log');await fs.writeFile(path,failure());const io={...fs,open:async(...args)=>{const fd=await fs.open(...args);return {stat:()=>fd.stat(),read:async(...a)=>{const value=await fd.read(...a);await fs.appendFile(path,'changed\n');return value;},close:()=>fd.close()};}};assert.equal((await collect(root,io)).logs[0].availability,'racing');}));
 test('s29_readonly_aggregate_truth',async()=>owned(async root=>{await fs.writeFile(join(root,'tap-check.log'),"AssertionError [ERR_ASSERTION]: PRIVATE\n");const obs=await collect(root),v=D.validateStagePairWithProjector(D.makeStagePair({context,job:'readonly',rawOutcome:'failure',observation:obs}),context,'readonly',P);assert.equal(v.rawOutcome,'failure');assert.equal(v.countCheck,'coded_assertion');assert(!JSON.stringify(v).includes('nodeTestFailed'));}));
 test('s30_pair_fail_closed',async()=>owned(async root=>{const p=D.makeStagePair({context,job:'readonly',rawOutcome:'success',observation:await collect(root)});for(const mutate of [v=>v.nonclaims.PCoff=true,v=>v.privateId='123',v=>v.rawOutcome='node_failed',v=>v.logs[0].code='PRIVATE']){const q=new Map(p),v=JSON.parse(q.get('result.json'));mutate(v);q.set('result.json',Buffer.from(JSON.stringify(v)+'\n'));assert.throws(()=>D.validateStagePairWithProjector(q,context,'readonly',P));}assert.throws(()=>D.makeStagePair({context,job:'positive_consume',rawOutcome:'success',observation:{}}));}));
 test('s31_exact_assignment_projection',()=>{const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'failure',outputs:{}}]));for(const [i,job]of D.JOBS.entries())needs[job].outputs={'safe-id':String(i+1),'safe-digest':'a'.repeat(64)};const v=D.projectAssignments(JSON.stringify(needs));assert.deepEqual(v,D.JOBS.map((job,i)=>({job,state:'assigned',artifactId:String(i+1),zipSha256:'a'.repeat(64)})));assert(D.assignmentLine(JSON.stringify(needs)).startsWith('AFW_STAGE_DIAGNOSTIC_ASSIGNMENTS '));});
 test('s32_assignment_unavailability_no_borrow',()=>{for(const s of ['PRIVATE','{}','x'.repeat(65537)])assert(D.projectAssignments(s).every(x=>x.state==='unavailable'));const needs=Object.fromEntries(D.NEEDS.map(job=>[job,{result:'success',outputs:{'artifact-id':'999','artifact-digest':'b'.repeat(64)}}]));assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));for(const job of D.JOBS)needs[job].outputs={'safe-id':'1','safe-digest':'a'.repeat(64)};assert(D.projectAssignments(JSON.stringify(needs)).every(x=>x.state==='unavailable'));});
 test('s33_production_token_not_inherited',async()=>{const previous=process.env.GH_ARTIFACT_TOKEN;process.env.GH_ARTIFACT_TOKEN='SYN_INERT';try{await assert.rejects(()=>D.collectFixedStagePair({context,job:'readonly',rawOutcome:'failure'}));}finally{if(previous===undefined)delete process.env.GH_ARTIFACT_TOKEN;else process.env.GH_ARTIFACT_TOKEN=previous;}});
+
+test('s34_legacy_conflicting_claims_poison_canonical',()=>{
+ const bad=['AssertionError [UNKNOWN_123]: PRIVATE','Error []: custody_limit','AssertionError [UNRECOGNIZED]: PRIVATE','Error [UNRECOGNIZED]: custody_limit','Error [UNRECOGNIZED]: PRIVATE','Error [ENOENT]: custody_limit','AssertionError [EACCES]: PRIVATE','AssertionError: EACCES: PRIVATE','CustodyError [ENOENT]: custody_limit','CustodyError [custody_limit]: custody_limit','Error [ERR_ASSERTION]: custody_limit','Error [EACCES]: ENOENT: PRIVATE'];
+ for(const header of bad){assert.deepEqual(text(header+'\n').failure,unknown);assert.deepEqual(text(header+'\n'+failure('ENOENT')).failure,unknown);}
+ for(const [header,code]of [['Error [ENOENT]: ENOENT: PRIVATE','ENOENT'],['AssertionError [ERR_ASSERTION]: PRIVATE','assertion'],['CustodyError: custody_limit','custody_limit'],['Error [EACCES]: PRIVATE','EACCES']])assert.equal(text(header+'\n').failure.code,code);
+});
+test('s35_real_fifo_swap_bounded_before_read',async()=>owned(async root=>{
+ const source="import assert from 'node:assert/strict';\nimport * as fs from 'node:fs/promises';\nimport {constants} from 'node:fs';\nimport {join} from 'node:path';\nimport {execFileSync} from 'node:child_process';\nconst D=await import(__OBSERVER__),P=await import(__PROJECTOR__),root=__ROOT__,path=join(root,'command-output.log');\nawait fs.writeFile(path,'SYN_PRIVATE\\n',{flag:'wx',mode:0o600});\nlet switched=false,reads=0,opened=0;\nconst io={...fs,lstat:async name=>{const st=await fs.lstat(name);if(name===path&&!switched){switched=true;await fs.rename(path,join(root,'preserved'));execFileSync('mkfifo',['--mode=600',path],{timeout:1000,stdio:'pipe'});}return st;},open:async(name,flags)=>{opened++;const fd=await fs.open(name,flags);assert.equal(flags&constants.O_NONBLOCK,constants.O_NONBLOCK);return {stat:()=>fd.stat(),read:async(...args)=>{reads++;return fd.read(...args);},close:()=>fd.close()};}};\nconst value=await D.collectOwnedLogRoot(root,P,io);\nassert(switched);assert.equal(opened,1);assert.equal(reads,0);assert.equal(value.logs[0].availability,'racing');\nconsole.log('{\"ok\":true}');\n".replace('__OBSERVER__',JSON.stringify(new URL('./fixtures/finite-budget-stage-observer.mjs',import.meta.url).href)).replace('__PROJECTOR__',JSON.stringify(new URL('./fixtures/finite-budget-failure-diagnostic.mjs',import.meta.url).href)).replace('__ROOT__',JSON.stringify(root));
+ const env={...process.env};delete env.NODE_OPTIONS;delete env.GH_ARTIFACT_TOKEN;delete env.AFW_SYN_CHECKPOINT_KEY;
+ // The parent process timeout is independent of the blocked child's event loop.
+ const child=spawnSync(process.execPath,['--input-type=module'],{input:source,encoding:'utf8',env,timeout:3000,maxBuffer:65536});
+ assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.status,0);assert.equal(child.stderr,'');assert.equal(child.stdout,'{"ok":true}\n');
+}));
+test('s36_partial_prefix_only_nonempty_edges',async()=>owned(async root=>{
+ const path=join(root,'command-output.log');
+ await fs.writeFile(path,'complete noise\nA\n'+failure());let value=await collect(root);assert.equal(value.logs[0].availability,'available');assert.equal(value.logs[0].code,'EACCES');
+ for(const log of ['\nA\n'+failure(),failure()+'A\n\n','AFW_SYN_STA\n'+failure()]){await fs.writeFile(path,log);assert.equal((await collect(root)).logs[0].availability,'truncated');}
+}));

```

## Fix diff test/fixtures/finite-budget-world.mjs
```diff
@@ -1928,13 +1928,13 @@
   else if(command==='verify-native-preparation-round1')await verifyNativePreparationRound1();
   else if(command==='verify-positive')await verifyBudgetCheckpoint('positive',root);
   else if(command==='inspect-budget-graphs')await inspectBudgetCompilation(root);
   else throw Error('SYN budget command unsupported before I0');
  };
  // Finish this module before command work imports fixtures that import it.
- setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(blob!=='6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error,readFixedBudgetNativeStack)));}}catch{}});});
+ setImmediate(()=>{main().catch(async error=>{console.error('SYN fixed budget command failed');process.exitCode=1;try{if(process.argv[2]==='prepare-positive'&&process.env.GITHUB_JOB==='positive_prepare'){const bytes=await readFile(new URL('./finite-budget-failure-diagnostic.mjs',import.meta.url));const blob=createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');if(blob!=='62965a9d5836e54563550fe29dff23abe9a62054')return;const {projectFixedBudgetFailure}=await import('data:text/javascript;base64,'+bytes.toString('base64'));console.error('AFW_SYN_FAILURE/1 '+JSON.stringify(projectFixedBudgetFailure(error,readFixedBudgetNativeStack)));}}catch{}});});
 }
 
 
 // Post-ACK diagnostic: Node-only fixed adapters. Default compiler path is unchanged.
 async function replayPostAckBuild(captured,compiler){
  const {build}=await import('esbuild'),options={...captured.options};delete options.plugins;

```

## Fix diff docs/superpowers/reports/2026-11-13-coherent-suite-qualification.md
```diff
@@ -3712,6 +3712,45 @@
 |5|Verify all seven current direct outputs and the current SAFE pair|completed/failure|2026-11-14T15:24:18Z|2026-11-14T15:24:19Z|
 |6|Project only the three declared diagnostic assignments|completed/success|2026-11-14T15:24:19Z|2026-11-14T15:24:19Z|
 |11|Post Run actions/setup-node@v4|completed/skipped|2026-11-14T15:24:19Z|2026-11-14T15:24:19Z|
 |12|Post Run actions/checkout@v4|completed/success|2026-11-14T15:24:19Z|2026-11-14T15:24:20Z|
 |13|Complete job|completed/success|2026-11-14T15:24:20Z|2026-11-14T15:24:20Z|
 
+
+
+## 2026-11-14 — final sanitized-stage fix wave: INACTIVE / NEEDS_ROOT_GATE
+
+Authority Rootdocs c85e2b05d1b1ea15837a95b162526c0dcce38fb4 finalfix brief/spec/review/ledger; AFW ONLY. Source 3bdefc9189c163173c324ae48c7ebb3ed3de70e8/main0c9 unchanged. Sole worker, cloud GitDB objects only, no refs/run/Native/provider/runtime/secrets/browser/mail/local Source execution. Exact Task2 package resolved fde9a7bfeb3c7c8824794a7c8f0b74a0adc10141. All six accepted findings authored together; no tests executed. Full immutable review package in docs/superpowers/reports/2026-11-14-sanitized-stage-final-fix-wave.md in a separate unattached report object for Rootdocs copying; includes complete old→new code pins/bytes/hashes, exact source references, dispositions, planned IDs/counts, pair schema, rollback and limitations. This appendix preserves the ENTIRE prior445242B prefix/blob2a73df3c961ee9166d41eec82c2bf723b99d68b9/SHA581d2d50c3ace260d3d64856a8a30cec4895affddaaeda30bdad1ae5cbbb2789.
+
+Native8 INACTIVE DATA candidate 32ca318743b26a8a6d54ef743c9f101609525491/treec578f1b74ed69f99d22f4eef892a0d12e6257a75/F779e3bdcaeaa729195a09897a36fca8053fbb7b13/367308B/SHA259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278; basis2c390b182f6889e79480e7b1618f41af8d1e0d22, only enumerated pinripple and sixCOE flags. Original8DAG/commands/clocks/caps/26refs6env and fixed parser/forms preserved; V/Z exact; World onlyPcatchpin. No Task3startup overlay. New candidate is NEVER executed by qualifier. Superseded2012ef/f5cd remain inactive.
+
+Zero-key inactive qualifier F71193ce1450d544b31ea86fa708bdc55e4bfdf608/99213B/SHA2aa20db0d88c27d23a21b536e5a7f288a96e359973c62b3ef5d11540dd1274a4; two FALSE guards; NEW message AFW-STAGE-FINALFIX-ONEUSE-20261114. Node22.23.4 only in future GitHub jobs, locked npm scriptsOFF solely for frozen parser, no AFWkey/environment. Standardtoken confined exactcandidateDATAread/currentassignedartifactverification. Q does not invoke World/SDK/Native/AES/assignedPrivate.
+
+I1 runtime129B fixednull refusal/no globals/noinput; P declines every accessor; real VMError/assertion nowunknown with zerohooks. DATApositive still supported. I2 ownname/message/code DATAstrings bounded/singleline/nohooks; multiline/unsafeheaders unknown. I3 O_NONBLOCK plus actual FIFO-withoutwriter swap afterlstat; independent parent3000ms timeout and zero-read descriptor check planned. I4 COE only threejobs×pair/upload; guards, bindings and originaltruth assertions unchanged. Root corrected claim: absent/invalid outputs unavailable; failed uploader with alreadyvalidliteralID/digest may remainassigned, never uploadsuccess; currentmetadata/uploader/rawZIP/resultmanifest still mandatory. Control coverspartialoutputs. I5 all class/code/message claims normalized and conflicting/unknownexplicitcodes poison whole legacy evenalongsidecanonical. M1 partialprefix only physicalfirst/lastnonempty line (nonempty length>0, no trimming), interiorA retained.
+
+Planned GREEN45diagnostic+36observer+7actualA/parser/wrapper+6receiver=94families, all Nodegreen exit0/no fail/cancel/skip/todo. Allunknown RED planned45/33pass/12fail, fixed12failedIDs in fullreport/Q/S, actualcount must come from new cloudresult; nothistorical14. OLDmoduleselectedRED d43+d44 (2/0pass/2fail), s34+s35+s36 (3/0pass/3fail), no skips/missingimports; additional oldcallsitepositivehookcounter, green0. I4 oldwrapperwithout6flags rejected by samepolicy. Entireoldcandidate reconstructed as DATA by reversing precisepinfragments+6flags. All outcomes NOT_EXECUTED; no fabricatedrun/artifact/testreceipt. Runs43511398408/43606148496/43608448872 remain consumed, no replay; Nativefailed/business16NOTaccepted, no historicalcauseproved.
+
+Eight attachable declaredleafdiffs vs3bde: six existingcode/tests, transientF7, this SAMEreport append. Fullworkerreport is separateunattachedDATAonly and mustnot be attached to Source. No newfixtureleaf/business/native/custodytestchange; allothermodes/types/leaves+62WF exact. OriginalF7rollback f7a71f1a0fa4f5ddf069ff411f008a098455e5cc/126209B/SHA1e7af2274e24c40db704f26baaacdb7f7ed1884903852e8237a35552aaed282a must be restored after any later separatelyauthorizedqualification. Root gates activeobject/one-useCAS/actualpair/scopedrereview separately. NEEDS_ROOT_GATE, not completion.
+
+Sevenflagsfalse: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.
+
+
+## 2026-11-14 — finalfix cloud qualification EXECUTED; original F7 RESTORED
+
+Exact one-use release Rootdocs87e4ec689e0631bc01d89bd1349f404f265c9516 after inactivegate536cfe0760917f5b4b1332f8234e3a91243f0b86. Sole writer CAS expected3bdefc9189c163173c324ae48c7ebb3ed3de70e8→0d26858762b1bb01fe3b835593bc2a544c766d99 acknowledged success and reconciled exacthead; no retry/rerun/overlay. Exact commit message AFW-STAGE-FINALFIX-ONEUSE-20261114. All former consumed attempts remain closed.
+
+Current run43615497152/attempt1/eventpush/head0d26858762b1bb01fe3b835593bc2a544c766d99 completedSUCCESS2026-11-14T16:25:56Z. qualify job132509522687 and verify job132509690765 both positivelyterminalSUCCESS before Source was unfrozen. All scope/Node/hashgate/fixedcandidateDATAfetch/lockedinstall/qualification/upload/currentassignedverification steps SUCCESS. Only this two-job zero-AFW-key qualification ran; NativeDATA32ca318743b26a8a6d54ef743c9f101609525491 was fetched as DATA, never attached/invoked. No Native/business16 or runtime operation, no oldrunreplay.
+
+Actual current verifierreceipt (16closedfields, literal fixedline only, no rawlogs/privatearchive):
+```json
+{"context":{"repository":"tokenizartinfo-ops/agent-friendly-web","repositoryId":"1347578006","ref":"refs/heads/feat/finite-native-cleanup-20261101","source":"0d26858762b1bb01fe3b835593bc2a544c766d99","tree":"132bb281fe76b49f40fa2634de9120deb67486a9","workflowBlob":"2a9d38186d38dcf7e09bbb3ff12b7d19633a2f8f","run":"43615497152","attempt":1,"node":"22.23.4"},"artifactId":"14122310798","uploadedDigest":"c0ccdf66c8f1cdb56ae6dbfdca30dd68211e84aa500cb8d6c7d100186e31f327","metadataSize":7764,"rawBytes":7764,"rawSha256":"c0ccdf66c8f1cdb56ae6dbfdca30dd68211e84aa500cb8d6c7d100186e31f327","resultBytes":6959,"resultSha256":"9c3c87037504d8bbe3d40a75999f380dbe7722ea46d4a60add01a2ec83096160","manifestBytes":551,"manifestSha256":"cf9f8c842c9f0cf3fa032935b13cf00b14ac990cf7b225b0f25f1ca5e12bfdf5","tests":{"allUnknown":{"exit":1,"tests":45,"pass":33,"fail":12,"cancelled":0,"skipped":0,"todo":0},"diagnostic":{"exit":0,"tests":45,"pass":45,"fail":0,"cancelled":0,"skipped":0,"todo":0},"stage":{"exit":0,"tests":36,"pass":36,"fail":0,"cancelled":0,"skipped":0,"todo":0},"oldDiagnostic":{"exit":1,"tests":2,"pass":0,"fail":2,"cancelled":0,"skipped":0,"todo":0},"oldStage":{"exit":1,"tests":3,"pass":0,"fail":3,"cancelled":0,"skipped":0,"todo":0},"hooks":{"green":0,"oldCallsite":2}},"candidate":{"commit":"32ca318743b26a8a6d54ef743c9f101609525491","tree":"c578f1b74ed69f99d22f4eef892a0d12e6257a75","bytes":367308,"blob":"79e3bdcaeaa729195a09897a36fca8053fbb7b13","sha256":"259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278"},"programs":{"adapter":{"bytes":63917,"sha256":"ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"},"controls":{"bytes":63195,"sha256":"52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"},"verifier":{"bytes":15099,"sha256":"94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"},"safeZip":{"bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}},"integrationControls":7,"receiverControls":6,"nonclaims":{"historicalCauseProven":false,"receiptAuthenticated":false,"operationalReadiness":false,"completePackage":false,"PCoff":false,"globalNativeDrainVerified":false,"sdkNamespaceEmptyVerified":false}}
+```
+
+Actual Node allunknown RED45tests/33pass/12fail, exact planned12IDs; GREEN diagnostic45pass/0fail and observer36pass/0fail; OLDselecteddiagnostic2tests/0pass/2fail, OLDselectedobserver3tests/0pass/3fail. Everyseriescancel/skip/todo0; GREENexit0, intentionalREDexit1. Greenhookcounter0, OLDCallSitehookcounter2. Actual frozen A/form/AST/wrapperintegration7 and receiver6 passed. These are94 logicalGREENfamilies plus explicitREDcontrols, not a repeated historical14failurecount, business16acceptance or a Native trial. Expected realFIFO regression passed in controlled GitHub Node22.23.4 with independent externalchildtimeout. No Source or FIFO code ran locally.
+
+CurrentassignedSMALLSAFE14122310798 namestage-finalfix-SMALLSAFE-0d26858762b1bb01fe3b835593bc2a544c766d99-43615497152, metadata7764B, uploader/metadata/rawSHAc0ccdf66c8f1cdb56ae6dbfdca30dd68211e84aa500cb8d6c7d100186e31f327, created2026-11-14T16:25:46Z, expires2026-11-21T16:25:45Z; result6959B/SHA9c3c87037504d8bbe3d40a75999f380dbe7722ea46d4a60add01a2ec83096160, manifest551B/SHAcf9f8c842c9f0cf3fa032935b13cf00b14ac990cf7b225b0f25f1ca5e12bfdf5. Worker read only current artifactmetadata and fixed verifyreceipt; Root independent strictpair consumption is a separate gate, not inferred from CI alone. No artifact history/namefallback, Native/contracts/producer logs or privatearchive consumed.
+
+After BOTHjobs terminal, freshSourcelease0d268587 was reread; restoration commit5eb6488ef61222fbf44870274217d93055b4bcab/tree9124d33c48a735fb302e64fcba9da0f7c6d71b66 restores EXACToriginalF7f7a71f1a0fa4f5ddf069ff411f008a098455e5cc and retains only sixapprovedcode/tests and priorreportappend. CASack success reconciled Source5eb6488ef61222fbf44870274217d93055b4bcab. Full449702B priorSAMEreportprefix/blob a827b1bc6bcea012ab016025c449148e2eabf1d4/SHAfdcb01fa5aa5676c705ed1847365d86ca527d562ace0aed154513e944cb05fe3 plus allolderprefixes preserved before this actualevidenceappend. Finalappendcommit/head/fulltree/run0/fiveactive0 readback follows in workerhandoff; never attach workerreportleaf. Fullworkerreport actualappend is in a SEPARATEinactiveobject; Root owns Rootdocs.
+
+I4 limitation unchanged: valid literal partialoutputs can beassigned without provinguploadsuccess; absent/invalidoutputs unavailable and currentmetadata/uploader/rawZIP/resultmanifest triple stillmandatory. I1 lazy/nativeVMsiteprecision deliberately declined; supportedDATApositivecontrols passed. Allsixreviewfindings await ONE scopedrereview afterRoot independentpair+closuregate. This section records execution/restoration, not fullplanfinalcompletion.
+
+Allseven remainfalse: historicalCauseProven,receiptAuthenticated,operationalReadiness,completePackage,PCoff,globalNativeDrainVerified,sdkNamespaceEmptyVerified.

```

## Transient inactiveNative8 candidate wrapper FULL diff (basis2c390 →32ca)
Candidate is DATA only, neverexecuted. Wholetext independently reconstructed by Root pins+6COE; A/CWorldpinonly,V/Zexact; original8DAG/Nativecommands/clocks/caps/26refs6env/parser/forms unchanged.
```diff
@@ -68,7 +68,7 @@
           export const FLAGS=Object.freeze({operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
           export const LEGACY=Object.freeze(['contracts','positive_prepare','positive_consume','reduction_prepare','reduction_consume_a','readonly','reduction_consume_b']);
           export const PRIVATE_PEERS=Object.freeze([{job:'positive_prepare',kind:'checkpoint'},{job:'positive_consume',kind:'positive-result'},{job:'reduction_prepare',kind:'reduction-checkpoint'},{job:'reduction_consume_a',kind:'reduction-result-a'},{job:'readonly',kind:'readonly-result'}]);
-          export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
+          export const SOURCE_PINS=Object.freeze({pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'});
           export const IDS=Object.freeze(['dag_peer_inventory','key_scope','fixed_case_counts','metadata_custody_binding','incomplete_or_contradictory','coherent_current_pair']);
           export const need=(ok)=>assert(ok,'suite_evidence_rejected'),same=(a,b)=>assert.deepEqual(a,b,'suite_evidence_rejected');
           export function fields(v,keys){need(v&&typeof v==='object'&&!Array.isArray(v));const d=Object.getOwnPropertyDescriptors(v);same(Reflect.ownKeys(d).sort(),keys.slice().sort());for(const k of keys)need(Object.hasOwn(d[k],'value')&&d[k].enumerable);}
@@ -861,7 +861,7 @@
              reject(()=>A.validateReopenedSuite({...input,proofBytes:Buffer.from('{}')}));reject(()=>A.decodePrivateZip(Buffer.from('invalid')));
             });
             await sub('whole_job_outer_receipt_accepts_multiple_synthetic_copies',async()=>{
-             await A.validateSourcePins();assert.equal(A.PINS.worldBlob,'43aad5bddd844d591572c5868b73697dfd3463f9');
+             await A.validateSourcePins();assert.equal(A.PINS.worldBlob,'1e18873791e0520fff611e353232e38786c51941');
              const syntheticCopies=[{fileCount:300,totalBytes:70*1048576},{fileCount:300,totalBytes:70*1048576}],ancillary={fileCount:4,totalBytes:2*1048576};
              const totals=syntheticCopies.reduce((sum,row)=>({fileCount:sum.fileCount+row.fileCount,totalBytes:sum.totalBytes+row.totalBytes}),ancillary);
              assert(totals.fileCount>512&&totals.totalBytes>128*1048576);
@@ -1358,14 +1358,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install the locked fixture dependencies
         shell: bash
@@ -1721,14 +1721,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -1881,6 +1881,7 @@
           
       - name: Publish bounded stage observations before original truth assertions
         id: summary_pair
+        continue-on-error: true
         if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
         env:
           NATIVE_OUTCOME: ${{ steps.native.outcome }}
@@ -1891,12 +1892,13 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'positive_prepare',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-positive_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
       - name: Upload fixed positive_prepare diagnostic pair only
         id: summary_upload
+        continue-on-error: true
         if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
@@ -1964,14 +1966,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2242,14 +2244,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2402,6 +2404,7 @@
           
       - name: Publish bounded stage observations before original truth assertions
         id: summary_pair
+        continue-on-error: true
         if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
         env:
           NATIVE_OUTCOME: ${{ steps.native.outcome }}
@@ -2412,12 +2415,13 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'reduction_prepare',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-reduction_prepare-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
       - name: Upload fixed reduction_prepare diagnostic pair only
         id: summary_upload
+        continue-on-error: true
         if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
@@ -2485,14 +2489,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2763,14 +2767,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -2929,6 +2933,7 @@
           
       - name: Publish bounded stage observations before original truth assertions
         id: summary_pair
+        continue-on-error: true
         if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'
         env:
           NATIVE_OUTCOME: ${{ steps.native.outcome }}
@@ -2939,12 +2944,13 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_PAIR' >"$RUNNER_TEMP/afw-native-private/logs/stage-publication.log" 2>&1
           import assert from 'node:assert/strict';import {readFile,writeFile,mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           const context=JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-suite-binding.json','utf8')).context,files=await D.collectFixedStagePair({context,job:'readonly',rawOutcome:e.NATIVE_OUTCOME});
           const root=e.RUNNER_TEMP+'/afw-stage-readonly-safe';await mkdir(root,{mode:0o700});for(const [name,bytes]of files)await writeFile(root+'/'+name,bytes,{flag:'wx',mode:0o600});
           NODE_STAGE_PAIR
       - name: Upload fixed readonly diagnostic pair only
         id: summary_upload
+        continue-on-error: true
         if: always() && !cancelled() && steps.summary_pair.outcome == 'success'
         uses: actions/upload-artifact@v4
         with:
@@ -3014,14 +3020,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Install exact lock without custody key
         id: install
@@ -3465,14 +3471,14 @@
           const e=process.env,path='.github/workflows/afw-finite-budget-qualification.yml',git=(...a)=>execFileSync('git',a,{encoding:'utf8'}).trim(),hash=b=>createHash('sha256').update(b).digest('hex'),blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
           assert.equal(e.GITHUB_REPOSITORY,'tokenizartinfo-ops/agent-friendly-web');assert.equal(e.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(e.GITHUB_REF,'refs/heads/feat/finite-native-cleanup-20261101');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');assert.equal(process.versions.node,'22.23.4');assert.equal(git('rev-parse','HEAD'),e.GITHUB_SHA);assert.equal(e.GITHUB_WORKFLOW_REF,e.GITHUB_REPOSITORY+'/'+path+'@'+e.GITHUB_REF);
           const bytes=await readFile(path),source=new TextDecoder('utf-8',{fatal:true}).decode(bytes);assert(Buffer.from(source).equals(bytes));const workflowBlob=git('rev-parse','HEAD:'+path);assert.equal(blob(bytes),workflowBlob);assert(execFileSync('git',['show','HEAD:'+path]).equals(bytes));
-          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'43aad5bddd844d591572c5868b73697dfd3463f9',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
+          const sourcePins={pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:'1e18873791e0520fff611e353232e38786c51941',custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},paths={pureTestBlob:'test/finite-budget-diagnostics.test.mjs',nativeTestBlob:'test/mcp-qa-finite-budget-native.test.mjs',worldBlob:'test/fixtures/finite-budget-world.mjs',custodyBlob:'test/fixtures/finite-checkpoint-custody.mjs',lockBlob:'package-lock.json'};
           for(const [key,p]of Object.entries(paths)){assert.equal(git('rev-parse','HEAD:'+p),sourcePins[key]);assert.equal(blob(await readFile(p)),sourcePins[key]);}assert.equal(JSON.parse(await readFile('package-lock.json','utf8')).packages['node_modules/@cloudflare/workers-oauth-provider'].version,'1.2.1');
           const map={adapter:['NODE_SUITE_ADAPTER','afw-suite-adapter.mjs'],controls:['NODE_SUITE_CONTROLS','afw-suite-controls.mjs'],verifier:['NODE_SUITE_VERIFIER','afw-suite-verifier.mjs'],safeZip:['NODE_SAFE_ZIP','afw-suite-safe-zip.mjs']},programHashes={},programs={};
           for(const [key,[marker,file]]of Object.entries(map)){const begin="<<'"+marker+"'\n",parts=source.split(begin);assert.equal(parts.length,2);const rows=parts[1].split('\n          '+marker+'\n');assert.equal(rows.length,2);const body=rows[0].split('\n').map(line=>{assert(line.startsWith('          '));return line.slice(10);}).join('\n')+'\n';programs[key]=body;programHashes[key]=hash(body);await writeFile(join(e.RUNNER_TEMP,file),body,{flag:'wx',mode:0o600});}
           assert.equal(new Set(Object.values(programHashes)).size,4);assert.equal(programHashes.safeZip,'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');assert.equal(Buffer.byteLength(programs.safeZip),13305);
           const start=programs.adapter.indexOf('const MiB=1048576,PRIVATE_CAP=136314880,EXPANDED_CAP=134225920;\n'),tail=' same(last,central);return result;\n}\n',end=programs.adapter.indexOf(tail,start);assert(start>=0&&end>start);const zip3=programs.adapter.slice(start,end+tail.length);assert.equal(Buffer.byteLength(zip3),3380);assert.equal(hash(zip3),'4ff44bd3adda54eb0816fab275e4b13078005d1bd1a4626cfbf67d31e8bf7af8');
           const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git('rev-parse','HEAD^{tree}'),workflowBlob,run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins,programHashes})+'\n',{flag:'wx',mode:0o600});console.log('AFW_COHERENT_SUITE_PROGRAMS '+JSON.stringify(programHashes));
-          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9","blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2","blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851","blob":"0197111834354a1e911b977a765b161591d48b18"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
+          const diagnosticPins={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","blob":"83db9cda42ae828998fbe1d3007071825dc31d0c"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","blob":"62965a9d5836e54563550fe29dff23abe9a62054"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","blob":"cd0064870282d7d31509911a26d9936ebf3f5492"}};let observerBase64=null;for(const [key,pin]of Object.entries(diagnosticPins)){const checked=await readFile(pin.path);assert.equal(checked.length,pin.bytes);assert.equal(blob(checked),pin.blob);assert.equal(hash(checked),pin.sha256);if(key==='observer')observerBase64=checked.toString('base64');}await writeFile(join(e.RUNNER_TEMP,'afw-stage-verified.json'),JSON.stringify({observerBase64})+'\n',{flag:'wx',mode:0o600});
           NODE_SUITE_BOOTSTRAP
       - name: Verify all seven current direct outputs and the current SAFE pair
         env:
@@ -3494,6 +3500,6 @@
           test -z "${AFW_SYN_CHECKPOINT_KEY+x}"
           node --input-type=module <<'NODE_STAGE_ASSIGNMENTS'
           import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
-          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,15604);assert.equal(createHash('sha256').update(checked).digest('hex'),'1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
+          const e=process.env;const checked=Buffer.from(JSON.parse(await readFile(e.RUNNER_TEMP+'/afw-stage-verified.json','utf8')).observerBase64,'base64');assert.equal(checked.length,16114);assert.equal(createHash('sha256').update(checked).digest('hex'),'dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f');const D=await import('data:text/javascript;base64,'+checked.toString('base64'));
           console.log(D.assignmentLine(e.AFW_SUITE_NEEDS));
           NODE_STAGE_ASSIGNMENTS

```

## Complete qualification behavior code as reviewed DATA
FullF7 originalinactive blob1193ce1450d544b31ea86fa708bdc55e4bfdf608 at4d30; active2a9d3818 differsONLYtwofalseprefixes. Root owns/verified Q/S/V/Z hashes below; large OLD literal is a repeated public byte constant, omitted ONLYfromdisplay. Its three decoded bytes/Gitblob/SHA were independently matched to exact oldSource; no behaviorcode omitted. Full literalSource accessible by immutableF7. No test rerun needed.
{
  "programs": {
    "Q": {
      "bytes": 54383,
      "sha256": "5cf0c134cbef0d9c63562875959096d079ad714b93ec43d19772008d4dd66a17",
      "gitBlob": "a19586200166bb6880e4823775d14290266f2bf6"
    },
    "S": {
      "bytes": 11941,
      "sha256": "0019bcf77e9c4290a5db23fbe9db349b590ffbe2e81122aad6159b633ab7731b",
      "gitBlob": "423edd1b540cdb714c29313675b095decfdd1b64"
    },
    "V": {
      "bytes": 4484,
      "sha256": "f078db5d285d606cb3103ac3928b0b8e3457e41de34d2a0cf1384a61c8c6d9b1",
      "gitBlob": "feffd4d11da10b57abd2efaf131fe87f7e258d96"
    },
    "Z": {
      "bytes": 13305,
      "sha256": "b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d",
      "gitBlob": "5450dec2ffb37a90c9454fc802453ea50cd31278"
    }
  },
  "oldModules": {
    "runtime": {
      "bytes": 5863,
      "sha256": "34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9",
      "gitBlob": "8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"
    },
    "helper": {
      "bytes": 7927,
      "sha256": "97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2",
      "gitBlob": "6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"
    },
    "observer": {
      "bytes": 15604,
      "sha256": "1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851",
      "gitBlob": "0197111834354a1e911b977a765b161591d48b18"
    }
  }
}

### Q (one static repeated OLD literal replaced in display only)
```javascript
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import * as S from './afw-stage-receiver.mjs';
const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
const blob=b=>createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
// OLD public source-byte literal omitted from DISPLAY ONLY; exact three old module hashes are listed in OLD_PINS and independently verified. Full literal is available in immutable qualifier F7.
const OLD = /* VERIFIED PINNED PUBLIC MODULE BYTES, NOT EXECUTABLE DISPLAY */ null;
const RIPPLE=[["83db9cda42ae828998fbe1d3007071825dc31d0c","8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd"],["922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9","34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9"],["\"bytes\":129","\"bytes\":5863"],["checked.length,129","checked.length,5863"],["62965a9d5836e54563550fe29dff23abe9a62054","6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f"],["6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c","97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2"],["\"bytes\":7871","\"bytes\":7927"],["checked.length,7871","checked.length,7927"],["cd0064870282d7d31509911a26d9936ebf3f5492","0197111834354a1e911b977a765b161591d48b18"],["dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f","1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851"],["\"bytes\":16114","\"bytes\":15604"],["checked.length,16114","checked.length,15604"],["1e18873791e0520fff611e353232e38786c51941","43aad5bddd844d591572c5868b73697dfd3463f9"],["125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855","05e50e17420c42f65f8c8c450efc6dd37f9ae429a32a070c9043ab0a50548238"]];
let stage='pins',failedIds=[];
async function main(){
 const e=process.env;assert.equal(process.versions.node,'22.23.4');for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY'])assert.equal(e[key],undefined);assert.deepEqual(process.execArgv,[]);assert.equal(e.GITHUB_JOB,'qualify');assert.equal(e.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:e.GITHUB_REPOSITORY,repositoryId:e.GITHUB_REPOSITORY_ID,ref:e.GITHUB_REF,source:e.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:e.GITHUB_RUN_ID,attempt:1,node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);
 const checked={};for(const [key,pin]of Object.entries(S.PINS)){const b=await readFile(pin.path);assert.equal(b.length,pin.bytes);assert.equal(blob(b),pin.blob);assert.equal(S.sha(b),pin.sha256);checked[key]=b;}
 const b=await readFile(join(e.RUNNER_TEMP,'afw-stage-integrated-candidate.yml'));assert.equal(b.length,S.CANDIDATE.bytes);assert.equal(blob(b),S.CANDIDATE.blob);assert.equal(S.sha(b),S.CANDIDATE.sha256);assert(b.length<=524288);
 const candidate=new TextDecoder('utf-8',{fatal:true}).decode(b);assert(Buffer.from(candidate).equals(b));
 const programs={};for(const [key,marker]of Object.entries({adapter:'NODE_SUITE_ADAPTER',controls:'NODE_SUITE_CONTROLS',verifier:'NODE_SUITE_VERIFIER',safeZip:'NODE_SAFE_ZIP'})){const p=candidate.split("<<'"+marker+"'\n");assert.equal(p.length,2);const tails=p[1].split('\n          '+marker+'\n');assert.equal(tails.length,2);const lines=tails[0].split('\n');assert(lines.every(l=>l.startsWith('          ')));programs[key]=Buffer.from(lines.map(l=>l.slice(10)).join('\n')+'\n');assert.equal(programs[key].length,S.PROGRAMS[key].bytes);assert.equal(S.sha(programs[key]),S.PROGRAMS[key].sha256);}
 const P=await import('data:text/javascript;base64,'+checked.helper.toString('base64')),D=await import('data:text/javascript;base64,'+checked.observer.toString('base64'));
 const childEnv={...e};for(const key of ['NODE_OPTIONS','GH_ARTIFACT_TOKEN','AFW_SYN_CHECKPOINT_KEY'])delete childEnv[key];
 function run(file,ids,expect){
  const child=spawnSync(process.execPath,['--test','--test-reporter=tap',file],{env:childEnv,encoding:'utf8',timeout:45000,maxBuffer:1048576});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.stderr,'');
  assert.deepEqual([...child.stdout.matchAll(/^(?:not )?ok \d+ - ([ds]\d+_[^\n]+)$/gm)].map(m=>m[1]),ids);
  failedIds=[...child.stdout.matchAll(/^not ok \d+ - ([ds]\d+_[^\n]+)$/gm)].map(m=>m[1]);assert.deepEqual(failedIds,expect);
  const v={exit:child.status};for(const k of ['tests','pass','fail','cancelled','skipped','todo']){const m=[...child.stdout.matchAll(new RegExp('^# '+k+' (\\d+)$','gm'))];assert.equal(m.length,1);v[k]=Number(m[0][1]);}for(const k of ['cancelled','skipped','todo'])assert.equal(v[k],0);assert.equal(v.exit,expect.length?1:0);return v;
 }
 const roots=[];
 try{
  stage='all_unknown';const stubRoot=join(e.RUNNER_TEMP,'afw-finalfix-allunknown'),stubFixtures=join(stubRoot,'test','fixtures');roots.push(stubRoot);await mkdir(stubFixtures,{recursive:true,mode:0o700});
  await writeFile(join(stubFixtures,'finite-budget-failure-runtime.mjs'),checked.runtime,{flag:'wx',mode:0o600});await writeFile(join(stubFixtures,'finite-budget-failure-diagnostic.mjs'),"export const projectFixedBudgetFailure=()=>({code:'unknown',site:'unknown'});export const projectFixedBudgetLog=()=>({code:'unknown',site:'unknown'});\n",{flag:'wx',mode:0o600});await writeFile(join(stubRoot,'test','finite-budget-failure-diagnostic.test.mjs'),checked.diagnosticTests,{flag:'wx',mode:0o600});
  const allUnknown=run(join(stubRoot,'test','finite-budget-failure-diagnostic.test.mjs'),S.DIAGNOSTIC_IDS,S.UNKNOWN_FAIL_IDS);
  stage='green_diagnostic';const diagnostic=run(S.PINS.diagnosticTests.path,S.DIAGNOSTIC_IDS,[]);
  stage='green_stage';const stageTests=run(S.PINS.tests.path,S.TEST_IDS,[]);
  stage='old_regressions';const oldRoot=join(e.RUNNER_TEMP,'afw-finalfix-old'),oldFixtures=join(oldRoot,'test','fixtures');roots.push(oldRoot);await mkdir(oldFixtures,{recursive:true,mode:0o700});
  for(const [key,pin]of Object.entries(S.OLD_PINS)){const bytes=Buffer.from(OLD[key],'base64');assert.equal(bytes.length,pin.bytes);assert.equal(blob(bytes),pin.blob);assert.equal(S.sha(bytes),pin.sha256);await writeFile(join(oldFixtures,pin.path.split('/').at(-1)),bytes,{flag:'wx',mode:0o600});}
  const ds=checked.diagnosticTests.toString('utf8'),start=ds.indexOf("test('d43_"),end=ds.indexOf("test('d45_");assert(start>=0&&end>start);
  const urls="const runtimeURL=new URL('./fixtures/finite-budget-failure-runtime.mjs',import.meta.url).href;\nconst helperURL=new URL('./fixtures/finite-budget-failure-diagnostic.mjs',import.meta.url).href;\n";
  await writeFile(join(oldRoot,'test','old-diagnostic-regressions.test.mjs'),ds.slice(0,ds.indexOf("test('d01_"))+urls+ds.slice(start,end),{flag:'wx',mode:0o600});
  const ss=checked.tests.toString('utf8'),sstart=ss.indexOf("test('s34_");assert(sstart>=0);await writeFile(join(oldRoot,'test','old-stage-regressions.test.mjs'),ss.slice(0,ss.indexOf("test('s01_"))+ss.slice(sstart),{flag:'wx',mode:0o600});
  const oldDiagIds=S.DIAGNOSTIC_IDS.slice(42,44),oldStageIds=S.TEST_IDS.slice(33),oldDiagnostic=run(join(oldRoot,'test','old-diagnostic-regressions.test.mjs'),oldDiagIds,oldDiagIds),oldStage=run(join(oldRoot,'test','old-stage-regressions.test.mjs'),oldStageIds,oldStageIds);
  // Execute the same fixed callsite child with the old modules and a numeric-only
  // assertion oracle. The formatter is restored BEFORE the hook is exercised.
  const oldRegression=ds.slice(start,end),literal=/const source=("(?:[^"\\]|\\.)*")\.replace/.exec(oldRegression);assert(literal);let probe=JSON.parse(literal[1]);probe=probe.replace("assert.equal(calls,0);assert.deepEqual(value","assert(calls>0);console.log('AFW_FINALFIX_OLD_HOOKS/1 '+JSON.stringify({calls}));assert.deepEqual(value").replace('__RUNTIME__',JSON.stringify(new URL('file://'+join(oldFixtures,'finite-budget-failure-runtime.mjs')).href)).replace('__HELPER__',JSON.stringify(new URL('file://'+join(oldFixtures,'finite-budget-failure-diagnostic.mjs')).href));
  const child=spawnSync(process.execPath,['--input-type=module'],{input:probe,env:childEnv,encoding:'utf8',timeout:5000,maxBuffer:65536});assert.equal(child.error,undefined);assert.equal(child.signal,null);assert.equal(child.status,0);assert.equal(child.stderr,'');const hm=/^AFW_FINALFIX_OLD_HOOKS\/1 \{"calls":([1-9][0-9]{0,3})\}\n\{"ok":true\}\n$/.exec(child.stdout);assert(hm);const hooks={green:0,oldCallsite:Number(hm[1])};assert(hooks.oldCallsite<=1024);
  const tests={allUnknown,diagnostic,stage:stageTests,oldDiagnostic,oldStage,hooks};failedIds=[];
  stage='integration';const integration=[],record=async(id,fn)=>{failedIds=[id];await fn();integration.push({id,status:'passed'});failedIds=[];};
  await writeFile(join(e.RUNNER_TEMP,'afw-suite-binding.json'),JSON.stringify({context,sourcePins:{pureTestBlob:'1f8b02d5b2dddb474c7db7daa04aa24e2dc948d8',nativeTestBlob:'533dafb5df5f8e57442c5b9029dc8dec6dded434',worldBlob:S.PINS.world.blob,custodyBlob:'4d05b5ec0f7b074be88ef9733a47c984b0212351',lockBlob:'36a8cd4b7d369d293ffd8c1fc5a29a0b97a7265b',sdkVersion:'1.2.1'},programHashes:Object.fromEntries(Object.entries(S.PROGRAMS).map(([k,v])=>[k,v.sha256]))})+'\n',{flag:'wx',mode:0o600});
  // Import exact A bytes; only its existing frozen validation functions are called.
  const A=await import('data:text/javascript;base64,'+programs.adapter.toString('base64'));
  await record(S.INTEGRATION_IDS[0],()=>assert.equal(A.validateKeyScopes(candidate),true));
  await record(S.INTEGRATION_IDS[1],()=>assert.equal(A.validateFixedCases(candidate),true));
  await record(S.INTEGRATION_IDS[2],()=>{const token='$'+'{{ '+'se'+'crets.AFW_SYN_CHECKPOINT_KEY '+'}}',i=candidate.indexOf('          NATIVE_OUTCOME: ');assert(i>=0);const end=candidate.indexOf('\n',i);assert.throws(()=>A.validateKeyScopes(candidate.slice(0,end)+'\n          DIAG_KEY: '+token+candidate.slice(end)));});
  await record(S.INTEGRATION_IDS[3],()=>{assert.equal(A.validateWorkflow(candidate),true);assert.equal([...candidate.matchAll(/^    if: \$\{\{ false &&/gm)].length,8);assert.equal([...candidate.matchAll(/const diagnosticPins=/g)].length,8);});
  await record(S.INTEGRATION_IDS[4],()=>{const source=programs.adapter.toString('utf8'),start=source.indexOf('// Fixed reviewed seed field policy.'),end=source.indexOf('export function keyScopeParserProvenance');assert(start>=0&&end>start);assert.equal(S.sha(Buffer.from(source.slice(start,end))),'4ab84021b6fcd0afdeb8b3875fa513b31a78c335c5856c9c3811e71b98fb1b7c');assert.equal(S.sha(programs.verifier),'94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf');assert.equal(S.sha(programs.safeZip),'b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d');});
  const blocks=text=>Object.fromEntries([...text.matchAll(/^  ([a-z_]+):\n/gm)].map((m,i,a)=>[m[1],text.slice(m.index,a[i+1]?.index??text.length)]));
  const step=(block,id)=>{const all=[...block.matchAll(/^      - name: /gm)],matches=all.map((m,i)=>block.slice(m.index,all[i+1]?.index??block.length)).filter(s=>s.includes('\n        id: '+id+'\n'));assert.equal(matches.length,1);return matches[0];};
  function policy(text){
   const b=blocks(text);for(const job of D.JOBS){
    const pair=step(b[job],'summary_pair'),upload=step(b[job],'summary_upload'),truth=step(b[job],'actual_outcome');
    for(const value of [pair,upload])assert.equal([...value.matchAll(/^        continue-on-error: true$/gm)].length,1);
    assert(pair.includes("\n        if: always() && !cancelled() && steps.suite_bootstrap.outcome == 'success'\n"));assert(upload.includes("\n        if: always() && !cancelled() && steps.summary_pair.outcome == 'success'\n"));
    assert(b[job].includes('safe-id: $'+'{{ steps.summary_upload.outputs.artifact-id }}'));assert(b[job].includes('safe-digest: $'+'{{ steps.summary_upload.outputs.artifact-digest }}'));
    assert(truth.includes("test '$"+'{{ steps.native.outcome }}'+"' = success"));assert(!truth.includes('continue-on-error:'));
    for(const failure of ['pair','upload']){
     const pairOutcome=failure==='pair'?'failure':'success',uploadRuns=pairOutcome==='success';assert.equal(uploadRuns,failure==='upload');
     // Both failure outcomes have successful conclusions under explicit COE.
     for(const value of [pair,upload])assert(value.includes('continue-on-error: true'));
     const needs=Object.fromEntries(D.NEEDS.map(id=>[id,{result:'success',outputs:{}}]));assert.deepEqual(D.projectAssignments(JSON.stringify(needs)).find(row=>row.job===job),{job,state:'unavailable',artifactId:null,zipSha256:null});
     needs[job].outputs={'safe-id':'123'};assert.equal(D.projectAssignments(JSON.stringify(needs)).find(row=>row.job===job).state,'unavailable');
     needs[job].outputs={'safe-id':'123','safe-digest':'a'.repeat(64)};assert.deepEqual(D.projectAssignments(JSON.stringify(needs)).find(row=>row.job===job),{job,state:'assigned',artifactId:'123',zipSha256:'a'.repeat(64)}); // Literal assignment never attests upload success.
    }
   }return true;
  }
  const withoutFlags=text=>{for(const job of D.JOBS){const b=blocks(text)[job];text=text.replace(b,()=>b.replace('        id: summary_pair\n        continue-on-error: true\n','        id: summary_pair\n').replace('        id: summary_upload\n        continue-on-error: true\n','        id: summary_upload\n'));}return text;};
  await record(S.INTEGRATION_IDS[5],()=>{assert(policy(candidate));assert.throws(()=>policy(withoutFlags(candidate)));});
  await record(S.INTEGRATION_IDS[6],()=>{let old=withoutFlags(candidate);for(const [now,before]of RIPPLE)old=old.replaceAll(now,before);const bytes=Buffer.from(old);assert.equal(bytes.length,S.OLD_CANDIDATE.bytes);assert.equal(blob(bytes),S.OLD_CANDIDATE.blob);assert.equal(S.sha(bytes),S.OLD_CANDIDATE.sha256);});
  stage='receiver';const receiver=S.runReceiverControls(context);
  stage='pins';for(const [key,pin]of Object.entries(S.PINS)){const bytes=await readFile(pin.path);assert.equal(S.sha(bytes),pin.sha256);assert(bytes.equals(checked[key]));}
  stage='pair';const value={purpose:'afw.sanitized-stage-observations.finalfix.qualification.syn.v1',role:'independent-zero-afw-key-finalfix-qualification',context,pins:S.PINS,oldPins:S.OLD_PINS,candidate:S.CANDIDATE,programs:S.PROGRAMS,tests,controls:{diagnosticIds:S.DIAGNOSTIC_IDS,testIds:S.TEST_IDS,integration,receiver},nonclaims:S.NONCLAIMS},files=S.pair(value);S.validatePair(files,context);
  const output=join(e.RUNNER_TEMP,'afw-stage-finalfix-SMALLSAFE');await mkdir(output,{mode:0o700});for(const [name,bytes]of files)await writeFile(join(output,name),bytes,{flag:'wx',mode:0o600});
  console.log('AFW_STAGE_FINALFIX_QUALIFIED/1 '+JSON.stringify({diagnostic:diagnostic.tests,stage:stageTests.tests,allUnknownFail:allUnknown.fail,oldDiagnosticFail:oldDiagnostic.fail,oldStageFail:oldStage.fail,hooks,integration:integration.length,receiver:receiver.length}));
 }finally{for(const root of roots){assert(root.startsWith(join(e.RUNNER_TEMP,'afw-finalfix-')));await rm(root,{recursive:true,force:true});}}
}
main().catch(()=>{console.error('AFW_STAGE_QUALIFICATION_FAILED/1 '+JSON.stringify({stage,failedIds:failedIds.filter(id=>[...S.DIAGNOSTIC_IDS,...S.TEST_IDS,...S.INTEGRATION_IDS].includes(id))}));process.exitCode=1;});

```

### S complete
```javascript
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
export const PINS={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":129,"blob":"83db9cda42ae828998fbe1d3007071825dc31d0c","sha256":"922c1b4398600683f9c2b6c040d5536f794a44d86077fa13cfad287b7ac2d3b9"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7871,"blob":"62965a9d5836e54563550fe29dff23abe9a62054","sha256":"6e1534c8a8d9df02a7df8ca3f2877e2cd0301be0714be9bf6a18044b9dbfba5c"},"diagnosticTests":{"path":"test/finite-budget-failure-diagnostic.test.mjs","bytes":21791,"blob":"54c74bb0de3c07a6306d882c8d22d0092bb7fefb","sha256":"dee5a8048003bc0f1783df6ed5b67ec76c0ca34bfad633e1defc3cd86b549719"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":16114,"blob":"cd0064870282d7d31509911a26d9936ebf3f5492","sha256":"dfb1f2e7552ccf35a3487c77e49b8b554a7a40219ef2532f7d732cf9a47d4b9f"},"tests":{"path":"test/finite-budget-stage-observer.test.mjs","bytes":13868,"blob":"28a9f114ef18e3e3faba6d75cc808f56bcc84eeb","sha256":"083806c3bbd2b86ead50b55c6c2138dfcd6f6aef02f02f496ac8c4a0bfd344db"},"world":{"path":"test/fixtures/finite-budget-world.mjs","bytes":243656,"blob":"1e18873791e0520fff611e353232e38786c51941","sha256":"125bfb65ebf5a87fb1301750ffeae4fe52f24dd6049828cf8c8557b94d886855"}};
export const OLD_PINS={"runtime":{"path":"test/fixtures/finite-budget-failure-runtime.mjs","bytes":5863,"blob":"8387894721b0b4e8ccbf5d91eb4eed4cd0c7c5fd","sha256":"34ff78a892a7aadbe9b6f8f2e810b7127d7a1409a42cf45ec28d946d1deedcc9"},"helper":{"path":"test/fixtures/finite-budget-failure-diagnostic.mjs","bytes":7927,"blob":"6b5b9f8905d77d3f9cd9d89ea3058cfbdd57760f","sha256":"97dd3df67bfcaef8567975732b573f274d89be8b63a4e9020685fafe731f39f2"},"observer":{"path":"test/fixtures/finite-budget-stage-observer.mjs","bytes":15604,"blob":"0197111834354a1e911b977a765b161591d48b18","sha256":"1c5a30301153ac92deb13efb4b84f4d5888e35fb27ae10e1078c7fb861039851"}};
export const CANDIDATE={"commit":"32ca318743b26a8a6d54ef743c9f101609525491","tree":"c578f1b74ed69f99d22f4eef892a0d12e6257a75","bytes":367308,"blob":"79e3bdcaeaa729195a09897a36fca8053fbb7b13","sha256":"259a4274b315b760265f9f625914efe583a4988b901663aea537dc483674d278"};
export const PROGRAMS={"adapter":{"bytes":63917,"sha256":"ae52aab0185c10e92fff9121411c1c9a782d0f8237b3d430016a283c048566f9"},"controls":{"bytes":63195,"sha256":"52823dc8a5c8259b9a4e4780afd33a5ce6bc97da351cd7aa8e4805aad4aaab71"},"verifier":{"bytes":15099,"sha256":"94135538ab4fb8fa7f43fc2fe42c64563eb806e436117b4a404c26c855ee35bf"},"safeZip":{"bytes":13305,"sha256":"b36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d"}};
export const OLD_CANDIDATE={"commit":"2c390b182f6889e79480e7b1618f41af8d1e0d22","bytes":367124,"blob":"53d9732130e96e75aa5e26038ac8b162c6032b30","sha256":"70ebdecad41f59b12f4057aa5607b715e75b1f828c38368c7c960fa1617e0553"};
export const DIAGNOSTIC_IDS=Object.freeze(["d01_exact_system_codes","d02_assertion_data_fields","d03_exact_custody_messages","d04_no_code_prefix_inference","d05_exact_custody_message_only","d06_every_finite_public_site","d07_relative_public_frame","d08_no_free_paths","d09_no_free_line_or_columns","d10_normal_chain_and_ambiguous_frame","d11_message_cannot_forge_frame","d12_real_vm_native_error","d13_real_vm_assertion","d14_getters_never_called","d15_proxy_traps_never_called","d16_revoked_proxy","d17_arbitrary_objects_no_coercion","d18_error_private_fields_ignored","d19_huge_error_stack","d20_long_error_line","d21_canonical_fixed_log","d22_all_log_codes_and_sites","d23_log_secrets_not_echoed","d24_log_closed_schema","d25_log_exact_enum_only","d26_log_duplicate_json_fields","d27_log_ambiguous_or_repeated_markers","d28_log_truncation","d29_log_marker_forgery","d30_log_utf8_byte_limit","d31_log_line_limit","d32_log_count_limit","d33_nonstring_logs_no_coercion","d34_fresh_closed_results","d35_fresh_default_formatter_preserved","d36_fresh_formatter_getter_before_helper","d37_fresh_formatter_proxy_before_helper","d38_fresh_identical_text_different_closure","d39_fresh_global_Error_getter_before_helper","d40_fresh_global_Error_proxy_before_helper","d41_fresh_global_Error_constructor_before_helper","d42_fresh_startup_options_refused","d43_fresh_callsite_coercion_refused","d44_multiline_header_fields_refused","d45_header_values_without_hooks"]);
export const UNKNOWN_FAIL_IDS=Object.freeze(["d01_exact_system_codes","d02_assertion_data_fields","d03_exact_custody_messages","d04_no_code_prefix_inference","d05_exact_custody_message_only","d06_every_finite_public_site","d07_relative_public_frame","d10_normal_chain_and_ambiguous_frame","d18_error_private_fields_ignored","d21_canonical_fixed_log","d22_all_log_codes_and_sites","d45_header_values_without_hooks"]);
export const TEST_IDS=Object.freeze(["s01_exact_stage_chain","s02_one_pending_stage","s03_every_pending_stage","s04_no_observations","s05_sequence_gap","s06_duplicate_stage","s07_conflicting_completion","s08_marker_canonical_schema","s09_http_bounded_only","s10_http_conflicts","s11_canonical_failure_only","s12_legacy_system_code","s13_legacy_custody_enum","s14_legacy_assertion","s15_legacy_private_frame_rejected","s16_failure_conflict","s17_no_message_or_path_echo","s18_code_token_not_substring","s19_missing_logs","s20_real_files_and_closed_pair","s21_symlink_file","s22_symlink_parent","s23_hardlink_rejected","s24_file_bound","s25_tail_truncation_and_marker_prefix","s26_malformed_utf8_and_lines","s27_fd_path_race","s28_fd_mutation_race","s29_readonly_aggregate_truth","s30_pair_fail_closed","s31_exact_assignment_projection","s32_assignment_unavailability_no_borrow","s33_production_token_not_inherited","s34_legacy_conflicting_claims_poison_canonical","s35_real_fifo_swap_bounded_before_read","s36_partial_prefix_only_nonempty_edges"]);
export const INTEGRATION_IDS=Object.freeze(["i01_actual_key_scope_ast","i02_actual_fixed_cases","i03_diagnostic_secret_reference_rejected","i04_actual_eight_job_workflow","i05_frozen_parser_programs","i06_six_coe_guard_output_policy","i07_only_pin_ripple_and_six_flags"]);
export const RECEIVER_IDS=Object.freeze(["r01_finalfix_closed_pair","r02_integrated_candidate_pin","r03_current_test_inventory","r04_all_seven_nonclaims","r05_current_context","r06_manifest_byte_binding"]);
export const NONCLAIMS=Object.freeze({historicalCauseProven:false,receiptAuthenticated:false,operationalReadiness:false,completePackage:false,PCoff:false,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const canonical=v=>Buffer.from(JSON.stringify(v)+'\n');
const same=(a,b)=>assert.deepEqual(a,b,'finalfix_evidence_rejected');
const fields=(v,k)=>{assert(v&&typeof v==='object'&&!Array.isArray(v));same(Object.keys(v),k);};
const statuses=ids=>ids.map(id=>({id,status:'passed'}));
export function validateContext(v){fields(v,['repository','repositoryId','ref','source','tree','workflowBlob','run','attempt','node']);same(v.repository,'tokenizartinfo-ops/agent-friendly-web');same(v.repositoryId,'1347578006');same(v.ref,'refs/heads/feat/finite-native-cleanup-20261101');for(const k of ['source','tree','workflowBlob'])assert.match(v[k],/^[a-f0-9]{40}$/);assert.match(v.run,/^[1-9][0-9]*$/);same(v.attempt,1);same(v.node,'22.23.4');}
function counts(v,total,kind){fields(v,['exit','tests','pass','fail','cancelled','skipped','todo']);for(const n of Object.values(v))assert(Number.isSafeInteger(n)&&n>=0);same(v.tests,total);same(v.pass+v.fail+v.skipped,v.tests);same(v.cancelled,0);same(v.todo,0);if(kind==='green'){same(v.exit,0);same(v.pass,total);same(v.fail,0);same(v.skipped,0);}else if(kind==='unknown'){same(v.exit,1);assert(v.fail>0&&v.pass>0);same(v.skipped,0);same(v.fail,UNKNOWN_FAIL_IDS.length);}else{same(v.exit,1);same(v.pass,0);same(v.fail,kind);same(v.skipped,total-kind);}}
function tests(v){fields(v,['allUnknown','diagnostic','stage','oldDiagnostic','oldStage','hooks']);counts(v.allUnknown,DIAGNOSTIC_IDS.length,'unknown');counts(v.diagnostic,DIAGNOSTIC_IDS.length,'green');counts(v.stage,TEST_IDS.length,'green');counts(v.oldDiagnostic,2,2);counts(v.oldStage,3,3);fields(v.hooks,['green','oldCallsite']);same(v.hooks.green,0);assert(Number.isSafeInteger(v.hooks.oldCallsite)&&v.hooks.oldCallsite>0&&v.hooks.oldCallsite<=1024);}
function result(v,context){fields(v,['purpose','role','context','pins','oldPins','candidate','programs','tests','controls','nonclaims']);same(v.purpose,'afw.sanitized-stage-observations.finalfix.qualification.syn.v1');same(v.role,'independent-zero-afw-key-finalfix-qualification');validateContext(v.context);same(v.context,context);same(v.pins,PINS);same(v.oldPins,OLD_PINS);same(v.candidate,CANDIDATE);same(v.programs,PROGRAMS);tests(v.tests);fields(v.controls,['diagnosticIds','testIds','integration','receiver']);same(v.controls.diagnosticIds,DIAGNOSTIC_IDS);same(v.controls.testIds,TEST_IDS);same(v.controls.integration,statuses(INTEGRATION_IDS));same(v.controls.receiver,statuses(RECEIVER_IDS));same(v.nonclaims,NONCLAIMS);}
function parse(b){assert(Buffer.isBuffer(b)&&b.length>0&&b.length<=65536);const s=new TextDecoder('utf-8',{fatal:true}).decode(b),v=JSON.parse(s);assert(canonical(v).equals(b));return v;}
export function pair(v){const b=canonical(v);return new Map([['result.json',b],['manifest.json',canonical({purpose:'afw.sanitized-stage-observations.finalfix.manifest.syn.v1',context:v.context,files:[{path:'result.json',bytes:b.length,sha256:sha(b)}]})]]);}
export function validatePair(files,context){validateContext(context);assert(files instanceof Map);same([...files.keys()].sort(),['manifest.json','result.json']);assert([...files.values()].reduce((n,b)=>n+b.length,0)<=65536);const v=parse(files.get('result.json')),m=parse(files.get('manifest.json'));result(v,context);fields(m,['purpose','context','files']);same(m.purpose,'afw.sanitized-stage-observations.finalfix.manifest.syn.v1');same(m.context,context);same(m.files,[{path:'result.json',bytes:files.get('result.json').length,sha256:sha(files.get('result.json'))}]);return v;}
export function runReceiverControls(context){
 const out=[],record=(id,fn)=>{fn();out.push({id,status:'passed'});},clone=v=>JSON.parse(JSON.stringify(v));
 const count=(n,fail=0,skip=0)=>({exit:fail?1:0,tests:n,pass:n-fail-skip,fail,cancelled:0,skipped:skip,todo:0});
 const fixture={purpose:'afw.sanitized-stage-observations.finalfix.qualification.syn.v1',role:'independent-zero-afw-key-finalfix-qualification',context,pins:PINS,oldPins:OLD_PINS,candidate:CANDIDATE,programs:PROGRAMS,tests:{allUnknown:count(DIAGNOSTIC_IDS.length,UNKNOWN_FAIL_IDS.length),diagnostic:count(DIAGNOSTIC_IDS.length),stage:count(TEST_IDS.length),oldDiagnostic:count(2,2),oldStage:count(3,3),hooks:{green:0,oldCallsite:1}},controls:{diagnosticIds:DIAGNOSTIC_IDS,testIds:TEST_IDS,integration:statuses(INTEGRATION_IDS),receiver:statuses(RECEIVER_IDS)},nonclaims:NONCLAIMS};
 const reject=mutate=>{const v=clone(fixture);mutate(v);assert.throws(()=>validatePair(pair(v),context));};
 record(RECEIVER_IDS[0],()=>{same(validatePair(pair(fixture),context),fixture);const f=pair(fixture);f.set('result.json',Buffer.from(JSON.stringify(fixture,null,2)+'\n'));assert.throws(()=>validatePair(f,context));});
 record(RECEIVER_IDS[1],()=>reject(v=>{v.candidate.blob='a'.repeat(40);}));
 record(RECEIVER_IDS[2],()=>{reject(v=>{v.controls.diagnosticIds.push('unknown');});reject(v=>{v.tests.diagnostic.fail=1;v.tests.diagnostic.pass--;});reject(v=>{v.tests.hooks.oldCallsite=0;});});
 record(RECEIVER_IDS[3],()=>reject(v=>{v.nonclaims.receiptAuthenticated=true;}));
 record(RECEIVER_IDS[4],()=>reject(v=>{v.context.run=context.run==='1'?'2':'1';}));
 record(RECEIVER_IDS[5],()=>{const f=pair(fixture),m=JSON.parse(f.get('manifest.json'));m.files[0].bytes++;f.set('manifest.json',canonical(m));assert.throws(()=>validatePair(f,context));});return out;
}

```

### V complete
```javascript
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import * as S from './afw-stage-receiver.mjs';
import * as Z from './afw-suite-safe-zip.mjs';

const git=args=>execFileSync('git',args,{encoding:'utf8'}).trim();
async function main(){
 const env=process.env;assert.equal(process.versions.node,'22.23.4');assert.equal(env.NODE_OPTIONS,undefined);assert.equal(env.GITHUB_JOB,'verify');assert.equal(env.GITHUB_REPOSITORY_ID,'1347578006');assert.equal(env.GITHUB_RUN_ATTEMPT,'1');
 const context={repository:env.GITHUB_REPOSITORY,repositoryId:env.GITHUB_REPOSITORY_ID,ref:env.GITHUB_REF,source:env.GITHUB_SHA,tree:git(['rev-parse','HEAD^{tree}']),workflowBlob:git(['rev-parse','HEAD:.github/workflows/afw-finite-budget-qualification.yml']),run:env.GITHUB_RUN_ID,attempt:Number(env.GITHUB_RUN_ATTEMPT),node:process.versions.node};S.validateContext(context);assert.equal(git(['rev-parse','HEAD']),context.source);assert.equal(env.QUALIFY_RESULT,'success');
 for(const pin of Object.values(S.PINS)){const bytes=await readFile(pin.path);assert.equal(bytes.length,pin.bytes);assert.equal(createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex'),pin.blob);assert.equal(S.sha(bytes),pin.sha256);}
 
 const id=env.QUALIFY_ARTIFACT_ID,digest=env.QUALIFY_ARTIFACT_DIGEST,token=env.GH_ARTIFACT_TOKEN;assert.match(id,/^[1-9][0-9]*$/);assert.match(digest,/^[a-f0-9]{64}$/);assert(typeof token==='string'&&token.length>0);
 async function json(path){const response=await fetch('https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web'+path,{redirect:'error',headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});assert.equal(response.status,200);assert(response.body);const parts=[],reader=response.body.getReader();let size=0;try{for(;;){const item=await reader.read();if(item.done)break;size+=item.value.byteLength;assert(size<=65536);parts.push(Buffer.from(item.value));}}catch(error){try{await reader.cancel();}catch{}throw error;}return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(parts)));}
 const run=await json('/actions/runs/'+context.run);assert.equal(run.id,Number(context.run));assert.equal(run.run_attempt,1);assert.equal(run.head_sha,context.source);assert.equal(run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(run.event,env.GITHUB_EVENT_NAME);assert.equal(run.path,'.github/workflows/afw-finite-budget-qualification.yml');assert.equal(run.repository.id,1347578006);assert.equal(run.head_repository.id,1347578006);
 const metadata=await json('/actions/artifacts/'+id),name='stage-finalfix-SMALLSAFE-'+context.source+'-'+context.run;
 assert.equal(metadata.id,Number(id));assert.equal(metadata.name,name);assert.equal(metadata.expired,false);assert.equal(metadata.digest,'sha256:'+digest);assert(Number.isSafeInteger(metadata.size_in_bytes)&&metadata.size_in_bytes>0&&metadata.size_in_bytes<=65536);
 assert.equal(metadata.workflow_run.id,Number(context.run));assert.equal(metadata.workflow_run.repository_id,1347578006);assert.equal(metadata.workflow_run.head_repository_id,1347578006);assert.equal(metadata.workflow_run.head_branch,'feat/finite-native-cleanup-20261101');assert.equal(metadata.workflow_run.head_sha,context.source);
 const created=Date.parse(metadata.created_at),expires=Date.parse(metadata.expires_at);assert(Number.isFinite(created)&&Number.isFinite(expires)&&created<=Date.now()+60000&&expires>Date.now()&&expires-created<=604860000);
 const bytes=await Z.downloadAssignedZip(id,token);assert(bytes.length<=65536);const rawSha=Z.bindRawZip(bytes,metadata.size_in_bytes,digest,metadata.digest),files=Z.decodeSafePair(bytes),value=S.validatePair(files,context);
 
 console.log('AFW_STAGE_SMALLSAFE/1 '+JSON.stringify({context,artifactId:id,uploadedDigest:digest,metadataSize:metadata.size_in_bytes,rawBytes:bytes.length,rawSha256:rawSha,resultBytes:files.get('result.json').length,resultSha256:S.sha(files.get('result.json')),manifestBytes:files.get('manifest.json').length,manifestSha256:S.sha(files.get('manifest.json')),tests:value.tests,candidate:value.candidate,programs:value.programs,integrationControls:value.controls.integration.length,receiverControls:value.controls.receiver.length,nonclaims:S.NONCLAIMS}));
}
main().catch(()=>{console.error('AFW_STAGE_RECEIVER_FAILED/1');process.exitCode=1;});

```

### Z unchanged
Exactfrozen13305B/SHAb36c40c0a74159db5c8db783d9c615f3c3cfbee4e30c0296fe023b43c5646c1d. No diff; not a new ZIP review.

## Limits
94GREENlogicalfamilies and meaningfulRED/oldhooks are Sourcequalification, not business16, historicalcause, actualCF/runtime/subscription/notice/review/withdrawal/autostop or PCoff. All7false. Readonlycompoundfailure/custody_limit remain separate nextinvestigation, not attributed to these fixes.