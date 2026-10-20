# PB2: recetas dentro del acompañamiento de entrega
20oct2026 · AFW · extensión de la guía existente, sin instalador ni publicación.

## Decisión y límite
Las cuatro recetas de docs/recipes/2026-10-20 ya existen. El hueco observado: deliveryInstructions entrega los mismos pasos de instalación/comprobación a todas las capacidades; no lleva al texto copiable la evidencia específica ni qué hacer ante un resultado incierto. Reutilizamos deliveryAdvice y la UI DeliveryAdvisor: una pregunta amistosa por camino y detalle solo dentro del desplegable existente. Se conserva el guardado/CAS/responsable/alcance actual sin cambiarlo.
Alternativas: enlazar solo los Markdown internos no integra el acompañamiento; un nuevo instalador o persistencia de accesos excede esta mejora. Elegimos prosa localizada y allowlist pura con salida estructurada reutilizable. No inferir permiso por proveedor o selección.

## Plan y cierre
1. RED en GitHub para cinco escenarios: capacidad declarada, mantenedor/desconocido, incertidumbre/reintento, tres idiomas y entrada no confiable. El workflow focal usa solo Node, sin dependencias/credenciales.
2. Recetas runtime para los cinco métodos existentes. Pregunta en delivery-advisor; preparar/evidencia/pausa en delivery-recipes. deliveryInstructions las incorpora a los siete pasos y al texto copiable; no cambia componentes/layout/estado/endpoint/SQL.
3. Verificar focal y suite/lint/build en GitHub, revisión única de toda la rama; Important en un único pase del autor RED→GREEN; Minor diferidos. Integrar fuente y guardar recibo. La integración no actualiza por sí sola la web desplegada: publicación separada desde fuente pública aislada.

## Review Focus
Comprobar a propósito: que la receta llegue al texto y no sea solo metadato; seis capacidades/dos caminos de mantenedor y tres idiomas; claves desconocidas e información privada no elijan métodos ni se interpolen; backups/revisión/permiso/rollback/actividad posterior sigan; resultado incierto exige consultar estado antes de repetir, sin instalación automática, contraseña o ampliación de acceso. No tratar recibo/CI/HTTP200 como publicación o certeza del sitio. CMS/plugin/archivo estático y repo/deploy diferentes. UX: pregunta simple, detalle en desplegable ya existente, sin nueva carga de opciones ni cambios de branding.
Ningún test de esta rama demuestra identidad alojada, publicación del cambio, interacción real de Max, avisos, suscripción o PC-off. No se ejecutan compras, contactos o instalaciones. operationalReadiness=false.

## Libro de trabajo
RED/GREEN/revisión/merge quedan en el PR y #497. Guardar versión desplegada aparte antes de afirmar disponibilidad. PB1 ee8cf6e4 cerrado y public9d4b1396 se preservan; Container02382110 permanece separado.
