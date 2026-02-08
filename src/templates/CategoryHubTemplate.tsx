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
  BookOpen,
  Cpu,
  Command,
  Layout
} from 'lucide-react';
import type { PSEOPageData } from '@/lib/pseo/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { generatePageSchemas, generateJsonLdScript } from '@/lib/seo/schema';
import { motion, AnimatePresence } from 'framer-motion';

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

export function CategoryHubTemplate({
  pageData,
  tools = [],
  comparisons = [],
  guides = [],
}: CategoryHubTemplateProps) {
  const { content, linking } = pageData;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const schemas = generatePageSchemas(pageData);
  const jsonLd = generateJsonLdScript(schemas);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="min-h-screen relative overflow-hidden">
        <div className="mesh-bg" />
        <div className="noise-overlay" />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
          {/* Breadcrumbs */}
          <div className="mb-12">
            <Breadcrumbs items={linking.breadcrumbs} className="font-technical text-[10px] tracking-widest text-text-muted transition-colors hover:text-accent-primary" />
          </div>

          {/* Header */}
          <header className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 glass-panel flex items-center justify-center border-accent-secondary/20 bg-accent-secondary/5">
                <Cpu className="w-5 h-5 text-accent-secondary" />
              </div>
              <span className="font-technical text-xs tracking-widest text-accent-secondary uppercase">
                Category Archive
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
              {content.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary max-w-3xl leading-relaxed"
            >
              {content.intro}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-8 mt-12"
            >
              <div className="flex items-center gap-3 font-technical text-xs tracking-wider text-text-muted">
                <FileText className="w-4 h-4 text-accent-primary" />
                <span>{tools.length} TOOLS SYNCED</span>
              </div>
              <div className="flex items-center gap-3 font-technical text-xs tracking-wider text-text-muted">
                <GitCompare className="w-4 h-4 text-accent-secondary" />
                <span>{comparisons.length} COMPARISONS</span>
              </div>
              <div className="flex items-center gap-3 font-technical text-xs tracking-wider text-text-muted">
                <BookOpen className="w-4 h-4 text-green-500/50" />
                <span>{guides.length} DOCUMENTATION</span>
              </div>
            </motion.div>
          </header>

          {/* Controls Section */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-16">
            <div className="glass-panel flex-1 max-w-md relative group overflow-hidden">
              <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="search"
                placeholder={`Search ${pageData.categoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none font-technical text-xs tracking-wider"
              />
            </div>

            <div className="flex items-center gap-1 p-1 glass-panel bg-white/[0.02]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid'
                    ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list'
                    ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tools Manifest */}
          <section className="mb-24">
            <AnimatePresence mode="popLayout">
              {viewMode === 'grid' ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                  {filteredTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ToolCard tool={tool} categorySlug={pageData.category} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="space-y-4"
                >
                  {filteredTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ToolListItem tool={tool} categorySlug={pageData.category} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {filteredTools.length === 0 && (
              <div className="text-center py-32 glass-panel border-dashed border-white/10">
                <Command className="w-10 h-10 text-text-muted mx-auto mb-4 opacity-20" />
                <p className="font-technical text-[10px] tracking-[0.3em] text-text-muted uppercase">Zero signals detected</p>
                <h3 className="text-2xl font-bold mt-2">Filter resulted in empty set</h3>
              </div>
            )}
          </section>

          {/* Discoverable Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Comparisons */}
            {comparisons.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <GitCompare className="w-5 h-5 text-accent-secondary" />
                    <h2 className="text-2xl font-bold italic font-serif">Comparison Matrices</h2>
                  </div>
                  <Link href="/compare" className="btn-premium py-1.5 text-[10px] font-technical">
                    FULL_ARRAY <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {comparisons.slice(0, 4).map((comparison) => (
                    <Link
                      key={comparison.slug}
                      href={`/compare/${comparison.slug}`}
                      className="group block glass-panel p-5 transition-all hover:bg-white/[0.04]"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                          {comparison.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-all group-hover:translate-x-1" />
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {comparison.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Guides */}
            {guides.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-accent-primary" />
                    <h2 className="text-2xl font-bold italic font-serif">Knowledge Bases</h2>
                  </div>
                  <Link href="/guides" className="btn-premium py-1.5 text-[10px] font-technical">
                    ARCHIVE <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {guides.slice(0, 4).map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group glass-panel p-5 transition-all hover:bg-white/[0.04]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        <Layout className="w-4 h-4 text-accent-primary" />
                      </div>
                      <h3 className="font-bold text-text-primary group-hover:text-accent-secondary transition-colors mb-2">
                        {guide.title}
                      </h3>
                      <p className="font-technical text-[9px] text-text-muted uppercase tracking-widest">
                        {guide.readingTime} MIN READ_STREAM
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SEO Content Sections */}
          {content.sections.length > 0 && (
            <section className="mt-32 pt-20 border-t border-white/5 max-w-4xl">
              {content.sections.map((section) => (
                <div key={section.id} className="mb-16">
                  <h2 className="text-3xl font-bold mb-6 italic font-serif">
                    {section.heading}
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* FAQ Section */}
          {content.faqs.length > 0 && (
            <div className="mt-20 glass-panel p-8 lg:p-12 border-accent-primary/10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                <h2 className="font-technical text-sm tracking-[0.3em] text-text-muted uppercase">Common Inquiries</h2>
              </div>
              <FAQSection
                faqs={content.faqs}
                includeSchema={false}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function ToolCard({ tool, categorySlug }: any) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/tools/${categorySlug}/${tool.slug}`}
      className="group block h-full glow-card"
    >
      <div className="glass-panel h-full p-6 flex flex-col transition-all duration-300 hover:bg-white/[0.04]">
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-12 rounded-xl glass-panel p-2 flex items-center justify-center bg-white/[0.02]">
            {!imageError && tool.logo ? (
              <Image
                src={tool.logo}
                alt={tool.name}
                width={32}
                height={32}
                className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <span className="text-xl font-bold text-accent-primary">{tool.name.charAt(0)}</span>
            )}
          </div>
          <div className="p-2 rounded-full border border-white/5 text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary/30 transition-all">
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
          {tool.name}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed mb-6 flex-1">
          {tool.description}
        </p>
        <div className="font-technical text-[10px] tracking-widest text-text-muted border-t border-white/5 pt-4">
          {tool.fileCount} DATA_OBJECTS IDENTIFIED
        </div>
      </div>
    </Link>
  );
}

function ToolListItem({ tool, categorySlug }: any) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/tools/${categorySlug}/${tool.slug}`}
      className="group block glow-card"
    >
      <div className="glass-panel p-4 flex items-center gap-6 transition-all hover:bg-white/[0.04]">
        <div className="w-10 h-10 rounded-lg glass-panel p-1.5 flex items-center justify-center bg-white/[0.01] shrink-0">
          {!imageError && tool.logo ? (
            <Image
              src={tool.logo}
              alt={tool.name}
              width={24}
              height={24}
              className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <span className="text-sm font-bold text-accent-primary">{tool.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-xs text-text-secondary truncate mt-0.5">
            {tool.description}
          </p>
        </div>

        <div className="hidden md:block font-technical text-[10px] tracking-widest text-text-muted shrink-0 mr-4">
          {tool.fileCount} OBJECTS
        </div>

        <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-all group-hover:translate-x-1 shrink-0" />
      </div>
    </Link>
  );
}

export default CategoryHubTemplate;
