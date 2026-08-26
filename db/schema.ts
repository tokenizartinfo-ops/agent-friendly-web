import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const siteProjects = sqliteTable(
  'site_projects',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    ownerEmail: text('owner_email').notNull(),
    organization: text('organization').notNull().default(''),
    website: text('website').notNull().default(''),
    role: text('role').notNull().default(''),
    siteType: text('site_type').notNull().default(''),
    control: text('control').notNull().default('unknown'),
    audience: text('audience').notNull().default(''),
    goalsJson: text('goals_json').notNull().default('[]'),
    languagesJson: text('languages_json').notNull().default('[]'),
    cms: text('cms').notNull().default(''),
    hosting: text('hosting').notNull().default(''),
    notes: text('notes').notNull().default(''),
    status: text('status').notNull().default('draft'),
    completion: integer('completion').notNull().default(0),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    index('site_projects_user_updated_idx').on(table.userId, table.updatedAt),
  ],
);

export const projectEvents = sqliteTable(
  'project_events',
  {
    id: text('id').primaryKey(),
    projectId: text('project_id').notNull(),
    userId: text('user_id').notNull(),
    type: text('type').notNull(),
    payloadJson: text('payload_json').notNull().default('{}'),
    createdAt: text('created_at').notNull(),
  },
  (table) => [index('project_events_project_created_idx').on(table.projectId, table.createdAt)],
);
