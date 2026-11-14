# AFW: observaciones cerradas de readonly — diseño
Fecha: 2026-11-14. Estado: aceptado por Root bajo la instrucción del owner de ejecución autónoma; NO es autorización para adjuntar Source o ejecutar un ensayo.
Proyecto AFW, repositorio tokenizartinfo-ops/agent-friendly-web(1347578006). Source cerrado410b37018b184f632f661cab05e44887fb6eaf57. main0c9c475b3ebaa970fc11d628b40e50a90cceb727 permanece intacto. Separado de Tokenizart/FCO/Hermes, producción y Max.

## Resultado
Obtener el primer resultado TAP fallido identificable de R1/R2/R3 o del archivo Native, y el guard público relacionado con custody_limit, en UNA prueba nueva enfocada. No corregir aún negocio, ampliar límites ni repetir los ocho jobs activos.
43608448872/1 solo observó fracaso readonly compuesto y custody_limit/custody_20. 43615497152/1 cualificó las correcciones diagnósticas con94familias y revisión limpia; no aceptó16casos de negocio.

## Enfoques y decisión
1. Proyección mínima del PREFIJO TAP hasta el primer not_ok, más guard de custodia separado; reutilizar D y activar solo contracts/readonly/verify del grafo original. Root elige esta opción: evita interpretar detalles privados y los dos preparadores con≈13min de espera.
2. Parsear todos los detalles YAML de TAP: rechazado. Node22.23.4 interpola claves enumerables sin escapar; una clave con LF puede simular otro campo o resultado. La indentación no basta para atribuir stack/code.
3. Reporter Node adicional o cambio del comando Native: descartado por ahora por mayor frontera/alteración de comandos. Leer logs privados en Root u otro ensayo completo idéntico tampoco procede.
Costo de la decisión1: después del primer fallo no conoceremos los resultados posteriores ni el resumen TAP, y no atribuiremos código/sitio desde TAP. Esa menor precisión es explícita; no se convierte en una afirmación de éxito o ausencia de otros errores.

## Fuentes y builder check
Node exacto22.23.4:
- https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/reporter/tap.js
- https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/runner.js
- https://github.com/nodejs/node/blob/v22.23.4/lib/internal/test_runner/test.js
Builder /root/readonly_boundary_builder_check identificó dos puntos materiales, ambos resueltos por Root: ordinal repetido del FileTest tardío y claves multilínea de colecciones. El builder confirmó que la asignación readonly puede sobrevivir al fallo esperado de V. Informe en docs/superpowers/reviews/2026-11-14-readonly-boundary-builder-check.md. Ningún código o ensayo nuevo se ejecutó.

## Cambios mínimos e interfaces
Modificar test/fixtures/finite-budget-stage-observer.mjs; añadir test/finite-budget-readonly-observer.test.mjs. Reutilizar lector fijo seguro y evitar lecturas inconsistentes del mismo log dentro de una observación. El contrato existente collectFixedStagePair y las36pruebas actuales de D se preservan. No modificar P/runtime/World/custody/Native tests/lock ni sus catálogos.

### projectReadonlyTap(text)
Función pura sin filesystem/red. Entrada string: máximo65536UTF8bytes,4096líneas,1024UTF8bytes/línea; LF, sin CR, y fin de línea completo. Cualquier representación no admitida → resultado unknown, sin coerción.
Retorno EXACTO {state,cases,counts}.
state: not_observed|unknown|complete|first_failure.
cases: SIEMPRE cuatro filas en orden R1,R2,R3,native_file. Cada fila EXACTA {id,result,directive}.
result: ok|not_ok|not_observed|unknown.
directive: none|skip|todo.
counts: null o {tests,pass,fail,cancelled,skipped,todo}, enteros0..4.
No nombres libres, mensajes, códigos/sitios de error, path, stack, actual/expected, coordenadas ni duraciones.

Reconocer exclusivamente los nombres:
R1 fixed original SDK readonly budget
R2 fixed original SDK readonly budget
R3 fixed original SDK readonly budget
native_file corresponde solo al archivo público test/mcp-qa-finite-budget-native.test.mjs en sus formas relativas/absolutas aprobadas del runner de este repositorio; nunca se devuelve el path.
Exigir encabezadoTAPversión13 y resultados top-level ordenados, sin duplicar IDs. Solo comentarios/ruido TAP previsto y los bloques de detalles SIN ERROR de resultados ok precedentes pueden recorrerse; esos bloques tienen campos de formato Node comprobados, no un YAML arbitrario. Cualquier estructura inesperada ANTES del primer fallo → unknown, sin rescatar un prefijo ambiguo.
En la primera línea literal top-level «not ok N - nombre» válida, asignar esa fila y detener TODO análisis ANTES de sus detalles. state=first_failure; counts=null; las filas posteriores/no vistas quedan unknown. No buscar cierre de bloque, code/name/stack, resumen o nuevos resultados en el sufijo: se ignora entero. De este modo claves privadas LF no pueden inventar atribuciones posteriores.
Un stream completo sin not_ok puede terminar complete con plan/resumen únicos, coherentes con las filas observadas. Cero casos válido es complete con filas not_observed, no éxito del contrato de negocio que exige3.
Ausencia de native_file significa no observado, NUNCA excluye un error tardío: Node puede suprimir la fila cuando ya falló un caso.
Excepción cerrada de numeración: después de R1/R2/R3 literalok, un único native_file not_ok puede reutilizar ordinal1. Node22.23.4 reserva1 al FileTest y renumera sus hijos; probar con fixture REAL que produzca1,2,3,1 y plan1..4. No habilitar duplicados genéricos. En la proyección detenerse en ese not_ok; el plan4 se comprueba en el fixture de calificación, no en un sufijo inseguro.

### projectCustodyLimit(text,P)
Función pura; mismos límites de texto. Usar solo cabecera/código cerrado y pila de la fuente pública fijada4d05b5ec0f7b074be88ef9733a47c984b0212351, con los controles de conflicto existentes. Retorno EXACTO {state,guard}.
state: not_observed|unknown|observed; guard:null o uno de:
regular_file_size_bounds(101),inventory_files_or_bytes(135),record_bytes(150),header_bytes(173),jsonl_bytes(177),envelope_bytes(179),envelope_input_bounds(188),inspected_inventory(215),expanded_jsonl_bytes(250),inspected_record_bytes(254).
Los números son criterios INTERNOS de la tabla del Source público, nunca valores copiados al resultado. Verificar tabla contra Source antes de implementar. Elegir el primer guard real posterior a fail/requireValue. fail20 solo → unknown/null. Código incompatible, pila ambigua o paths no admitidos → unknown/null. Sin código custody_limit observado → not_observed/null.
Una condición conjunta conserva nombre conjunto: no deducir cuál subcondición falló. Guard genérico de lectura no identifica por sí solo el max ni el archivo; no prometer precisión inexistente. No ampliar la tabla sin resolución Root y calificación.

### collectFixedReadonlyPair({context,job,rawOutcome})
Producción: job readonly exclusivamente, contexto9 vigente, rawOutcome del paso COMPUESTO original. Leer SOLO los cuatro logs fijos actuales del runner, sin override de root/CLI/env. Reutilizar readOwned seguro y observaciones generales, evitando que código nuevo invoque getters o Source de un log.
result EXACTO:
{purpose,context,job,rawOutcome,logs,stage,http,countCheck,tap,custodyLimit,nonclaims}.
purpose=afw.readonly-boundary-observations.syn.v1.
logs/stage/http/countCheck conservan esquema y enums anteriores. tap/custodyLimit como arriba. Siete nonclaimsfalse.
manifest EXACTO {purpose,context,job,files}; purpose=afw.readonly-boundary-observations.manifest.syn.v1; files=[{path:result.json,bytes:actual,sha256:actual}].
Pareja canónica JSON+LF de máximo16384B combinados; sin campos/archivos adicionales. Es un propósito diferente del esquema antiguo.
Missinglog→proyecciónnot_observed; cualquier disponibilidad distinta de available/missing→unknown; available→proyección pura. No convertir la ausencia de datos en un pase.
El nuevo validator recibe expectedcontext/job y verifica enums/esquema/manifest/purpose; el validator viejo no debe aceptar el propósito nuevo ni viceversa. No aumentar autoridad de caller; el lector de pruebas conserva solo su frontera sintética de root/IO explícito.

## Aislamiento
Cloud-first: Source como datos GitDB; pruebas SOLOGitHub Node22.23.4. Cero AFWkeys en el calificador/observador; ausencia NODE_OPTIONS,AFW_SYN_CHECKPOINT_KEY,GH_ARTIFACT_TOKEN. Token estándar de GitHub solo en las lecturas fijas necesarias del candidato/artefacto, nunca en los tests o colector.
Caps actuales: archivo1MiB/read64KiB/línea1024B/4096líneas/pareja16KiB. Mantener padres/realpath/no-symlink/nlink/identidades/O_NONBLOCK/fstatantesderead. Colector sin red/World/SDK/Native/AES.
No cambios en main/runtime/CF/OAuth/cron/Containers/suscripciones/correo/permisos/secretos/clientes. No crear ni renovar claves.
Calificación nueva:36pruebas actuales de D + nuevas pruebas de TAP real/guard/pareja/privacidad + controles reales de A/parser/wrapper/receiver. No repetir45deP, REDhistóricos ni14ZIP aparte de lo inherente al receptor congelado.

## Prueba enfocada, después de calificación y revisión
Base NativeDATA32ca318743b26a8a6d54ef743c9f101609525491. Ocho jobs/needs/timeouts/26slotscrypto/seis entornos declarados idénticos. Solo contracts/readonly/verify activos; otros cinco con guardfalse. Comandos Native, relojes, caps, V y Z no cambian. A/C solo ripples de pins imprescindibles (si los hay); parser/forms congelados. Cambiar únicamente el método de publicación readonly a collectFixedReadonlyPair y los pins D/mensaje/guard exactos necesarios.
El verify original exige siete ramas exitosas y puede fallar por las cinco deshabilitadas; Suite no disponible NO es un pase16. Mantener V, verdad original y proyección final de asignaciones con always. Root acepta SOLO la pareja readonly literal actual; no Suite/pareja vieja/fallback por nombre/historia. Los slots ejecutados serán los ya existentes de los jobs efectivamente activos; no nuevas capacidades.
Preparar objetos inactivos y revisión/gates exactos. Ningún Source attach/run desde este documento. Un nuevo CAS con propósito/revisión exactos requiere liberación Root separada, después de cualificación y revisión. Congelar Source hasta ocho jobs positivamente terminales (incluidosskipped), luego restauración exactaF7/leaves no declarados y appendSAMEreport preservando455837B y todos sus prefijos anteriores. Sin rerun ni overlays.

## Pruebas y cierre
Generar TAP REAL de22.23.4 sin World/SDK/Native/AES: normal3ok; primer fallo en cada R; error del archivo antes de registrar casos; todosok+fallo de archivo tardío con ordinal1repetido; fallo de caso+actividad tardía donde el FileTest puede suprimirse. La fila no observada no prueba ausencia.
Propiedad enumerable con LF que simule code/stack y resultados posteriores dentro de error/actual/expected: primer resultado fallido observado permanece y el sufijo no se analiza ni se copia. Mensajes privados/canarios nunca aparecen en la pareja. Antes del primer fallo, duplicados/orden imposible/bloque malformado/plan inconsistente/truncamiento/límites→unknown.
Cada guard de custodia y códigos incompatibles/frames privados/conflictos/genérico20. Pareja/contexto/manifest/canonicalidad/enums/vocabulario/mezcla de propósitos y límites. Un stubtodoUnknown debe fallar positivos significativos nuevos; no simular aceptación por un stub que no observa nada.
Cierre: una pareja fechada indica primer caso/archivo fallido ounknown y guard/categoría si disponible. Con esos datos formular una hipótesis específica y prueba de causa antes de cambiar negocio/caps. No garantiza causa histórica, recibo autenticado, completePackage, operationalReadiness,PCoff,drenajeglobal o namespacevacío; siete banderasfalse. Aún habrá que resolver el fallo observado, aceptar el recorrido completo y probar aviso/revisión/retirada/autocierre cloud antes de apagar.


## Precisiones de planificación de Root
- Un archivo sintético sin casos puede producir una fila native_file ok: admitirla solo como stream de archivo único sin filasR, plan/resumen correspondientes y fixture Node22.23.4 real. Nunca equivale a ejecutar los tres casos Native.
- Añadir exactamente un guard shell de ausencia NODE_OPTIONS inmediatamente ANTES de Node en cada uno de los ocho bootstraps del candidato, como en el ensayo anterior que exigía inicio controlado. No cambia los seis comandos Native. Es una defensa de startup, no prueba de proceso arbitrariamente comprometido.
- La entrada de producción nueva exige GITHUB_JOB=readonly y Node22.23.4 además del argumento job=readonly y las ausencias de clave/token/opciones. Mantener la frontera sintética de pruebas separada.
- Conservar nombres/directorios/outputs de las publicaciones diagnósticas existentes; el propósito nuevo y el contexto distinguen la pareja readonly. No añadir slots o expresiones al parser de claves.
