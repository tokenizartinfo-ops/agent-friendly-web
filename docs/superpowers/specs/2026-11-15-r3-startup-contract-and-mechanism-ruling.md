# AFW — contrato y mecanismo del diagnóstico inicial

Fecha 2026-11-15 10:12:06 UTC. DATA aprobado; ninguna ref/run autorizada por este documento.

Contratoa4ff0bf3a8c771a3bb28dc661261a2033fc7d8d3; schemaaa82dbe4e99dbba23754a745c8d5d25c9be8d375; ejemplos86a93b68afbbf31f5a32f3f8666ec05744952c50. Marker AFW_R3_DELIVERY_STARTUP_DIAGNOSTIC/1, scope source_initial_only. UN recibo ASCII canónico con LF, máximo2048B. Bootstrap admitido solo con salida real0 y traza válida terminada bootstrap_admitted; un evento final con salida distinta no basta. No autentica ni califica controles/Native/PC-off.

Receptor Root independiente **a2da3cb46ee5b3a67c728ca109c6bbe978e28016** vincula wire y outcome real del step, conserva qualified/NativeReleased/operationalReadiness false incluso si bootstrapAdmitted true. Receptor Root de traza **08f0acb71a17947e985eb36f12ebcfc25d14b8e1** exige prefijo exacto ordenado de10eventos hasta bootstrap_admitted y cap256bytes. Pruebas propias7positivos/20negativos, traza10positivos/11negativos; son datos sintéticos, no Source ejecutado.

Se acepta el mecanismo propuesto: guards Source setup/cwd antes; mktemp fijo en RUNNER_TEMP propio con umask077; readerFD10 readonly y writerFD11 append en dos open descriptions del mismo inode600/UID propio; desvincular antes del launch. Validar identidad/tipo/UID/mode/nlink0/flags, no colisionar conFD8 de L05. El Bash existente espera el Python→Node real; no coproc, relay, FDhandoff o residente nuevo.

Solo este bloque initial-only tiene esos descriptores: NO llama runControls ni ninguna captura/helper sustituible/CLI/Native. Las lecturas Git/builtins y materialización DATA no pueden ejecutar los módulos escritos. Por eso no hay un productor no confiado que pueda editar el registro mediante alias/proc. Este registro regular NO se acepta como autoridad cuando se ejecuten capturas; esa fase será otro bloque. No se protege ni autentica frente a un host comprometido.

Formatter Source literal breve al finalizar: lectura privada máxima257bytes, metadata estable, ASCII/prefijoúnico/LF/cap exactos; cap/traza inválida o ausente→lastObserved unknown. Formato/status0 o23, stdout del bootstrap y stderr suprimidos para que SOLO exista el diagnóstico; constante Bash desconocida si el formatter no puede producirlo. No paths/PIDs/errores/valores privados. La instrumentación no modifica el flujo/primitivas de admisión: fallos de registro no se convierten en admisión falsa. Un writer/lector incorrecto invalida la observación.

Se acepta reutilizar la sección R2YAcontenida en el prefijo actual para minimizar deriva y duplicación: verificar primero el prefijo ENTERO1717394B/1a0e3046/def4eeed, localizar de forma única el bloque R2 DENTRO de ese prefijo y validar tamaño/base64/gzip/raw/33helpers/18 exactamente9bf2e58b. No exigir que ese bloque histórico comience después del prefijo ni duplicar sus108828caracteres. El sourceParent1fe del envelope R2 se trata solo como procedencia histórica; la candidata nueva es hija DIRECTAdfed, su Parent/tree y contexto actual se comprueban aparte y no se falsifica contexto.

Las observaciones deben añadirse mínimamente al bootstrap R2 y el salto normal a runControls se sustituye por terminación diagnóstica antes de cualquier helper. Proveer cambios exactos/patches de instrumentación y equivalencia del resto para Root. El final del bloque bootstrap_admitted no significa que el futuro bloque104 haya pasado.

Entregar primero DATA/readbacks/F7inactivo+activo de diagnóstico/candidata/SAMEappend pequeño con pins; Root hará preflight/gate específico. Después de la ocurrencia se restaurará F7 original y se añadirá evidencia, sin replay. Solo con bootstrap admitido se rebaseará la propuesta full104 contra ese cierre y se evaluará su gate separado. Si falla, decidir desde evidencia, sin hunch ni invocación full por defecto.

Caps permanecen hasta mediciónraw400500/helper32768/SAME1800000/gzip98304/base64131072, wire2048/traza256. Todo cloud GitDB/Actions; no Source local ni runtime/credenciales/OAuth/OTP/Max. Los siete no-acreditados siguenfalse.
