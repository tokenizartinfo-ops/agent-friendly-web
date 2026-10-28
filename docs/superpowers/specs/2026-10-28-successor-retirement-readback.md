# Sucesor: observación privada de custodia retirada
28oct2026. AFW exclusivamente; diseño dentro de la continuación autónoma autorizada por Gabriel.

El ensayo e417 aceptó descubrimiento autenticado y catálogo desde Work cloud; quedó cerrado. La reserva singleton sigue sin consumirse. El controlador de catálogo exige reserva0 incluso para cerrar y no debe usarse después de reservar.

El actor ya puede cerrar históricamente el sucesor, pero observeRetired usa la política fija del ORIGINAL. Sobrescribir esa política para observar el candidato perdería la referencia que verifica su lanzamiento. Se añade una lectura distinta: observeSuccessorRetired, sin argumentos, mediante un host de solo lectura y opt-in servidor AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED='true' (ausente/cualquier otro valor deniega).

El host resuelve solamente afw-own-event-first-successor-v1 desde la MISMA namespace, valida el manifiesto servidor, programa/revisión compilados y ventana originales y contrasta dos lecturas primarias de la reserva singleton inmutable. Deben coincidir trial, scopeHash, predecesor, aplicación, candidato, ventana, presupuesto1 y estado prepared. La política histórica Events conserva grant/owner/proyecto/cliente/recurso; no se aceptan selectores de caller.

Se reutiliza createRetiredCustodyReader con el mismo almacenamiento DO, clave y contexto, sin Container, runtime, fetch, secreto de proveedor ni métodos de escritura. Requiere custodia sellada withdrawn, admisión/cierre originales y revocaciones reales de lectura Y avisos. La expiración sola no sustituye una retirada. El DTO existente conserva physicalStopVerified=false y mayStartSuccessor=false: el GET separado del proveedor sigue siendo necesario.

La política de retirada ORIGINAL nunca se modifica. Puede observarse después del vencimiento con flags Events/Successor apagados, siempre que el manifiesto histórico candidato y el opt-in de lectura sigan fijados. Deriva/métodos cambiados, acceso no reconocido, nueva identidad o timeout original de5s deniegan; ningún resultado tardío es aceptado. No se reintenta ni se cancela una escritura: esta ruta solo lee.

Alcance inicial: fuente/pruebas en GitHub y Actions. Sin despliegue, binding remoto, nuevo token, permiso OAuth, reserva real, suscripción, cron, Workflow, Container o Max. El Worker congelado0b074569/c56b y operador2033 permanecen cerrados y sin reconstruir. Cambiar el código del actor requiere un paquete congelado NUEVO antes de cualquier ensayo futuro; CI no lo acredita. Reversión de fuente por commit; runtime actual intacto.

Cierres siguientes separados: compositor independiente post-reserva, parada física comprobada, baja nativa real y restauración administrativa; luego ensayo PC-off acordado. No se amplía el controlador de catálogo ni se invocan fixtures0/1 o ventanas consumidas.
