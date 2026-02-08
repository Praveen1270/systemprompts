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
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
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
      className={`glass-panel overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.04]' : 'bg-white/[0.01]'}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      {/* Question */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3
          className={`font-semibold text-lg transition-colors ${isOpen ? 'text-accent-primary' : 'text-text-primary'}`}
          itemProp="name"
        >
          {faq.question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-accent-primary' : ''
            }`}
          aria-hidden="true"
        />
      </button>

      {/* Answer */}
      <div
        id={`faq-answer-${faq.id}`}
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div
          className="px-6 pb-6 text-text-secondary leading-relaxed max-w-4xl"
          itemProp="text"
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

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
        className="text-2xl font-bold mb-8 italic font-serif"
      >
        {title}
      </h2>

      <dl className="space-y-10">
        {faqs.map((faq) => (
          <div key={faq.id} className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            <dt className="font-bold text-text-primary">
              {faq.question}
            </dt>
            <dd className="text-text-secondary pl-6 border-l border-accent-primary/20 leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

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
    <div className={`space-y-6 ${className}`}>
      {displayFaqs.map((faq) => (
        <div key={faq.id} className="text-sm">
          <p className="font-bold text-text-primary mb-2">{faq.question}</p>
          <p className="text-text-muted line-clamp-3 leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQSection;
