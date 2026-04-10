import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';
import { useCases, getUseCaseBySlug, tools, personas } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;
const OG_IMAGE = `${BASE_URL}${DEFAULT_PSEO_CONFIG.defaultOgImage}`;

interface PageProps {
  params: Promise<{ 'use-case': string }>;
}

export async function generateStaticParams() {
  return useCases.map((u) => ({ 'use-case': u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'use-case': slug } = await params;
  const entry = getUseCaseBySlug(slug);

  if (!entry) return { title: 'Not Found' };

  const title = `Best AI Tools for ${entry.name} in ${new Date().getFullYear()}`;
  const description = `Discover the top AI coding assistants for ${entry.name.toLowerCase()}. Compare tools, explore verified system prompts, and see exactly how AI handles ${entry.name.toLowerCase()} tasks.`;
  const url = `${BASE_URL}/use-cases/${slug}`;

  return {
    title,
    description,
    keywords: [...entry.keywords, 'AI tools', 'system prompts', entry.name, 'AI coding assistant'],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { 'use-case': slug } = await params;
  const entry = getUseCaseBySlug(slug);

  if (!entry) notFound();

  // Find tools that list this use case
  const relevantPersonas = personas.filter((p) => p.topUseCases.includes(slug));
  const allToolsList = tools.slice(0, 8);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best AI tool for ${entry.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Top AI tools for ${entry.name.toLowerCase()} include Cursor, Claude Code, and GitHub Copilot. Each uses a specialized system prompt that defines how it handles ${entry.name.toLowerCase()} tasks. Browse their verified system prompts on SystemPrompts.fun.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do AI coding assistants handle ${entry.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `AI coding assistants use system prompts to define their ${entry.name.toLowerCase()} capabilities. The system prompt instructs the AI on how to approach ${entry.name.toLowerCase()} tasks, what tools to use, and how to format responses.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I customize AI behavior for ${entry.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. By understanding the system prompts that power AI tools, you can craft better prompts for ${entry.name.toLowerCase()} or configure your own AI tools more effectively. Explore verified system prompts on SystemPrompts.fun to see how top tools handle this.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: `${BASE_URL}/use-cases` },
      { '@type': 'ListItem', position: 3, name: entry.name, item: `${BASE_URL}/use-cases/${slug}` },
    ],
  };

  const otherUseCases = useCases.filter((u) => u.slug !== slug).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-technical tracking-wider text-text-muted mb-8">
            <Link href="/" className="hover:text-accent-primary transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/use-cases" className="hover:text-accent-primary transition-colors">USE CASES</Link>
            <span>/</span>
            <span className="text-text-primary">{entry.name.toUpperCase()}</span>
          </nav>

          <Link href="/use-cases" className="group inline-flex items-center gap-2 font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors mb-10">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            ALL USE CASES
          </Link>

          {/* Hero */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <Zap className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Use Case</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
              AI for <span className="text-accent-primary">{entry.name}</span>
            </h1>
            <div className="glass-panel p-6 border-accent-primary/20 bg-accent-primary/5 max-w-2xl">
              <p className="text-lg text-text-secondary leading-relaxed">
                {entry.description}. Explore the AI tools that excel at this and see their exact system prompts.
              </p>
            </div>
          </header>

          {/* How AI handles this use case */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">How AI Coding Tools Handle {entry.name}</h2>
            <div className="glass-panel p-8">
              <p className="text-text-secondary leading-relaxed mb-4">
                AI coding assistants use specialized system prompts to define exactly how they approach {entry.name.toLowerCase()} tasks. These prompts instruct the AI on techniques to use, how to format responses, which tools to call, and how to handle edge cases.
              </p>
              <p className="text-text-secondary leading-relaxed">
                By studying the verified system prompts of top AI tools, you can understand their {entry.name.toLowerCase()} philosophy and apply similar techniques to your own AI-powered workflows.
              </p>
            </div>
          </section>

          {/* Top tools */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-3">Best AI Tools for {entry.name}</h2>
            <p className="text-text-secondary mb-8">
              These AI coding assistants are widely used for {entry.name.toLowerCase()}. View their system prompts to see their internal configuration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allToolsList.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.categorySlug}/${tool.slug}`}
                  className="glass-panel p-5 hover:border-accent-primary/40 transition-all group"
                >
                  <h3 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-text-muted font-technical mb-3">{tool.category}</p>
                  <span className="font-technical text-xs text-accent-primary">VIEW PROMPT →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Relevant personas */}
          {relevantPersonas.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Who Uses AI for {entry.name}?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relevantPersonas.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/for/${p.slug}`}
                    className="glass-panel p-5 hover:border-accent-primary/40 transition-all group"
                  >
                    <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">{p.name}</h3>
                    <p className="text-sm text-text-secondary">{p.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, idx) => (
                <div key={idx} className="glass-panel p-6">
                  <h3 className="font-semibold text-text-primary mb-3">{faq.name}</h3>
                  <p className="text-text-secondary leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Other use cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Other AI Use Cases</h2>
            <div className="flex flex-wrap gap-3">
              {otherUseCases.map((u) => (
                <Link
                  key={u.slug}
                  href={`/use-cases/${u.slug}`}
                  className="glass-panel px-4 py-2 text-sm text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all"
                >
                  {u.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">EXPLORE FURTHER</p>
            <h2 className="text-3xl font-bold mb-4">See System Prompts for {entry.name}</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Explore verified system prompts from 50+ AI tools and understand exactly how they&apos;re configured for tasks like {entry.name.toLowerCase()}.
            </p>
            <Link href="/" className="btn-premium">Browse System Prompts</Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const revalidate = 86400;
