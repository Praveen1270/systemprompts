import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { glossaryTerms } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;
const OG_IMAGE = `${BASE_URL}${DEFAULT_PSEO_CONFIG.defaultOgImage}`;

export const metadata: Metadata = {
  title: 'AI & LLM Glossary | Prompt Terms Explained',
  description: `Glossary of AI, LLM, and prompt engineering terms—system prompts, tokens, context windows, agents, and more. ${glossaryTerms.length}+ terms explained.`,
  alternates: { canonical: `${BASE_URL}/glossary` },
  openGraph: {
    title: 'AI & LLM Glossary | Prompt Terms Explained',
    description: `${glossaryTerms.length}+ AI and LLM terms explained simply. From system prompts to RAG and context windows.`,
    type: 'website',
    url: `${BASE_URL}/glossary`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'AI and LLM glossary on SystemPrompts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & LLM Glossary | Prompt Terms Explained',
    description: `${glossaryTerms.length}+ AI and LLM terms explained simply. From system prompts to RAG and context windows.`,
    images: [OG_IMAGE],
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'AI & LLM Glossary',
  description: 'A comprehensive glossary of AI, LLM, and prompt engineering terms for developers.',
  url: `${BASE_URL}/glossary`,
  hasDefinedTerm: glossaryTerms.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
    url: `${BASE_URL}/glossary/${t.slug}`,
  })),
};

export default function GlossaryIndexPage() {
  const alphabetical = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          {/* Header */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <BookOpen className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Reference</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              AI & LLM <span className="text-accent-primary">Glossary</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              {glossaryTerms.length}+ essential AI, LLM, and prompt engineering terms explained for developers. From system prompts to RAG, tokens to fine-tuning.
            </p>
          </header>

          {/* Terms grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alphabetical.map((entry) => (
              <Link
                key={entry.slug}
                href={`/glossary/${entry.slug}`}
                className="glass-panel p-6 hover:border-accent-primary/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                    {entry.term}
                  </h2>
                  <span className="font-technical text-[10px] tracking-widest text-accent-primary/60 uppercase bg-accent-primary/5 px-2 py-1 rounded flex-shrink-0">
                    TERM
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                  {entry.definition}
                </p>
                {entry.relatedTerms.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {entry.relatedTerms.slice(0, 2).map((slug) => {
                      const related = glossaryTerms.find((t) => t.slug === slug);
                      return related ? (
                        <span key={slug} className="font-technical text-[10px] tracking-wider text-text-muted border border-border-subtle px-2 py-0.5 rounded">
                          {related.term}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">EXPLORE FURTHER</p>
            <h2 className="text-3xl font-bold mb-4">See the System Prompts in Action</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Browse our database of verified system prompts from Cursor, Claude Code, v0, and 50+ more AI tools.
            </p>
            <Link href="/" className="btn-premium">
              Browse System Prompts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
