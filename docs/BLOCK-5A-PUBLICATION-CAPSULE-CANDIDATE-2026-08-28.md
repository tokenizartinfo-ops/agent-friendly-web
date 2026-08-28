# Block 5A - Publication Capsule Candidate

**Fecha:** 2026-08-28

**Estado:** release candidate local con gate D1 aislado aprobado; no desplegado

**Modo:** `manual_handoff`

## Resultado

Agent Friendly Web puede preparar una version inmutable de los archivos de descubrimiento que un owner quiere entregar a su mantenedor. La capsula muestra contenido, destino, operacion propuesta y hash SHA-256; vence a los siete dias y no contiene credenciales.

El flujo privado permite:

- generar `llms.txt` y `llms-full.txt` desde un expediente con dominio verificado;
- preparar integraciones manuales para `robots.txt`, `sitemap.xml` y JSON-LD;
- rechazar recursos que requeririan herramientas inexistentes;
- revisar cada archivo y descargar el paquete JSON;
- registrar aprobacion o rechazo del owner;
- exigir una decision separada del mantenedor cuando es otra persona;
- auditar solo metadata, IDs, estado y hashes.

## Fronteras

Este candidato no modifica el sitio, no llama al CMS, no abre un Draft PR, no despliega, no usa secretos y no ejecuta A2A. Tampoco compara todavia el texto generado contra el archivo vigente del origen. `robots.txt`, `sitemap.xml` y JSON-LD se entregan como propuestas de integracion manual para evitar reemplazos destructivos.

## Componentes

- generador y validacion: `lib/publication-capsule.mjs`;
- derivacion de roles: `lib/capsule-access.mjs`;
- tablas D1: `publication_capsules` y `capsule_approvals`;
- migracion aditiva: `drizzle/0002_publication_capsules.sql`;
- API privada: `/api/projects/:projectId/deployment-capsules`;
- decisiones: `/api/projects/:projectId/deployment-capsules/:capsuleId/decisions`;
- revision privada: `/capsula/:projectId` y el expediente del owner;
- contratos publicos candidatos: `/schemas/publication-capsule.v1.json` y `/schemas/capsule-decision.v1.json`.

## Verificacion local

- suite completa: 186 pruebas aprobadas;
- lint: aprobado;
- build: aprobado, con las rutas privadas y APIs incluidas;
- seguridad negativa: identidad obligatoria, dominio vigente, confirmacion explicita, idempotencia, expiracion, allowlist de destinos y rechazo de secretos probables;
- migracion: solo agrega tablas e indices; no contiene `DROP`, `DELETE` ni `TRUNCATE`.
- revision visual: mapa publico aprobado en 1440 x 900 y 390 x 844, sin errores de consola ni superposiciones observadas;
- cierre de identidad: `/capsula/:projectId` redirige al ingreso privado sin una identidad autenticada;
- notas humanas: rechazo adicional de texto con apariencia de credencial antes de persistir una decision.
- D1 aislada: migraciones `0000`, `0001` y `0002` aplicadas en persistencia local de Wrangler, sin `--remote`;
- recorrido autenticado sintetico: owner y mantenedor separados, descarga, aprobacion doble, rechazo, vencimiento e idempotencia aprobados;
- cierre terminal: una version rechazada o aprobada ya no acepta decisiones nuevas; los reintentos identicos siguen siendo idempotentes;
- auditoria local: tres versiones, tres decisiones unicas y cero emails de actores o secretos probables en capsulas, notas y eventos.

## Gate siguiente

Los puntos de revision visual, migracion D1 aislada, dos identidades, descarga, expiracion, rechazo e idempotencia quedaron cumplidos localmente. La evidencia detallada se conserva en `docs/BLOCK-5A-LOCAL-D1-GATE-2026-08-28.md`.

El gate siguiente exige revisar el diff completo y solicitar una aprobacion separada antes de migrar o publicar en una D1 remota. Esa aprobacion no autoriza escritura sobre sitios de clientes.

El Block 5B comienza despues de este gate y agrega diff contra el origen y Draft PR sin merge. Una escritura CMS o canary pertenece al Block 5C y requiere otra aprobacion.
