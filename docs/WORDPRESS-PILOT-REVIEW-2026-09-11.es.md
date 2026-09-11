# Revision del piloto WordPress: entrega asistida

Fecha: 2026-09-11. Estado: consolidado con bloqueo abierto; no aprobado para automatizacion remota.

## Frontera

- PROJECT: Agent Friendly Web.
- REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: disposable_ci; sin clientes ni datos reales.
- ORIGIN: GitHub Actions / loopback de contenedores aislados.
- RESOURCE_TYPE: pruebas, recibos y documentacion del PR #50.
- RESOURCE_ID: run 34606426357; revision 41dd17239f3e9a26ba07ca330dd4847200bebd0d.
- ALLOWED_ACTION: revisar evidencia y consolidar documentacion. Sin deployment.
- ROLLBACK: cambios documentales reversibles mediante Git; ningun cambio productivo.

## Resultado comprobado

[Ejecucion revisada](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/34606426357).

| Entorno | Resultado | Alcance |
| --- | --- | --- |
| WordPress 6.8.3, PHP 8.3.28, Apache/MySQL aislados | Correcto | Crear, actualizar y restaurar dos archivos, comprobar hashes y HTTP, rechazar versiones obsoletas y limpiar contenedores |
| PHP 8.3.6 nativo | Correcto | Contraste HTTP de archivos estaticos; no prueba WordPress |
| Playground CLI 3.1.53, WordPress 6.8.8 | Fallido | Publicacion correcta; despues de eliminar los archivos, sus URLs devuelven 500 en vez de 404 |

En WordPress nativo se verificaron `/llms.txt` y `/llms-full.txt` por GET/HEAD,
MIME y SHA-256. La actualizacion incluye UTF-8 y cambios de saltos de linea;
la restauracion recupera exactamente los hashes anteriores. La portada responde
200 al finalizar, `index.php` conserva su hash y el nombre del sitio no cambia.

La prueba rechaza un hash antiguo antes de actualizar y antes de restaurar.
Eso no prueba concurrencia real ni compare-and-swap atomico. Solo hay un escritor.
Las copias anteriores viven en memoria: no prueban recuperacion tras perder el proceso.

## Hallazgo abierto: Playground

Ambos archivos estan ausentes en el filesystem al terminar, pero las URLs que
antes los servian responden 500. Un archivo nunca creado devuelve 404 y la portada
devuelve 200. El recibo registra errores de lectura en `PHPRequestHandler` de
`@php-wasm/universal`. Esto localiza el fallo en esa ruta del runtime, pero no
demuestra su causa interna. Una cache de rutas obsoleta es una hipotesis, no un hecho.

No aceptar 500 como restauracion correcta, no silenciar el check y no concluir
que todas las versiones de WordPress o todos los hostings se comportan igual.
El contraste nativo usa una version distinta y no aisla por si solo todas las variables.
El PR #50 permanece sin fusionar mientras se resuelva o se revise explicitamente
el alcance de este gate con evidencia adicional.

## Procedimiento reutilizable

Usar solamente [la checklist unica por lote](ASSISTED-DELIVERY-CHECKLIST.es.md).
No crear una checklist por idioma ni repetir el descubrimiento del hosting por archivo.
El paquete inicial contiene dos documentos; robots, sitemap, plugins, APIs y MCP
no se incluyen implicitamente. La entrega asistida puede coordinarse con el proveedor
sin mantener accesos generales permanentes.

La ejecucion nativa registrada duro 37.322 segundos, incluyendo bootstrap; NO es
el tiempo comercial de entrega. Tiempo humano, espera del proveedor y consumo
atribuible de LLM siguen sin medicion completa. No fijar costos usando ese tiempo.

## Proximo gate acotado

Antes de ampliar automatizacion, probar en un entorno descartable:

1. Copia persistente fuera del directorio publico, con manifest y hashes.
2. Interrupcion intencional despues de actualizar el primer archivo del par.
3. Recuperacion desde un proceso nuevo usando esa copia, sin memoria del proceso anterior.
4. Rechazo de restauracion si un tercero cambio un archivo, o si la copia esta corrupta.
5. Recibo unico por archivo: verificado, restaurado o bloqueado; nunca exito global con estado mixto.

Este gate no introduce un conector remoto ni modifica hosting, WordPress productivo,
DNS, Tokenizart, Atelier o el canary AFW. La ampliacion posterior se decide con
evidencia de recuperacion y medicion de intervencion humana, no por cantidad de documentos.

## Avance: recuperacion entre procesos, ensayo local

Implementados `test/delivery-recovery-process.test.mjs` y su worker exclusivo de
pruebas, `test/fixtures/delivery-recovery-worker.mjs`. Seis pruebas locales correctas:

- Interrupcion deliberada despues de actualizar solo el primer archivo; otro
  proceso restaura desde copias persistidas fuera del directorio publico.
- Repetir la recuperacion conserva los bytes originales, sin volver a escribirlos.
- Un cambio ajeno en el segundo archivo bloquea el lote antes de restaurar el primero.
- Una copia corrupta, manifest invalido o archivo ausente tambien bloquean sin escrituras.
- Repetir la preparacion no reemplaza una copia previa.

Las ultimas variantes se ejecutan como casos separados; la repeticion idempotente
esta incluida en el primer caso. Cada proceso tiene memoria independiente y solo
opera en un directorio temporal sintetico marcado. El recibo distingue `restored`,
`already_original`, `blocked` y `partial`; no contiene credenciales.

Comando reproducible: `node --test test/delivery-recovery-process.test.mjs`.

Limites: prueba de protocolo local, NO prueba de un adaptador productivo. Copias
sincronizadas a disco sobreviven al cierre del proceso, pero no se ensaya perdida
de energia, fallo de disco, carrera concurrente, fallo durante la propia restauracion,
CDN ni ACL del hosting. Los permisos POSIX solicitados no prueban ACL de Windows.
El manifest local no es una firma contra alteracion maliciosa coordinada. Una
comparacion seguida de escritura sigue sin ser una operacion atomica.

Siguiente paso concreto: integrar este escenario de interrupcion y copia persistente
en el WordPress descartable existente y comprobar tambien GET/HEAD y hashes tras
recuperar. No sumar mas archivos ni conectores hasta cerrar esa comprobacion.
El fallo previo de Playground permanece abierto y no fue modificado por este ensayo.

## Integracion preparada en WordPress nativo

El script descartable ahora crea copias y manifest en `/tmp` dentro del contenedor,
fuera de `/var/www/html`. Un proceso PHP escribe el primer archivo y termina con
codigo 86 antes de escribir el segundo. Otro proceso PHP lee exclusivamente las
copias y manifest del contenedor para recuperar: los bytes originales en Node
solo sirven de oraculo de verificacion, no de entrada a la recuperacion.

Se agregaron pruebas de copia corrupta y cambio ajeno, repeticion sin nuevas
escrituras y verificacion HTTP GET/HEAD con hashes. La workflow exige estos campos
del recibo; no basta con que termine el script. Resultado de ejecucion Linux:
**correcto** en revision `e394dd36c29f4f58a057c921a35338dcdaaedb45`,
[run 34626883131, native_wordpress](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/34626883131/job/103354017826).
Diez pruebas focalizadas y 420 pruebas locales completas correctas. La
[CI de esa revision](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/34626883176)
tambien completo tests, lint y build correctamente.

Recibo revisado: `status=passed`, `interruptionExit=86`,
`interruptedRecovery.status=verified_previous_bytes`, `corruptBackupRejected=true`,
`thirdPartyRejected=true`, `repeatWrites=0`, `homepage=200`, `cleanupVerified=true`.
El primer archivo quedo `restored`; el segundo, `already_original`.

| Ruta | SHA-256 anterior y restaurado | GET / HEAD despues |
| --- | --- | --- |
| /llms.txt | c4e27d4e920e3e93b9147e8e0cb6c1ce06d40dc5182cd88960f93935dd9ca17f | 200 / 200 |
| /llms-full.txt | 598455e9f82774128ac1ddc04f2f699022ad48ae58c07789b0812cb4b4c57d78 | 200 / 200 |

Tiempo de ejecucion nativa: 38.687 segundos; incluye entorno sintetico, no es una
estimacion comercial ni costo de cliente. Los artefactos CI retienen siete dias;
esta nota conserva el resultado y hashes relevantes mas alla de esa retencion.

El job Playground de la misma ejecucion sigue fallido. No se fusiona el PR ni se
declara validacion global completa por el exito independiente de WordPress nativo.

La interrupcion ensayada es salida del proceso, no reinicio del contenedor ni corte
de energia. Las copias desaparecen al destruir el contenedor descartable. Esto no
certifica backups del hosting real ni un servicio de recuperacion para clientes.

## Decision de avance

La recuperacion entre procesos y su verificacion HTTP ya estan comprobadas en el
entorno nativo delimitado. No repetir ni ampliar ese trabajo por cada idioma.
Antes de un cliente real: cerrar la discrepancia de Playground con una reproduccion
minima o una decision explicita sobre su alcance, revisar el PR y ensayar una entrega
asistida completa con la checklist y un recibo unico. Medir tiempo humano, esperas
y excepciones; no construir conectores nuevos ni prometer automatizacion universal.

## Diagnostico adicional: numero de workers de Playground

Revision `092ff9fe5c04ca4c36d723178b6bd8cdd3da8712`;
[ejecucion 34628001403](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/34628001403).
Se comparo el mismo script, WordPress 6.8.8 y CLI 3.1.53, cambiando solo la
opcion de workers. No se relajaron los asserts ni se convirtio el 500 en exito.

| Variante Linux | Workers observados | GET despues de borrar ambos archivos | Portada | Resultado |
| --- | --- | --- | --- | --- |
| Playground predeterminado | 3 | 500 / 500 | 200 | Fallido |
| Playground `--single-worker` | 1 | 404 / 404 | 200 | Correcto |
| WordPress nativo con recuperacion persistente | No aplica | 404 / 404 | 200 | Correcto |
| PHP nativo de contraste | No aplica | 404 / 404 | 200 | Correcto |

Ambos recibos Playground confirman archivos ausentes y servidor cerrado. El archivo
nunca creado devuelve 404 en ambas variantes. El contraste de un worker tambien
paso localmente en Windows; el predeterminado reprodujo un 500 en uno de los archivos.

El codigo instalado de CLI crea varios workers y expone `playground` mediante
`createObjectPoolProxy`; cada llamada toma una instancia disponible y la devuelve
al pool. El manejador HTTP de `@php-wasm/universal` comprueba `isFile` antes de
`readFileAsBuffer`, donde ocurre el error de archivo ausente. CLI crea mounts
temporales propios aunque no se proporcionen mounts del usuario.

Conclusion delimitada: el fallo observado depende del modo multiproceso en este
ensayo. Es compatible con metadata de filesystem desincronizada entre workers;
no se ha identificado ni parcheado la linea interna que causa esa desincronizacion.
No atribuirlo a WordPress productivo, al idioma del sitio ni a los documentos AFW.

Reproduccion (runtime de CLI 3.1.53 instalado por separado):

```sh
node scripts/Test-WordPressDisposableHttp.mjs <directorio-paquete-cli>
node scripts/Test-WordPressDisposableHttp.mjs <directorio-paquete-cli> --single-worker
```

Son instalaciones nuevas y sinteticas, nunca un hosting de cliente. El job
`playground_single_worker` es independiente; el job original `rehearsal` sigue
fallando y sigue imponiendo su resultado. El PR no esta fusionado.

Recomendacion para revision: usar WordPress nativo como referencia del piloto de
entrega asistida y Playground con un worker para ensayos secuenciales; mantener
el multiproceso como incidencia de compatibilidad explicitamente separada. No
invertir el piloto comercial en reescribir un runtime externo. Cambiar la matriz
de gates requiere una decision visible de revision, no ocultar el fallo mediante
`continue-on-error` global. El proximo bloque es esa revision de alcance y un
recibo de entrega medible, no mas capas documentales ni nuevos conectores.

## Decision aplicada tras continuar la revision

Se adopta el alcance recomendado: WordPress nativo y Playground con un worker
son referencias admitidas para el piloto asistido. Los tres jobs admitidos
(incluido PHP de contraste) siguen ejecutandose en cada PR relevante y fallan
si sus comprobaciones fallan. La CI general conserva tests, lint y build.

El job `rehearsal` se identifica como `Experimental multiprocess compatibility
(manual)` y se ejecuta solo por `workflow_dispatch`. Conserva todos sus asserts,
su recibo y su salida fallida: NO esta arreglado, NO esta admitido y no se ha
convertido un 500 en un resultado valido. Las ejecuciones previas fallidas siguen
enlazadas arriba. El diagnostico se reabre antes de admitir multiples workers,
al cambiar el runtime o cuando una incidencia nueva lo requiera. No se modifican
reglas de proteccion de ramas ni se fusiona automaticamente el PR.

Esta es una reduccion explicita del alcance soportado, no una correccion del
runtime externo. No se transfiere esta limitacion ni trabajo innecesario al hosting
del cliente. La checklist unica incorpora unidad por lote, tres contactos humanos
y medicion de trabajo/espera. Conservar el resultado tecnico separado de cualquier
declaracion de entrega comercial real: aun no se ha realizado un piloto de cliente
medido con este procedimiento.

## Ensayo conectado de capsula, entrega y recibo

`scripts/Rehearse-AssistedDelivery.mjs` conecta `buildPublicationCapsule` y
`capsuleState` existentes con el worker sintetico de recuperacion. No agrega una
nueva API de producto. Los documentos generados son los bytes que se usan en
la actualizacion local; no se sustituyen por placeholders. Tres idiomas declarados
mantienen un solo lote de dos archivos, sin simular traducciones que no se generaron.

Ejecucion observada: 2026-09-11T17:42:17.004Z, restaurante ficticio bajo `.example`,
sin consultas de red. Estado final `restored`; primer archivo restaurado y segundo
sin modificar. Hashes finales iguales a los originales; limpieza verificada.

| Actividad medida automaticamente | Milisegundos observados |
| --- | --- |
| Generacion de capsula | 11.218 |
| Evaluacion de aprobaciones simuladas | 0.316 |
| Preparacion del entorno temporal | 19.534 |
| Publicacion parcial y comprobacion | 252.813 |
| Recuperacion y comprobacion | 249.570 |
| Limpieza | 11.012 |
| Total, incluido overhead | 547.393 |

Tiempo humano, espera del proveedor y costo LLM: `null`. Esto NO significa que
una entrega comercial cueste cero o tarde medio segundo. No se midieron relevamiento,
redaccion humana, coordinacion, acceso al hosting, carga por panel, CDN ni aprobacion
real. No se prueban formularios, audio, correo, identidad ni HTTP en este comando.
Las pruebas WordPress/HTTP anteriores son evidencia separada, no una propiedad
heredada automaticamente por esta ejecucion local.

Los otros escenarios ensayan proveedor pendiente y ventana vencida. Ambos bloquean
antes de crear el entorno de publicacion; no convierten una capsula preparada en
permiso de escritura. Los tres escenarios estan cubiertos por tests y los seis
tests de recuperacion anteriores siguen pasando con archivos aprobados externos.

Siguiente uso: revisar el recibo con un operador y registrar manualmente en la
misma checklist las actividades humanas de una entrega asistida autorizada. No
ampliar la automatizacion para rellenar metricas todavia desconocidas.

## Cierre local de consolidacion y paso a entrega asistida

La checklist unica ya incorpora una hoja por lote para medir trabajo humano,
esperas, ejecucion y costos conocidos. No se agrega otro conector, API, formulario
ni entrega por idioma. El preflight real Tokenizart termino sin escrituras porque
las copias locales revisadas coinciden con lo publicado; su recibo vive en
`TOKENIZART-ASSISTED-DELIVERY-PREFLIGHT-2026-09-11.es.md`. No contar ese resultado
como una publicacion nueva ni como un piloto comercial de instalacion completado.

Verificacion local de esta consolidacion: `npm test`, 424 pruebas correctas;
`npm run lint`, cero errores y una advertencia preexistente de `no-img-element`
en `app/components/comic-home-intro.tsx:36`; `npm run build`, completo.
No se repitieron aqui las pruebas Docker/HTTP remotas: su evidencia y alcance
son los registrados arriba. No se fusiono el PR ni se desplego una nueva version.

La preparacion local queda consolidada para revision. El siguiente gate no es
otro simulador: seleccionar una necesidad real y acotada, completar preflight,
confirmar contenido y recuperacion, coordinar una ventana y medir una entrega
asistida con el mismo recibo. La identidad, los permisos y la recuperacion de ese
hosting siguen pendientes hasta verificarlos para ese caso concreto. Ningun
resultado de este ensayo los sustituye. Si no existe un delta necesario, cerrar
sin cambios y avanzar con otro caso; no crear trabajo para completar el gate.
