function normalizedEmail(value) {
  return String(value || '').trim().toLowerCase();
}

export function deriveCapsuleRole(user = {}, project = {}) {
  if (user.userId && project.userId && user.userId === project.userId) return 'owner';
  const userEmail = normalizedEmail(user.email);
  const maintainerEmail = normalizedEmail(project.maintainerEmail);
  if (userEmail && maintainerEmail && userEmail === maintainerEmail) return 'maintainer';
  return null;
}

export function maintainerApprovalRequired(project = {}) {
  const ownerEmail = normalizedEmail(project.ownerEmail);
  const maintainerEmail = normalizedEmail(project.maintainerEmail);
  if (ownerEmail && maintainerEmail && ownerEmail === maintainerEmail) return false;
  return Boolean(maintainerEmail) || project.control === 'provider';
}
