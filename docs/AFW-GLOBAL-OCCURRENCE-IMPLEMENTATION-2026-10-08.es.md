# AFW — plan operativo del registro compartido

Estado: implementación local autorizada, sin activación remota. Diseño: AFW-GLOBAL-OCCURRENCE-DESIGN-2026-10-08.es.md; su aclaración final sustituye el requisito de atestación de una VM.

## Resultado exigido

Una señal propia admite una sola ocurrencia global y cada fase se consume una vez, aunque dos tareas cloud compitan. Una respuesta perdida no autoriza reenvío, otro UUID, takeover ni borrado del historial. El almacenamiento temporal del chat no es autoridad. Conservar consentimiento, contexto privado y resultado personalizado como controles separados.

## Bloques y cierre

1. Esquema aditivo D1 y módulo interno: creación exclusiva por evento/request/ocurrencia; journal append-only/CAS; admisiones y cierre. Tests reales de dos conexiones, carreras, rollback transaccional, replay y restricciones. Sin rutas nuevas ni migraciones remotas.
2. Consumo y efecto transaccionales: integrar claim/finish con la admisión en un único batch D1; list consume su admisión antes de leer. Modo QA exclusivo, sin bypass legacy. Conservar el presupuesto compartido de reservas y el transporte canónico.
3. Runner y control: tres controles previos, tres operaciones y como máximo un stop adicional; éxito seis solicitudes, máximo absoluto siete. Cada intento cuenta antes del envío. No retries ni lecturas de recuperación automáticas. Cierre independiente tiene presupuesto y evidencia separados. Revalidar preflight y margen tras cada escritura.
4. Revisión independiente, pruebas proporcionales, CI y fuente publicada/adoptada. No confundir checkout preparado con adopción ordinaria.
5. QA remota propia: identificar binding y recursos actuales, preservar material de rollback, verificar esquema antes de abrir; evento nuevo desde UI y recepción/ACK reales, ventana fija y cierre independiente. Pérdida y replay deben denegarse en servidor con otra instancia. Mantener gates cerrados hasta comprobar los controles anteriores.
6. Ensayo integrado PC-off: solo al regreso/disponibilidad de Gabriel, acordar intervalo de apagado; correlacionar turno, recibos y retorno fechado dentro del intervalo. Retirar programación/permisos y verificar recuperación. No basta una notificación móvil.
7. Piloto Max: preview contextual al owner y aprobación del primer envío, acceso propio del cliente, consentimiento y objetivo, rollout solo de su proyecto, orientación/guardado/entrega/comparación proporcionales. No asumir expediente, hosting o permisos.

## Evidencia vigente

Publicación6ac78bc1412481a3bec9eee966a96544 adoptada por chat01a11b8a con fuente8eecaac y 17pass/1skipWindows/0fail; POSIX entre procesos probado. Registro global entre instancias aún pendiente. Ninguna guardia permanente ni lectura de clientes activada por este plan.

## Comunicación al usuario

Explicar una acción a la vez, guardado y siguiente paso, sin mostrar todos los campos pendientes. Una revisión de metadatos `intervention_required` no se presenta como solución ni respuesta personalizada. Publicidad y correo deben describir capacidades realmente activas y sus horarios/ventanas; no prometer atención continua de Codex mientras solo existan ensayos finitos.
