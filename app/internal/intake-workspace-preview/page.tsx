import { notFound } from 'next/navigation';
import { IntakeWorkspaceRehearsal } from '../../components/intake-workspace-rehearsal';

export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default function WorkspacePreview() {
  if (process.env.NODE_ENV !== 'development') notFound();
  return <IntakeWorkspaceRehearsal />;
}
