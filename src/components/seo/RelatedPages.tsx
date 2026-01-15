'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { RelatedPage, PageTemplate } from '@/lib/pseo/types';

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
  columns?: 2 | 3 | 4;
  showDescription?: boolean;
  className?: string;
}

/**
 * Hub-and-spoke internal linking component
 * Displays related pages to improve crawlability and user navigation
 */
export function RelatedPages({
  pages,
  title = 'Related Pages',
  columns = 3,
  showDescription = true,
  className = '',
}: RelatedPagesProps) {
  if (pages.length === 0) return null;

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`${className}`} aria-labelledby="related-pages-heading">
      <h2 
        id="related-pages-heading" 
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {title}
      </h2>

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4`}>
        {pages.map((page) => (
          <RelatedPageCard 
            key={page.slug} 
            page={page} 
            showDescription={showDescription}
          />
        ))}
      </div>
    </section>
  );
}

interface RelatedPageCardProps {
  page: RelatedPage;
  showDescription?: boolean;
}

function RelatedPageCard({ page, showDescription = true }: RelatedPageCardProps) {
  const href = getPageHref(page.slug, page.template);
  const templateBadge = getTemplateBadge(page.template);

  return (
    <Link
      href={href}
      className="group block p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${templateBadge.className}`}>
          {templateBadge.label}
        </span>
        <ArrowRight 
          className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" 
          aria-hidden="true"
        />
      </div>

      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
        {page.title}
      </h3>

      {showDescription && page.description && (
        <p className="text-sm text-gray-500 line-clamp-2">
          {page.description}
        </p>
      )}

      <div className="mt-2 text-xs text-gray-400">
        {page.category}
      </div>
    </Link>
  );
}

/**
 * Compact inline related links
 */
export function RelatedLinksInline({ 
  pages, 
  label = 'See also:',
  className = '' 
}: { 
  pages: RelatedPage[]; 
  label?: string;
  className?: string;
}) {
  if (pages.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 text-sm ${className}`}>
      <span className="text-gray-500">{label}</span>
      {pages.map((page, index) => (
        <span key={page.slug} className="flex items-center gap-2">
          <Link
            href={getPageHref(page.slug, page.template)}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {page.title}
          </Link>
          {index < pages.length - 1 && (
            <span className="text-gray-300">•</span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * Sidebar-style related pages
 */
export function RelatedPagesSidebar({
  pages,
  title = 'Related',
  className = '',
}: {
  pages: RelatedPage[];
  title?: string;
  className?: string;
}) {
  if (pages.length === 0) return null;

  return (
    <aside className={`${className}`} aria-labelledby="sidebar-related-heading">
      <h3 
        id="sidebar-related-heading" 
        className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3"
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={getPageHref(page.slug, page.template)}
              className="group flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />
              <span className="line-clamp-1">{page.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// =============================================================================
// Helpers
// =============================================================================

function getPageHref(slug: string, template: PageTemplate): string {
  switch (template) {
    case 'tool':
      // For tools, slug might include category: "category/tool-slug"
      return slug.includes('/') ? `/tools/${slug}` : `/tools/${slug}`;
    case 'comparison':
      return `/compare/${slug}`;
    case 'guide':
      return `/guides/${slug}`;
    case 'hub':
      return `/${slug}`;
    default:
      return `/${slug}`;
  }
}

function getTemplateBadge(template: PageTemplate): { label: string; className: string } {
  switch (template) {
    case 'tool':
      return { label: 'Tool', className: 'bg-blue-50 text-blue-700' };
    case 'comparison':
      return { label: 'Compare', className: 'bg-purple-50 text-purple-700' };
    case 'guide':
      return { label: 'Guide', className: 'bg-green-50 text-green-700' };
    case 'hub':
      return { label: 'Category', className: 'bg-orange-50 text-orange-700' };
    default:
      return { label: 'Page', className: 'bg-gray-50 text-gray-700' };
  }
}

export default RelatedPages;
