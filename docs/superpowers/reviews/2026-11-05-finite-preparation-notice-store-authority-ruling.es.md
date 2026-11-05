# Ruling de contrato — reducción original y autoridad de avisos

5nov2026 · SOURCE ONLY. Task1 native preparation notice store; ejecución BASE7a2a1c1ffa66b21ae0aa8ad7d0a5ef0c4a2441be. Root leyó íntegramente lib/dossier-monitoring-authority.mjs fijado en ese BASE, tras hallazgo del implementer antes del test.

## Inconsistencia detectada

La spec/brief diseñados pedían createDossierMonitoringAuthorization con enabled=true después de CLOSE y enabled=false después de revokeGrant. El resolver original hace WHERE g.revoked_at='' en la consulta, if(!row)fail(), y catch vuelve a lanzar Error('Monitoring authorization unavailable'). Un grant original revocado no retorna DTO enabled=false; rechaza en forma cerrada. El resultado enabled=false corresponde a otros estados de consentimiento sobre grant aún válido. No son intercambiables.

## Ruling vinculante

Conservar intacta la autoridad ordinaria. El test nativo debe comprobar resolver real enabled=true tras CLOSE con grant aún activo; ejecutar observeGrant→revokeGrant originales; después comprobar rechazo nativo genérico saneado, junto con evento histórico conservado y ausencia de grants nuevos. Si la fixture expone metadata, usar authorization:'denied' o resolverRejected:true, sin presentarlo como DTO returned enabled=false del resolver. Ningún wrapper de autoridad nuevo ni cambio de contrato producto para satisfacer una expectativa errónea del diseño.

Esta corrección sustituye únicamente la expectativa de retorno posterior a revokeGrant en la spec/plan/brief. No amplía métodos/archivos/permisos ni cambia la definición de baja humana/cleanup. Motivo: probar el contrato real existente en vez de fabricar un resultado; costo si erróneo: review detectaría prueba de reducción incorrecta. Root comunicó el ruling al writer y exigió citarlo en el informe. Los tests de esta nueva unidad siguen pendientes; no repetir matrices previas por este hallazgo documental.

operationalReadiness=false;completePackage=false;PCoff=false. Resto del preflight y límites de la unidad sin cambios.
