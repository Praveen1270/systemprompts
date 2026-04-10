import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart2, ArrowRight } from 'lucide-react';
import { tools, generateComparisonPairs, generateComparisonSlug } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;
const OG_IMAGE = `${BASE_URL}${DEFAULT_PSEO_CONFIG.defaultOgImage}`;

export const metadata: Metadata = {
  title: 'AI Coding Tool Comparisons | Side-by-Side Reviews',
  description:
    'Compare AI coding tools: Cursor vs Claude Code, Copilot vs Windsurf, and more. Verified system prompts and feature breakdowns to pick the right workflow.',
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: {
    title: 'AI Coding Tool Comparisons | Side-by-Side Reviews',
    description:
      'Head-to-head comparisons of top AI coding tools. Verified system prompts and feature breakdowns.',
    type: 'website',
    url: `${BASE_URL}/compare`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'AI coding tool comparisons on SystemPrompts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Coding Tool Comparisons | Side-by-Side Reviews',
    description:
      'Head-to-head comparisons of top AI coding tools. Verified system prompts and feature breakdowns.',
    images: [OG_IMAGE],
  },
};

export default function CompareIndexPage() {
  const pairs = generateComparisonPairs(tools);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${BASE_URL}/compare` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI Coding Tool Comparisons',
    description: 'Comprehensive comparisons of AI coding tools',
    numberOfItems: pairs.length,
    itemListElement: pairs.slice(0, 20).map(([a, b], idx) => {
      const tool1 = tools.find((t) => t.slug === a);
      const tool2 = tools.find((t) => t.slug === b);
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: `${tool1?.name} vs ${tool2?.name}`,
        url: `${BASE_URL}/compare/${generateComparisonSlug(a, b)}`,
      };
    }),
  };

  // Group by category for better UX
  const sameCategoryPairs = pairs.filter(([a, b]) => {
    const t1 = tools.find((t) => t.slug === a);
    const t2 = tools.find((t) => t.slug === b);
    return t1?.categorySlug === t2?.categorySlug;
  });

  const crossCategoryPairs = pairs.filter(([a, b]) => {
    const t1 = tools.find((t) => t.slug === a);
    const t2 = tools.find((t) => t.slug === b);
    return t1?.categorySlug !== t2?.categorySlug;
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <BarChart2 className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Side-by-Side</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI Tool <span className="text-accent-primary">Comparisons</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              {pairs.length}+ head-to-head comparisons of AI coding tools. Compare system prompts, features, and capabilities to find the best tool for your workflow.
            </p>
          </header>

          {/* Same-category comparisons */}
          {sameCategoryPairs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Same-Category Comparisons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sameCategoryPairs.map(([a, b]) => {
                  const t1 = tools.find((t) => t.slug === a);
                  const t2 = tools.find((t) => t.slug === b);
                  if (!t1 || !t2) return null;
                  return (
                    <Link
                      key={`${a}-${b}`}
                      href={`/compare/${generateComparisonSlug(a, b)}`}
                      className="glass-panel p-5 hover:border-accent-primary/40 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-technical text-[10px] tracking-widest text-text-muted">{t1.category}</span>
                        <ArrowRight className="w-3 h-3 text-accent-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h2 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                        {t1.name} <span className="text-text-muted">vs</span> {t2.name}
                      </h2>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Cross-category comparisons */}
          {crossCategoryPairs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Cross-Category Comparisons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {crossCategoryPairs.map(([a, b]) => {
                  const t1 = tools.find((t) => t.slug === a);
                  const t2 = tools.find((t) => t.slug === b);
                  if (!t1 || !t2) return null;
                  return (
                    <Link
                      key={`${a}-${b}`}
                      href={`/compare/${generateComparisonSlug(a, b)}`}
                      className="glass-panel p-5 hover:border-accent-primary/40 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-technical text-[10px] tracking-widest text-text-muted">{t1.category} vs {t2.category}</span>
                        <ArrowRight className="w-3 h-3 text-accent-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h2 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                        {t1.name} <span className="text-text-muted">vs</span> {t2.name}
                      </h2>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <div className="glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">SOURCE OF TRUTH</p>
            <h2 className="text-3xl font-bold mb-4">See the System Prompts Behind Each Tool</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Our comparisons are backed by verified system prompts — the actual instructions that define how each AI tool behaves.
            </p>
            <Link href="/" className="btn-premium">Browse System Prompts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
