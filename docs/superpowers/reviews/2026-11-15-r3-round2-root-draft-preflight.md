# AFW — inspección Root del borrador de ronda 2

Inspección estática de DATA, no ejecución Source. Borrador inicial 2b3f2ef223fc0109a6dff27125a94dc29c27b2e8; provisional corregido 4163aa4ab0330dbaf3aa3b86057796cfcde75220. Ninguno fue liberado.

Puntos concretos enviados al implementador antes de formar candidata:

- FD7: el fd5 mantenido por runpy podía hacer que os.pipe devolviera r=7; dup2 del escritor sobre7 destruía el lector. La entrada del observer ahora reserva7 como duplicado del directorio6, valida esa reserva y solo después crea la pipe.
- E05: el needle antiguo os.execve(3,['node' no aparecía en la nueva primitiva con args. El hook debe coincidir una vez con la primitiva actual, incluso después de integrar bootstrap-stdin.
- N06/B02: abrir O_RDONLY una carpeta propia mode000 antes de recuperar permisos causa EACCES. Se aceptó DATA O_PATH|DIRECTORY|NOFOLLOW, identidad UID/dev/ino por fstat y chmod solo al alias kernel del directorio verificado; verificación posterior de identidad y modo0700. Ningún chmod a archivos regulares o hardlinks.
- Limpieza de probes: matar únicamente el hijo directo podía omitir descendientes que el propio probe detectara supervivientes. El observer utiliza solo pidfds cuya cadena propia verificó; intenta terminar y observar todos dentro del plazo ya existente. Incertidumbre mantiene UNKNOWN.
- Arranque real: el F7 heredado invocaba Node directamente desde Bash. Resolución40bcd73b6a8d647998c8076ff5d3d3fe4170ca18 exige misma primitiva de arm/exec en F7 y harness, rol Source cerrado bootstrap-stdin, fd4 del Bash real, una selección inicial node/PATH setup-node, conservación de objeto fd3 e identidad/versión antes de helpers. Postludio Bash explícito para conservar la relación de creador.
- El implementador detectó además la necesidad de import json fijo en el hook privado L05; comprobar inclusión final.

Estos son motivos estáticos de corrección, sin resultados PASS observados. El paquete final, alcance, hashes, matriz, ejecución única y revisión acotada todavía deben verificarse. No se agregan casos, se cambia el presupuesto Native ni se habilita runtime. I3 y los siete no-acreditados permanecen abiertos/false.


Inspección posterior del paquete provisional ab2f1050: el nuevo exec_node(None) vuelve a seleccionar node/PATH también en la entrada anidada del harness. Esto contradice la selección inicial única y la conservación de fd3 ejercitada por current-image-retained/path-substitution. Root retuvo el gate y pidió separar un rol inicial F7 del stdin anidado que debe reutilizar fd3, compartiendo las mismas primitivas. Sin ejecutar Source; todos los hashes/candidatas de esa versión siguen provisionales hasta un paquete coherente corregido.
