import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { glossaryTerms, getGlossaryTermBySlug, tools } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;

interface PageProps {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term } = await params;
  const entry = getGlossaryTermBySlug(term);

  if (!entry) return { title: 'Term Not Found' };

  const title = `What is ${entry.term}? Definition & Guide`;
  const description = `${entry.definition} Learn how ${entry.term} relates to AI coding tools, system prompts, and LLMs.`;
  const url = `${BASE_URL}/glossary/${term}`;

  return {
    title,
    description,
    keywords: [entry.term, `what is ${entry.term}`, `${entry.term} definition`, `${entry.term} meaning`, 'AI glossary', 'LLM glossary'],
    alternates: { canonical: url },
    openGraph: { title, description, type: 'article', url, siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term } = await params;
  const entry = getGlossaryTermBySlug(term);

  if (!entry) notFound();

  const relatedTermEntries = entry.relatedTerms
    .map((slug) => glossaryTerms.find((t) => t.slug === slug))
    .filter(Boolean);

  const relatedToolEntries = entry.relatedTools
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.definition,
    url: `${BASE_URL}/glossary/${term}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AI & LLM Glossary',
      url: `${BASE_URL}/glossary`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: entry.term, item: `${BASE_URL}/glossary/${term}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-technical tracking-wider text-text-muted mb-10">
            <Link href="/" className="hover:text-accent-primary transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-accent-primary transition-colors">GLOSSARY</Link>
            <span>/</span>
            <span className="text-text-primary">{entry.term.toUpperCase()}</span>
          </nav>

          {/* Back link */}
          <Link href="/glossary" className="group inline-flex items-center gap-2 font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO GLOSSARY
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <BookOpen className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">AI & LLM Glossary</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What is <span className="text-accent-primary">{entry.term}</span>?
            </h1>

            {/* Short definition block – optimized for AI snippet extraction */}
            <div className="glass-panel p-6 border-accent-primary/20 bg-accent-primary/5">
              <p className="text-lg text-text-secondary leading-relaxed">
                <strong className="text-text-primary">{entry.term}</strong> — {entry.definition}
              </p>
            </div>
          </header>

          {/* Long definition */}
          <article className="max-w-none mb-16 space-y-4">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Definition & Explanation</h2>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">{entry.longDefinition}</p>
          </article>

          {/* Related AI Tools */}
          {relatedToolEntries.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                AI Tools Using {entry.term}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedToolEntries.map((tool) => (
                  tool && (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.categorySlug}/${tool.slug}`}
                      className="glass-panel p-4 flex items-center gap-4 hover:border-accent-primary/40 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <ExternalLink className="w-4 h-4 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">{tool.name}</p>
                        <p className="text-xs text-text-muted font-technical">{tool.category}</p>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {entry.faqs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text-primary mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {entry.faqs.map((faq, idx) => (
                  <div key={idx} className="glass-panel p-6">
                    <h3 className="font-semibold text-text-primary mb-3">{faq.question}</h3>
                    <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Terms */}
          {relatedTermEntries.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Related Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTermEntries.map((related) => (
                  related && (
                    <Link
                      key={related.slug}
                      href={`/glossary/${related.slug}`}
                      className="glass-panel p-4 hover:border-accent-primary/40 transition-all group"
                    >
                      <p className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-1">{related.term}</p>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{related.definition}</p>
                    </Link>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Browse all */}
          <div className="glass-panel p-8 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">EXPLORE MORE</p>
            <h2 className="text-2xl font-bold mb-4">Browse All AI & LLM Terms</h2>
            <p className="text-text-secondary mb-6">Explore our complete glossary of AI, LLM, and system prompt terminology.</p>
            <Link href="/glossary" className="btn-premium">
              View Full Glossary
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const revalidate = 86400;
