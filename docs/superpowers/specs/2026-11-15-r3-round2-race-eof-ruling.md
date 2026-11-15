# AFW — precisión del fixture L05 y límite raw final

Decisión Root: 2026-11-15 08:58:16 UTC. Solo DATA, antes de candidata/ejecución.

La pausa SIGSTOP introducida deliberadamente por el fixture L05, antes de armar la señal de muerte del creador, podía dejar al shim detenido si desaparecía su observador. No se acepta dejar ese proceso sin una vía de terminación propia del laboratorio.

Se autoriza reemplazar exclusivamente esa pausa privada por lectura bloqueada de una pipe. El writer pertenece únicamente al observador mediante stdin=PIPE; no debe heredarse al creador ni al shim. El rol Source fijo node-race-creator preserva el reader como fd8 y lo pasa al stdin del shim instrumentado. No hay API ni selector de PID/ruta/comando del consumidor.

Recorrido normal obligatorio: READY y bloqueo real S durante la ventana fijada; comprobar identidad de la cadena; matar el creador; observar su terminación; cerrar el writer; EOF despierta el shim y debe rechazar al creador muerto antes de delegar. El finally debe cerrar el writer y limpiar solo la cadena propia verificada dentro del plazo existente. Si muere el observador, el cierre kernel del writer también permite que el shim despierte: rechazará al creador muerto o armará la señal antes de su muerte posterior. No se acredita un resultado medido por esa explicación.

Producción no incorpora pausas, pipes de fixture, observadores residentes ni roles genéricos. Matriz100/L05/expectativas, cobertura y relojes no cambian; tampoco se agrega un caso.

Medición declarada: raw400.168 bytes, incremento475 sobre399.693; exceso168 sobre el límite anterior. Se autoriza un límite raw cerrado de **400.500 bytes** para integrar la corrección completa, sin truncar código/historia. Se mantienen helper32.768, SAME1.800.000, gzip98.304, base64131.072 y todos los límites de wire/tiempo. Cada consumidor del límite raw en F7, descompresión y reporte debe adoptar400.500 de manera coherente. Toda medición/hash requiere cotejo independiente sobre la candidata final.

Los paquetes y candidatas anteriores permanecen provisionales, sin ejecución ni ref Source. Source continúa cerrado1fe20347; I3/Native siguen retenidos. Los siete no-acreditados permanecen false.
