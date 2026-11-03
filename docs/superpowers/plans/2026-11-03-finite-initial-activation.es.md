# Activación inicial y acceso autenticado de AFW

Base revisada: 1d01ef6d3aa44dd9a61ee986d52724a49fc55003. Alcance de código y CI en la rama de ensayo. La ejecución real queda pendiente de la composición y comprobación integral.

## B2c.1 Activación privada

Continuar dentro de createPrivateQaFiniteInitialEntry y de la misma invocación B1 → A → carga inactiva → armado. Devolver internamente plan y ACK desde armInitialCleanup solo tras sus comprobaciones durables. Mantener el padre, el productor A, los holders, el límite técnico y el límite de cinco segundos por operación hija.

Antes de emitir, comprobar la publicación y la elegibilidad de reversión exactas, la custodia, los escritores históricos pertinentes y el inventario fijo de Workflows. Excluir solo la instancia inicial exacta dentro de afw-own-qa-private-bootstrap. Mantener los demás no terminales como bloqueo. Fijar qué lecturas primarias prueban cada gate antes de implementar el emisor.

Usar los codecs B2b. Persistir SEND con sync/readback; emitir un POST; registrar ACK real; comprobar deployment, módulo y configuración; persistir Completion. Ante SEND existente o resultado incierto, conciliar sin reemisión. La reconstrucción de un recibo no devuelve autoridad de avance. Conservar la salida RPC factual.

Registrar cápsula inmutable con la versión M realmente activada, deployment real y selector y referencias retenidas de A. Casos nativos: cadena exitosa, ACK ausente, deriva, SEND previo, POST/ACK incierto, lectura tardía, versión/módulo/configuración incorrectos, puntero ajeno y reinicio.

## B2c.2 Entrada autenticada en estado cerrado

Montar solo /connections/finite-prepare en canary finite antes del guard OAuth ordinario. Forward nativo al actor fijo del QA finite con el plazo original y metadatos internos reconstruidos. Verificar JWT de Access y titularidad primaria en QA. Resolver la fuente a partir de la cápsula, el QA vigente y la publicación primaria. M es initialBaseline de closed_ui. La versión histórica es la reversión. Acotar las lecturas repetidas al presupuesto existente.

Separar vigencia técnica I0+300s de la ventana del owner, anclada al mismo I0 y acotada por I0+900s y custodia. Mantener C0=I0+900s y C1=C0+180s. Conservar duración independiente de permisos. Antes de habilitar esta ruta, bloquear la aprobación POST antes del consumo del ticket hasta verificar el traspaso del cierre.

## Gates de ejecución real

Custodia y techo vigentes, capacidad del lector nativo en el endpoint de Workflows, historial y esquema instalados para calificar los escritores relevantes. Preparar el traspaso y las etapas siguientes antes de emitir el primer comando real, que consume una entrada sin reinicio. El ensayo con el equipo apagado requiere evidencia propia.
