# AFW: restauración en contexto cloud nuevo — 5 de octubre de 2026

Contexto creado mediante Editar desde AFW Operations publicado, sin editar ni publicar el nuevo borrador. Chat01a10dff-7920-7147-80be-a0d97f5fa01d; turno01a10dff-ef5f-739a-bb2e-c1389e88378d. Inspección read-only21:37:24–21:37:51UTC. No solicitudes a servicios, SQL, deploys, correo ni acceso a valores de secretos.

Comandos reales, stdout revisado independientemente: HEAD a4d90d438cb5ebca855e46637aff91ec45610b9f, origin https://github.com/tokenizartinfo-ops/agent-friendly-web.git, status limpio; todos exit0. Sin fetch/checkout/reset. Es el snapshot publicado antes del merge documental52616d6, no main dinámico.

Runtime source_config_version_id y draft base_version_id coinciden en cecfgver_6ac41173a26881a38f28fd5b48c10100; diferente de la instancia anterior cecfgver_6ac40d5f413081a3b3ca29b2d7f0e098. Draft revisión1 y ref coincide con HEAD. environment_status final informa running, observations_current=true, política enforced, spec/observed5/5. Los cuatro bindings existentes tienen has_saved_binding=true y ready, scope environment, destinos exclusivos mail-consumer-canary.agentfriendlyweb.dev y operations-manager.agentfriendlyweb.dev. Metadata de readiness no acredita autorización remota ni vigencia del token.

Esta aceptación cierra restauración del snapshot en un contexto nuevo de configuración; no acredita por sí sola ejecución programada ni guardia estable. El ensayo funcional y PC-off tienen recibos separados. Servicio y credencial permanecen cerrados. Pendientes: POST humano CSRF remoto soportado y ciclo de vida estable con revocación/presupuesto/journal antes de promover. No renovar automáticamente el piloto ni repetir pruebas aceptadas.
