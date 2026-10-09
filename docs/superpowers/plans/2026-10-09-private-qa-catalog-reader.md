# Lector privado del catálogo QA

> Implementación inline con superpowers:executing-plans; revisión independiente al final.

Goal: resolver desde almacenamiento privado la aprobación de cierre sin aceptar planes del consumidor ni transformar metadatos en autorización.

Architecture: puntero fijo almacenado en DO contiene únicamente registro QA V2. Cada lectura reconstruye createQaClosureCatalog con lector de provisioning confiable, consulta aprobación D1 first-primary y valida digest completo. Relee puntero/catálogo/primario después de awaits; autorización no se cachea. El host ofrece solamente read y readOccurrenceApproval sin argumentos. Timeouts<=10s y reloj monotónico compartido; nada escribe ni aprueba. Una revocación de plan D1 permite terminar su cierre, pero retirada de catálogo/provisioning impide actuar.

Ruling: el despliegue cerrado incorpora clase y lector, pero no un instalador ni binding de provisioning inventado. La prueba sintética valida mecánica, no propiedad/exclusividad/custodia real. El siguiente instalador debe acreditar constancias reales antes de escribir puntero/approve/arm; ningún RPC público de instalación en este bloque.

- [x] Pruebas RED: reconstrucción con D1 real, aprobación forjada, proof ausente/retirada, puntero cambiado mientras proof espera, deadline/revocación, timeout/clock regress.
- [x] lib/assistance-private-qa-catalog-host.mjs; Worker clase PrivateQaCatalog con storage propio y lector fijo de provisioning por binding privado; fetch404/sin approve/install.
- [x] Verificación native, lint/build/suite y review:1326pass/0fail/2skip, native/unit8, focused15, dosP2 corregidos conRED/GREEN y guard transaccional.
- [ ] Integración CI antes de publicar. Sin remote migration/binding nuevo mientras provisioning/installer no estén listos.

Ruling: no sustituir atomicidad del almacenamiento por reordenar callbacks. Puntero completo y revocación QA se verifican dentro de la misma transaction del catálogo posterior al proof. D1/proveedor externo siguen sin promesa de atomicidad distribuida. Lectura tardía timeout cancelada por guard de actividad, sin writes.
