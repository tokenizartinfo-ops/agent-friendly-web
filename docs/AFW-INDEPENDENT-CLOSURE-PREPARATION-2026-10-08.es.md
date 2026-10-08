# Preparación del cierre independiente

8 de octubre de 2026. Módulo interno `lib/assistance-independent-closure.mjs`, sin montar rutas, programar alarmas remotas, crear tokens ni desplegar recursos.

## Resultado comprobado
Siete pruebas unitarias y un ensayo nativo workerd/Miniflare pasaron. Se probaron concurrencia, reinicio del coordinador sobre almacenamiento persistido, respuestas perdidas/incorrectas, configuración inmutable y separación del cierre del ledger respecto de la restauración administrativa. En el runtime local, dos alarmas efectivamente invocadas produjeron una sola ejecución de cada capacidad sintética. No se probó reinicio del proceso workerd ni entrega en Cloudflare remoto.

La reserva transaccional se guarda antes de cada efecto; los callbacks quedan fuera de la transacción. Un resultado desconocido conserva `issued` y solicita intervención, sin repetir una escritura. No existe todavía conciliador read-only de un efecto ambiguo ni adaptadores administrativos reales. Una constancia `restored` emitida por una función sintética no demuestra token, política o bindings restaurados en Cloudflare.

La revisión independiente encontró coerción de identificadores por RegExp: arrays/objetos podían validarse y bloquear la segunda lectura. Se reprodujo con prueba roja y corrigió exigiendo strings primitivos. La prueba nativa permanece exclusivamente en `test/`; no hay actor de producción construido por ella.

## Evidencia cloud precedente
La tarea ordinaria `01a11c47-583a-70fb-bd4e-2a3aa46e2002` adoptó fuente `8b9a4c8fadafe427c568cd47cef365aaa2f3a1de` y publicación `cecfgver_6ac7ba5d553881a39528829a28507a87`. Su puente real metadata-only pasó: una observación soportada y salida accepted/exit0. No realizó HTTP operacional.

Un diagnóstico mínimo separado del código AFW reprodujo pérdida de stdout de un subprocess bajo node:test: child exit0, 21 bytes emitidos, parent0. Se conserva como limitación del ensayo cloud; no justifica modificar controles AFW ni acredita toda la suite ordinaria. Recibos locales: `output/afw-ordinary-host-bridge-diagnostic-20261008.md`; recibo remoto `afw-synthetic-stdio-receipt-2026-10-08.json`. Cursor final de esa comprobación `132b9fcd-5e59-4b2f-9552-7851880e950c:18`.

## Siguiente bloque remoto y gates
1. Seleccionar actor independiente alojado y preparar adaptadores de revocación exacta, cierre ledger y restauración/readback administrativo. Evitar sobrescribir cambios legítimos concurrentes; no presumir CAS/ETag que el proveedor no soporte.
2. Comprobar capacidades reales y custodiar credencial administrativa fuera de Operations/cloud runner. La consulta `permission_groups` de cuenta respondió403/9109; no crear tokens por inferencia de acceso. El conector local no demuestra disponibilidad con el PC apagado.
3. Montar solamente QA propia con baseline fresca, presupuesto, identidad, ventana y rollback recuperable; comprobar alarmas y efectos reales. No reabrir revisión10 aceptada ni recopiado de claves.
4. Recorrido integrado propio y prueba PC-off con intervalo declarado; luego preview/aprobación del primer correo de Max y su consentimiento real. No hay invitación ni guardia permanente activadas.

Fuentes de arquitectura: [alarmas de Durable Objects](https://developers.cloudflare.com/durable-objects/api/alarms/), [permisos de Workers](https://developers.cloudflare.com/workers/authorization/workers/), [conexiones MCP de Agents API](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp). La documentación MCP no acredita que AFW Operations tenga un conector Cloudflare administrativo.
