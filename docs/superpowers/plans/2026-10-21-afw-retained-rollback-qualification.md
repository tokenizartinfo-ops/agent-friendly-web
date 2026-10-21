# AFW: calificación del paquete publicado y su reversión retenida

Fecha: 21 de octubre de 2026. Proyecto AFW; repositorio `tokenizartinfo-ops/agent-friendly-web`.

## Alcance autorizado

Preparar y ejecutar en GitHub Actions una comprobación cerrada de dos artefactos inmutables: fuente publicada `5139c3333ad3e8958cf6af199ad2dfd980fcfe82` y fuente de reversión `452a70cb4c4d7a9f85b7b71ddbba05a885cc73d9`. No hay acceso a Cloudflare ni reconstrucción de la aplicación. La recuperación mínima generada del contrato v1 es evidencia histórica, no equivale al paquete real conservado.

PROJECT=AFW; REPOSITORY=tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT=GitHub Actions efímero; ORIGIN=ningún origen remoto invocado; RESOURCE_TYPE=artefactos Actions y fuente del verificador; RESOURCE_ID=12370391039/12365784722; ALLOWED_ACTION=lectura, calificación y recibos; ROLLBACK=reversión del cambio del verificador por Git, sin tocar Workers.

## Diseño y cierre

1. Añadir contrato v2 con ambas fuentes, árboles, módulos, ZIP, ejecuciones, vencimientos y referencia fechada de la versión retenida. Conservar v1 sin cambios.
2. Probar que una recuperación generada, paquete sustituido, alias entre fuentes o cambio de ámbito no pueden calificarse. Conservar RED fechado.
3. Verificar procedencia push/main exitosa, repositorio exacto, intento, vigencia, digest ZIP, dos archivos regulares y manifiesto exacto para ambos artefactos. Guardar los bytes originales, sin generar una reversión alternativa.
4. Ejecutar ambos módulos originales en Miniflare con el perfil sintético cerrado existente: 11 rutas privadas por GET/POST, 44 casos en total, sin recursos o secretos reales. Conservar rechazos ante apertura de /source, /source/identity o /source/new.
5. Revisar, comprobar CI y ejecutar la calificación desde la fuente integrada. Registrar artefacto y resultados antes de afirmar cierre.

`wrangler.closed.json` es solo un perfil sintético de ejecución. No es configuración de despliegue: omite deliberadamente los bindings reales y el secreto custodiado. Un recibo positivo no autoriza subirlo ni acredita Access, identidad firmada, esquema, suscripción, Container, baja nativa, ensayo con PC apagado o piloto de Max. `closedUploadReady`, `activationReady`, `operationalReadiness` y `hostedRollbackPerformed` permanecen false. La evidencia remota del contrato es fechada, no una lectura actual de Cloudflare.

## Verificación remota

Workflow: `.github/workflows/afw-preparation-release-preflight.yml`.
Comandos: unittest Python; prueba nativa de rechazos; ejecución nativa de ambos artefactos originales. El runner efímero instala sus dependencias, sin carga equivalente en el ordenador del owner.
