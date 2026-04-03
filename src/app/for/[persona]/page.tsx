import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';
import { personas, getPersonaBySlug, tools, useCases, getUseCaseBySlug } from '@/data/keyword-matrix';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const BASE_URL = DEFAULT_PSEO_CONFIG.baseUrl;
const SITE_NAME = DEFAULT_PSEO_CONFIG.siteName;

interface PageProps {
  params: Promise<{ persona: string }>;
}

export async function generateStaticParams() {
  return personas.map((p) => ({ persona: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { persona } = await params;
  const entry = getPersonaBySlug(persona);

  if (!entry) return { title: 'Not Found' };

  const title = `Best AI Coding Tools for ${entry.name} in ${new Date().getFullYear()}`;
  const description = `The best AI coding assistants and system prompts for ${entry.name.toLowerCase()}. Compare top tools, see real system prompts, and choose the right AI for your workflow.`;
  const url = `${BASE_URL}/for/${persona}`;

  return {
    title,
    description,
    keywords: [...entry.keywords, 'AI coding tools', 'system prompts', 'best AI assistant', entry.name],
    alternates: { canonical: url },
    openGraph: { title, description, type: 'website', url, siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function PersonaPage({ params }: PageProps) {
  const { persona } = await params;
  const entry = getPersonaBySlug(persona);

  if (!entry) notFound();

  const recommendedToolEntries = entry.recommendedTools
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  const useCaseEntries = entry.topUseCases
    .map((slug) => getUseCaseBySlug(slug))
    .filter(Boolean);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best AI coding tools for ${entry.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best AI coding tools for ${entry.name.toLowerCase()} include ${recommendedToolEntries.slice(0, 3).map(t => t?.name).join(', ')}. Each offers unique strengths for ${entry.description.toLowerCase()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the biggest pain points AI can solve for ${entry.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `AI coding tools help ${entry.name.toLowerCase()} with: ${entry.painPoints.join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What system prompts do AI tools use for ${entry.name.toLowerCase()} tasks?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `AI coding tools use specialized system prompts that define their behavior for coding tasks. You can explore the verified system prompts for ${recommendedToolEntries.slice(0, 2).map(t => t?.name).join(' and ')} and other tools on SystemPrompts.fun.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'For Developers', item: `${BASE_URL}/for` },
      { '@type': 'ListItem', position: 3, name: entry.name, item: `${BASE_URL}/for/${persona}` },
    ],
  };

  const otherPersonas = personas.filter((p) => p.slug !== persona).slice(0, 5);

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
            <span className="text-text-primary">FOR {entry.name.toUpperCase()}</span>
          </nav>

          <Link href="/" className="group inline-flex items-center gap-2 font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors mb-10">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO HOME
          </Link>

          {/* Hero */}
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
                <Users className="w-4 h-4 text-accent-primary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">Built For You</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl">
              Best AI Tools for <span className="text-accent-primary">{entry.name}</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
              {entry.description}. Explore the top AI coding assistants, see their verified system prompts, and choose what fits your workflow.
            </p>
          </header>

          {/* Pain points */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Common Challenges AI Solves for {entry.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {entry.painPoints.map((pain, idx) => (
                <div key={idx} className="glass-panel p-4 flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                  <p className="text-text-secondary">{pain}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended tools */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-3">
              Top AI Tools for {entry.name}
            </h2>
            <p className="text-text-secondary mb-8">
              These tools are most commonly used by {entry.name.toLowerCase()}. Click any to explore their verified system prompts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedToolEntries.map((tool, idx) => (
                tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.categorySlug}/${tool.slug}`}
                    className="glass-panel p-6 hover:border-accent-primary/40 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-technical text-[10px] tracking-widest text-accent-primary/60 uppercase">
                        #{idx + 1} Pick
                      </span>
                      <span className="font-technical text-[10px] text-text-muted border border-border-subtle px-2 py-0.5 rounded">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{tool.description}</p>
                    <span className="font-technical text-xs text-accent-primary tracking-wider">
                      VIEW SYSTEM PROMPT →
                    </span>
                  </Link>
                )
              ))}
            </div>
          </section>

          {/* Top use cases */}
          {useCaseEntries.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Top AI Use Cases for {entry.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCaseEntries.map((uc) => (
                  uc && (
                    <Link
                      key={uc.slug}
                      href={`/use-cases/${uc.slug}`}
                      className="glass-panel p-5 hover:border-accent-primary/40 transition-all group"
                    >
                      <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                        {uc.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{uc.description}</p>
                    </Link>
                  )
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

          {/* Other personas */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">AI Tools for Other Developer Roles</h2>
            <div className="flex flex-wrap gap-3">
              {otherPersonas.map((p) => (
                <Link
                  key={p.slug}
                  href={`/for/${p.slug}`}
                  className="glass-panel px-4 py-2 text-sm text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="glass-panel p-10 text-center">
            <p className="font-technical text-xs tracking-widest text-accent-primary mb-3">DIVE DEEPER</p>
            <h2 className="text-3xl font-bold mb-4">Explore System Prompts for {entry.name}</h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              See exactly how the top AI tools are configured. Browse verified system prompts from {recommendedToolEntries.slice(0, 2).map(t => t?.name).join(', ')}, and more.
            </p>
            <Link href="/" className="btn-premium">
              Browse All System Prompts
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export const revalidate = 86400;
