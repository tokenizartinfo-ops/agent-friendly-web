# Expediente propio AFW creado para preparar el piloto real

3 de octubre de 2026. En Chrome habitual, sesión privada vigente en agentfriendlyweb.dev/expediente. Los tres expedientes listados antes de crear estaban rotulados QA/sintético. No se reclasificaron ni sobrescribieron como clientes reales.

Se usó «Crear otro expediente» → «Crear expediente separado», con únicamente identidad pública comprobada: organización Agent Friendly Web y sitio https://agentfriendlyweb.dev/. UI confirmó «Expediente creado», y abrir el enlace recuperó esos dos campos guardados. Nuevo proyecto: `project-06a83cc2e8cc9a4f38e854c60b265ac8d2fee6bd358633e49a6088f3ed172f82`. Es un borrador del propio sitio, no un cliente externo ni una simulación de Sector de Sistemas.

La guía continúa con «¿A quién querés ayudar con tu sitio?». Datos básicos guardados 2/6. No se completaron otros hechos por inferencia, ni se disparó auditoría, verificación de dominio, publicación, cápsula o permiso OAuth. Los expedientes QA anteriores permanecen separados. Captura local ignorada output/afw-real-draft-20261003.png; pestaña conservada para revisión del owner.

Próximo paso: usar este proyecto como candidato para el límite server-side del piloto de lectura real, después de verificar los recursos separados, la identidad Access y el consentimiento específico. Su existencia no autoriza a ChatGPT a leerlo. El límite y preflight están integrados por PR189/main60563b6, con721 pruebas y CI aprobado; aún no publicados en un servicio real. El canary sintético permanece cerrado.
