# Plan inline: identidad original por nombre fijo

Base13cecc2ad1afd8c78281e43bf436286fb5940db8, PR409 candidate/main CI1725pass0fail1skip aceptados. Fuente preparatoria para despliegue cerrado propio.

1. RED: modo nombrado exclusivamente servidor, resolver binding original sin get/fetch/boot; rechazar nombre variable, ID desde policy mezclada y cambio de función/binding.
2. Implementar constante de un intento y política normalizada con ID de plataforma. Mantener modo explícito y guardas de configuración/currentScope/ctx original.
3. Pruebas nativas workerd: ID de namespace real coincide en DO/RPC, sin Container, flags cerradas y sin escrituras/monitoring. Focus y lint; un reviewer fresco global, sin re-review loops.
4. CI exacta/merge/main; luego construir revisión aceptada y publicar canary cerrado con bindings/rutas/permisos originales, rollback comprobable y sin claves/propósito activado. Wrangler4.149 explicit manageddryrun ya aprobado sin tocar dependencia del repositorio.
