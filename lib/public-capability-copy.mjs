// Shared human-facing summary; dated deployment evidence stays in agent-readiness.json.
export const PUBLIC_CAPABILITY_COPY = Object.freeze({
  "es": {
    "simple": "La CLI, el MCP y el A2A públicos están disponibles en modo de solo lectura. El seguimiento privado y las acciones sobre un sitio requieren verificaciones separadas.",
    "standard": "El descubrimiento, auditor, Registry, OKF, skill, CLI, MCP y A2A públicos están desplegados. A2A permite diagnóstico público de solo lectura. El acompañamiento privado continuo, los pagos y las modificaciones remotas todavía no están habilitados como servicio general.",
    "detailed": "El A2A público ofrece operaciones acotadas de diagnóstico, con límites y evidencia en el manifiesto de capacidades. No concede acceso a expedientes ni instala archivos, cobra o modifica sitios. Las herramientas WebMCP públicas también son de solo lectura; no habilitan acciones transaccionales. El seguimiento privado exige consentimiento, entrega comprobada y retirada verificable."
  },
  "en": {
    "simple": "Public CLI, MCP and A2A are available in read-only mode. Private monitoring and website actions require separate verification.",
    "standard": "Public discovery, audit, Registry, OKF, skill, CLI, MCP and A2A are deployed. A2A provides read-only public diagnostics. Continuous private assistance, payments and remote changes are not yet enabled as a general service.",
    "detailed": "Public A2A offers bounded diagnostic operations, with limits and evidence in the capability manifest. It does not grant dossier access, install files, charge or change websites. Public WebMCP tools are also read-only; they do not enable transactional actions. Private monitoring requires consent, confirmed delivery and verifiable withdrawal."
  },
  "pt": {
    "simple": "CLI, MCP e A2A públicos estão disponíveis em modo somente leitura. O acompanhamento privado e as ações sobre sites exigem verificações separadas.",
    "standard": "Descoberta pública, auditor, Registry, OKF, skill, CLI, MCP e A2A estão implantados. A2A permite diagnóstico público somente leitura. Acompanhamento privado contínuo, pagamentos e mudanças remotas ainda não estão habilitados como serviço geral.",
    "detailed": "O A2A público oferece operações limitadas de diagnóstico, com limites e evidências no manifesto de capacidades. Não concede acesso a dossiês nem instala arquivos, cobra ou modifica sites. As ferramentas WebMCP públicas também são somente leitura; não habilitam ações transacionais. O acompanhamento privado exige consentimento, entrega comprovada e retirada verificável."
  }
});
