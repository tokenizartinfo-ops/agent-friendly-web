# Auditoría externa AFW: 3 de octubre de 2026

Proveedor isitagentready.com/mcp, scan_site sobre https://agentfriendlyweb.dev, perfiles predeterminados. Observación16:16:12–16:16:25UTC (13:16 Buenos Aires): all y apiApp nivel5/5 Agent-Native,12PASS/4FAIL; content nivel5/5,6PASS/1FAIL. NumericScore null: no actualiza el73/100 histórico declarado por el owner ni acredita100/100.

Fallos: dnsAid, oauthDiscovery, oauthProtectedResource, authMd. Sin cambio respecto de la auditoría posterior a A2A del2deoctubre. Recibos completos ignorados en output/external-audit-2026-10-03T16-16-04-717Z; SHA256 all73d9d2ab65c44e9bfa4bba3ed0b05f9b38f821453aaf0c8983ceb85e05793936, content52f89f947e652e2b13aa3121f5b991ff8395e3b8288e6bf3b4dd06a89952caf1, apiApp b8effec618ed9aee51eb87fcfdeb6c014dcff06b50cf9b5f3e1ff95814eb65b5.

DNS-AID ya tiene un registro reconocido; la brecha sigue en su validación DNSSEC. Firma pending desde29septiembre; DS público ausente, Registrar Cloudflare ds_records vacío. No resolver con otro archivo ni reiniciar firma. El diagnóstico anterior ya había agotado la espera documentada de uno o dos días. Preparar escalamiento específico a Registrar preservando firma y dominio.

OAuth permanece condicionado al servicio real de lectura de expedientes con ChatGPT, selección/consentimiento, PKCE y revocación. No publicar descriptores para subir la puntuación antes de aceptarlo. El piloto local anterior no acredita interoperabilidad de ChatGPT.

Texto de soporte preparado, sin envío acreditado: «agentfriendlyweb.dev está registrado en Cloudflare Registrar. DNSSEC figura pending desde2026-09-29T20:32:11UTC. El3deoctubre la zona mantiene DNSKEY y registros firmados, pero DS público no devuelve Answer y Registrar muestra ds_records vacío. La UI solo ofreció desactivar; no hemos desactivado ni reiniciado la firma. Solicitamos revisar la publicación automática del DS al registro .dev y la operación retenida/fallida, manteniendo la firma vigente. Cierre esperado: DS correspondiente, SVCB autenticado y dnsAid PASS».

Fuentes: [auditor](https://isitagentready.com/), [DNSSEC Registrar](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/), [estados DNSSEC](https://developers.cloudflare.com/dns/dnssec/dnssec-states/). La subida cloud aceptada se registra separadamente en AFW-CLOUD-CANARY-ACCEPTANCE-2026-10-03.es.md; no mejora por sí sola esta auditoría.
