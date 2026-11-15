# AFW R3 — hipótesis acotada de colisión de descriptores

Fecha: 2026-11-15. Análisis estático posterior a la ocurrencia consumida43705239006/1. No se ejecutó código Source ni pruebas Bash en el PC ni en otro runner por esta nota.

## Evidencia real

El único wire fue unavailable/unknown. El receptor independiente lo acepta como no calificado. No informa qué rama del formatter falló, si la traza se creó o si algún evento llegó. No es evidencia de causa histórica ni de incidente Cloudflare.

## Código concreto a revisar

F7activo db7b88bcf3164462821fcfc21bbf2ee70705c2ce, línea55: `if { exec 10<"$r3_trace_file" 11>>"$r3_trace_file"; } 2>/dev/null; then`.

La creación persistente deFD10/11 está dentro de un comando compuesto cuya redirección temporal de stderr se prepara antes del cuerpo y se deshace al salir. Root sospecha que un descriptor interno usado para guardar/restaurar stderr puede colisionar con el10 creado por el cuerpo. Es una hipótesis de mecanismo, NO el estado observado del runner ni la causa probada del bootstrap previo. El formatter exigeFD10 válido y posición0; si no lo obtiene, el catch conserva unknown.

La documentación oficial de GNU Bash advierte que las redirecciones con descriptores mayores que9 pueden entrar en conflicto con descriptores internos de la shell. [Bash Reference Manual — Redirections](https://www.gnu.org/software/bash/manual/html_node/Redirections.html). La advertencia se obtuvo del resultado indexado de la página oficial; la apertura directa agotó el tiempo. La consulta al archivo oficialredir.c de Savannah no fue accesible por esta herramienta. No se infirió código de implementación desde mirrors de terceros.

## Paso acotado

El mismo implementador round3 inspeccionará el mecanismo y propondrá el cambio mínimo con supuestos explícitos. No crear nueva propuesta ni ejecutar/repetir Source hasta una decisión Root basada en el análisis. Una corrección de la observabilidad no prueba por sí sola la causa original. La Source ya está cerrada4e278875259211809ac82b0d1978b4e9bf1764ed.

No cambio de runtime, permisos, claves, cron, OAuth, Container o datos de clientes. Cero controles/CLI/Native por este bloque. Los siete no-acreditados permanecenfalse.
