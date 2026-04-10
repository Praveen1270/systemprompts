'use client';

import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark
} from 'lucide-react';
import type { PSEOPageData, GuideData, RelatedPage, TableOfContentsItem } from '@/lib/pseo/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { FAQSection } from '@/components/seo/FAQSection';
import { generatePageSchemas, generateJsonLdScript } from '@/lib/seo/schema';

interface GuideTemplateProps {
  pageData: PSEOPageData;
}

/**
 * Guide/Article Page Template
 * Long-form content with TOC and SEO optimization
 */
export function GuideTemplate({ pageData }: GuideTemplateProps) {
  const { guideData, content, linking } = pageData;

  if (!guideData) {
    return <div>Guide data not available</div>;
  }

  // Generate JSON-LD schemas
  const schemas = generatePageSchemas(pageData);
  const jsonLd = generateJsonLdScript(schemas);

  // Build related pages
  const relatedPages: RelatedPage[] = linking.relatedPages.map(slug => ({
    slug,
    title: slug,
    description: '',
    category: pageData.category,
    template: 'guide' as const,
  }));

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="page-shell">
        <div className="mesh-bg" aria-hidden />
        <div className="noise-overlay" aria-hidden />
        <main className="page-shell-main max-w-4xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={linking.breadcrumbs} className="mb-6 md:mb-8 text-text-muted" />

          {/* Article Header */}
          <header className="mb-8 md:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
              {content.h1}
            </h1>

            {guideData.subtitle && (
              <p className="text-lg md:text-xl text-text-secondary mb-6">
                {guideData.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-text-muted pb-6 border-b border-border-subtle">
              {guideData.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{guideData.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={guideData.publishedAt}>
                  {new Date(guideData.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{guideData.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Two Column Layout */}
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10 xl:gap-12">
            {/* Main Content */}
            <article className="max-w-none text-base md:text-lg leading-relaxed">
              {/* Intro */}
              <p className="lead text-lg md:text-xl text-text-secondary mb-8 not-prose">
                {content.intro}
              </p>

              {/* Table of Contents (Mobile) */}
              {guideData.tableOfContents.length > 0 && (
                <nav className="lg:hidden mb-8 p-4 glass-panel rounded-xl border border-border-subtle not-prose">
                  <h2 className="text-sm font-semibold text-text-primary mb-3">
                    In this guide
                  </h2>
                  <TableOfContents items={guideData.tableOfContents} />
                </nav>
              )}

              {/* Content Sections */}
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  {section.headingLevel === 2 && (
                    <h2 className="text-2xl font-semibold text-text-primary mt-10 mb-4 not-prose">
                      {section.heading}
                    </h2>
                  )}
                  {section.headingLevel === 3 && (
                    <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3 not-prose">
                      {section.heading}
                    </h3>
                  )}
                  {section.headingLevel === 4 && (
                    <h4 className="text-lg font-semibold text-text-primary mt-6 mb-2 not-prose">
                      {section.heading}
                    </h4>
                  )}

                  <p className="text-text-secondary mb-4 not-prose">{section.content}</p>

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 mb-4 not-prose list-disc pl-5 marker:text-accent-primary">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-text-secondary">{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {section.code && (
                    <pre className="code-container text-sm mb-4 overflow-x-auto not-prose">
                      <code className={`language-${section.code.language}`}>
                        {section.code.content}
                      </code>
                    </pre>
                  )}
                </section>
              ))}
            </article>

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                {guideData.tableOfContents.length > 0 && (
                  <nav className="p-4 glass-panel rounded-xl border border-border-subtle">
                    <h2 className="text-sm font-semibold text-text-primary mb-3">
                      In this guide
                    </h2>
                    <TableOfContents items={guideData.tableOfContents} />
                  </nav>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-border-subtle">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-border-subtle">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* FAQs */}
          {content.faqs.length > 0 && (
            <FAQSection 
              faqs={content.faqs} 
              className="mt-16 mb-12"
              includeSchema={false}
            />
          )}

          {/* Navigation */}
          {linking.siblings && (
            <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-8 border-t border-border-subtle mt-12">
              {linking.siblings.previous ? (
                <Link
                  href={`/guides/${linking.siblings.previous.slug}`}
                  className="group flex items-center gap-2 text-text-muted hover:text-accent-primary min-w-0"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div className="min-w-0 text-left sm:text-right">
                    <div className="text-xs text-text-muted/80">Previous</div>
                    <div className="text-sm font-medium text-text-primary truncate">{linking.siblings.previous.title}</div>
                  </div>
                </Link>
              ) : <div />}

              {linking.siblings.next && (
                <Link
                  href={`/guides/${linking.siblings.next.slug}`}
                  className="group flex items-center gap-2 text-text-muted hover:text-accent-primary sm:ml-auto min-w-0"
                >
                  <div className="min-w-0 sm:text-right">
                    <div className="text-xs text-text-muted/80">Next</div>
                    <div className="text-sm font-medium text-text-primary truncate">{linking.siblings.next.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </nav>
          )}

          {/* Related Guides */}
          {relatedPages.length > 0 && (
            <RelatedPages 
              pages={relatedPages} 
              title="Related Guides"
              columns={2}
            />
          )}
        </main>
      </div>
    </>
  );
}

function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li 
          key={item.id}
          style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
        >
          <a
            href={`#${item.id}`}
            className="text-text-muted hover:text-accent-primary transition-colors line-clamp-1"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GuideTemplate;
