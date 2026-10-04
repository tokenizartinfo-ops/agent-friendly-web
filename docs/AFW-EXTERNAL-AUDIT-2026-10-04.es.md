# Auditoría externa y DNSSEC — 4 de octubre

PROJECT AFW; REPOSITORY agent-friendly-web; ENVIRONMENT production public read-only; ORIGIN https://agentfriendlyweb.dev. Proveedor https://isitagentready.com/mcp, herramienta scan_site, perfiles originales sin modificar comprobaciones. Consultas13:25:10–13:25:22UTC /10:25Argentina. No cambios remotos de DNS, documentos públicos o datos privados.

| Perfil | Nivel externo | PASS | FAIL |
| --- | --- | --- | --- |
| all | 5/5 Agent-Native | 12 | 4 |
| content | 5/5 Agent-Native | 6 | 1 |
| apiApp | 5/5 Agent-Native | 12 | 4 |

Sin variación frente al recibo del2deoctubre. Fallos all/apiApp: dnsAid, oauthDiscovery, oauthProtectedResource, authMd; content solo dnsAid. La API no devolvió puntuación numérica. No convertir estos conteos en porcentaje ni actualizar por inferencia el73/100 histórico del owner.

Respuestas locales ignoradas: output/external-audit-2026-10-04T13-25-01-993Z. SHA256 all1366ef650ad4a795ee005aa522c16eb33bda08a348fd7e1e868c4dbd4c0d903b; content4c2526df45d451c31d523de41e9c31a12820317eb85a62c9b980c205fbf88047; apiApp16e579d86a471e2397bcf1c215f1e2cfefb890e36e370f95b626550fbc44c109.

## DNSSEC: investigación del registrador

GET de DNSSEC de la zona AFW devuelve pending. Consulta pública Google DNS de DS devuelve Status0 y cero registros DS. ADtrue corresponde a la ausencia autenticada del registro DS; no acredita cadena DNSSEC de AFW ni validación del SVCB. La ausencia ya constaba en las lecturas anteriores y no se resolvió con la espera.

[Cloudflare Registrar](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/) indica publicación automática mediante CDS/CDNSKEY y un plazo habitual de uno o dos días. La persistencia observada amerita investigación con el registrador. No desactivar/reactivar DNSSEC ni introducir DS arbitrarios para forzar la auditoría.

Borrador técnico de incidencia: «agentfriendlyweb.dev mantiene DNSSEC pending y carece de DS en el padre, confirmado el4deoctubre13:25UTC; también consta en lecturas anteriores. Solicitamos comprobar la recolección de CDS/CDNSKEY y el envío de DS al registro. No hemos alternado DNSSEC ni cambiado nameservers para eludir el problema. Por favor confirmar la causa y el siguiente paso sin interrumpir la resolución actual». Este texto está preparado; no acredita envío ni respuesta de soporte.

Investigación adicional: Registrar confirma current_registrarCloudflare, cloudflare_registrationtrue y registrationActive, pero informa cloudflare_dnsfalse y using_current_registrar_nameserversfalse. Sus name_servers coinciden con los de la zona activa y con la lectura pública NS: betty.ns.cloudflare.com y kaiser.ns.cloudflare.com. CDS y CDNSKEY están publicados, ADfalse; ds_records de Registrar está vacío. Hay una discrepancia de indicadores administrativos para investigar, no una causa raíz confirmada ni evidencia de nameservers incorrectos. Incluir esos indicadores en la incidencia y solicitar reconciliación de estado y publicación DS. No cambiar nameservers, contactos, privacidad ni bloqueo de transferencia para resolverla por inferencia.

## Orden siguiente

Recuperación del copilot ya aceptada desde ChatGPT (AFW-RECOVERY-CLOUD-ACCEPTANCE-2026-10-04.es.md). Completar disponibilidad/monitoreo del servicio real y registro estable de clientes; solo entonces publicar metadata OAuth, protected resource y auth.md describiendo servicio disponible. No enlazar el apex hacia canary o piloto cerrado para satisfacer las comprobaciones. Repetir auditoría después de cambios efectivos, sin prometer100/100.
