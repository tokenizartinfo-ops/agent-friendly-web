# ARM V2 concreto con quiescencia primaria
31oct2026. Base main0b469cdb; continuación del diseño privado aprobado. Solo fuente/CI hasta la revisión completa; operationalReadiness=false.

## Decisiones
Reutilizar lector de paquetes/assembler, pins681, elegibilidad ARM y ledger existentes. No envolver ni engañar al host legacy. Preparar QA una sola vez en prepared_idle (tres flags de cierre true, otros once false y siete políticas antiguas vacías); UUID nativo/fuente/config/módulo deben ser correlacionados por root ANTES de ARM. El componente no acredita guard vivo ni habilita nominal.

Quiescencia CF explícita: canary2607/operador855 y sus módulos/config/deployments cerrados fijos; QA activo igual al binding nativo del wrapper; cron/tails3Workers vacíos, Container propio vacío, namespaces propios conservados, registro completo de Workflows sin extras QA, otras instancias terminales. Solo se exceptúa la instancia bootstrap exacta afw-qa-arm-H en running/waiting. Su Worker UUID proviene del wrapper real/event.instanceId + env.AFW_QA_VERSION + fuente compilada, NUNCA de instances[].version_id. El inventario no acredita el código QA de3MiB; root conserva esa correlación externa.

Dos observaciones, antes/después del CAS: la primera incluye bytes de los dos módulos externos, la segunda revalida punteros/configuración inmutable y todos los inventarios. Request-budget acotado128 para paginación completa; no prometer <50 ni un SLA5s. Límite total original<=5s: al agotarlo se bloquea; si hubo escritura queda incierto. Ningún POST/provider-effect/GitHub ni token ficticio en esta ruta. No elevar el cap legacy2MiB.

Historia local real: control legacy retirado/vencido y los cuatro journals globales se conservan. Formas/descriptores/hashes/fechas/ref conocidas exactos, contradicción bloquea. Un issued permanece issued; quiescencia ACTUAL externa no prueba ACK ni trabajo histórico. La digestión de esos cinco registros debe permanecer igual en los dos lados de CAS. El ledger sigue comprobando el linaje y generaciones; no reciclar presupuesto global D1.

## Composición ARM
DO fijo afw-own-successor-closure-v1, ctx.storage real, nativepin fijo, contexto frozen315 compilado por builder679. RPC solo(H,deadlineAbsoluto), deadline únicamente estrecha<=5s. Paquete D1 aislada QA_DB; H recalculado de cápsula y commitments/assembler completos. DB sintética original explícita AFW_QA_DOSSIER_DB; no fallback.

checkEligibility combina quiescencia local/CF y elegibilidad primaria cero-reservas antes y después del pendingCAS. Derivar los cinco pins originales por681 dentro del lease padre. Cada operación y tx.put comprueba current y el mismo deadline. Finalarmed es solo metadata: todos los flags de autoridad/liveness/readiness/retry false. ACK perdido no borra registros ni concede reintento.

WorkflowBootstrap acepta únicamente operation=arm_generation/generationPlanHash=H e instanceId exacto, timestamp nativo fija finoriginal+5s; step.do se captura una vez, sin retries. Rechazar resultado cacheado que no ejecutó callback en esta invocación. El deadline hijo se estrecha al mismo absoluto. La sesión nativa y el permiso humano se prepararán después de los gates, no durante builds.

Wrangler QA y rollback declararán coherentemente el binding D1 sintético6a728; esto es fuente, no deploy ni una capability read-only a nivel plataforma: D1 binding técnicamente permite escritura, el código nuevo solo lee y su perímetro es privado.

## Verificación
HTTP positivo/negativos de esquema/inventario/clock/abort y excepción de self separada del helper terminal antiguo. Composición nativa real Workflow+DO+D1 a pending/armed con estado histórico preservado, no Container/nominal/HTTPsaliente genérico; inyectar fallos después del CAS y conservar incertidumbre. Rollback compatible cerrado, fixed315 intacto; full CI/lint/build y revisión de rama completa antes de merge. No nuevo OTP, secreto, permiso, instancia remota, publicación o Max por estas pruebas.


01nov2026 — additive planning reconciliation (source only): see [private material core](2026-11-01-private-generation-material-core.md). Before-ARM ingress is namedBundleHash; generationPlanHash is independently recomputed and remains the ledger key. Current closed preparation still requires all14false/7empty and rejects ALL V2, including a future own pending record. Shared material extraction does not mount ARM or complete old Task2/3. A future prepared_idle host must retain native pin, full primary material rereads and exact ledger pending lineage under the original5s including enqueue. Task1 HTTP does not prove own QA module/profile; v2 closed metadata is not ARM. Trusted draft insertion/current own scope/nominal hydration/per-generation cleanup/finalizer remain missing. Keep frozen315, actual legacy issued/complete uncertainty and all consumed budgets; no runtime, DDL or permission action from this addendum.
