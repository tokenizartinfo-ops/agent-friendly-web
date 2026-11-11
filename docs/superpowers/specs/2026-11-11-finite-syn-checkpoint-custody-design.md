# Custodia cifrada del checkpoint SYN — 11Nov2026

## Propósito y decisión de Root
Completar Task1 del plan finite-native-budget-qualification conservando su prueba real de recuperación fría entre runners y el vencimiento original. Source8452b974606171af39ee02fb41ddb124e7701ac1 pasó la faseA; el full9 no fue lanzado por custodia. Repositorio público1347578006. El checkpoint exporta una respuesta OAuth SYN en lateToken y bases nativas; no es lícito tratarlo como recibo público saneado.

El owner pidió ejecución continua y delegó decisiones de implementación; no se pide elegir arquitectura. Root elige cifrado autenticado con clave dedicada en un GitHub environment, no una modificación de datos nativos. La configuración sensible se concretará antes de cualquier paso humano obligatorio por la política del navegador.

## Alternativas consideradas
1. Omitir lateToken del JSON: no se usa en principalP1, pero no acredita ausencia de otros secretos en cuerpos POST/bindings/SQLite. Rechazada como solución suficiente.
2. Mismo runner/procesos separados o cache pública: reduce o modifica la prueba entre runners, o no ofrece confidencialidad. Rechazada.
3. Cifrar checkpoint íntegro y resultado nativo; publicar sólo sobre cifrado y recibo cerrado: conserva bytes, lineaje, relojes y tres jobs. Elegida por Root. Cuesta una clave exclusiva de cifrado, dos módulos Node de pruebas y un gate de custodia.

## Alcance
PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT GitHub Actions Source/SYN; ORIGIN connector+GitHub UI; RESOURCE_TYPE rama Source aislada y environment dedicado; RESOURCE_ID feat/finite-native-cleanup-20261101 / afw-finite-syn-checkpoint; ALLOWED_ACTION cifrar/descifrar artefactos SYN de esta calificación. Ningún acceso productivo, API Cloudflare, permisos de cliente, Max, correo, main, PR o deploy. operationalReadiness=false;completePackage=false;PCoff=false.

Archivos nuevos exclusivamente Node: test/fixtures/finite-checkpoint-custody.mjs y test/finite-checkpoint-custody.test.mjs. CLI Node opcional en el primer módulo, sin dependencia nueva ni import en Worker/M/QA. El resto de los cinco módulos de observación conserva bytes8452. TEMP y report existente pueden cambiar para integrar custodia. No cambiar lib/**,worker/**,SDK,package/lock/config/descriptor ni los helpers nativos. Checkpoint y resultado completos se cifran sin elisión ni cambio de esquema interno.

## Clave y environment
Clave criptográfica nueva, aleatoria, 32bytes/64caractereshexadecimales, nombre AFW_SYN_CHECKPOINT_KEY. Nunca reutilizar token/publisher/reader/OTP/clave OpenAI ni derivarla de información pública. Se guarda sólo en afw-finite-syn-checkpoint, sin valor en Git, chat, logs, artefactos, outputs o argumentos de proceso. Branch policy: sólo rama exacta feat/finite-native-cleanup-20261101; ningún tag. No modificar los environments públicos/de rollback ya existentes. Ninguna facultad de Cloudflare.

Sólo positive_prepare y positive_consume referencian el environment. La clave se inyecta únicamente en los pasos de seal/open mediante env, no en npm install ni uploads/downloads. pure no recibe secreto. No mostrar huella de clave ni usar echo/set -x. El environment no tiene TTL nativo: su revocación y la conservación de evidencia cifrada se deciden al cerrar la unidad, no prometer vencimiento automático. Antes de un lanzamiento Root verificará nombre, rama/policy, presencia no valor, workflow y uso acotado; si falta, STOP sin emitir I0.

## Formato y primitivas
Usar sólo node:crypto y Node fs/path. AES-256-GCM, IV aleatorio de12bytes por sellado y tag16bytes. Sin algoritmo casero, semilla determinista, nonce reutilizado ni clave en cabecera. El contexto autenticado es un JSON canónico con propósito afw.finite-checkpoint-custody.syn.v1 y campos exactos repository,ref,sourceSha,runId,runAttempt,kind. repository/ref fijos de arriba, sourceSha40hex, runId positivo decimal, runAttempt=1; kind checkpoint o positive-result. Ambos extremos construyen el contexto esperado de metadatos GitHub, no confían en la cabecera recibida. Distinto kind impide intercambiar checkpoint por resultado. Fuera de GitHub, pruebas usan un contexto fijo SYN válido y claves aleatorias efímeras.

Paquete interno: lista ordenada de archivos regulares con rutas relativas normalizadas, bytes exactos y digest SHA256; formato JSON/base64 sin tar ni extracción por shell. Inventariar antes de cifrar, rechazar symlinks, rutas absolutas, drive letters, backslash, NUL, segmentos vacíos/dot/dotdot, duplicados, colisiones padrearchivo/directorio y archivos especiales. Límites cerrados: máximo4096archivos,64MiB bytes totales de archivos,128MiB de sobre/JSON autenticado. No truncar: exceder límites falla cerrado sin upload. No chmod ni cambios de contenido de state/. La reconstrucción se hace en un destino nuevo exclusivo; nunca sobrescribir un checkpoint ajeno.

Sobre público: versión/contexto/algoritmo/IV/tag/ciphertext en base64, sin claves, valores de state, lateToken, cuerpos POST ni lista de archivos internos. Digest SHA256/bytes exteriores y un recibo de custodia son públicos. Recibo cerrado: propósito/contexto, seal digest/bytes, archivos/bytes totales, authenticated:true cuando de verdad comprobado, innerInventoryVerified:true cuando de verdad comprobado, flags de readiness false. No copiar rutas/filas/facts/bindings/resultados arbitrarios al recibo.

Al abrir: validar límites/formato y contexto exacto; autenticar completamente antes de JSON.parse del paquete interno y antes de crear archivos; validar todos los paths, tipos, base64, conteos y digests antes de restaurar. Fallo de clave, tag, digest, contexto, límites, ruta o estructura no deja archivos parcialmente descifrados ni imprime contenido o errores con inputs. Reconstruir archivos0600/directorios0700 en runner temporal. Probar byte por byte, luego ejecutar el verificador del checkpoint original. La restricción de permisos del runner no es un mecanismo de confidencialidad para artefactos publicados.

## Integración en tres jobs
No ejecutar full9 hasta Root libere tras pruebas de custodia y configuración. Mantener fases/tiempos/aserciones del brief full-lifecycle-task1:8Q+P1/3jobs, originalC0=I0+900000,C1=C0+180000, productor dispone y espera C0−120000, recuperación nueva lista≤C0−30000, alarma original. El cifrado no rearma/adelanta/alarga nada. Si resta poco margen, falla como preparación y no reintenta automáticamente.

Productor: checkpoint original permanece sólo en runner.temp; sellar íntegro a staging separado, autenticar roundtrip local y verificar inventario interior antes de publicar. upload-artifact recibe exclusivamente staging público allowlisted (sobre, recibo y manifiesto exterior). Descargar el MISMO artifact-id/run/attempt según política existente de máximo3intentos y verificar digest/inventario exterior; descifrar copia de readback y pasar verifyCheckpoint original; no publicar plaintext ni logs del CLI que contengan payload. Mantener original como única autoridad de reloj.

Consumidor: sólo sobre del MISMO artifact-id; verificar inventario exterior; descifrar/autenticar en runner.temp nuevo y pasar verifyCheckpoint antes de cold recovery. Correr P1 sin alterar aserciones. Su resultado completo (incluye filas/facts) se sella por separado kind=positive-result, con roundtrip/inventario antes y después del upload/readback. El recibo público sólo reporta conteo TAP/status, mismo lineaje mediante hashes/épocas públicas ya permitidas y validaciones cerradas; no publicar el JSON nativo ni dumps de bases. Manejar también fallos de test: preservar evidencia cifrada y un resumen saneado sin transformar rojo en verde.

No usar globs de workspace/output que puedan incluir plaintext ni upload de carpetas padre. Siempre detener antes de upload si falta sellado/roundtrip/allowlist. Nada de continue-on-error que permita P1 o upload después de fallo de custodia. La limpieza final sólo afecta carpetas propias de runner temporal y no destruye la única evidencia antes de preservarla.

## Pruebas y aceptación
Gate secreto-free separado antes del full9; no repetir faseA/old56 por este arreglo:
- roundtrip binario/Unicode/múltiplesarchivos byte-exact con una marca bearer SYN que no aparece en ningún sobre/recibo/manifiesto público;
- ciphertext/tag/IV alterados, clave incorrecta o ausente, contexto source/run/attempt/kind distinto: rechazo sin destino/archivos parciales ni contenido en error;
- inventario interno manipulado con clave legítima (digest/ruta/duplicado/path traversal/symlink/especial/límites) rechazado antes de escribir; fixture SYN adversarial explícito, sin leer datos reales;
- destino existente no sobreescrito; staging público contiene únicamente nombres allowlisted;
- mismo flujo en procesos Node diferentes, productor sale y consumidor restaura bytes originales, sin secreto en argumentos/logs;
- comprobar graph closure/los cinco blobs observador/descriptor inmutables; el helper permanece Node-only.
Documentar RED causal de custodia con fixture sintético, luego GREEN. No añadir contadores de custodia al resultado9 ni inventar P1 verde. El full9 será posterior y de fuente exacta comprobada, no suma de runs.

## Cierre y riesgos
Root emitirá brief de implementación acotado y corregirá el plan/ledger del mismo Task1. Es una ampliación necesaria de custodia, no Task2 ni plataforma nueva. Después del full9, revisión fresca de Spec+Quality sobre GLOBALBASE29681cae..HEAD incluye los módulos de custodia. Evidencia cifrada requiere su clave para inspección posterior; un recibo sólo acredita lo que verificó. No prometer invulnerabilidad ni PCoff desde esta unidad. Si se descubre un nuevo canal que imprime material privado, STOP, preservar referencias saneadas y corregir antes de repetir un ciclo real.
