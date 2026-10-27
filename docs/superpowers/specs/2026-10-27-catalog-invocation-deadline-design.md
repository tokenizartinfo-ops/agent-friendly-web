# Recibo consistente de presupuesto de ejecución — 27oct2026

## Problema y alcance
El controlador ya devuelve deadlineExceeded:true cuando vence su timer. Sin embargo, check también detiene por m>=endM y su catch genérico no conserva ese hecho. El orden de resolución de promesas y timer puede ocultar un límite observado. Esto es reproducible en el controlador puro con un reloj monotónico inyectado; NO demuestra la causa del intento remoto1732.

## Enfoques y decisión del responsable
- Aumentar110000ms: descartado; cambia el presupuesto sin diagnosticar.
- Emitir errores/respuestas crudas: descartado por privacidad y ambigüedad.
- Conservar un booleano interno del límite observado y proyectar el campo existente: elegido bajo autorización permanente de avanzar, con alcance diagnóstico.

## Contrato
- Si check observa un valor monotónico finito que alcanza/supera un endM finito y representable posterior al último valor válido, conservar invocationDeadlineReached=true ANTES del rechazo existente.
- Todo recibo posterior de esa invocación incluye deadlineExceeded:true. El timer existente también conserva ese hecho.
- No marcar ese flag por vencimiento del permiso, cutoff de catálogo, reloj inválido/regresivo, error del proveedor o identidad cambiada solamente. El flag describe un límite observado, NO una causa única.
- Sin cambios de guardas/alcance/presupuestos64API/10SELECT/110000ms, ocho rechecks, mutaciones, reintentos, cancelación, grant ni versiones publicadas. Sin mensajes de error o valores de reloj en el recibo.
- Una escritura ya enviada permanece uncertain y mayRetryfalse; el flag no la cancela, revierte o autoriza a repetir.
- No runtime/OTP/permisos/Node/reservas/suscripciones ni Max.

## Verificación
Regresiones reales del controlador: límite tras lectura inicial; tras ACKKV; tras lectura de módulo de candidata; plazos de negocio distintos; relojes inválidos/no representables. RED antes de código, suite completa/paquete congelado hospedados y una revisión fresca. Fuente/CI no acreditan el recorrido cloud ni PC-off.
