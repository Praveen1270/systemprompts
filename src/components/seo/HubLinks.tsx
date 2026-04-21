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
        className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"
      >
        <Grid3X3 className="w-5 h-5 text-accent-primary" aria-hidden="true" />
        {title}
      </h2>

      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group inline-flex items-center gap-2 px-4 py-2.5 glass-panel border border-border-subtle rounded-lg hover:border-accent-primary/35 transition-colors"
          >
            <FolderOpen 
              className="w-4 h-4 text-text-muted group-hover:text-accent-primary" 
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary">
              {link.label}
            </span>
            <ArrowUpRight 
              className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-primary" 
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
      <span className="text-text-muted">Categories:</span>
      {links.map((link, index) => (
        <span key={link.slug} className="flex items-center gap-2">
          <Link
            href={`/${link.slug}`}
            className="text-accent-primary hover:text-accent-secondary hover:underline transition-colors"
          >
            {link.label}
          </Link>
          {index < links.length - 1 && (
            <span className="text-border-bright">•</span>
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
        className="text-xl font-semibold text-text-primary mb-4"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group flex items-start gap-4 p-4 glass-panel border border-border-subtle rounded-xl hover:border-accent-primary/35 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0 border border-accent-primary/20">
              <FolderOpen 
                className="w-5 h-5 text-accent-primary" 
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-text-primary group-hover:text-accent-primary transition-colors">
                {link.label}
              </h3>
              {link.description && (
                <p className="text-sm text-text-muted line-clamp-2 mt-0.5">
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
      className={`inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors ${className}`}
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
                ? 'bg-accent-primary text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                : 'bg-bg-base text-text-secondary hover:bg-bg-surface border border-border-subtle'
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
