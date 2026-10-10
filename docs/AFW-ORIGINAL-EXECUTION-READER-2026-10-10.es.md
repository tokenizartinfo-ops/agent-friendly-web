# Lectura administrativa de ejecución original

Preparación interna de Task2; sin rutas, montaje, credenciales nuevas ni programación. `assistance-private-original-execution-reader.mjs` produce el esquema de ejecución que consume el correlador privado. No produce autoridad de instalación.

El host debe suministrar una página original acotada obtenida por `read_thread`, resolviendo el turno solicitado mediante la paginación administrativa disponible. `turnId` pertenece al adaptador del host: no es un parámetro inventado de la herramienta. Una página incompleta, truncada, sin turno o sin comandos originales no permite reconstruir una ejecución positiva desde el texto del asistente.

Solo se acepta un chat Codex alojado (`hostId: durable`), turno completado, comandos completados con salida explícitamente no truncada y código cero. Las fechas originales Unix en segundos se convierten en límites del turno; no se atribuyen al comando individual. Tres comprobaciones Git canónicas antes y después del comando fijan HEAD, origen AFW y checkout limpio. El comando del desafío y su hash deben coincidir exactamente con la aprobación privada. Se admiten comandos literales o envolturas simples `/bin/bash -lc`; cambiar la envoltura requiere aprobar su hash real. Esto comprueba las observaciones del checkout, no atesta una VM ni garantiza ausencia de cambios transitorios entre comandos.

La salida del CLI únicamente aporta el localizador del recibo. El correlador exige por separado contexto oficial de plataforma y recibo autenticado del diario primario dentro del mismo turno y ventana. Un hash de trazas saneadas identifica el original observado; no autentica su procedencia. El host sigue siendo responsable de obtener originales reales, nunca callbacks constantes para cerrar gates.

Lecturas acotadas, plazo de pared, cancelación, reloj monotónico, frescura y nueva lectura de pins impiden aceptar resultados tardíos o aprobaciones retiradas. No se publican mensajes, salida completa, nonce, JWT ni credenciales. Las pruebas usan únicamente fixtures sintéticos y composición real en workerd, incluyendo ausencia de contexto y recibo distinto.

La comparación de dos lecturas conserva todos los hechos originales y excluye únicamente `execution.observedAt`, que indica cuándo se recuperó esa lectura y puede avanzar entre consultas. Cada fecha de recuperación se valida individualmente. Las fechas del contexto oficial y del recibo siguen formando parte de la comparación. Arrays dispersos o de más de 256 elementos se rechazan antes del recorrido. La precisión de segundos del original puede rechazar conservadoramente un recibo ubicado en la fracción final del segundo; no se inventa precisión adicional.

La lectura administrativa real del 10 de octubre recuperó la estructura original de comandos del chat propio `01a1221d-f257-7434-9bbf-30e8b39a2016`. Sus turnos históricos no contienen este desafío: no constituyen una comprobación positiva ni se reutilizan como tal. No repetir su adopción aceptada, OTP o rotación.

Pendientes operativos: lector del contexto oficial y recibo primario, productor de autoridad con reserva compartida, fence DO–D1 e instalación reconciliable; después ensayo propio con PC encendida, una ocurrencia alojada e intervalo PC-off acordado. La preparación de este lector no habilita el piloto de Max ni una guardia permanente.
