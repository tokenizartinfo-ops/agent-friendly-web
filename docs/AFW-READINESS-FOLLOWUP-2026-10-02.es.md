# Seguimiento externo y límites A2A — 2026-10-02

Proyecto AFW; repositorio tokenizartinfo-ops/agent-friendly-web. Lecturas sobre producción https://agentfriendlyweb.dev, proveedor https://isitagentready.com/mcp y zona Cloudflare 4b1a3fe4b6dcb81e9d6a633174c5939f. Acciones remotas GET/scan_site solamente; sin mutación ni rollback aplicable. Código preparado en rama feat/afw-a2a-diagnostic-core-20261002, PR174; no desplegado.

## Medición nueva

Sin enabledChecks ni exclusiones manuales. La API devuelve niveles, no puntuación numérica.

| Perfil | Nivel | PASS | FAIL | UTC |
| --- | --- | --- | --- | --- |
| all | 4/5 | 11 | 5 | 19:22:54 |
| content | 5/5 | 6 | 1 | 19:23:02 |
| apiApp | 4/5 | 11 | 5 | 19:23:09 |

Los fallos siguen siendo dnsAid, oauthDiscovery, oauthProtectedResource, authMd y a2aAgentCard. Sin mejora observada respecto de la medición anterior. 73/100 sigue como declaración histórica del owner. El perfil content no mide los servicios OAuth/A2A ni acredita AF5 transaccional.

Respuestas locales exactas: output/external-audit-20261002-followup/{all,content,apiApp}.json. SHA256 respectivamente:
- 81b7dc08f9fdb23758981c9518bf70addb203c14df58a8edf234d044f5980b88
- b825e167040632c09eb3f9b0b9b3c9c9f524b2f801beb267f97ac04519476327
- 6abb44c1b856e8532690e2ac774f16b306b221ea1a403ad4624a6d4cecc6c23b

Repetición: `node scripts/audit-external-readiness.mjs`. Mantiene URL/perfiles comparables y guarda respuesta completa, fecha, resumen y hash en output ignorado. Falla explícitamente si cambia el formato del proveedor o devuelve un error.

## DNSSEC

API Cloudflare HTTP200: pending, flags257, algoritmo13. Google DNS a las19:24:58UTC: DS Status0, sin Answer, ADtrue sobre ausencia autenticada. El auditor encuentra registros DNS-AID pero no valida su firma. Pendiente delegación DS; no resolver agregando archivos ni reiniciando DNSSEC. Próximo: seguimiento Registrar/soporte con el borrador existente. Cierre: DS presente, SVCB autenticado y dnsAid PASS.

## Incremento A2A local

lib/public-a2a-rate-limit.mjs prepara el adaptador de Rate Limiting Workers. Clave fija elegida por servidor, binding dedicado, respuesta success estrictamente true, espera máxima predeterminada1000ms, rechazo ante ausencia/error/timeout. No usa IP ni cabeceras reenviadas. No reutilizar namespace COPILOT_RATE_LIMIT.

Cloudflare documenta límites por ubicación y consistencia eventual: este mecanismo NO constituye presupuesto global estricto ni concurrencia global. Véase https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/ . Una operación de binding que supere el timeout puede terminar posteriormente, pero no inicia el diagnóstico ni reabre la admisión.

705/705 pruebas completas pasan; 14 pruebas A2A, incluyendo 3 del nuevo adaptador. ESLint acotado y sintaxis del script comprobados. Sin ruta, binding remoto ni Agent Card publicados. Próximos requisitos: cancelación con plazo total del diagnóstico, binding dedicado, canary cerrado, prueba independiente y luego descriptor público alineado con servicio operativo. OAuth conserva piloto de lectura y revocación existentes; auth.md requiere registro/claim real, no un documento ficticio para sumar puntos.

## Gerente cloud

Owner declara notificación16:00 con PC/Codex encendidos desde15:32. No acredita ejecución durante apagado14:59–15:32. Conservar esta declaración separada; obtener recibo de ejecución con herramientas antes de aceptar la prueba.
