'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FileText, 
  Wrench, 
  ExternalLink, 
  Copy, 
  Check,
  Calendar,
  Tag
} from 'lucide-react';
import type { PSEOPageData, ToolData, RelatedPage } from '@/lib/pseo/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { HubLinks } from '@/components/seo/HubLinks';
import { FAQSection } from '@/components/seo/FAQSection';
import { generatePageSchemas, generateJsonLdScript } from '@/lib/seo/schema';

interface ToolLandingTemplateProps {
  pageData: PSEOPageData;
  promptContent?: string;
}

/**
 * Tool Landing Page Template
 * Displays tool information with system prompts and SEO optimization
 */
export function ToolLandingTemplate({ 
  pageData, 
  promptContent 
}: ToolLandingTemplateProps) {
  const { toolData, content, linking, seo } = pageData;
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!toolData) {
    return <div>Tool data not available</div>;
  }

  // Generate JSON-LD schemas
  const schemas = generatePageSchemas(pageData);
  const jsonLd = generateJsonLdScript(schemas);

  const handleCopy = async () => {
    if (!promptContent) return;
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Build hub links from linking data
  const hubLinks = linking.hubLinks.map(slug => ({
    slug,
    label: slug === 'tools' ? 'All Tools' : pageData.categoryName,
    description: slug === 'tools' ? 'Browse all AI tools' : `Browse all ${pageData.categoryName}`
  }));

  // Build related pages
  const relatedPages: RelatedPage[] = linking.relatedPages.map(slug => ({
    slug,
    title: slug,
    description: '',
    category: pageData.category,
    template: 'tool' as const,
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

          {/* Tool Header */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {!imageError && toolData.logo ? (
                  <Image
                    src={toolData.logo}
                    alt={`${toolData.name} logo`}
                    width={56}
                    height={56}
                    className="object-contain"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-700">
                    {toolData.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {content.h1}
                  </h1>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                    {toolData.category}
                  </span>
                </div>

                <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                  {content.intro}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    {toolData.files.filter(f => f.type === 'prompt').length} prompts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" />
                    {toolData.files.filter(f => f.type === 'tools').length} tool definitions
                  </span>
                  {toolData.lastUpdated && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Updated {new Date(toolData.lastUpdated).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* External link */}
                {toolData.website && (
                  <a
                    href={toolData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-blue-600 hover:text-blue-800"
                  >
                    Visit {toolData.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Content Sections */}
          {content.sections.length > 0 && (
            <section className="mb-12 prose prose-gray max-w-none">
              {content.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  {section.headingLevel === 2 && (
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.headingLevel === 3 && (
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {section.heading}
                    </h3>
                  )}
                  <p className="text-gray-600">{section.content}</p>
                  
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.code && (
                    <pre className="mt-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
                      <code>{section.code.content}</code>
                    </pre>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Prompt Viewer */}
          {promptContent && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  System Prompt
                </h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="p-1.5 bg-gray-800 flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="p-6 text-gray-100 text-sm overflow-x-auto max-h-[500px]">
                  <code>{promptContent}</code>
                </pre>
              </div>
            </section>
          )}

          {/* Features */}
          {toolData.features && toolData.features.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {toolData.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${feature.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <h3 className="font-medium text-gray-900">{feature.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {content.faqs.length > 0 && (
            <FAQSection 
              faqs={content.faqs} 
              className="mb-12"
              includeSchema={false} // Already in page schema
            />
          )}

          {/* Related Pages */}
          {relatedPages.length > 0 && (
            <RelatedPages 
              pages={relatedPages} 
              title="Related Tools"
              className="mb-12"
            />
          )}

          {/* Hub Links */}
          <HubLinks 
            links={hubLinks}
            title="Browse More"
            variant="cards"
          />
        </main>
      </div>
    </>
  );
}

export default ToolLandingTemplate;
