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
