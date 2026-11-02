# AFW — continuidad tras la desconexión

Guardado el 2 de noviembre de 2026, 18:36 UTC (15:36 Argentina), por pedido de Gabriel antes de trasladarse. No cerrar pestañas ni iniciar permisos o ensayos. Tener la PC encendida no acredita una prueba con la PC apagada.

## Dónde continuar

Repositorio: tokenizartinfo-ops/agent-friendly-web.
Rama aislada: feat/finite-native-cleanup-20261101.
Plan: docs/superpowers/plans/2026-11-01-finite-private-policy-setup.md.
Ledger: docs/superpowers/progress/2026-11-01-finite-native-confirmation-cleanup.md.

El HEAD anterior a este checkpoint es fbe117a63ae1e55f64c104e274aa90f9df28118d. El commit de este checkpoint se identifica por CAS y lectura posterior; no puede incluir su propio hash.

No hubo merge a main, despliegues, consultas privadas al proveedor, nuevos permisos, credenciales ni ventanas de ensayo en estos bloques. El trabajo y las verificaciones quedaron en GitHub y Actions; no hay archivos locales pendientes de guardar.

## Bloques terminados: no repetir

C2 Tasks 1–4 ya estaban aceptadas. Task5-B1, compilador y recuperación privada del código candidato, fue aceptada por revisión independiente; constancia Root70408e38 e informe task5-b1.

B2 A+B, lector histórico fijo y comprobación de registros D1/legacy, quedó aceptado después de la corrección 1. Código de producción: 5b087d0a3090935327b7aee37bcad175bbac4be4. Tests: f68d360aac8d789024e2a4da1f1bd951bb71c7bb. Documentación: fbe117a63ae1e55f64c104e274aa90f9df28118d.

Root verificó directamente:

- Run41497210626, job125455183793, intento1: 21 pruebas nuevas, 256 relacionadas y 28 del compilador; todas pasaron, lint aprobado y cero artefactos.
- Corrección solo de fixture/workflow: run41500276455, job125465668561, intento1: 22 pruebas aprobadas, cero fallos/cancelaciones/skips, lint aprobado y cero artefactos.

El mismo revisor marcó el hallazgo P2 como ADDRESSED y aprobó la corrección, sin defectos nuevos. La prueba dejaba de funcionar después del vencimiento de la credencial; ahora usa datos sintéticos de custodia y relojes reales. Un caso separado comprueba el vencimiento exacto con un reloj instrumentado, declarado como sintético. La fecha de producción sigue siendo 3 de noviembre a las 02:59 UTC: no se amplió ni renovó ningún permiso.

Informe: docs/superpowers/reports/2026-11-01-finite-private-policy-setup-task5-b2-ab.md.
Revisión: docs/superpowers/reviews/2026-11-01-finite-private-policy-setup-task5-b2-ab.md.

Los problemas de FK, proxy RPC y cierre del fixture ya están explicados y corregidos; no reabrirlos. El candidato midió 1.942.384 bytes, con margen de 154.768 bytes; QA midió 1.761.077 bytes, en la revisión 5b087d0a. No son una garantía para código futuro. El workflow temporal debe EXCLUIRSE de la integración.

Los agentes private_policy_task5, review_private_policy_task5_b2_ab y finite_c3_readonly_preflight terminaron y están detenidos. No hay despliegue, código sin guardar, OTP ni ventana de permiso pendientes.

## Siguiente bloque autónomo

Preparar el puente de procedencia QA ANTES de T0, separado del seed que se crea después de T0. El lector nativo9aa no tiene lectura de código QA; GHA9db dispone de una ruta separada, ya identificada. Evaluar un productor GHA que compruebe el UUID QA real, sus bytes, build M y metadatos, y emita una referencia inmutable por UUID completo. La lectura nativa posterior debe verificar la ejecución y el paso realmente completados, además del puntero actual.

El readFiniteQaPublication existente exige el paquete completo y el seed posterior; no autoriza por sí solo una preparación anterior. Mantener direct qaCodeProvenanceVerified=false y distinguir la evidencia del puente de una lectura directa. No inventar APIs, tokens, identidad del llamador, commits históricos ni permisos.

Primero definir contrato y ruling; después implementar. No ejecutar workflows, crear tags reales ni abrir un ensayo por este checkpoint.

Todavía faltan la inicialización privada una sola vez; selección de realm/proyecto/objetivo/ventana e identidades nuevas; contexto retenido; material, confirmación, GHA y forwarding; montajes y comprobación de todos los escritores. Las identidades nuevas de Save/withdraw/trial requieren un productor aprobado antes de la primera elección y no pueden fingir historia.

No usar el hash histórico19fc como selector de un nuevo draft ni reconstruir políticas desde hashes. El artefacto frozen315/source2a477, el proceso original Q comprobado por manifest+D1 y el candidato M son identidades distintas. B1/B2 producen datos verificables; todavía no constituyen la autoridad del recorrido completo. Los constructores pendientes siguen unavailable y el paquete completo sigue false/throw.

## C3 y receptor: problemas concretos pendientes

Informe duradero: docs/superpowers/reports/2026-11-02-finite-c3-consumer-preflight.md.

- OAuth=false bloquea el SDK/MCP y la retirada del propietario; continuidad tiene su propio gate.
- El host real omite finiteGate. Una suscripción prematura puede registrar una admisión antes de detectar que falta la reserva y bloquear la reserva posterior. Rechazar ANTES de escribir; no usar subscribe como un sondeo inocuo.
- El callback actual necesita el Container después de ARM y de la reserva del nominal, prevista a T0+150–160 s. Falta acreditar la secuencia entre callback, apagado y Save/event.
- El Known workflow inspeccionado confirma activación/reserva; el CLI admission/seed/admit/poll/restore no produce Save. Se necesita un productor separado, autorizado para ese objetivo específico. No esconder escritura en el plugin de lectura.
- events/unsubscribe debe acreditarse mientras el permiso de lectura siga válido. C0 retira avisos y después lectura; eso puede impedir una baja posterior del cliente. Cierre del servidor o solicitud de stop no prueban baja nativa ni terminación física.
- La lectura debe seguir siendo independiente del permiso de avisos. Un permiso de lectura nunca autoriza Save o configuración.

Preservar los 18 hooks, cuatro argumentos, 70s/5s/20s, C0/C1/N1/R1 y primer HEAD. No cambiar tiempos ni repetir el primer HEAD por inferencia.

Root buscó y abrió [OpenAI MCP Events](https://developers.openai.com/plugins/build/mcp-events). Documenta Work web, Work con Cloud y dots; ChatGPT proporciona el callback y su secreto al suscribirse. Esto establece una ruta compatible, no una conexión efectiva de la cuenta/chat/AFW Operations ni una suscripción o turno útil. La ausencia de una herramienta en este chat no demuestra incompatibilidad de la plataforma. No se creó ningún callback, secreto, chat, consumidor, scheduler o monitor.

## Límites de continuidad

Priorizar GitHub/Actions/Cloudflare autorizados; no generar clones, dependencias, builds, temporales o procesos persistentes locales. No repetir custodia, rotaciones, entregas aceptadas o intentos consumidos. No pedir OTP ni abrir permisos hasta tener un paso concreto preparado y al propietario disponible.

Gabriel indicó previamente que volvería a estar disponible a las 16:00 Argentina; el último mensaje pide guardar por una desconexión breve. No cerrar sus pestañas. El FYI de Ops sobre el cron de Atelier no requiere respuesta ni acción AFW y no autoriza mezclar recursos.

operationalReadiness=false; PCoff=false. Quedan composición completa, privacidad histórica/paquete, CI y revisión global, promoción aprobada y la prueba externa real con recepción útil, baja y cierre comprobados. No solicitar apagar la PC todavía. Max permanece sin datos, contacto ni correo. No hay una guardia cloud permanente acreditada.
