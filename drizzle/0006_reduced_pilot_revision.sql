ALTER TABLE `site_projects` ADD `revision` integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
-- Fence older runtimes that do not increment revision after a rollback.
CREATE TRIGGER `site_projects_legacy_revision_fence`
AFTER UPDATE ON `site_projects`
WHEN NEW.`revision` = OLD.`revision`
BEGIN
  UPDATE `site_projects` SET `revision` = OLD.`revision` + 1 WHERE `id` = NEW.`id`;
END;
