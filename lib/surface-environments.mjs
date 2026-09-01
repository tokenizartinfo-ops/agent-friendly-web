const allowedHostingConfigs = new Set([
  '.openai/hosting.json',
  '.openai/hosting.contact-staging.json',
]);

function readSitesSurface(manifest, target) {
  const surface = manifest?.surfaces?.[target];
  if (!surface || !String(surface.kind || '').startsWith('sites_') || !surface.projectId) {
    throw new Error(`sites_target_not_supported:${target}`);
  }
  return surface;
}

export function getSitesHostingConfigPath(manifest, target) {
  const surface = readSitesSurface(manifest, target);
  if (!allowedHostingConfigs.has(surface.hostingConfig)) {
    throw new Error(`sites_hosting_config_invalid:${target}`);
  }
  return surface.hostingConfig;
}

export function assertSitesTarget(manifest, hosting, target) {
  const surface = readSitesSurface(manifest, target);
  if (hosting?.project_id !== surface.projectId) {
    throw new Error(`sites_target_mismatch:${target}`);
  }
  return {
    target,
    origin: surface.origin,
    projectId: surface.projectId,
  };
}
