'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQ } from '@/lib/pseo/types';

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  /** Include JSON-LD schema in the component */
  includeSchema?: boolean;
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  className?: string;
}

/**
 * FAQ accordion with FAQPage schema markup
 * Optimized for featured snippets and rich results
 */
export function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  includeSchema = true,
  allowMultiple = false,
  className = '',
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  if (faqs.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  // Generate FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section 
      className={`${className}`} 
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Schema markup */}
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h2 
          id="faq-heading" 
          className="text-xl font-semibold text-gray-900"
        >
          {title}
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
          />
        ))}
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div 
      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      {/* Question */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3 
          className="font-medium text-gray-900 pr-4"
          itemProp="name"
        >
          {faq.question}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
          aria-hidden="true"
        />
      </button>

      {/* Answer */}
      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div 
          className="px-4 pb-4 text-gray-600 prose prose-sm max-w-none"
          itemProp="text"
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

/**
 * Simple FAQ list without accordion (better for SEO crawlability)
 */
export function FAQList({
  faqs,
  title = 'Frequently Asked Questions',
  includeSchema = true,
  className = '',
}: Omit<FAQSectionProps, 'allowMultiple'>) {
  if (faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section 
      className={`${className}`} 
      aria-labelledby="faq-list-heading"
    >
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <h2 
        id="faq-list-heading" 
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        {title}
      </h2>

      <dl className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.id}>
            <dt className="font-medium text-gray-900 mb-2">
              {faq.question}
            </dt>
            <dd className="text-gray-600 pl-4 border-l-2 border-gray-200">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * Compact FAQ for sidebars or footers
 */
export function FAQCompact({
  faqs,
  limit = 5,
  className = '',
}: {
  faqs: FAQ[];
  limit?: number;
  className?: string;
}) {
  const displayFaqs = faqs.slice(0, limit);

  if (displayFaqs.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {displayFaqs.map((faq) => (
        <div key={faq.id} className="text-sm">
          <p className="font-medium text-gray-900 mb-1">{faq.question}</p>
          <p className="text-gray-600 line-clamp-2">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQSection;
