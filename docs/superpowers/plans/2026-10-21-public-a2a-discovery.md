# Corrección pública de descubrimiento A2A —21oct2026

Proyecto AFW; repo tokenizartinfo-ops/agent-friendly-web. Corrección de una contradicción observada, sin nueva capacidad ni permiso. Owner autoriza avances y correcciones ordinarias; no modifica datos de clientes ni el sistema privado.

## Evidencia y resultado

GET del21oct22:01:58.597UTC al Agent Card del apex devolvió200 y el diagnóstico público JSONRPC1.0 sin streaming/push. API22:02:49.450UTC confirma agent-friendly-web-a2a versión3238969a a100%, ambos flagsA2A true. El manifiesto público aún dice planned y el catálogo no enlaza la tarjeta. Recibo de aceptación de servicio: docs/AFW-A2A-PUBLIC-RELEASE-2026-10-02.es.md; no se repite SendMessage ni se atribuye una aceptación nueva al GET de tarjeta.

Cierre esperado: manifiesto y catálogo anuncian SOLO ese diagnóstico público de lectura, con observaciones fechadas y límites expresos. Conservan el catálogo MCP/CLI, políticas y observaciones externas históricas. No OAuth, expedientes privados, escritura, pagos, delegación asíncrona, score nuevo o PCoff.

## Secuencia

1. Regresiones de contrato antes del cambio: estado/alcance/fechas del manifiesto y GET real del route de catálogo. RED debe fallar por la contradicción, no por transporte o imports.
2. Cambiar únicamente a2a/updated_at del manifiesto y agregar un item a la tarjeta ya observada en el catálogo. Pruebas y build en Actions; no dependencias o compilación local.
3. Revisión independiente del diff exacto, CI/merge con lease, readback de main. Preservar instrucciones y fuentes ajenas.
4. Preparar candidata mínima desde la fuente pública activa61e03107, sin publicar el main privado. Verificar artefacto exacto,10bindings/config/assets/recuperación de9d4b1396 activos de nuevo antes de toda mutación.
5. Publicación solo con alcance/custodia vigentes, rollback material recuperable y postcheck de hashes/manifest/catalog/Access. Si falta transporte/custodia, conservar candidata revisada y señalar el gate real; no inventar rollout.

Base main392d3a27; baseline web leído22:02:48.710UTC: versión9d4b1396-df9d-461d-adc5-a116ad2b005b, deployment4065eed7-e52d-478a-9308-f6e1ed9e9e21,10bindings. Fuente congelada pública61e03107b0532de5591255180fc3916dbbaea0c8. No confundir con A2A3238969a, preparación74d94d12 ni source de main.

Reversión: fuente por revisión nueva preservando trabajo posterior; runtime solo a la versión/material efectivamente conservados, sin revertir datos. No mutar A2A, Access, schema, DNS, tokens o casos de soporte por esta corrección.
