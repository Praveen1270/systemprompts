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

      <div className="min-h-screen bg-white">
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumbs */}
          <Breadcrumbs items={linking.breadcrumbs} className="mb-8" />

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.h1}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.intro}
            </p>
          </header>

          {/* Tools Overview */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Tool 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
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
                    <span className="text-xl font-bold text-gray-700">
                      {tool1.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{tool1.name}</h2>
                  {tool1.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="text-yellow-500">★</span>
                      {tool1.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{tool1.bestFor}</p>

              {/* Pros */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {tool1.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {tool1.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/tools/${tool1.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View {tool1.name} Prompts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
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
                    <span className="text-xl font-bold text-gray-700">
                      {tool2.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{tool2.name}</h2>
                  {tool2.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span className="text-yellow-500">★</span>
                      {tool2.rating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{tool2.bestFor}</p>

              {/* Pros */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {tool2.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {tool2.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/tools/${tool2.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View {tool2.name} Prompts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 border-b">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900 border-b">
                      {tool1.name}
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900 border-b">
                      {tool2.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
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
          <section className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Verdict</h2>
            </div>
            <p className="text-lg text-gray-700 mb-4">{verdict}</p>
            <div className="bg-white/80 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Recommendation</h3>
              <p className="text-gray-600">{recommendation}</p>
            </div>
          </section>

          {/* Content Sections */}
          {content.sections.length > 0 && (
            <section className="mb-12 prose prose-gray max-w-none">
              {content.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-gray-600">{section.content}</p>
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
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isWinner ? 'bg-green-100' : 'bg-gray-100'}`}>
        <Check className={`w-5 h-5 ${isWinner ? 'text-green-600' : 'text-green-500'}`} />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
        <X className="w-5 h-5 text-gray-400" />
      </span>
    );
  }

  return (
    <span className={`text-sm ${isWinner ? 'font-semibold text-green-700' : 'text-gray-700'}`}>
      {value || <Minus className="w-4 h-4 text-gray-300 mx-auto" />}
    </span>
  );
}

export default ComparisonTemplate;
