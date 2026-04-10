'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Minus, 
  Trophy,
  ThumbsUp,
  ThumbsDown,
  ArrowRight
} from 'lucide-react';
import type { PSEOPageData, ComparisonData, RelatedPage } from '@/lib/pseo/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { FAQSection } from '@/components/seo/FAQSection';
import { generatePageSchemas, generateJsonLdScript } from '@/lib/seo/schema';

interface ComparisonTemplateProps {
  pageData: PSEOPageData;
}

/**
 * Comparison Page Template
 * Side-by-side tool comparison with SEO optimization
 */
export function ComparisonTemplate({ pageData }: ComparisonTemplateProps) {
  const { comparisonData, content, linking } = pageData;
  const [imageError1, setImageError1] = useState(false);
  const [imageError2, setImageError2] = useState(false);

  if (!comparisonData) {
    return <div>Comparison data not available</div>;
  }

  const { tool1, tool2, features, verdict, recommendation } = comparisonData;

  // Generate JSON-LD schemas
  const schemas = generatePageSchemas(pageData);
  const jsonLd = generateJsonLdScript(schemas);

  // Build related pages
  const relatedPages: RelatedPage[] = linking.relatedPages.map(slug => ({
    slug,
    title: slug,
    description: '',
    category: pageData.category,
    template: 'comparison' as const,
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
        <main className="page-shell-main max-w-6xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={linking.breadcrumbs} className="mb-6 md:mb-8 text-text-muted" />

          {/* Header */}
          <header className="text-center mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 px-1">
              {content.h1}
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {content.intro}
            </p>
          </header>

          {/* Tools Overview */}
          <section className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Tool 1 */}
            <div className="glass-panel border border-border-subtle rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl glass-panel flex items-center justify-center overflow-hidden border border-border-subtle">
                  {!imageError1 && tool1.logo ? (
                    <Image
                      src={tool1.logo}
                      alt={`${tool1.name} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={() => setImageError1(true)}
                      unoptimized
                    />
                  ) : (
                    <span className="text-xl font-bold text-accent-primary">
                      {tool1.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{tool1.name}</h2>
                  {tool1.rating && (
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <span className="text-accent-secondary">★</span>
                      {tool1.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-text-secondary mb-4">{tool1.bestFor}</p>

              {/* Pros */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-accent-primary mb-2 flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {tool1.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-sm font-semibold text-text-muted mb-2 flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {tool1.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <X className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/tools/${tool1.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors"
              >
                View {tool1.name} Prompts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="glass-panel border border-border-subtle rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl glass-panel flex items-center justify-center overflow-hidden border border-border-subtle">
                  {!imageError2 && tool2.logo ? (
                    <Image
                      src={tool2.logo}
                      alt={`${tool2.name} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={() => setImageError2(true)}
                      unoptimized
                    />
                  ) : (
                    <span className="text-xl font-bold text-accent-primary">
                      {tool2.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{tool2.name}</h2>
                  {tool2.rating && (
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <span className="text-accent-secondary">★</span>
                      {tool2.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-text-secondary mb-4">{tool2.bestFor}</p>

              {/* Pros */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-accent-primary mb-2 flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {tool2.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-sm font-semibold text-text-muted mb-2 flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {tool2.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <X className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/tools/${tool2.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors"
              >
                View {tool2.name} Prompts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-primary mb-6">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="text-left py-4 px-3 sm:px-4 font-semibold text-text-primary border-b border-border-subtle">
                      Feature
                    </th>
                    <th className="text-center py-4 px-3 sm:px-4 font-semibold text-text-primary border-b border-border-subtle">
                      {tool1.name}
                    </th>
                    <th className="text-center py-4 px-3 sm:px-4 font-semibold text-text-primary border-b border-border-subtle">
                      {tool2.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b border-border-subtle hover:bg-white/[0.02]">
                      <td className="py-4 px-3 sm:px-4 align-top">
                        <div className="font-medium text-text-primary">{feature.name}</div>
                        <div className="text-sm text-text-muted">{feature.description}</div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <FeatureValue 
                          value={feature.tool1Value} 
                          isWinner={feature.winner === 'tool1'}
                        />
                      </td>
                      <td className="text-center py-4 px-4">
                        <FeatureValue 
                          value={feature.tool2Value} 
                          isWinner={feature.winner === 'tool2'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Verdict */}
          <section className="mb-12 glass-panel border border-accent-primary/20 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-accent-primary" />
              <h2 className="text-2xl font-semibold text-text-primary">Our Verdict</h2>
            </div>
            <p className="text-lg text-text-secondary mb-4 leading-relaxed">{verdict}</p>
            <div className="glass-panel rounded-xl p-4 border border-border-subtle">
              <h3 className="font-semibold text-text-primary mb-2">Recommendation</h3>
              <p className="text-text-secondary">{recommendation}</p>
            </div>
          </section>

          {/* Content Sections */}
          {content.sections.length > 0 && (
            <section className="mb-12 max-w-none space-y-8">
              {content.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2 className="text-xl font-semibold text-text-primary mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">{section.content}</p>
                </div>
              ))}
            </section>
          )}

          {/* FAQs */}
          {content.faqs.length > 0 && (
            <FAQSection 
              faqs={content.faqs} 
              className="mb-12"
              includeSchema={false}
            />
          )}

          {/* Related Comparisons */}
          {relatedPages.length > 0 && (
            <RelatedPages 
              pages={relatedPages} 
              title="Related Comparisons"
            />
          )}
        </main>
      </div>
    </>
  );
}

function FeatureValue({ 
  value, 
  isWinner 
}: { 
  value: string | boolean; 
  isWinner: boolean;
}) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isWinner ? 'bg-accent-primary/20' : 'bg-white/5'}`}>
        <Check className={`w-5 h-5 ${isWinner ? 'text-accent-primary' : 'text-text-muted'}`} />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
        <X className="w-5 h-5 text-text-muted" />
      </span>
    );
  }

  return (
    <span className={`text-sm ${isWinner ? 'font-semibold text-accent-primary' : 'text-text-secondary'}`}>
      {value || <Minus className="w-4 h-4 text-text-muted mx-auto" />}
    </span>
  );
}

export default ComparisonTemplate;
