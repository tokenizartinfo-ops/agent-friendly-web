# Fuentes del recorrido público AFW

Estado: correcciones de fuente en PR640 para auditoría #639; publicación y ensayo privado se verifican por separado.

| Área | Fuente editable vigente | Evidencia o contrato |
| --- | --- | --- |
| Portada y recorrido humano | lib/home-copy.mjs + app/components/comic-home-intro.tsx | QA de portada compilada en Actions |
| Nombres públicos AF-0 a AF-5 | lib/maturity-copy.mjs | lib/methodology.mjs conserva scoring y etiquetas históricas v1 |
| Capacidades actuales para personas | lib/public-capability-copy.mjs, compartida por guía y FAQ | public/.well-known/agent-readiness.json conserva fechas y referencias |
| Preparación de datos | lib/intake-assistant.mjs + intake-assistant-prototype.tsx | test/public-journey-audit.test.mjs; revisión antes de aplicar |
| Comparación | readiness-comparison.tsx + lib/public-tools-copy.mjs | números de ejemplo o declarados; no verificación automática |
| Acceso y ayuda | serviceJourneyCopy en lib/home-copy.mjs; guía y pie | cuenta invitada, correo de invitación, hello@agentfriendlyweb.dev |
| Contacto desde auditoría | contact-intake.tsx + lib/contact-copy.mjs | captureEnabled=false muestra vista previa; no entrega por correo |
| Navegación | site-header.tsx + lib/site-copy.mjs | browser QA: teclado, foco, móvil, tres idiomas |
| Seguimiento privado y PC-off | issue497 y recibos primarios fechados | nunca se acredita por un build o por esta auditoría |

## Criterios para futuras ediciones
- Actualizar todas las traducciones en la misma entrega. La copia compartida evita que FAQ y guía declaren capacidades contradictorias.
- Cambiar una declaración de disponibilidad requiere evidencia del recurso correspondiente; una fecha antigua no prueba salud actual.
- Etiquetar explícitamente ejemplos, datos declarados y comprobaciones. No llamar “verificado” a una entrada manual.
- La guía pública no accede al expediente ni conserva la conversación. El asistente público no transfiere propuestas por sí solo.
- Los precios siguen sujetos a alcance; no hay tarifas automáticas ni checkout habilitado por estos cambios.
- No presentar una política de privacidad, retención o condiciones comerciales inventada. La documentación jurídica completa y el branding del login alojado por Cloudflare siguen como puntos específicos de #639; esta rama mejora la explicación previa y el contacto sin cambiar autenticación.
- Conservar los documentos históricos y sus fechas. Este índice orienta hacia la fuente actual, no reemplaza evidencia ni autoriza acciones.

## Verificación
GitHub Actions ejecuta regresión de guía/extracción, suite completa, lint, build y navegador sobre el artefacto compilado en runner efímero. El navegador no usa credenciales reales y bloquea solicitudes ajenas al GET aislado. La portada aprobada conserva imagen y estructura. Revisión independiente de la rama antes de integrar.
