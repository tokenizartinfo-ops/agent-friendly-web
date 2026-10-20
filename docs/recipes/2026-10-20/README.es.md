# Recetas de entrega por capacidad
20oct2026 · AFW · preparación operativa, sin instalación ejecutada.

Elegir por la capacidad comprobada para el origen exacto, no por el logo del proveedor. Reutiliza [deliveryAdvice](../../../lib/delivery-advisor.mjs), [delivery-plan](../../../lib/delivery-plan.mjs) y [las instrucciones actuales](../../../lib/delivery-instructions.mjs): seleccionar una opción conserva evidencia declarada y no verifica acceso ni autoriza publicar.

| Capacidad declarada | Método existente | Receta |
| --- | --- | --- |
| Instalar plugins WordPress | scoped_plugin_review | [Plugin acotado](wordpress-plugin.es.md) |
| Subir archivos al hosting | verified_docroot | [Raíz pública comprobada](verified-docroot.es.md) |
| Trabajar con el repositorio | source_pr | [PR y despliegue trazable](source-pr.es.md) |
| Editar páginas, pedir al mantenedor o no saber | maintainer_handoff / identify_maintainer | [Entrega a un tercero y SaaS](maintainer-handoff.es.md) |

Estas tarjetas son guías para la persona operadora y futuros agentes; no son instaladores, skills con autoridad o adaptadores probados para todos los proveedores. No crean rutas, permisos, contratos de pago ni una API de recetas. La [plantilla de recibo](receipt.example.json) es sintética y distinta del payload del delivery-plan actual: no importarla como solicitud a una API ni como cápsula aprobada.

## Integración con el acompañamiento
La fuente de [delivery-recipes](../../../lib/delivery-recipes.mjs) reutiliza los cinco métodos existentes. [deliveryInstructions](../../../lib/delivery-instructions.mjs) incorpora preparación, evidencia y pausa específicas a los siete pasos y al texto copiable del desplegable actual; la pregunta viene de delivery-advisor en es/en/pt. No cambia el guardado del plan, su control de acceso o las decisiones del responsable. El código integrado no acredita publicación en la web: consultar el recibo de despliegue por separado. [Alcance y validación](../../AFW-DELIVERY-RECIPE-GUIDANCE-2026-10-20.es.md).

## Una sola pregunta para la persona
Mostrar únicamente el siguiente paso necesario, con su motivo. Si no sabe, dejarlo pendiente y ofrecer coordinar con quien mantiene el sitio. El detalle técnico queda en el expediente de entrega; no mostrar toda esta lista como formulario obligatorio.

> No necesitás resolver todos los accesos ahora. Primero confirmamos el camino más sencillo y preparo lo que necesita quien mantiene tu sitio.

## Datos comunes que se deben comprobar
Origen y rutas exactas; propietario y responsable; versión/revisión y hashes aprobados; estado previo o ausencia; custodia recuperable de respaldo; permiso nominal limitado y su vencimiento; procedimiento, comprobación y reversión. Declarado, revisado, autorizado, instalado, verificado, bloqueado y revertido son estados separados por archivo. Guardar fecha y referencia de evidencia; desconocido queda desconocido.

No copiar credenciales, cookies, cabeceras, tickets, transcripciones, datos de otros clientes o configuraciones privadas al paquete, Git público o RAG. El caso específico vive en su custodia/repo autorizado; AFW conserva solo aprendizaje saneado y referencias opacas. Las recetas no conceden acceso por estar guardadas.

## Qué aporta la experiencia y qué no
[Experiencia de entrega](../../AFW-DELIVERY-EXPERIENCE.es.md): observaciones históricas1oct2026 de WordPress/Hibou/cPanel y Atelier/DonWeb/Swarm/Traefik, con recibos y límites. Ayudan a formular preguntas y evitar errores; no certifican la situación actual ni capacidades de otro cliente. Hostinger y otros proveedores permanecen sin una adaptación comprobada en estas tarjetas.

No equiparar cápsula preparada con plugin, ZIP descargado con instalación, Media Library con archivo raíz, HTTP200 con contenido correcto, coincidencia de archivos con certificación integral o auditoría externa con mejora comercial garantizada. Mantener robots, sitemap, JSON-LD, documentos de contexto y permisos de herramientas como decisiones separadas. llms.txt sigue siendo una propuesta comunitaria, no una obligación universal.

## Cierre
Verificar públicamente solo el alcance autorizado y registrar quién continúa. Tras un timeout o resultado desconocido, consultar el estado original antes de repetir. Si no hay respaldo recuperable, origen cierto, acceso comprobado o decisión aplicable, preparar la entrega y dejar la instalación bloqueada. Retirar el acceso nominal al terminar y comprobar su retirada por el mecanismo acordado. No asumir consentimiento de Max ni de otro cliente desde este ejemplo.
