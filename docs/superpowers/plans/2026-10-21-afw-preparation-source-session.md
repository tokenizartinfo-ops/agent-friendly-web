# Plan: entrada de sesión privada AFW
> Ejecutar inline con executing-plans; un reviewer final de contexto fresco; sin agentes implementadores.
Spec: ../specs/2026-10-21-afw-preparation-source-session.md
Owner delegó decisiones rutinarias y encadenamiento; no se repite aprobación de plan. Permisos/despliegue reales conservan sus gates.
PROJECT AFW; REPOSITORY tokenizartinfo-ops/agent-friendly-web; ENVIRONMENT source-only/GitHub Actions; ORIGIN futuro https://preparation-canary.agentfriendlyweb.dev; RESOURCE_TYPE branch/PR; ALLOWED_ACTION source/tests/merge; ROLLBACK revert reviewed PR.
1. RED con assertion de factory ausente ANTES de bundle; fixture workerd con JWT RS256 real, clave pública efímera y env sin DB.
2. Implementar host detached y view simple; verificar defaultoff, noBODY/DB, paths/métodos, firma/audiencia/exp/subject, ventana, límite, drift y espera original5s.
3. Focal nativo y full CI/lint/cinco builds en Actions. Sin npm/local/build ni procesos persistentes del owner.
4. Una revisión integral fresca. Important/Critical: una reparación RED→GREEN; Minor registrar; sin bucle de revisión.
5. Merge con SHA esperado, verificar main y actualizar497/checkpoint. No publicación ni sesión real por inferencia.
Cierre visual remoto1440/390, teclado/reducedmotion sigue pendiente antes de publicar; las pruebas HTML no sustituyen una pantalla observada.
