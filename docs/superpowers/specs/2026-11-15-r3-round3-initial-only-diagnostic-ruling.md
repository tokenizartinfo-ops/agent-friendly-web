# AFW — observación inicial sin consumidor capturado

Fecha 2026-11-15 10:06:09 UTC. Precisión del ruling8ad93567, sobre el Source cerrado dfed0449. No autoriza una ejecución.

El actor señaló correctamente que desvincular un archivo regular y no heredar su writer no impide que un proceso del mismo UID reabra un alias /proc del reader. No se acepta tratar ese registro como autoridad mientras corre un helper sustituible. Tampoco se autoriza allocator/handoff/capturador o residente adicional para resolverlo.

## Orden elegido

1. Preparar un bloque diagnóstico Source **initial-only**, distinto de la versión fallida, que ejercite el mismo bootstrap mediante observaciones mínimas y termine ANTES de llamar runControls, la captura de helpers, CLI original o Native. Materializar/comprobar DATA no autoriza ejecutarla. Solo código literal Source confiado y builtins/lecturas Git ya existentes; ninguna función de helper sustituible se invoca. El registro regular propio abierto y desvinculado tiene entonces únicamente escritores Source confiados de este bloque. No acredita autenticación ni protección frente al host comprometido.
2. Root fija schema/receptor y gate antes de una única ocurrencia de ese diagnóstico. Se cierra íntegra, cualquiera sea el resultado.
3. Si se observa bootstrap admitido, rebasear la corrección104 completa contra el cierre nuevo y preparar otro gate Root para controles reales. Sin registro regular de etapas como autoridad durante capturas. Si el diagnóstico falla, usar la evidencia nueva para decidir una corrección causal; no repetir ni saltar a fullcontrols por intuición. Cada ocurrencia cambia propósito/código/contexto explícitos, se consume una vez y se cierra. La ronda3 termina con revisión acotada después de las comprobaciones que cubran sus fixes; no es una repetición del intentoR2 ni una revisión amplia nueva.

## Contrato pendiente de fijación

Nuevo recibo **startup-diagnostic**, distinto de controls-unavailable. Puede expresar bootstrap admitido o no disponible, con lastObserved limitado a eventos realmente registrados, nunca causa fallida. Indicar controlsInvoked=0, originalCLIInvoked=0 y nativeBusinessCases=0; todos los no-acreditados false. No puede calificar104 ni permitir Native. Schema/ejemplos exactos DATA antes de construir/publicar; Root fijará receptor independiente. Contexto no comprobado conserva unknown.

Se aceptan eventos especiales cwd_rejected y setup_rejected cuando sus guards realmente rechazan. En la rama normal solo el prefijo de etapas hasta bootstrap_admitted; controls_started está prohibido en este bloque y sería una violación de alcance. Ausente/malformado/noLF/NUL/noASCII/fuera de orden/sobre256bytes→lastObserved unknown. Wire máximo2048bytes. Formatter Source literal breve, estricto, al terminar; si falla, constante Bash desconocida. UNA salida pública, nunca stdout de un descendiente como autoridad ni stderr crudo/rutas/PIDs/variables.

Reader y writer propios separados, archivo regular desvinculado antes del lanzamiento; no se transmite a ningún helper capturado porque no existe tal fase en este bloque. Descriptores diferentes del reader del fixtureL05. No tracing general, nueva cola, handoffFD ni nuevo residente/plazo. No Source local.

La protección literal/memfd sellado de código para R2-I2, los eventos/liveness de R2-I3, el oráculo de dos contratos y104declaraciones siguen aceptados DATA. Se confirmó que el launcher del harness debe usar su lifetime pristine retenido antes de crear la cadena, evitando que la propia prueba ejecute un sibling sustituido antes de llegar al entry literal. Hooks y mutantes sobre el literal real, sin weakening.

Caps actuales y prefijo1717394 siguen obligatorios hasta medición/ruling de excesos. Fuente18/Core/Main intactos. Source/Native/PC-off siguen retenidos y no se pide intervención del owner.
