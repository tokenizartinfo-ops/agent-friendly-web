# CLI stdout residual P2: recibo local saneado

Base propia d8dc04cb5c56d50561c74c2a6645f49a4500a432; parent ya integró originales como330b479/e9b191c. Transferir SOLO nuevo fix, no originales ni dependencias.

RED real: proceso CLI hijo emite observe; host destruye stdout y termina stdin. La escritura final posterior a bridge.close produce Unhandled error/EPIPE y stack en stderr, que debe ser vacío. Recibo RED reemplaza ruta temporal por `<synthetic-repo>`; sin secretos/contexto privado.

GREEN: guard stdout process-owned desde inicio, conserva listener durante/después finalwrite callback. Callback/error event/throw síncrono solo fija exit1 sin logging. Await finalwrite callback; sin retry ni nuevo frame. Test real brokenpipe exit1/stderr vacío y normal metadata CLI exit0/envelope exacto pasan.

Focal34/34; full1218pass/1skip/0fail (57.14s); eslint scoped scripts/test exit0/sin diagnósticos. Focal/suite con mecanismo soportado por comando network.enabled=true y test-isolation=none para focal; restricted/enforced/proxy/TLS intactos; después use_default. Reviewer exacto cerró P2/sin nuevos P1/P2. Su corrida restricted independiente pasó brokenpipe pero normalCLI falló; no se contabiliza como green ni se afirma causa confirmada. Recibo supported34/34 provee verificación de ambos caminos bajo mecanismo autorizado.

Solo script/test propios y nuevos recibos/plan; módulo bridge/store/runner/transporte/runtime/archivos parent no cambiados. Estado supported leído23/23/current/restricted-enforced/diez custodiasready. No API HTTP/SQL remoto/config/permisos persistentes/Max/mount/scheduler. Fuente ordinaria8eecaac/checkout ajeno conservados, checkpoint no borrado. No readiness de rama preparada/adopción/PC-off/cierre administrativo ni persistencia entre instancias. Push solo misma rama sin force; revisión parent/merge separados.
