import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

export function operationsDb() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../../worker/operations/schema.sql', import.meta.url), 'utf8'));
  let fault = -1;
  function prepare(sql) {
    const make = (args = []) => ({
      bind: (...values) => make(values),
      first: async () => sqlite.prepare(sql).get(...args) ?? null,
      all: async () => ({ results: sqlite.prepare(sql).all(...args) }),
      run: async () => ({ meta: { changes: sqlite.prepare(sql).run(...args).changes } }),
      execute: () => sqlite.prepare(sql).run(...args),
    });
    return make();
  }
  const db = { prepare, async batch(statements) {
    sqlite.exec('BEGIN');
    try {
      const rows = statements.map((statement, i) => {
        if (i === fault) throw new Error('synthetic storage fault');
        return { meta: { changes: statement.execute().changes } };
      });
      sqlite.exec('COMMIT'); return rows;
    } catch (error) { sqlite.exec('ROLLBACK'); throw error; }
  } };
  return { db, sqlite, failBatchAt: i => { fault = i; } };
}
