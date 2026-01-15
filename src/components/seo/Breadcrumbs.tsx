'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
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
      className={`text-sm ${className}`}
    >
      <ol 
        className="flex flex-wrap items-center gap-1.5"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li 
              key={item.href}
              className="flex items-center gap-1.5"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {/* Separator */}
              {!isFirst && (
                <ChevronRight 
                  className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" 
                  aria-hidden="true"
                />
              )}

              {/* Breadcrumb link or text */}
              {isLast || item.current ? (
                <span
                  className="text-gray-600 font-medium truncate max-w-[200px]"
                  itemProp="name"
                  aria-current="page"
                >
                  {isFirst ? (
                    <span className="flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 truncate max-w-[200px]"
                  itemProp="item"
                >
                  {isFirst ? (
                    <>
                      <Home className="w-3.5 h-3.5" aria-hidden="true" />
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

  // Show only parent and current on mobile
  const parent = items[items.length - 2];
  const current = items[items.length - 1];

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`text-sm ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <Link
          href={parent.href}
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          <ChevronRight className="w-3.5 h-3.5 rotate-180" aria-hidden="true" />
          <span>{parent.label}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
