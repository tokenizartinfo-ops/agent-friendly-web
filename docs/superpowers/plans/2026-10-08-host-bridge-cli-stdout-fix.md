# Corrección residual CLI stdout: alcance y verificación

Parent integró implementación/recibo previos como330b479/e9b191c; revisión parent reportó P2 residual: finally elimina listener bridge antes de write(probeResult). Broken stdout produce EPIPE uncaught con stack/path en stderr.

Alcance exclusivo autorizado: script CLI, test propio y nuevos recibos/plan. Ningún cambio al módulo bridge/runner/transporte/store/runtime ni archivos parent. Sin HTTP, API, Max, schema o configuración. Fuente ordinaria y checkpoint preservados.

TDD: regresión real proceso hijo espera observe, destruye child.stdout y termina stdin. RED demuestra stderr EPIPE/Unhandlederror donde contrato exige vacío. Implementación mínima: guard process-owned stdout error desde antes del bridge, retenido toda vida proceso; escritura final await callback con errores/sync throw => exitCode1, sin mensajes. Guard no se retira al ejecutar bridge.close ni al concluir callback, porque error event puede llegar después. Success sigue probeResult exacto/exit0; fallos no retry.

Verificar focal canónica, lint scoped, suite completa y revisión exacta independiente antes commit/push. Guard no acredita readiness/adopción/cierre administrativo. Tests proceso son locales; no nueva evidencia remote cloud. Publicar solo nuevo commit a misma rama sin force, transferir únicamente este fix, sin repetir commits parent integrados.
