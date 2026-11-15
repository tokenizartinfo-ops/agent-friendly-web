# AFW R3 — precisión I2: sibling de lifetime como datos de coherencia

Fecha: 2026-11-15. Complementa ed0fd9d72fe880322265302195be71b80de7b027/8ad93567; solo DATA de la misma corrección/ronda3. Matriz104 y killsets no cambian.

E09/E11 reemplazan solo lifetime.py sibling y esperan record_invalid. No se autoriza interpretar código sibling desconocido como forma de producir el rechazo. La entrada, kernel lineage, prctl y código real de outer deben seguir siendo Source-literal/inmutables antes de cualquier publicación.

Se permite comprobar el sibling después de armar/verificar el guard literal, dentro del parent capturado y su stdout privado, como **coherencia de materialización requerida**, no autoridad de ejecución. Leer snapshot acotado del nombre fijo lifetime.py bajo helperFD6, con metadata/bytes/hash esperados fijados por Source prístino en memoria antes de mutaciones. No obtener la expectativa desde un archivo mutable del hijo ni aceptar callerpaths/código/PIDs/roles arbitrarios.

Si el snapshot coincide, usar únicamente los bytes ya verificados/prístinos en memoria con rol cerrado y el mismo PID; no hash→reopen por ruta. Si no coincide, NO ejecutar sus bytes. Rechazar con una señal literal privada sin datos de caso ni secretos que el outer clasifique como record_invalid. Puede ser un sentinel ASCII fijo AFW_R3_PARENT_INPUT_REJECTED/1 con UN LF y status23, dentro de captura: no es un nuevo wire público. El outer ya admite status0/23 antes del parseo y convierte este rechazo en su fallback cerrado de record_invalid. La implementación debe demostrar esa cadena y no remapear accidentalmente a parent_unavailable. Ni stdout/stderr de contenido sibling se publica.

El sibling solo puede negar por incoherencia; nunca aportar kernel authority o bytes de módulo. E08/E10 siguen usando módulo Source-literal sellado y el sibling de módulo es inerte. Hooks privados y mutantes deben actuar sobre el código literal real, como ya se fijó; no convertir el rechazo del sibling en un decoy para evitar esas pruebas. El hash de coherencia no se recalcula después de la manipulación para legitimar un sibling cambiado. Los casos con helper ausente/metadata inválida conservan su etapa y expectativa declaradas; no cambiar la matriz por este ajuste.

No nuevo proceso, residente, loader genérico, interfaz argv de código, stdout público o cambio de relojes/guards. No reabrir revisión amplia ni ampliar el threat model a ejecución arbitraria de código: son variantes de caso cerradas de Source, no una API para ejecutar código enviado por usuarios. Si surge un obstáculo preciso al mantener I2 y E09/E11 simultáneamente, comunicarlo antes de elegir otro diseño.

Source sigue cerrado92cf777de8a109aa42ca73d9b33b27c74226abde; no Source/ref/run/Native. Guardas, Core/18/Main, obligaciones de job+reporte y no-acreditados false intactos.
