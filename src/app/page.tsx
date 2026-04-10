import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const SITE_URL = 'https://www.systemprompts.fun';
const SITE_NAME = 'SystemPrompts';
const OG_IMAGE = `${SITE_URL}/og-default.png`;

/** Homepage-specific metadata (merges with root layout). Programmatic SEO: unique title + description for `/`. */
export const metadata: Metadata = {
  title: 'LLM System Prompts: Cursor, Claude & 50+ Tools',
  description:
    'Free verified LLM system prompts from Cursor, Claude Code, v0, Lovable, Devin, Copilot, and 50+ tools. Search, compare, and learn how products instruct models.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'LLM System Prompts: Cursor, Claude & 50+ Tools',
    description:
      'Verified system prompts from top AI coding assistants. Guides, glossary, and comparisons included.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'SystemPrompts — verified LLM system prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Praveenthotakur',
    creator: '@Praveenthotakur',
    title: 'LLM System Prompts: Cursor, Claude & 50+ Tools',
    description:
      'Search verified system prompts from 50+ AI tools. Free archive for developers and prompt engineers.',
    images: [OG_IMAGE],
  },
};

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SystemPrompts — Verified LLM system prompt archive',
  description:
    'A searchable collection of verified system prompts from AI coding tools including Cursor, Claude Code, GitHub Copilot, v0, Lovable, and Devin.',
  url: SITE_URL,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: {
    '@type': 'Thing',
    name: 'Large language model system prompts',
    description: 'Instructions used to configure behavior of AI coding assistants and chat products.',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'AI tools with published system prompts',
    numberOfItems: 50,
    description: 'Browse prompts by tool, category, and file. Includes guides, glossary, and comparison pages.',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
