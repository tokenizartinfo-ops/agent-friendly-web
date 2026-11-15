# AFW R3 — límites medidos del paquete full104

Fecha: 2026-11-15. Complementa ed0fd9d72fe880322265302195be71b80de7b027. Solo DATA de ronda3, sin Source/ref/run ni candidata liberada.

Medida coherente comunicada por el implementador: raw 486.645 B, gzip 120.115 B, base64 160.156 caracteres. Con prefijo completo 1.748.092 B, el SAME mínimo sería 1.908.248 B antes de delimitadores y metadatos. Los límites anteriores raw400500/gzip98304/base64131072/SAME1800000 no contienen el paquete completo. No se recortó código/historia ni cambiaron104/killsets/relojes. Los33helpers tienen máximo31.746 B; entradas delivery23.898/controls23.943/missing24.015; kernel16.025; outer25.947. Todos siguen bajo32.768.

Root autoriza SOLO estos límites del contenedor completo de full104:

- Raw: 524.288 B (512 KiB).
- Gzip: 131.072 B (128 KiB).
- Base64: 174.764 caracteres, tamaño máximo canónico para131.072 bytes comprimidos.
- SAME completo: 2.000.000 B, conservando el prefijo entero y el nuevo bloqueR3 con delimitadores/metadatos; no duplicar accidentalmenteR2.

Permanecen helper/pieza32.768, bootstrap_program65.536, workflow73.728, report24.576, demás límites de IO y todos los tiempos/casos/harness/Native/job. La copia del BINARIO Node mantiene su tipo distinto256MiB/chunk1MiB/cutoff cooperativo15s. Estos límites no se mezclan con módulos o publicación.

Regenerar coherentemente constantes de decode/longitud/SAME y metadatos/pins afectados. Una lectura históricaR2 mantiene sus pins y límites históricos; no reinterpretar otra generación. Medir F7 final y SAME con todos los metadatos ANTES de candidata. Si otro tipo excede su límite o este paquete final supera cualquiera de los nuevos límites, retener y comunicar la medida; ninguna ampliación implícita. Los nuevos límites tienen margen sobre datos reales, no alteran guardas, expectativas o sensibilidad de rechazo.

Se permite completar DATA/candidata hija92cf777de8a109aa42ca73d9b33b27c74226abde yreadbacks cuando todo quede dentro de los límites; gateRoot separado necesario para una sola ocurrencia de controles, seguida de restauración y revisión acotada. No califica I3, Native, producto listo oPCoff. Los siete no-acreditados false.
