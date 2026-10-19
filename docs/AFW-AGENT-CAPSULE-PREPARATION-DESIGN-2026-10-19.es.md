# Preparación delegada de cápsulas: siguiente bloque

19oct2026. Proyecto AFW / tokenizartinfo-ops/agent-friendly-web.
Estado: diseño de fuente para revisión; NO implementa un tool, scope, permiso, endpoint, esquema o despliegue. Integra la etapa3 del diseño de consumo agéntico aprobado, sin alterar su separación entre preparar, aprobar, instalar y verificar.

## Base examinada

Fuente3d4e9d5d20b6185a5d3dcfceae191046e921e1cb:
- app/api/projects/[projectId]/deployment-capsules/route.ts
- lib/publication-capsule.mjs
- lib/delegated-oauth-worker.mjs / lib/delegated-project-read.mjs
- docs/superpowers/specs/2026-10-19-afw-agent-consumption-design.md

La ruta humana actual comprueba Cloudflare Access, roleowner, confirmBuild, clave de idempotencia, sitio y claim de dominio verificados; reutiliza una cápsula para la misma clave/proyecto/usuario. Genera archivos permitidos y guarda cápsula/evento en batch. Requiere revisión owner/maintainer por separado. No lee expectedRevision del cuerpo.
Esto describe la fuente examinada, no una vulnerabilidad explotada ni una nueva aceptación del runtime.

La lectura MCP G2 aceptada19oct200/409/403 no concede escritura. La identidad de Cloudflare Access de la ruta humana y el contexto OAuth de MCP tienen mecanismos distintos; no reenviar cookies, copiar bearer tokens al otro host ni fabricar un usuario humano.

## Resultado del primer incremento propuesto

Preparar UN borrador revisable desde datos ya guardados del expediente autorizado. No aceptar texto libre como fuente de propietario, dominio, recursos autorizados, aprobaciones o precio. No ejecutar análisis remoto, modelo, instalación, commit/PR, DNS, hosting o pago como consecuencia de preparar.

El adaptador MCP futuro tendrá nombre/esquema definitivos solo tras contrato y tests. Ninguno de los identificadores de este documento forma parte del catálogo actual.

## Contrato necesario antes de implementar

1. **Autoridad:** resolver por servidor cliente/subject/proyecto/recurso/scope vigente y consentimiento específico para preparación. Lectura y preparación tienen grants distintos por alcance; no convertir afw:project:read en permiso de escritura. Los nuevos scopes deberán registrarse y probarse en un bloque propio.
2. **Admisión primaria:** comprobar dueño actual, revisión del expediente y dominio/claim vigentes antes de reservar trabajo y de confirmar resultado. Una transferencia, retirada o vencimiento durante awaits debe descartar la confirmación de la operación. La modalidad futura debe definir expresamente qué ocurre con una reserva ya iniciada; no borrar el hecho de un intento.
3. **Entrada mínima:** expectedRevision>=1, versión del contrato y clave idempotente acotada. Proyecto/dominio/recursos/roles los aporta el host desde datos autorizados. Rechazar campos desconocidos; cuerpo limitado antes de parsing, deadline original, rate limit y presupuesto.
4. **Alcance normalizado:** persistir hash de entradas relevantes, revisión de origen, cliente/proyecto/subject autorizados y versión del generador. Un hash no es permiso ni reserva por sí solo.
5. **Idempotencia durable:** misma clave+identidad+alcance recupera el mismo resultado; misma clave y otro alcance devuelve conflicto, sin generar una segunda cápsula. Timeout o ACK desconocido exige conciliación por lectura antes de cualquier nuevo intento. No generar otra clave automáticamente.
6. **Atomicidad:** la asignación de versión, reserva, registro de resultado y evento de auditoría necesitan garantías comprobadas bajo dos solicitudes concurrentes. El batch humano existente no demuestra por sí solo CAS del expediente o asignación de versión para agentes.
7. **Salida acotada:** referencia de borrador/cápsula, manifesthash, revisión de origen, estado de preparación y requisitos de revisión. No devolver cookies, custodia, respuestas privadas completas o archivos no autorizados. Preparado no significa aprobado ni instalado.
8. **Límites de autoridad:** aprobación de contenido, permiso de publicación, acceso de hosting y gasto se conservan como decisiones separadas. Esta preparación no confirma ninguno. Recursos OpenAPI/MCP/skills siguen como propuestas de implementación cuando no existe servicio real; no generar capacidades ficticias.
9. **Persistencia/reversión:** reutilizar el dominio de cápsulas del mismo producto y un servicio interno compartido con la web, evitando una llamada HTTP con identidad falsificada. Cualquier esquema nuevo será aditivo, con tablas/identidades y recuperación documentadas antes de una migración autorizada. Retirar el adaptador no elimina historial ni datos legítimos posteriores.

Los detalles del nuevo scope, ledger y CAS deben quedar en una spec/plan de implementación propia con APIs reales del repositorio. Este diseño no elige aún una migración ni autoriza modificar la ruta humana por inferencia.

## Pruebas que decidirán la aceptación de fuente

- Identidad/cliente/proyecto ajenos, rol distinto, grant de lectura o scope inventado: ningún borrador ni reserva.
- Revisión incompatible o cambio durante lectura/generación/confirmación: conflicto, sin confirmación silenciosa con datos nuevos.
- Claim de dominio vencido/retirado o dominio solicitado diferente: rechazo; no renovar por el agente.
- Dos solicitudes simultáneas con misma clave: un resultado y una versión; con otra carga: conflicto.
- Dos claves simultáneas legítimas: versiones sin colisión y política de presupuesto respetada.
- Respuesta perdida después de guardar: recuperar el resultado original, no crear otro trabajo o cargo.
- Datos secretos, recursos fuera del alcance y petición de aprobar/publicar: rechazo sin eco sensible.
- Fallo después de reservar o antes de registrar: estado conciliable y auditable; sin borrar el intento.
- Cierre original o retirada de permiso: impedir la siguiente admisión; no prolongar leases.

Los tests usarán DB/SDK reales en CI cuando corresponda, identidades sintéticas y tiempo controlado. Una aceptación en Actions no abrirá el servicio. El primer ensayo remoto requerirá plan propio acotado, custodia/rollback vigentes y consentimiento específico; no reutilizar el grant G2 retirado.

## Dependencias y avance paralelo

El diseño y la implementación CERRADA de este adaptador no necesitan que el Container esté reparado. Sí dependen de resolver consentimiento de escritura, persistencia y concurrencia; no saltarlos para ganar una herramienta nueva.

Publicación de un catálogo comercial, precios, pago/aceptación durable e instalación real conservan etapas propias. Eventos/revisión útil/baja nativa y PC-off siguen esperando su cadena de aceptación. Ningún cambio desde este documento en Cloudflare, OAuth, datos de Max o correo.
