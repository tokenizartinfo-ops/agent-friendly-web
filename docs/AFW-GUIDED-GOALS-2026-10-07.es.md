# Tipo de sitio y objetivos en el camino guiado

## Problema observado

El ensayo privado del 7 de octubre permitió guardar y recuperar el expediente, pero tipo de sitio y objetivos requerían desplegar el formulario completo. Eso interrumpía el acompañamiento de una pregunta por vez.

## Cambio en fuente

La guía recoge ahora tipo de sitio mediante una selección y objetivos mediante opciones explícitas, reutilizando los catálogos del formulario. Mantiene una pregunta visible, explicación breve, vista previa e incorporación voluntaria al borrador. Se puede dejar una respuesta pendiente. El autoguardado existente conserva su responsabilidad; revisar una propuesta por sí solo no guarda ni publica.

La selección no verifica capacidades ni autoriza acciones. No se infiere AF5, ni se reemplazan respuestas ya completadas. Una propuesta antigua falla si el campo cambió. El análisis libre de texto mantiene su lista de campos: no se amplía para inferir tipo de sitio.

## Criterio de cierre

- Pruebas de opciones, revisión, preservación de campos y conflictos.
- Build y comprobación del componente.
- Ensayo visual privado separado antes de acreditar que está desplegado y usable.

El resto de decisiones de entrega, recursos, permisos y responsables conserva sus controles. Este cambio no abre la supervisión cloud ni inicia el caso de Max.

## Aceptación local

Build y lint aprobados (dos advertencias existentes). Ensayo visual en `localhost:8799/internal/intake-workspace-preview`: tipo «Comercio o servicio» → revisión → incorporación → objetivo «Explicar mejor productos o servicios» → revisión → incorporación → confirmación de guardado simulado. La guía avanza a audiencia y el estado indica «Guardado simulado. No se enviaron datos». Captura local `output/afw-guided-goals-preview-20261007.png`.

Se ajustó el mensaje de incorporación para remitir al estado real de guardado, evitando que siga diciendo «falta guardar» después de un guardado confirmado. No se acredita persistencia remota desde este ensayo en memoria.
