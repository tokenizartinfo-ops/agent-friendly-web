import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AssistantExperience } from '../../asistente/page';
import { CapsulePageExperience } from '../../capsula/[projectId]/page';
import { SectorGuidePage } from '../../components/sector-guide-page';
import { LocalizedPublicPage } from '../../components/localized-public-page';
import { AgenticEvolutionExperience } from '../../evolucion-agentica/page';
import { DossierExperience } from '../../expediente/page';
import { PublicGuideExperience } from '../../guia/page';
import { MeasureImprovementExperience } from '../../medir-mejora/page';
import { HomeExperience } from '../../page';
import { RegistryProfileExperience } from '../../registry/[slug]/page';
import { RegistryExperience } from '../../registry/page';
import { localizedRouteMetadata } from '../../../lib/localized-route-metadata.mjs';
import { PUBLIC_PAGE_KEYS } from '../../../lib/public-page-copy.mjs';
import { resolveLocalizedRoute } from '../../../lib/site-i18n.mjs';

type Locale = 'en' | 'pt';
type Query = Record<string, string | string[] | undefined>;
type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams?: Promise<Query>;
};

export const dynamic = 'force-dynamic';

async function resolvedPage(params: PageProps['params']) {
  const { locale, slug = [] } = await params;
  return resolveLocalizedRoute(locale, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await resolvedPage(params);
  return resolved ? localizedRouteMetadata(resolved.routeKey, resolved.locale, resolved.params) as Metadata : {};
}

export default async function LocalizedRoutePage({ params, searchParams }: PageProps) {
  const resolved = await resolvedPage(params);
  if (!resolved) notFound();
  const locale = resolved.locale as Locale;
  const query = searchParams || Promise.resolve({});

  switch (resolved.routeKey) {
    case 'home': return <HomeExperience locale={locale} searchParams={query as Promise<{ site?: string | string[] }>} />;
    case 'guide': return <PublicGuideExperience locale={locale} />;
    case 'sectors': return <SectorGuidePage locale={locale} />;
    case 'evolution': return <AgenticEvolutionExperience locale={locale} />;
    case 'measurement': return <MeasureImprovementExperience locale={locale} />;
    case 'assistant': return <AssistantExperience locale={locale} />;
    case 'registry': return <RegistryExperience locale={locale} searchParams={query as Promise<{ q?: string | string[] }>} />;
    case 'registryProfile': return <RegistryProfileExperience locale={locale} params={Promise.resolve({ slug: resolved.params.slug })} searchParams={query as Promise<{ version?: string | string[] }>} />;
    case 'dossier': return <DossierExperience locale={locale} />;
    case 'capsule': return <CapsulePageExperience locale={locale} projectId={resolved.params.projectId} />;
    case 'aeo':
    case 'methodology':
    case 'openKnowledge':
    case 'cli':
    case 'mcp':
    case 'externalVerification':
    case 'tokenizartCase':
    case 'siteMap':
      return <LocalizedPublicPage pageKey={resolved.routeKey} locale={locale} />;
    default:
      if (PUBLIC_PAGE_KEYS.includes(resolved.routeKey)) return <LocalizedPublicPage pageKey={resolved.routeKey} locale={locale} />;
      notFound();
  }
}
