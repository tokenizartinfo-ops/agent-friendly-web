CREATE TABLE IF NOT EXISTS dossier_supervision_cursors (
 project_ref TEXT PRIMARY KEY, revision INTEGER NOT NULL CHECK(revision>0), updated_at INTEGER NOT NULL
);
