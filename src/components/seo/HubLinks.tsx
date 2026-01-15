'use client';

import Link from 'next/link';
import { FolderOpen, ArrowUpRight, Grid3X3 } from 'lucide-react';
import type { HubLink } from '@/lib/pseo/types';

interface HubLinksProps {
  links: HubLink[];
  title?: string;
  variant?: 'default' | 'compact' | 'cards';
  className?: string;
}

/**
 * Hub links component for category/parent page navigation
 * Implements spoke-to-hub linking for better site architecture
 */
export function HubLinks({
  links,
  title = 'Browse More',
  variant = 'default',
  className = '',
}: HubLinksProps) {
  if (links.length === 0) return null;

  if (variant === 'cards') {
    return <HubLinksCards links={links} title={title} className={className} />;
  }

  if (variant === 'compact') {
    return <HubLinksCompact links={links} className={className} />;
  }

  return (
    <section className={`${className}`} aria-labelledby="hub-links-heading">
      <h2 
        id="hub-links-heading" 
        className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"
      >
        <Grid3X3 className="w-5 h-5 text-gray-500" aria-hidden="true" />
        {title}
      </h2>

      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <FolderOpen 
              className="w-4 h-4 text-gray-500 group-hover:text-gray-700" 
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {link.label}
            </span>
            <ArrowUpRight 
              className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" 
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Compact inline hub links
 */
function HubLinksCompact({ links, className = '' }: { links: HubLink[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-sm ${className}`}>
      <span className="text-gray-500">Categories:</span>
      {links.map((link, index) => (
        <span key={link.slug} className="flex items-center gap-2">
          <Link
            href={`/${link.slug}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className="text-gray-300">•</span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * Card-style hub links for prominent display
 */
function HubLinksCards({ 
  links, 
  title,
  className = '' 
}: { 
  links: HubLink[]; 
  title: string;
  className?: string;
}) {
  return (
    <section className={`${className}`} aria-labelledby="hub-cards-heading">
      <h2 
        id="hub-cards-heading" 
        className="text-xl font-semibold text-gray-900 mb-4"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FolderOpen 
                className="w-5 h-5 text-blue-600" 
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {link.label}
              </h3>
              {link.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                  {link.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Back to hub navigation
 */
export function BackToHub({ 
  href, 
  label,
  className = '' 
}: { 
  href: string; 
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      <FolderOpen className="w-4 h-4" aria-hidden="true" />
      <span>Back to {label}</span>
    </Link>
  );
}

/**
 * Category navigation pills
 */
export function CategoryPills({
  categories,
  activeSlug,
  baseHref = '',
  className = '',
}: {
  categories: Array<{ slug: string; name: string }>;
  activeSlug?: string;
  baseHref?: string;
  className?: string;
}) {
  return (
    <nav className={`flex flex-wrap gap-2 ${className}`} aria-label="Category navigation">
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <Link
            key={category.slug}
            href={`${baseHref}/${category.slug}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default HubLinks;
