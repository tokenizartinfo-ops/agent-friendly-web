-- Private source D1 only. Explicit owner reading acknowledgement, not acceptance.
-- Append-only: no automatic insert from GET, render, generation or delivery.
CREATE TABLE IF NOT EXISTS assistance_goal_read_confirmations (
 project_id TEXT NOT NULL,
 user_id TEXT NOT NULL,
 source_event_id TEXT NOT NULL,
 proposal_id TEXT NOT NULL,
 revision INTEGER NOT NULL CHECK(revision>0),
 request_id TEXT NOT NULL,
 confirmed_at INTEGER NOT NULL CHECK(confirmed_at>=0),
 PRIMARY KEY(proposal_id,user_id),
 UNIQUE(project_id,request_id)
);
