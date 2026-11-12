# ORDremainingtwo-case — scoped fixround1 full package

Repo tokenizartinfo-ops/agent-friendly-web. FIX_BASEdee60034f5caf5087a4e2972d8dcaabee7c3fba1→FIX_HEAD7993018a0b823cbff61012061f70de093af32eb3/tree7f093e7910fba9bae62252e3a053c9df62c130ae. Complete1commit/2paths/U10,3189otherblobs/modesexact/3191total/workflowc082inactive/0runs/reportappendonly.

## Commits
7993018a0b823cbff61012061f70de093af32eb3 Stop passive error prototype traversal before Proxy traps [skip ci]

## Stat
docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md +228 -0
scripts/diagnostics/ordinary-failure-boundaries.mjs +14 -4

## Full verified diff
```diff
diff --git a/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
# before_blob=c9fb23886a147a20e29773ac35808c059d8633b1 after_blob=2de47efbb49e7785ad0a5c33fdfb5036211dc470
--- a/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
+++ b/docs/superpowers/reports/2026-11-12-ordinary-failure-boundaries.es.md
@@ -248,10 +248,238 @@
 
 Realizado: SourceTextModule analizó helper y siete overlays y el inline de fallback, sin evaluate/link/import del proyecto. PyYAML 6.0.3 ya disponible analizó el workflow y comprobó un job/literal false/manual sin inputs/read-only/attempt 1/siete minutos/sin environment o secrets/un upload. No se instalaron herramientas ni dependencias; no se creó proyecto, clon, proceso persistente o test local. Un payload RAM mayor de 64000 bytes fue rechazado automáticamente antes de ejecutar; se dividió en siete análisis pequeños, todos aceptados. Un fetch inicial de un nombre de workflow incorrecto devolvió 404; se consultó el directorio fijado y se leyó la referencia correcta; ninguna mutación afectada.
 
 La comprobación Actions por rama exacta devolvió total_count=0 antes de escribir. CI existente sólo hace push a main o pull_request; no se abre PR, y el commit de preparación incluye [skip ci]. El nuevo workflow es sólo manual/inactivo. No se despacha workflow ni se habilita ninguna ejecución durante preparación.
 
 Publicación preparada en Git Data: crear árbol con base exacta 7bc8b997a968dca32fc567b627de70b774d6489c y sólo las tres nuevas rutas; crear un commit con único padre f5; mover sólo diag/afw-failure-boundaries-20261112 mediante expected_sha=f5 y force=false. Ante rechazo CAS, no reintentar sin inspeccionar el ref. Corrección acotada posterior al primer commit preparado 421febef4da38ffefeab00cd6ec9a838ce3c7f00: los controles de identidad usaban inicialmente la etapa rest_control y podían aparentar una frontera de fixture no alcanzada. Se reemplazaron por etapa nula descartada antes de emitir; sólo queda el recibo identity_control. Se repitió la gramática estática y el commit corrector es fast-forward con padre 421febef, expected_sha exacto y force=false; todas las comprobaciones finales se repiten. No se ejecutaron controles o tests. El material de reversión son los 3188 blobs inmutables/base f5; esta entrega no autoriza reset/force/delete ni activar el job.
 
 Criterio externo de entrega: readback independiente de ref, commit/padre, árbol completo no truncado (3191 blobs), los 3188 tuples path/mode/sha originales intactos y exactamente tres altas; lectura completa de los tres blobs y comparación byte por byte+hashes; nueva consulta de runs exacta cero. Los SHA reales del commit/árbol/informe y los resultados de estas comprobaciones quedan en el contrato externo posterior a este contenido. STOP_WRITES al concluir ese contrato, sin commits autorreferenciales.
 
 Pendiente: revisión fresca Spec+Quality por Root; controles reales Node/selección/conteos/hashes/preservación/deadlines/artefacto; liberación explícita separada para un único job attempt 1, fuera de toda ventana nativa sensible. Si la frontera no resuelve causa, queda desconocida. No se arregló producto, cambió pin ni cualificó disponibilidad/paquete/PC apagado.
+
+
+## Formal fix round 1/5 — observador detenido ante prototipos Proxy
+
+Brief Root: docs/superpowers/briefs/2026-11-12-ordinary-failure-boundaries-fix-round1.md @4df97da1cc2a7aa063c07e9d2aea6a633f227c72, blob 34eae6f12a17e3379c4e24dd718a02ee1211ce57. Un único Important, cero Critical/Minor. FIX_BASE=dee60034f5caf5087a4e2972d8dcaabee7c3fba1; árbol f71302b9498a82c6f1571d78b5b9df04c4a7aa1b; helper base 67ac2f192c767b56b356a41ee6e9db6e1601fe53; informe base c9fb23886a147a20e29773ac35808c059d8633b1. Esta sección se añade conservando exactamente todos los bytes del prefijo anterior.
+
+Finding recibido, literal:
+
+> **scripts/diagnostics/ordinary-failure-boundaries.mjs:140–143 — prototype traversal can execute Proxy traps.** A genuine native Error can have a Proxy anywhere in its prototype chain. own(p,'name') rejects the Proxy, but the following Object.getPrototypeOf(p) invokes its getPrototypeOf trap. That trap can mutate fixture state, perform other observation-visible work or throw; catching the exception does not reverse those effects. This violates the required passive observer and Proxy safety. Stop traversal when types.isProxy(p) is true, preserving unknown classification. Add a prepared control with a native Error whose prototype chain contains a Proxy, requiring zero trap touches.
+
+Cambio mínimo: antes de own(p,'name') o de avanzar con Object.getPrototypeOf(p), el bucle ahora ejecuta if(types.isProxy(p))break;. La marca nativa se conserva; prototipo observado y clase permanecen desconocidos al llegar al Proxy. Se prepararon tres controles con Error nativo y Proxy directo, anidado y revocado, con contador de traps igual a cero. Se incorporan únicamente los campos cerrados proxyPrototypesSafe y proxyTrapTouches al recibo privacy_control existente y a su proyección cerrada. No hay nueva etapa ni llamada a __afbWrap/__afbMethod dentro de controls(), por lo que no se contaminan las 16 fronteras de fixtures.
+
+No se cambian safeError(), los algoritmos de fixtures, clocks, invocaciones/receptores/Promises/excepciones originales, hashes de mensajes, reglas de datos propios, redacción o caps. Helper corregido: 26524 bytes UTF-8, Git blob f3a5a76407723657833255d697053c9ff2bfd0bc, SHA-256 4d94b9b469ed621f62c5eed2e65e63c5970216f336662ea7eefc852ee33a62f5. La tabla anterior conserva deliberadamente los hashes históricos de la preparación inicial; este es el pin nuevo de la corrección.
+
+### Evidencia local acotada autorizada: RED → GREEN de metadata
+
+Excepción del brief: sólo se evaluaron las funciones profile()/own(), constantes cerradas y la primitiva de hash en VM aislada con errores sintéticos inertes. Builtins disponibles node:vm, node:util y node:crypto; Buffer.byteLength se pasa como una única primitiva de longitud, sin acceso a archivos/proyecto/red/child_process/dependencias. No se importó ni evaluó el helper completo: new vm.SourceTextModule(fixedHelper) sólo comprobó su gramática.
+
+hostNodeVersion=unavailable_from_node_repl. El sandbox node_repl oculta process y no expone node:process. Root aceptó expresamente esta limitación de procedencia y decidió no usar otro ejecutable ni shell para suplirla. No se atribuye la prueba a Node 22.23.4 ni a Ubuntu/Actions.
+
+Cada contexto usó timeout:100 ms, impuesto por node:vm; los contextos completados retornaron sin timeout. No se midió duración fina de VM y no se presenta el tiempo del puente de herramientas como tiempo de clasificación. Hubo tres intentos de contexto: el primero hizo una sola invocación pero quedó incompleto por faltar Buffer en la VM y no emitió evidencia del contador; se repitió con la primitiva byteLength explícita. Conteo TOTAL, incluido ese intento incompleto: 9 invocaciones inertes (<10), distribuidas 1 incompleta +1 RED +7 GREEN. No se repitieron después las clasificaciones.
+
+Comandos exactos de la herramienta node_repl, con los snippets literales preservados debajo:
+
+```js
+var vm = await import('node:vm');
+var types = (await import('node:util')).types;
+var crypto = await import('node:crypto');
+
+// Intento inicial incompleto: faltó Buffer, sin resultado RED terminado.
+var red = vm.runInNewContext(oldMetadataSnippet,{
+ types,
+ hash:value=>crypto.createHash('sha256').update(value).digest('hex')
+},{timeout:100});
+
+// RED observado, corrigiendo únicamente el sandbox.
+var red = vm.runInNewContext(oldMetadataSnippet,{
+ types,
+ hash:value=>crypto.createHash('sha256').update(value).digest('hex'),
+ Buffer:{byteLength:value=>Buffer.byteLength(value)}
+},{timeout:100});
+
+// GREEN, helper analizado pero no evaluado.
+new vm.SourceTextModule(fixedHelper);
+var green = vm.runInNewContext(greenMetadataSnippet,{
+ types,
+ hash:value=>crypto.createHash('sha256').update(value).digest('hex'),
+ Buffer:{byteLength:value=>Buffer.byteLength(value)}
+},{timeout:100});
+```
+
+oldMetadataSnippet exacto (los literales canary son entrada fija del código de prueba, nunca salida de error observada):
+
+```js
+const MAX_MESSAGE=1048576;
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
+const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
+const PROTOS=INTRINSICS.map(x=>x.prototype);
+const CLASS_NAMES=NAMES.slice(0,8);
+const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
+
+function profile(error,depth){
+ let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
+ try{
+  nativeError=types.isNativeError(error);
+  if(nativeError){
+   let p=Object.getPrototypeOf(error);
+   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
+   for(let i=1;i<=4&&p;i++){
+    const name=own(p,'name');
+    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
+    p=Object.getPrototypeOf(p);
+   }
+  }
+ }catch{}
+ const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
+ let messageHash=null,messageTooLarge=false;
+ if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
+ return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
+}
+
+let trapTouches=0;
+const proxy=new Proxy({},{
+ getPrototypeOf(){trapTouches++;return Error.prototype;},
+ getOwnPropertyDescriptor(){trapTouches++;throw new Error('private trap');},
+ get(){trapTouches++;throw new Error('private trap');}
+});
+const error=new Error('AFB_PRIVATE_VM_CANARY');
+Object.setPrototypeOf(error,proxy);
+const row=profile(error,0);
+({case:'native_error_direct_proxy_old',nativeError:row.nativeError,proxyTrapTouches:trapTouches,observedUnknown:row.currentRealmPrototype===null&&row.observedDataPrototypeName===null,redObserved:row.nativeError===true&&trapTouches>0});
+
+```
+
+greenMetadataSnippet exacto:
+
+```js
+const MAX_MESSAGE=1048576;
+const CODES=['ERR_TEST_FAILURE','ERR_ASSERTION','ERR_INVALID_URL','ERR_MODULE_NOT_FOUND','ERR_UNKNOWN_BUILTIN_MODULE','ERR_UNSUPPORTED_ESM_URL_SCHEME','ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING'];
+const NAMES=['Error','TypeError','SyntaxError','ReferenceError','RangeError','EvalError','URIError','AggregateError','AssertionError'];
+const INTRINSICS=[Error,TypeError,SyntaxError,ReferenceError,RangeError,EvalError,URIError,AggregateError];
+const PROTOS=INTRINSICS.map(x=>x.prototype);
+const CLASS_NAMES=NAMES.slice(0,8);
+const own=(v,k)=>{try{if(types.isProxy(v))return undefined;const d=Object.getOwnPropertyDescriptor(v,k);return d&&Object.hasOwn(d,'value')?d.value:undefined;}catch{return undefined;}};
+
+function profile(error,depth){
+ let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
+ try{
+  nativeError=types.isNativeError(error);
+  if(nativeError){
+   let p=Object.getPrototypeOf(error);
+   const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
+   for(let i=1;i<=4&&p;i++){
+    if(types.isProxy(p))break;
+    const name=own(p,'name');
+    if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
+    p=Object.getPrototypeOf(p);
+   }
+  }
+ }catch{}
+ const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
+ let messageHash=null,messageTooLarge=false;
+ if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
+ return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
+}
+
+const results=[];
+for(const kind of ['direct','nested','revoked']){
+ let trapTouches=0;
+ const handler={getPrototypeOf(){trapTouches++;throw new Error('private trap');},getOwnPropertyDescriptor(){trapTouches++;throw new Error('private trap');},get(){trapTouches++;throw new Error('private trap');}};
+ const r=Proxy.revocable({},handler),error=new Error('AFB_PRIVATE_VM_CANARY');
+ Object.setPrototypeOf(error,kind==='nested'?Object.create(r.proxy):r.proxy);
+ if(kind==='revoked')r.revoke();
+ const row=profile(error,0),unknown=row.currentRealmPrototype===null&&row.observedDataPrototypeName===null&&row.prototypeDepth===null;
+ results.push({case:'native_error_'+kind+'_proxy_new',pass:row.nativeError===true&&trapTouches===0&&unknown,nativeError:row.nativeError,proxyTrapTouches:trapTouches,unknown});
+}
+for(const [name,error,expected]of [['ordinary_error',new Error('AFB_PRIVATE_VM_CANARY'),'Error'],['ordinary_type_error',new TypeError('AFB_PRIVATE_VM_CANARY'),'TypeError']]){
+ const row=profile(error,0);
+ results.push({case:name,pass:row.nativeError===true&&row.currentRealmPrototype===expected&&row.observedDataPrototypeName===expected,nativeError:row.nativeError,knownPrototypePreserved:row.currentRealmPrototype===expected});
+}
+let getterTouches=0;const guarded=new Error('AFB_PRIVATE_VM_CANARY');
+for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){getterTouches++;throw new Error('private getter');}});
+const guardedRow=profile(guarded,0),canaryAbsent=!JSON.stringify(guardedRow).includes('AFB_PRIVATE_VM_CANARY');
+results.push({case:'throwing_getters_untouched',pass:getterTouches===0&&canaryAbsent&&guardedRow.name===null&&guardedRow.code===null,getterTouches,rawCanaryAbsent:canaryAbsent});
+const spoof=profile(Object.create(TypeError.prototype),0);
+results.push({case:'spoof_prototype_rejected',pass:spoof.nativeError===false&&spoof.currentRealmPrototype===null&&spoof.observedDataPrototypeName===null,nativeError:spoof.nativeError,unknown:spoof.currentRealmPrototype===null&&spoof.observedDataPrototypeName===null});
+({greenPassed:results.filter(r=>r.pass).length,greenTotal:results.length,results});
+
+```
+
+Resultados reales saneados:
+
+```json
+{
+  "hostNodeVersion": "unavailable_from_node_repl",
+  "contextTimeoutMs": 100,
+  "totalInertAttempts": 9,
+  "red": {
+    "case": "native_error_direct_proxy_old",
+    "nativeError": true,
+    "proxyTrapTouches": 1,
+    "observedUnknown": false,
+    "redObserved": true
+  },
+  "green": {
+    "greenPassed": 7,
+    "greenTotal": 7,
+    "results": [
+      {
+        "case": "native_error_direct_proxy_new",
+        "pass": true,
+        "nativeError": true,
+        "proxyTrapTouches": 0,
+        "unknown": true
+      },
+      {
+        "case": "native_error_nested_proxy_new",
+        "pass": true,
+        "nativeError": true,
+        "proxyTrapTouches": 0,
+        "unknown": true
+      },
+      {
+        "case": "native_error_revoked_proxy_new",
+        "pass": true,
+        "nativeError": true,
+        "proxyTrapTouches": 0,
+        "unknown": true
+      },
+      {
+        "case": "ordinary_error",
+        "pass": true,
+        "nativeError": true,
+        "knownPrototypePreserved": true
+      },
+      {
+        "case": "ordinary_type_error",
+        "pass": true,
+        "nativeError": true,
+        "knownPrototypePreserved": true
+      },
+      {
+        "case": "throwing_getters_untouched",
+        "pass": true,
+        "getterTouches": 0,
+        "rawCanaryAbsent": true
+      },
+      {
+        "case": "spoof_prototype_rejected",
+        "pass": true,
+        "nativeError": false,
+        "unknown": true
+      }
+    ]
+  }
+}
+```
+
+RED: nativeError=true, getPrototypeOf trap counter=1, clasificación observada no desconocida. GREEN: 7/7. Proxy directo/anidado/revocado conservaron marca nativa con contador cero y observación desconocida; Error y TypeError ordinarios conservaron identidad conocida; getters stack/code/name/tag/cause no fueron tocados, sin canary crudo; spoof de prototipo siguió rechazado. No se imprimieron mensajes/stack ni valores de prototipo. Los controles preparados de padre/hijos y la sonda completa siguen SIN EJECUTAR. Estos resultados sólo prueban el defecto de metadata y su corrección acotada, no cualificación cloud del harness.
+
+### Integridad y cierre de esta corrección
+
+Prewrite verificado: rama exacta todavía dee60034; workflow íntegro c082ab9bacc8b3cf975fa611aebd95edcf144fd0, manual/inactivo; Actions total_count=0. Sólo se modifican helper y este APPEND del informe. Los otros 3189 blobs/modos de FIX_BASE, incluido workflow, quedan protegidos; no hay nuevas rutas ni eliminación.
+
+Commit corrector con único padre FIX_BASE; CAS expected_sha=dee60034f5caf5087a4e2972d8dcaabee7c3fba1, force=false, sólo esta rama, mensaje [skip ci]. Readbacks externos exigidos antes de entregar: ref/commit/padre/árbol completo no truncado de 3191 blobs; exactamente dos modificaciones, 3189 tuples protegidos intactos; helper y reporte completos, prefijo del informe exacto, workflow exacto; cero runs. Los hashes propios finales informe/head/tree y el resultado efectivo de CAS/readback se entregan en el contrato externo, sin commits autorreferenciales.
+
+STOP_WRITES tras cierre externo. No hay activación/jobs/helpers/reviewers/subagentes ni cambios fuera de esas dos rutas. operationalReadiness=false; completePackage=false; PCoff=false. La misma revisión fresca de Root debe valorar FIX_BASE..FIX_HEAD; no se concede permiso de ejecución con este fix.
diff --git a/scripts/diagnostics/ordinary-failure-boundaries.mjs b/scripts/diagnostics/ordinary-failure-boundaries.mjs
# before_blob=67ac2f192c767b56b356a41ee6e9db6e1601fe53 after_blob=f3a5a76407723657833255d697053c9ff2bfd0bc
--- a/scripts/diagnostics/ordinary-failure-boundaries.mjs
+++ b/scripts/diagnostics/ordinary-failure-boundaries.mjs
@@ -131,20 +131,21 @@
 const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v)?v:null;
 const number=(v,max=10000)=>Number.isSafeInteger(v)&&v>=0&&v<=max?v:null;
 function profile(error,depth){
  let nativeError=false,currentRealmPrototype=null,observedDataPrototypeName=null,prototypeDepth=null;
  try{
   nativeError=types.isNativeError(error);
   if(nativeError){
    let p=Object.getPrototypeOf(error);
    const n=PROTOS.indexOf(p);if(n>=0)currentRealmPrototype=CLASS_NAMES[n];
    for(let i=1;i<=4&&p;i++){
+    if(types.isProxy(p))break;
     const name=own(p,'name');
     if(CLASS_NAMES.includes(name)){observedDataPrototypeName=name;prototypeDepth=i;break;}
     p=Object.getPrototypeOf(p);
    }
   }
  }catch{}
  const m=own(error,'message'),c=own(error,'code'),n=own(error,'name');
  let messageHash=null,messageTooLarge=false;
  if(typeof m==='string'){messageTooLarge=m.length>MAX_MESSAGE||Buffer.byteLength(m)>MAX_MESSAGE;if(!messageTooLarge)messageHash=hash(m);}
  return {nativeError,currentRealmPrototype,observedDataPrototypeName,prototypeDepth,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(n)?n:null,code:CODES.includes(c)?c:null,messageHash,messageTooLarge,depth};
@@ -161,26 +162,35 @@
  const d=number(own(e,'depth'),3),cd=number(own(e,'causeDepth'),3),pd=number(own(e,'prototypeDepth'),4);
  return {nativeError:own(e,'nativeError')===true,currentRealmPrototype:CLASS_NAMES.includes(own(e,'currentRealmPrototype'))?own(e,'currentRealmPrototype'):null,observedDataPrototypeName:CLASS_NAMES.includes(own(e,'observedDataPrototypeName'))?own(e,'observedDataPrototypeName'):null,prototypeDepth:pd&&pd>=1?pd:null,prototypeObservationIsExactIntrinsicClass:false,name:NAMES.includes(own(e,'name'))?own(e,'name'):null,code:CODES.includes(own(e,'code'))?own(e,'code'):null,messageHash:hex(own(e,'messageHash')),messageTooLarge:own(e,'messageTooLarge')===true,depth:d,causeDepth:cd};
 }
 function controls(){
  const canary='AFB_PRIVATE_CANARY_NEVER_EMIT_20261112';
  let touches=0;
  const ordinary=new TypeError(canary),cross=runInNewContext('new TypeError("AFB_PRIVATE_CANARY_NEVER_EMIT_20261112")');
  const spoof=Object.create(TypeError.prototype),guarded=new Error(canary);
  for(const key of ['stack','code','name','cause',Symbol.toStringTag])Object.defineProperty(guarded,key,{get(){touches++;throw new Error('private getter');}});
  const large=new Error('X'.repeat(MAX_MESSAGE+1)),cycle=new Error(canary);Object.defineProperty(cycle,'cause',{value:cycle});
- const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify(rows);
- const pass=touches===0&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
- return {pass,getterTouches:touches,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
+ let proxyTrapTouches=0;
+ const proxyRows=['direct','nested','revoked'].map(kind=>{
+  const handler={getPrototypeOf(){proxyTrapTouches++;throw new Error('private proxy trap');},getOwnPropertyDescriptor(){proxyTrapTouches++;throw new Error('private proxy trap');},get(){proxyTrapTouches++;throw new Error('private proxy trap');}};
+  const revocable=Proxy.revocable({},handler),proxy=revocable.proxy,error=new Error(canary);
+  Object.setPrototypeOf(error,kind==='nested'?Object.create(proxy):proxy);
+  if(kind==='revoked')revocable.revoke();
+  return safeError(error)[0];
+ });
+ const proxyPrototypesSafe=proxyTrapTouches===0&&proxyRows.every(row=>row.nativeError&&row.currentRealmPrototype===null&&row.observedDataPrototypeName===null&&row.prototypeDepth===null);
+ const rows=[ordinary,cross,spoof,guarded,large,cycle].map(safeError),wire=JSON.stringify({rows,proxyRows});
+ const pass=touches===0&&proxyPrototypesSafe&&!wire.includes(canary)&&rows[0][0].nativeError&&rows[0][0].currentRealmPrototype==='TypeError'&&rows[1][0].nativeError&&rows[1][0].currentRealmPrototype===null&&rows[1][0].observedDataPrototypeName==='TypeError'&&!rows[2][0].nativeError&&rows[2][0].prototypeDepth===null&&rows[3][0].name===null&&rows[4][0].messageHash===null&&rows[4][0].messageTooLarge&&rows[5].length===1;
+ return {pass,getterTouches:touches,proxyTrapTouches,proxyPrototypesSafe,ordinaryNative:rows[0][0].nativeError,crossRealmNative:rows[1][0].nativeError,crossRealmExactUnknown:rows[1][0].currentRealmPrototype===null,spoofRejected:!rows[2][0].nativeError,oversizeSuppressed:rows[4][0].messageTooLarge,cycleBounded:rows[5].length===1,rawCanaryAbsent:!wire.includes(canary)};
 }
 function closedControl(v){
- return Object.fromEntries(['pass','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))]]));
+ return Object.fromEntries(['pass','proxyPrototypesSafe','ordinaryNative','crossRealmNative','crossRealmExactUnknown','spoofRejected','oversizeSuppressed','cycleBounded','rawCanaryAbsent'].map(k=>[k,own(v,k)===true]).concat([['getterTouches',number(own(v,'getterTouches'))],['proxyTrapTouches',number(own(v,'proxyTrapTouches'))]]));
 }
 function emit(value){try{const s=JSON.stringify(value);if(Buffer.byteLength(s)<=4096)process.stdout.write(PREFIX+s+'\n');}catch{}}
 function installChild(){
  if(process.env.AFB_CHILD!=='FIXED_TWO_CASES'||process.env.AFB_SUBJECT!==SUBJECT)reject();
  const note=(stage,phase,error)=>{
   if(!STAGES.includes(stage))return;
   try{emit({kind:'boundary',stage,phase});if(phase==='throw')emit({kind:'error',stage,errors:safeError(error)});}catch{}
  };
  const observe=(stage,fn,receiver,args)=>{
   let result;note(stage,'enter');
```
