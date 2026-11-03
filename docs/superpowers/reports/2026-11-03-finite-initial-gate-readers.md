# Lecturas previas de la activación inicial

Alcance de código en la rama finite. Estas lecturas producen hechos acotados. Ninguna concede autoridad para activar, reemplazar ni restaurar.

## Inventario de Workflows

Código c05b13059901b3bf518fa81b7499850eeb3923b0, desde BASE 6343174247655479196e2e1d32968bcdc3b06c39. readFiniteInitialAfwWorkflows valida el registro de entrada, conserva su plazo y usa el enumerador fijo existente de las tres definiciones. Admite una sola instancia inicial exacta en bootstrap, en running o waiting. Exige que las demás estén terminadas. Devuelve solo conteos y hechos, sin capacidad de efecto.

RED ba5b399164cd82c0e28a0f374f90e6fe96a880a7, run 41635614620, job 125915915866, 45 PASS y una falla esperada por gate ausente. GREEN c05b130, run 41636097331, 46 focalizadas, 83 consumidores y 23 compilación/residencia, lint. Prueba nativa cubre instancia propia ausente, terminada, duplicada, ID incorrecto, instancia ajena y otra definición activa. La ampliación 1a5b51d8bc6fb73211870a767e0a938826d3f22a agrega waiting válido y comprobaciones del lease del esquema.

## Esquema instalado del historial

Código df9b29c9b4c9867619d47f28f38457af5f5d2104. readFiniteInitialHistorySchema consulta con first-primary las cuatro definiciones concretas de triggers BEFORE UPDATE/DELETE para admissions y closures. Comprueba nombres, tabla y SQL fijado, utiliza el lease original y limita la lectura a cinco segundos. El resultado afirma la observación actual del esquema. No acredita que siempre haya estado instalado ni impide inferir que SQLite REPLACE respeta los triggers sin evidencia adicional.

RED b634b4b04bbafe0ccdd29b5861fda9983f3e81dd, run 41636714974, job 125919642856, 46 PASS y una falla esperada por lector ausente. GREEN 1a5b51d8, run 41637730238, 47 focalizadas, 83 consumidores, 23 compilación/residencia, lint, cero artefactos. En D1 sintético se quitó y alteró cada trigger y luego se restauró. Los parent abortados o vencidos fueron rechazados.

## Guard histórico fijo

Código 4a3e720df343c99f5969cdf817de44fb28e4b8b6. readFiniteInitialOldGuard consulta exclusivamente la instancia histórica fijada por la ruta del Workflow, con el lector nativo y GET acotado a 256 KiB y cinco segundos. El límite es una cota de implementación, no una medida observada del cuerpo real. Valida complete, seis pasos, la salida blocked/dispatch uncertain/baja no verificada y el paso de restauración exitoso con sus tiempos históricos. La respuesta conserva historicalDispatch uncertain y no afirma drenaje universal. Se exige el lease original. No se exige result.success ni result.error porque su valor no se verificó.

RED 047f1abe7eee2659c74cb1fbb54843d257e99c30, run 41638355349, job 125925180962, 47 PASS y una falla esperada por lector ausente. GREEN 4a3e720, run 41638779104, 48 focalizadas, 83 consumidores y 23 compilación/residencia, cero fallos/omisiones/cancelaciones, lint y cero artefactos. La prueba nativa alteró estado, salida, paso, fechas, cantidad, HTTP y lease.

La observación real primaria del guard realizada por dirección el 3 de noviembre a las 12:41:55 UTC se hizo con la sesión MCP, sobre el recurso fijado. La capacidad del token nativo para ese endpoint sigue sin comprobarse. El source histórico 2a477 usa INSERT para admissions e INSERT OR IGNORE para closures, como evidencia limitada a esos escritores. Permanece pendiente calificar otros posibles escritores y el efecto de REPLACE en D1 antes de usar la ausencia histórica como conclusión.

## Pendiente de composición

Los tres lectores no están conectados al productor. Queda verificarlos bajo el mismo B1/A, el presupuesto compartido y sus holders, cualificar custodia y puntero actual, emitir SEND una sola vez, comprobar ACK/publicación y crear la cápsula. El techo y la custodia anteriores ya vencieron. Esta unidad no emitió ninguna llamada real de activación ni acredita entrega, cierre físico o prueba con PC apagado.
