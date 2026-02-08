'use client';

import Link from 'next/link';
import { ChevronRight, Home, Slash } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/pseo/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * SEO-optimized breadcrumb navigation
 * Renders visible breadcrumbs with BreadcrumbList schema markup
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${className} font-technical text-[10px] tracking-[0.2em]`}
    >
      <ol
        className="flex flex-wrap items-center gap-2"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.href}
              className="flex items-center gap-2 uppercase"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {/* Separator */}
              {!isFirst && (
                <Slash
                  className="w-3 h-3 text-text-muted opacity-30"
                  aria-hidden="true"
                />
              )}

              {/* Breadcrumb link or text */}
              {isLast || item.current ? (
                <span
                  className="text-accent-primary font-bold"
                  itemProp="name"
                  aria-current="page"
                >
                  {isFirst ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
                  itemProp="item"
                >
                  {isFirst ? (
                    <>
                      <Home className="w-3 h-3" aria-hidden="true" />
                      <span className="sr-only" itemProp="name">{item.label}</span>
                    </>
                  ) : (
                    <span itemProp="name">{item.label}</span>
                  )}
                </Link>
              )}

              {/* Schema position */}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Compact breadcrumbs for mobile
 */
export function BreadcrumbsCompact({ items, className = '' }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const parent = items[items.length - 2];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${className} font-technical text-[10px] tracking-widest`}
    >
      <div className="flex items-center gap-1.5">
        <Link
          href={parent.href}
          className="text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 uppercase"
        >
          <ArrowLeft className="w-3 h-3" aria-hidden="true" />
          <span>{parent.label}</span>
        </Link>
      </div>
    </nav>
  );
}

import { ArrowLeft } from 'lucide-react';

export default Breadcrumbs;
