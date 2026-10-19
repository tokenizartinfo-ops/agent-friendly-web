# AFW: contratos internos para consumo agéntico

Fecha:19 de octubre de2026. Proyecto:AFW. Repositorio:`tokenizartinfo-ops/agent-friendly-web`. [PR493](https://github.com/tokenizartinfo-ops/agent-friendly-web/pull/493).
Alcance: biblioteca interna pura, sin montaje por web/API/MCP/A2A. Fuente revisada:`00961b24333de8cb3c8543f4f4233cb4a55bdf19`. La fusión y las comprobaciones del commit portador se consultan en la PR; este documento no las anticipa.

## Resultado

- `describeAgentCatalog(input,{now})` valida metadatos de capacidades y separa disponibilidad de precio. Fuente sola nunca se convierte en capacidad desplegada. Una declaración `verified_runtime` sin evidencia vigente, de la misma versión y no futura se degrada a `temporarily_unavailable`.
- `previewAgentQuote(request,{catalog,policy,now})` calcula una previsualización desde una política interna aprobada y vigente. Suma importes enteros con `BigInt`, rechaza desbordes y exceso de presupuesto, conserva moneda/exponente, versiones y plazo mínimo de evidencia/política. Sin precio devuelve total nulo; cero requiere `explicitly_free`. Las modalidades agéntica, acompañada e híbrida seleccionan líneas de política distintas.
- `projectAgentNextStep(view,context,{now})` proyecta una acción breve, motivo, un dato faltante y referencias opacas desde una vista ya autorizada por el host. Rechaza otro proyecto, revisión incompatible, revocación y vencimiento. No devuelve respuestas completas, principal ni permiso.

Todas las respuestas mantienen `executionAllowed=false`, `chargeAllowed=false` y `publicationAllowed=false`. Un hash determinista describe el alcance; no es una autorización, reserva, aceptación durable, clave de cargo ni garantía de deduplicación persistente.

## Límites y responsabilidad del host

Validación por descriptores de datos:32 entradas,64 líneas,5 referencias; listas densas, claves conocidas, sin getters ordinarios. Se rechaza longitud excesiva de lista antes de enumerarla y exceso de claves de registro antes de obtener descriptores de valores. No es un sandbox de proxies hostiles ni un límite de bytes de transporte: un adaptador futuro deberá limitar el cuerpo antes de analizarlo.

Reloj explícito en milisegundos enteros seguros dentro de0..8640000000000000; fechas UTC ISO canónicas con milisegundos. Cantidades1..1000000, identificadores hasta128 caracteres y operaciones hasta96. Moneda de tres letras y exponente0..4 son validación sintáctica de política, no una oferta comercial de monedas admitidas.

El host deberá autenticar identidad/proyecto, comprobar autorización vigente, procedencia de la política y observación real del despliegue, y volver a validar en cada operación. Un campo `authorized=true` o `status=approved` aportado por un cliente externo jamás sustituye esas comprobaciones. Estas funciones no reciben solicitudes públicas directamente.

## Evidencia cloud

- RED inicial: commit`b3ad2af38e3ba805e2b483b4f697ed5d7b67a73d`, [CI39260813969](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39260813969):26 fallos nuevos de comportamiento,2037 aprobadas y1 omitida; sin fallos fuera del bloque.
- GREEN inicial: commit`8b1471283d5490db20deae709f4e30e508040cc7`, [CI39261625832](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39261625832):2063 aprobadas,0 fallos,1 omitida; lint sin errores y build correcto.
- Revisión independiente detectó P2: reservar descriptores antes de rechazar tamaño. RED específico`cc970b2112de87769011f99439d41d7ef7eee48a`, [CI39262296870](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39262296870):solo esas2 regresiones fallaron,2063 aprobadas y1 omitida.
- GREEN corregido: `00961b24333de8cb3c8543f4f4233cb4a55bdf19`, [CI39262836791](https://github.com/tokenizartinfo-ops/agent-friendly-web/actions/runs/39262836791):2065 aprobadas,0 fallos,1 omitida; lint sin errores (dos advertencias en archivos ajenos al bloque) y build correcto..
- Revisión posterior del mismo revisor sobre ese commit confirmó P2 resuelto y ningún hallazgo nuevo. Fue lectura de fuente por GitHub; no aceptación del runtime. Las pruebas de comportamiento nuevas suman28.

Fixtures de identidad, precios y referencias son sintéticos. Las pruebas comprueban forma, vigencia, matemáticas y cierre; no despliegue, confianza del host, ahorro real, demanda, pago, instalación, suscripción o PC-off.

## Operación y continuidad

Edición por API GitHub y ejecución mediante Actions existente en Ubuntu24.04/Node22. Sin nuevos paquetes, workflows, secretos, clones, builds, descargas ni artefactos locales. La preferencia cloud sigue vigente aunque haya más disco; la recuperación adicional de espacio la realizó Gabriel.

No se han cambiado entrypoints, rutas, configuración Cloudflare, esquemas, datos de clientes o permisos. La producción pública y el canary privado conservan sus constancias históricas: este bloque no las vuelve a acreditar. No se envió la invitación a Max.

Siguiente bloque útil: diseñar un adaptador autorizado de lectura/continuidad que reutilice el expediente real y la lectura delegada, con contrato y pruebas propios por protocolo. Antes de conectarlo deberá resolver identidad/proyecto por servidor y seleccionar datos permitidos. Precios reales, aceptación/pago durable, preparación con escritura, instalación y delegación asíncrona continúan como etapas separadas del [diseño aprobado](superpowers/specs/2026-10-19-afw-agent-consumption-design.md).

El ensayo con ordenador apagado sigue necesitando evidencia técnica nueva del caso Cloudflare02382110 y aceptación de suscripción, entrega útil, retirada y cierre en la cadena propia. No reabrir OAuth, repetir OTP, renovar tokens ni crear guardia por este cambio.

Reversión de fuente: revertir únicamente los commits de esta PR mediante otra revisión; preservar main y trabajo posterior. No hay rollback remoto que ejecutar porque esta biblioteca no se desplegó. La rama local anterior puede seguir atrasada deliberadamente: no hacer fetch/build local para comprobar una aceptación cloud ya referenciada.
