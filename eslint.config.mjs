import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    '.vinext/**',
    '.worktrees/**',
    '.wrangler/**',
    'dist/**',
    'drizzle/meta/**',
    'out/**',
    'build/**',
    'work/**',
    'output/**',
    'outputs/**',
    '.playwright-cli/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
