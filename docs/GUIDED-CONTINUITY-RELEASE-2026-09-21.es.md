# AFW: continuidad guiada del expediente

## Resultado y cuatro bloques cerrados

Publicado el 2026-09-21 a las 15:20:46 UTC. El asistente acompaña al usuario con datos reales del expediente, explicaciones ES/EN/PT y acciones explícitas.

1. Progreso: distingue los seis datos básicos incorporados, los confirmados por el servidor, cambios sin guardar y decisiones pendientes. Completar las preguntas básicas no presenta el expediente como terminado.
2. Recuperación: explica lectura fallida, sesión, conflicto, guardado, reintento y dirección inválida. Una lectura inicial fallida permite reintentar y mantiene el formulario deshabilitado hasta recuperar la referencia; los errores de guardado conservan el borrador.
3. Continuación: orienta hacia decisiones restantes, verificación vigente y cápsula, enfocando la sección correspondiente. La orientación no ejecuta verificaciones, guardados ni publicaciones. Considera el vencimiento real de la verificación.
4. Reconciliación completa: permite revisar cambios manuales de todos los campos del expediente. Exige elección explícita para cambios concurrentes y declaraciones sensibles de control, permisos o responsables. Confirmar la revisión actualiza el borrador; guardar sigue siendo una acción separada. El asistente conserva su lista restringida de campos editables.

No se completan hechos desconocidos ni se convierten declaraciones del formulario en permisos operativos.

## Procedencia y publicación

- PROJECT: Agent Friendly Web.
- REPOSITORY: tokenizartinfo-ops/agent-friendly-web.
- ENVIRONMENT: afw_public_prod.
- ORIGIN: https://agentfriendlyweb.dev.
- RESOURCE_TYPE: Cloudflare Worker versions/deployments/assets.
- RESOURCE_ID: agent-friendly-web-web-production; cuenta 85d0d5dadac3341a564f22ce885e9eec.
- ALLOWED_ACTION: continuar todos los bloques AFW que no necesitan intervención, según autorización del usuario en esta tarea.
- Versión activa al 100%: `49dce5f2-c026-47b7-9493-b1782468f8f7`.
- Deployment: `b4a1d725-ebcc-4a61-ac92-d718bf2930d0`.
- Asociación candidata al 0%: `f7182a29-774c-45fe-9488-22c053c2e051`.
- ROLLBACK: activar al 100% `481b1e62-5673-476f-ae58-a093671d801d`; no restaurar D1.

Worktree: `C:/Users/gabri/OneDrive/Documentos/Agent Friendly Web Worktrees/wordpress-pilot-review`.
Fuente publicada: `output/guided-continuity-2026-09-21/source`.
Manifiesto: `docs/releases/guided-continuity-2026-09-21.bundle.json`: 564 archivos, 8 añadidos y 5 modificados respecto de la base de 556 archivos. Todos los SHA-256 fueron verificados antes de subir. Su estado `local_candidate_not_deployed` describe la captura previa; este recibo acredita la promoción posterior.

Se preservaron diferencias ajenas del worktree. En la copia de coordinación se conservaron la ausencia previa de ProjectCreate y la lectura inicial sin selección por query; la versión publicada procede exclusivamente de la fuente congelada. Respaldo del componente previo en `output/guided-continuity-2026-09-21/workspace-intake-before.tsx`.
No hubo commit, push ni merge. No se modificaron API, esquemas D1, Access, DNS ni permisos. Bindings y runtime coincidieron con la versión anterior. Tokenizart y Atelier quedaron fuera del alcance.

## Validación y límites de la evidencia

- `npm test`: 483/483 aprobadas; incluye progreso, recuperación, vencimiento, comparación de borrador y reconciliación completa.
- TypeScript sin errores. ESLint sin errores, con un aviso preexistente de img. Build de producción y upload dry-run correctos.
- `browser-qa.json`: 7 casos, ES/EN/PT en escritorio y móvil más fallo inicial de lectura. Cubren progreso, foco, dirección inválida, fallo de guardado, respuesta perdida, sesión, cambios concurrentes, elección de campos sensibles y cambio remoto de sitio.
- `scope-browser-qa.json` y `coach-browser-qa.json`: 12 casos de regresión del alcance y preguntas guiadas. Total: 19 casos de navegador aprobados, sin errores de página, desbordamiento ni escrituras de negocio por red.
- Inspección visual de capturas ES en 1440 y 390 píxeles.
- Revisión independiente de código: se corrigió la referencia de sitio guardado al reconciliar. Segunda revisión sin hallazgos accionables. También se rechazaron hosts codificados inválidos detectados en Chromium y se añadió actualización al vencer la verificación.
- `candidate-edge.json`, `candidate-private-edge.json`: 16 comprobaciones aprobadas antes de promoción.
- `production-edge.json`, `production-private-edge.json`: 16 comprobaciones aprobadas después de promoción. Discovery conserva bytes/checksums; rutas privadas redirigen a Access; ensayos internos permanecen en 404.

Los archivos de evidencia están en `output/guided-continuity-2026-09-21`. La interfaz autenticada se probó localmente con datos sintéticos y transporte simulado. Las comprobaciones de producción fueron lecturas de disponibilidad y protección; no se modificaron expedientes reales.

## Cierre de los bloques autónomos revisados

Este bloque resuelve el siguiente paso de `SCOPE-GUIDED-COACH-RELEASE-2026-09-21.es.md` y el pendiente de reconciliación manual de `REDUCED-PILOT-CLOSURE-2026-09-14.es.md`. No se identificaron otros bloques obligatorios ejecutables sin nuevas entradas dentro del plan revisado.

Lo que queda requiere hechos o autorizaciones de un caso real:

- Piloto asistido: necesidad concreta, identidad y sitio del cliente, contenido, mecanismo de publicación, reversión y ventana autorizada. Referencias: `WORDPRESS-PILOT-REVIEW-2026-09-11.es.md` y `ASSISTED-DELIVERY-CHECKLIST.es.md`.
- Caso Atelier: incorporar un recibo saneado cuando lo entregue su tarea responsable; no duplicar operaciones desde AFW. Referencia: `ASSISTED-DELIVERY-PREFLIGHT-2026-09-20.es.md`.
- A2A remoto: proveedor real, identidad, alcance, auditoría, cancelación y autorización específica de primera escritura. Referencia: `A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md`.
- Enlace CRM y dos comprobaciones remotas continúan excluidos según el alcance previo documentado en `REDUCED-PILOT-RELEASE-2026-09-14.es.md`; la instrucción general de continuar no los reactiva.

Esto cierra los bloques autónomos identificados, no declara terminado todo AFW ni acredita estados históricos como runtime vigente.
