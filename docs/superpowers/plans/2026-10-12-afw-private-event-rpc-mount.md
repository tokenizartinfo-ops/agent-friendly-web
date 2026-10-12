# Plan inline: RPC/DO/OAuth concretos cerrados

Basecf151eccc3fc4e8cd020d052d0ec2311981c4fbf, PR408 candidatoCI1713pass0fail1skip; mainCI38204341344 pendiente antes de aceptación final. Fuente autorizada; no acciones de Max ni despliegue aún.

1. RED broker: cerrado antes deps, pins OAuth/owner/proyecto/recurso/window/DO y drift; llamadas del selector al DO fijo y consultas primarias reales.
2. Implementar política/config de host y broker RPC; clase DO con ctx original y WorkerEntrypoint de consume con props de servidor; fetch DO deniega, deliverSaved solo interno.
3. Opt-in de eventsAuthorityFactory en el mismo host OAuth, manteniendo lectura/rate limit/identidad; pruebas de MCP default cerrado y factory solo con contexto validado.
4. Bundle independiente incorpora producto Node/revisión y config local placeholder cerrada; native workerd clases/RPC cerrado + build/dry-run sin Docker ni despliegue.
5. Un revisor fresco global, corregir Important RED→GREEN sin re-review loop. Focus/lint/build/exactcandidate/main CI; ledger y publicación cerrada próxima con baseline/rollback propios.
6. Propósito/cliente/callback/revisión cloud real y retiro/cierre antes de PC-off. No inventar scheduler ni activar guardia permanente.
