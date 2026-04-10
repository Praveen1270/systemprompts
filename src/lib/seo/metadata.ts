/**
 * SEO Metadata Generation
 * Dynamic metadata generation for programmatic SEO pages
 */

import type { Metadata } from 'next';
import type { 
  PSEOPageData, 
  SEOFields, 
  OpenGraphFields, 
  TwitterFields,
  PageTemplate,
  PSEOConfig 
} from '@/lib/pseo/types';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

// =============================================================================
// Configuration
// =============================================================================

const config: PSEOConfig = DEFAULT_PSEO_CONFIG;

function absoluteOgImageUrl(image?: string): string {
  const fallback = `${config.baseUrl}${config.defaultOgImage}`;
  if (!image) return fallback;
  if (image.startsWith('http')) return image;
  return `${config.baseUrl}${image.startsWith('/') ? image : `/${image}`}`;
}

// =============================================================================
// Title Generation
// =============================================================================

interface TitleTemplateVars {
  toolName?: string;
  tool1Name?: string;
  tool2Name?: string;
  categoryName?: string;
  topic?: string;
  year?: number;
}

const TITLE_TEMPLATES: Record<PageTemplate, string[]> = {
  tool: [
    '{toolName} System Prompt | {categoryName} Prompts',
    '{toolName} AI Prompt | Verified {categoryName} System Prompts',
    '{toolName} Prompt Collection | {categoryName}',
  ],
  comparison: [
    '{tool1Name} vs {tool2Name}: {year} Comparison',
    '{tool1Name} vs {tool2Name} | Which AI Tool Is Better?',
    'Compare {tool1Name} and {tool2Name} | {year} Guide',
  ],
  guide: [
    '{topic} | Complete Guide to {categoryName}',
    '{topic}: Expert Guide | SystemPrompts',
    '{topic} - {categoryName} Best Practices',
  ],
  hub: [
    '{categoryName} System Prompts | AI Tools Directory',
    'Best {categoryName} Tools & Prompts | {year}',
    '{categoryName} | Verified AI System Prompts',
  ],
};

/**
 * Generate a unique title based on template and variables
 */
export function generateTitle(
  template: PageTemplate,
  vars: TitleTemplateVars,
  templateIndex = 0
): string {
  const templates = TITLE_TEMPLATES[template];
  const selectedTemplate = templates[templateIndex % templates.length];
  
  let title = selectedTemplate;
  
  // Replace variables
  if (vars.toolName) title = title.replace('{toolName}', vars.toolName);
  if (vars.tool1Name) title = title.replace('{tool1Name}', vars.tool1Name);
  if (vars.tool2Name) title = title.replace('{tool2Name}', vars.tool2Name);
  if (vars.categoryName) title = title.replace('{categoryName}', vars.categoryName);
  if (vars.topic) title = title.replace('{topic}', vars.topic);
  title = title.replace('{year}', String(vars.year || new Date().getFullYear()));
  
  // Ensure title is within optimal length (50-60 chars)
  if (title.length > 60) {
    // Truncate intelligently at word boundary
    const truncated = title.substring(0, 57).replace(/\s+\S*$/, '');
    title = truncated + '...';
  }
  
  return title;
}

// =============================================================================
// Description Generation
// =============================================================================

const DESCRIPTION_TEMPLATES: Record<PageTemplate, string[]> = {
  tool: [
    'Explore {toolName} system prompts and AI configurations. Verified prompts from {categoryName} with detailed documentation.',
    'Get the official {toolName} system prompt. Part of our verified {categoryName} collection with {fileCount}+ prompt files.',
    'Access {toolName} AI prompts and tool definitions. Comprehensive {categoryName} prompt library for developers.',
  ],
  comparison: [
    'Compare {tool1Name} vs {tool2Name} in our detailed {year} comparison. Features, pricing, pros & cons analyzed.',
    '{tool1Name} or {tool2Name}? Our expert comparison covers features, performance, and which tool suits your needs.',
    'Detailed {tool1Name} vs {tool2Name} comparison. Find out which {categoryName} is right for your workflow.',
  ],
  guide: [
    '{topic} - comprehensive guide covering best practices, examples, and expert tips for {categoryName}.',
    'Learn about {topic}. Expert guide with practical examples and actionable advice for {categoryName}.',
    'Master {topic} with our in-depth guide. Covers fundamentals to advanced techniques in {categoryName}.',
  ],
  hub: [
    'Browse {toolCount}+ verified {categoryName} system prompts. Curated collection of AI tool configurations.',
    'Discover the best {categoryName} with verified system prompts. Compare tools and find the right AI assistant.',
    'Complete directory of {categoryName}. Verified prompts, comparisons, and guides all in one place.',
  ],
};

interface DescriptionTemplateVars extends TitleTemplateVars {
  fileCount?: number;
  toolCount?: number;
}

/**
 * Generate a unique description based on template and variables
 */
export function generateDescription(
  template: PageTemplate,
  vars: DescriptionTemplateVars,
  templateIndex = 0
): string {
  const templates = DESCRIPTION_TEMPLATES[template];
  const selectedTemplate = templates[templateIndex % templates.length];
  
  let description = selectedTemplate;
  
  // Replace variables
  if (vars.toolName) description = description.replace('{toolName}', vars.toolName);
  if (vars.tool1Name) description = description.replace('{tool1Name}', vars.tool1Name);
  if (vars.tool2Name) description = description.replace('{tool2Name}', vars.tool2Name);
  if (vars.categoryName) description = description.replace('{categoryName}', vars.categoryName);
  if (vars.topic) description = description.replace('{topic}', vars.topic);
  if (vars.fileCount) description = description.replace('{fileCount}', String(vars.fileCount));
  if (vars.toolCount) description = description.replace('{toolCount}', String(vars.toolCount));
  description = description.replace('{year}', String(vars.year || new Date().getFullYear()));
  
  // Ensure description is within optimal length (150-160 chars)
  if (description.length > 160) {
    const truncated = description.substring(0, 157).replace(/\s+\S*$/, '');
    description = truncated + '...';
  }
  
  return description;
}

// =============================================================================
// Full Metadata Generation
// =============================================================================

/**
 * Generate complete Next.js Metadata object from page data
 */
export function generateMetadata(pageData: PSEOPageData): Metadata {
  const { seo, openGraph, twitter } = pageData;
  const ogImageUrl = absoluteOgImageUrl(openGraph.image);
  const twitterImageUrl = absoluteOgImageUrl(twitter.image ?? openGraph.image);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    
    // Robots
    robots: seo.noIndex 
      ? { index: false, follow: false }
      : { index: true, follow: true },
    
    // Canonical
    alternates: {
      canonical: seo.canonical,
    },
    
    // Open Graph
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      url: openGraph.url,
      siteName: openGraph.siteName,
      type: openGraph.type,
      images: [
        {
          url: ogImageUrl,
          alt: openGraph.imageAlt || openGraph.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: twitter.card,
      title: twitter.title,
      description: twitter.description,
      images: [twitterImageUrl],
    },
    
    // Additional meta
    other: {
      'article:modified_time': pageData.meta.updatedAt,
    },
  };
}

/**
 * Generate metadata from minimal inputs (convenience function)
 */
export function generateMetadataFromSlug(
  slug: string,
  template: PageTemplate,
  vars: DescriptionTemplateVars & { baseUrl?: string }
): Metadata {
  const baseUrl = vars.baseUrl || config.baseUrl;
  const title = generateTitle(template, vars);
  const description = generateDescription(template, vars);
  
  const canonical = buildCanonicalUrl(slug, template, baseUrl);
  const ogImageUrl = absoluteOgImageUrl();
  
  return {
    title,
    description,
    keywords: buildKeywords(template, vars),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config.siteName,
      type: template === 'guide' ? 'article' : 'website',
      images: [
        { url: ogImageUrl, alt: title, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Build canonical URL based on template type
 */
export function buildCanonicalUrl(
  slug: string,
  template: PageTemplate,
  baseUrl = config.baseUrl
): string {
  const paths: Record<PageTemplate, string> = {
    tool: `/tools/${slug}`,
    comparison: `/compare/${slug}`,
    guide: `/guides/${slug}`,
    hub: `/${slug}`,
  };
  
  return `${baseUrl}${paths[template]}`;
}

/**
 * Build canonical URL with category for tool pages
 */
export function buildToolCanonicalUrl(
  categorySlug: string,
  toolSlug: string,
  baseUrl = config.baseUrl
): string {
  return `${baseUrl}/tools/${categorySlug}/${toolSlug}`;
}

/**
 * Generate keywords array from template variables
 */
export function buildKeywords(
  template: PageTemplate,
  vars: TitleTemplateVars
): string[] {
  const baseKeywords = ['AI', 'system prompts', 'LLM', 'artificial intelligence'];
  
  const templateKeywords: Record<PageTemplate, string[]> = {
    tool: [
      vars.toolName || '',
      `${vars.toolName} prompt`,
      `${vars.toolName} system prompt`,
      vars.categoryName || '',
    ],
    comparison: [
      vars.tool1Name || '',
      vars.tool2Name || '',
      `${vars.tool1Name} vs ${vars.tool2Name}`,
      'AI tool comparison',
    ],
    guide: [
      vars.topic || '',
      vars.categoryName || '',
      'AI guide',
      'best practices',
    ],
    hub: [
      vars.categoryName || '',
      `best ${vars.categoryName}`,
      'AI tools directory',
    ],
  };
  
  return [
    ...baseKeywords,
    ...templateKeywords[template].filter(Boolean),
  ];
}

/**
 * Generate SEO fields object
 */
export function buildSEOFields(
  template: PageTemplate,
  vars: DescriptionTemplateVars,
  templateIndex = 0
): SEOFields {
  return {
    title: generateTitle(template, vars, templateIndex),
    description: generateDescription(template, vars, templateIndex),
    canonical: buildCanonicalUrl(vars.toolName?.toLowerCase().replace(/\s+/g, '-') || '', template),
    keywords: buildKeywords(template, vars),
    intent: getDefaultIntent(template),
  };
}

/**
 * Get default search intent for template type
 */
function getDefaultIntent(template: PageTemplate): SEOFields['intent'] {
  const intents: Record<PageTemplate, SEOFields['intent']> = {
    tool: 'informational',
    comparison: 'commercial',
    guide: 'informational',
    hub: 'navigational',
  };
  return intents[template];
}

/**
 * Generate OpenGraph fields
 */
export function buildOpenGraphFields(
  seo: SEOFields,
  template: PageTemplate,
  image?: string
): OpenGraphFields {
  return {
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    siteName: config.siteName,
    type: template === 'guide' ? 'article' : 'website',
    image: image || config.defaultOgImage,
    imageAlt: seo.title,
  };
}

/**
 * Generate Twitter card fields
 */
export function buildTwitterFields(
  seo: SEOFields,
  image?: string
): TwitterFields {
  return {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    image: image || config.defaultOgImage,
    imageAlt: seo.title,
  };
}

// =============================================================================
// Validation Helpers
// =============================================================================

/**
 * Check if title length is optimal
 */
export function isTitleLengthOptimal(title: string): boolean {
  return title.length >= 30 && title.length <= 60;
}

/**
 * Check if description length is optimal
 */
export function isDescriptionLengthOptimal(description: string): boolean {
  return description.length >= 120 && description.length <= 160;
}

/**
 * Get title length status
 */
export function getTitleStatus(title: string): 'short' | 'optimal' | 'long' {
  if (title.length < 30) return 'short';
  if (title.length > 60) return 'long';
  return 'optimal';
}

/**
 * Get description length status
 */
export function getDescriptionStatus(description: string): 'short' | 'optimal' | 'long' {
  if (description.length < 120) return 'short';
  if (description.length > 160) return 'long';
  return 'optimal';
}
