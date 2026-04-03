import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';
import { useCases } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;

export const metadata: Metadata = {
  title: 'AI Coding Use Cases | How Developers Use AI Tools',
  description: `Explore ${useCases.length}+ AI coding use cases. From code generation to security audits, learn how AI tools handle every development task and see their system prompts.`,
  alternates: { canonical: `${BASE_URL}/use-cases` },
  openGraph: {
    title: 'AI Coding Use Cases | How Developers Use AI Tools',
    description: `${useCases.length}+ AI coding use cases explained with recommended tools and verified system prompts.`,
    type: 'website',
    url: `${BASE_URL}/use-cases`,
    siteName: SITE_NAME,
  },
};

export default function UseCasesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: `${BASE_URL}/use-cases` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <Zap className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Use Cases</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI Coding <span className="text-accent-primary">Use Cases</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              Explore how AI coding tools handle every development task. From code generation to security audits — see the system prompts that power them.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="glass-panel p-6 hover:border-accent-primary/40 transition-all group flex flex-col"
              >
                <h2 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
                  {uc.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                  {uc.description}
                </p>
                <span className="flex items-center gap-2 font-technical text-xs text-accent-primary tracking-wider">
                  EXPLORE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">DIVE DEEPER</p>
            <h2 className="text-3xl font-bold mb-4">Browse AI Tool System Prompts</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              See exactly how AI coding tools are configured for all these use cases with verified, reverse-engineered system prompts.
            </p>
            <Link href="/" className="btn-premium">Browse System Prompts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
