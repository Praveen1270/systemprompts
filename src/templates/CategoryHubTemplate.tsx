'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Grid3X3, 
  List, 
  Search,
  ArrowRight,
  FileText,
  GitCompare,
  BookOpen
} from 'lucide-react';
import type { PSEOPageData, CategoryData, RelatedPage } from '@/lib/pseo/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { generatePageSchemas, generateJsonLdScript } from '@/lib/seo/schema';

interface CategoryHubTemplateProps {
  pageData: PSEOPageData;
  tools?: Array<{
    id: string;
    slug: string;
    name: string;
    description: string;
    logo: string;
    fileCount: number;
  }>;
  comparisons?: Array<{
    slug: string;
    title: string;
    description: string;
  }>;
  guides?: Array<{
    slug: string;
    title: string;
    readingTime: number;
  }>;
}

/**
 * Category Hub Page Template
 * Displays all tools in a category with SEO optimization
 */
export function CategoryHubTemplate({ 
  pageData,
  tools = [],
  comparisons = [],
  guides = [],
}: CategoryHubTemplateProps) {
  const { categoryData, content, linking } = pageData;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate JSON-LD schemas
  const schemas = generatePageSchemas(pageData);
  const jsonLd = generateJsonLdScript(schemas);

  // Filter tools based on search
  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.h1}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {content.intro}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-4 h-4 text-blue-600" />
                <span><strong>{tools.length}</strong> tools</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GitCompare className="w-4 h-4 text-purple-600" />
                <span><strong>{comparisons.length}</strong> comparisons</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span><strong>{guides.length}</strong> guides</span>
              </div>
            </div>
          </header>

          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder={`Search ${pageData.categoryName.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tools Grid/List */}
          <section className="mb-12">
            <h2 className="sr-only">Tools in {pageData.categoryName}</h2>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} categorySlug={pageData.category} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTools.map((tool) => (
                  <ToolListItem key={tool.id} tool={tool} categorySlug={pageData.category} />
                ))}
              </div>
            )}

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tools found matching "{searchQuery}"</p>
              </div>
            )}
          </section>

          {/* Featured Comparisons */}
          {comparisons.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Popular Comparisons
                </h2>
                <Link
                  href="/compare"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {comparisons.slice(0, 6).map((comparison) => (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GitCompare className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">Comparison</span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {comparison.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {comparison.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides */}
          {guides.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Related Guides
                </h2>
                <Link
                  href="/guides"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {guides.slice(0, 4).map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {guide.readingTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
              includeSchema={false}
            />
          )}
        </main>
      </div>
    </>
  );
}

interface ToolCardProps {
  tool: {
    id: string;
    slug: string;
    name: string;
    description: string;
    logo: string;
    fileCount: number;
  };
  categorySlug: string;
}

function ToolCard({ tool, categorySlug }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/tools/${categorySlug}/${tool.slug}`}
      className="group block p-5 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {!imageError && tool.logo ? (
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={32}
              height={32}
              className="object-contain"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <span className="text-lg font-bold text-gray-700">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>
        <ArrowRight 
          className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all ml-auto" 
        />
      </div>

      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
        {tool.description}
      </p>
      <div className="text-xs text-gray-400">
        {tool.fileCount} prompt{tool.fileCount !== 1 ? 's' : ''}
      </div>
    </Link>
  );
}

function ToolListItem({ tool, categorySlug }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/tools/${categorySlug}/${tool.slug}`}
      className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {!imageError && tool.logo ? (
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            width={32}
            height={32}
            className="object-contain"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <span className="text-lg font-bold text-gray-700">
            {tool.name.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {tool.description}
        </p>
      </div>

      <div className="text-sm text-gray-400 flex-shrink-0">
        {tool.fileCount} prompts
      </div>

      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-shrink-0" />
    </Link>
  );
}

export default CategoryHubTemplate;
