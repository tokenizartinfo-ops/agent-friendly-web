# Orientación proporcional en el expediente AFW — 2026-09-29

## Alcance

El expediente privado muestra una hipótesis de avance que cambia al editar los objetivos y capacidades declarados. Primero propone mejorar descubrimiento y respuestas (AF-1/AF-2). Si el sitio solo necesita informar, indica que puede detenerse allí. Una consulta con datos mantenibles abre una evaluación de AF-3 sin exigir MCP; las acciones (AF-4) y transacciones (AF-5) aparecen solo si el usuario las plantea, con preguntas sobre identidad, permisos, reversibilidad, responsables y condiciones.

La guía es local y determinista. No asigna un nivel AF observado, no sustituye la auditoría, no guarda ni publica y no activa herramientas o pagos. La selección de archivos o recursos en el formulario tampoco acredita que existan. Si se desconoce quién puede cambiar el sitio, pide aclararlo antes de implementar.

## Evidencia de cierre

- Casos automatizados: información pública suficiente, selección aislada de tecnología, consulta sin MCP obligatorio y transacción condicionada.
- `npm test`: 512 pruebas correctas.
- `npx tsc --noEmit`, `npm run build` y `npm run lint`: correctos; lint conserva un aviso previo sobre `<img>`.
- Ensayo local de la interfaz con cliente ficticio y almacenamiento en memoria: la guía cambia al marcar objetivos y muestra textos en ES, EN y PT.

El cambio no requiere migración de datos ni credenciales. Un despliegue de este bloque debe conservar el copiloto conversacional desactivado hasta que haya un proyecto piloto identificado y consentimiento comprobable.

## Publicación verificada

El código quedó en `main` mediante PR #52, commit `45e9c6941ecb0742f7c9ff2bff18ae002ba01cea`. Se creó la configuración local ignorada `dist/server/wrangler.production-proportional.json` a partir del build de esa fuente y de los bindings del release productivo anterior; SHA-256 `ae68f7d1e245a19858a83e95b09841a0847c15e9406baac364d7934c57ab0da3`. `wrangler@4.128.0 versions upload --dry-run` confirmó la D1 productiva `d26fc9d2-df5a-4957-8e58-cc4c945faad8`, audiencia Access productiva, cuota 5/60, AI y assets, con `AFW_COPILOT_ENABLED=false` e ID vacío. No se ejecutaron migraciones.

La versión `2accce03-595f-4d02-98da-d6703c7a03d4` se asoció primero al 0% y luego al 100% en el deployment `98d9ec9d-1824-4c18-8027-5070b3f99a3e` del Worker `agent-friendly-web-web-production`. `npm run web:smoke:production` confirmó 8 rutas públicas HTTP 200 y 3 rutas privadas HTTP 302 de Cloudflare Access. La URL de preview de la versión también presentó Access; el recorrido privado funcional se validó en el ensayo local ficticio, no con un cliente productivo.

**Rollback:** devolver el 100% del tráfico a `d7502fb4-4e5b-4a60-abcf-fa4766d4b8a8` si falla la interfaz o aparecen regresiones. No restaurar ni borrar D1 por este cambio de presentación.
