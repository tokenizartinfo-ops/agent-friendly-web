'use client';

import { useEffect } from 'react';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { createPublicAuditWebMcpTool } from '../../lib/public-webmcp.mjs';

type ModelContext = {
  registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => Promise<unknown> | unknown;
};

export function PublicWebMcpRegistration() {
  useEffect(() => {
    const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!modelContext || typeof modelContext.registerTool !== 'function') return undefined;
    const controller = new AbortController();
    Promise.resolve(
      modelContext.registerTool(createPublicAuditWebMcpTool(), { signal: controller.signal }),
    ).catch(() => {
      // Experimental browser support may reject registration; the human page remains usable.
    });
    return () => controller.abort();
  }, []);
  return null;
}
