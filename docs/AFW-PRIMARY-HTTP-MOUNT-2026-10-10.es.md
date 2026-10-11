# Montaje HTTP propio cerrado

La fuente del Worker `agent-friendly-web-independent-closure-qa` compone el adaptador de admisión primaria en las rutas de ocurrencias del origen fijo `operations-manager.agentfriendlyweb.dev`. `AFW_QA_HTTP_ENABLED` está desactivado; no se desplegó ni se habilitó el servicio remoto en este bloque.

La configuración JSON procede del servidor y conserva el fingerprint efectivo de política, identidad y aprobación. No se deriva de URL, cuerpo ni selección del cliente. La ausencia de D1 propio, preregistro o limitador dedicado impide admitir solicitudes. El límite configurado es diez consultas por minuto en un namespace propio, sin contador de memoria alternativo. El JWT debe ser de servicio, firmado contra el JWKS del dominio Access configurado; una identidad de navegador o de otro servicio se rechaza.

Los lectores sin parámetros consultan `own-qa` en el mismo preregistro: `readOwnAdmissionScope` para actividad y `readOwnClosureScope` para cierre documental. Sus resultados se copian y liberan; cambios de configuración o bindings durante la lectura invalidan la solicitud. No existe fallback a aprobación D1 sola. El vencimiento desactiva el recorrido; la recuperación administrativa posterior permanece separada.

El ensayo workerd ejecuta el Worker montado, firmas RS256, consulta JWKS sintética, D1 y limitador nativos, seis fases y rechazos de identidad ajena, pins distintos y autoridad retirada. Su lector primario es una fixture declarada. El ensayo nativo de bootstrap separado comprueba originales, desafío y consumo sobre la implementación primaria real. Estos dos ensayos no equivalen todavía a un recorrido integrado remoto con originales reales.

Pendiente: unir ambos ensayos con una única autoridad primaria real, montar el dispatcher alojado soportado y el canal administrativo de cierre/recuperación, comprobar custodia y adopción cloud ordinaria. Después corresponde una ocurrencia propia con PC encendida y el ensayo acordado con PC apagada. No hay scheduler ni guardia permanente acreditados; Max conserva preview, aprobación y consentimiento.
