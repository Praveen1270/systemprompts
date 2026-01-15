/**
 * JSON-LD Schema Markup Generation
 * Structured data for search engine rich results
 */

import type {
  PSEOPageData,
  BreadcrumbItem,
  FAQ,
  ToolData,
  ComparisonData,
  GuideData,
  SchemaType,
  PSEOConfig,
} from '@/lib/pseo/types';
import { DEFAULT_PSEO_CONFIG } from '@/lib/pseo/types';

const config: PSEOConfig = DEFAULT_PSEO_CONFIG;

// =============================================================================
// Schema Types (JSON-LD)
// =============================================================================

interface WithContext {
  '@context': 'https://schema.org';
}

interface BreadcrumbListSchema extends WithContext {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

interface FAQPageSchema extends WithContext {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

interface SoftwareApplicationSchema extends WithContext {
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  url?: string;
  image?: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
  };
}

interface ArticleSchema extends WithContext {
  '@type': 'Article';
  headline: string;
  description: string;
  image?: string;
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

interface ItemListSchema extends WithContext {
  '@type': 'ItemList';
  name: string;
  description: string;
  numberOfItems: number;
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    url?: string;
    item?: {
      '@type': 'SoftwareApplication';
      name: string;
      description: string;
    };
  }>;
}

interface OrganizationSchema extends WithContext {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
}

interface WebPageSchema extends WithContext {
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  isPartOf: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  breadcrumb?: BreadcrumbListSchema;
}

interface HowToSchema extends WithContext {
  '@type': 'HowTo';
  name: string;
  description: string;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    position: number;
  }>;
}

type Schema = 
  | BreadcrumbListSchema 
  | FAQPageSchema 
  | SoftwareApplicationSchema 
  | ArticleSchema 
  | ItemListSchema 
  | OrganizationSchema 
  | WebPageSchema
  | HowToSchema;

// =============================================================================
// Schema Generators
// =============================================================================

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: BreadcrumbItem[],
  baseUrl = config.baseUrl
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.current ? {} : { item: `${baseUrl}${crumb.href}` }),
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: FAQ[]): FAQPageSchema {
  return {
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
}

/**
 * Generate SoftwareApplication schema for tool pages
 */
export function generateSoftwareApplicationSchema(
  tool: ToolData,
  baseUrl = config.baseUrl
): SoftwareApplicationSchema {
  const schema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Windows, macOS, Linux',
  };

  if (tool.website) {
    schema.url = tool.website;
  }

  if (tool.logo) {
    schema.image = tool.logo;
  }

  if (tool.pricing) {
    schema.offers = {
      '@type': 'Offer',
      price: tool.pricing.type === 'free' ? '0' : tool.pricing.startingPrice || '0',
      priceCurrency: tool.pricing.currency || 'USD',
    };
  }

  return schema;
}

/**
 * Generate Article schema for guide pages
 */
export function generateArticleSchema(
  guide: GuideData,
  pageData: PSEOPageData,
  baseUrl = config.baseUrl
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: pageData.seo.description,
    image: pageData.openGraph.image,
    author: guide.author ? {
      '@type': 'Person',
      name: guide.author.name,
    } : {
      '@type': 'Organization',
      name: config.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageData.seo.canonical,
    },
  };
}

/**
 * Generate ItemList schema for comparison pages
 */
export function generateComparisonItemListSchema(
  comparison: ComparisonData,
  pageData: PSEOPageData,
  baseUrl = config.baseUrl
): ItemListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${comparison.tool1.name} vs ${comparison.tool2.name} Comparison`,
    description: pageData.seo.description,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: comparison.tool1.name,
        url: `${baseUrl}/tools/${comparison.tool1.slug}`,
        item: {
          '@type': 'SoftwareApplication',
          name: comparison.tool1.name,
          description: comparison.tool1.bestFor,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: comparison.tool2.name,
        url: `${baseUrl}/tools/${comparison.tool2.slug}`,
        item: {
          '@type': 'SoftwareApplication',
          name: comparison.tool2.name,
          description: comparison.tool2.bestFor,
        },
      },
    ],
  };
}

/**
 * Generate ItemList schema for category hub pages
 */
export function generateCategoryItemListSchema(
  categoryName: string,
  tools: Array<{ name: string; slug: string; description: string }>,
  baseUrl = config.baseUrl
): ItemListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} Tools`,
    description: `Collection of ${categoryName.toLowerCase()} tools with verified system prompts`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${baseUrl}/tools/${tool.slug}`,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
      },
    })),
  };
}

/**
 * Generate Organization schema (for site-wide use)
 */
export function generateOrganizationSchema(
  baseUrl = config.baseUrl
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'A database of verified LLM system prompts from top AI coding assistants and tools.',
    sameAs: [
      'https://twitter.com/systemprompts',
      'https://github.com/systemprompts',
    ],
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
  pageData: PSEOPageData,
  breadcrumbSchema?: BreadcrumbListSchema,
  baseUrl = config.baseUrl
): WebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.seo.title,
    description: pageData.seo.description,
    url: pageData.seo.canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: config.siteName,
      url: baseUrl,
    },
    ...(breadcrumbSchema ? { breadcrumb: breadcrumbSchema } : {}),
  };
}

/**
 * Generate HowTo schema for guide pages with steps
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string }>
): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      position: index + 1,
    })),
  };
}

// =============================================================================
// Main Schema Generation
// =============================================================================

/**
 * Generate all applicable schemas for a page
 */
export function generatePageSchemas(
  pageData: PSEOPageData,
  baseUrl = config.baseUrl
): Schema[] {
  const schemas: Schema[] = [];

  // Always add breadcrumbs if present
  if (pageData.linking.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(pageData.linking.breadcrumbs, baseUrl));
  }

  // Always add FAQs if present
  if (pageData.content.faqs.length > 0) {
    schemas.push(generateFAQSchema(pageData.content.faqs));
  }

  // Template-specific schemas
  switch (pageData.template) {
    case 'tool':
      if (pageData.toolData) {
        schemas.push(generateSoftwareApplicationSchema(pageData.toolData, baseUrl));
      }
      break;

    case 'comparison':
      if (pageData.comparisonData) {
        schemas.push(generateComparisonItemListSchema(pageData.comparisonData, pageData, baseUrl));
      }
      break;

    case 'guide':
      if (pageData.guideData) {
        schemas.push(generateArticleSchema(pageData.guideData, pageData, baseUrl));
      }
      break;

    case 'hub':
      // ItemList schema would be added with the tools data
      break;
  }

  return schemas;
}

/**
 * Convert schemas to JSON-LD script tags
 */
export function schemasToJsonLd(schemas: Schema[]): string {
  return schemas
    .map((schema) => JSON.stringify(schema, null, 0))
    .join('\n');
}

/**
 * Generate JSON-LD script element content
 */
export function generateJsonLdScript(schemas: Schema[]): string {
  if (schemas.length === 0) return '';
  
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  
  // Multiple schemas as array
  return JSON.stringify(schemas);
}

// =============================================================================
// Schema Validation Helpers
// =============================================================================

/**
 * Validate schema completeness
 */
export function validateSchema(schema: Schema): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!schema['@context']) {
    errors.push('Missing @context');
  }

  if (!schema['@type']) {
    errors.push('Missing @type');
  }

  // Type-specific validation
  switch (schema['@type']) {
    case 'BreadcrumbList':
      if (!(schema as BreadcrumbListSchema).itemListElement?.length) {
        errors.push('BreadcrumbList must have at least one item');
      }
      break;

    case 'FAQPage':
      if (!(schema as FAQPageSchema).mainEntity?.length) {
        errors.push('FAQPage must have at least one question');
      }
      break;

    case 'Article':
      const article = schema as ArticleSchema;
      if (!article.headline) errors.push('Article must have headline');
      if (!article.datePublished) errors.push('Article must have datePublished');
      break;

    case 'SoftwareApplication':
      const app = schema as SoftwareApplicationSchema;
      if (!app.name) errors.push('SoftwareApplication must have name');
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check which schema types are applicable for a page
 */
export function getApplicableSchemaTypes(pageData: PSEOPageData): SchemaType[] {
  const types: SchemaType[] = ['WebPage', 'BreadcrumbList'];

  if (pageData.content.faqs.length > 0) {
    types.push('FAQPage');
  }

  switch (pageData.template) {
    case 'tool':
      types.push('SoftwareApplication');
      break;
    case 'comparison':
      types.push('ItemList');
      break;
    case 'guide':
      types.push('Article');
      break;
    case 'hub':
      types.push('ItemList');
      break;
  }

  return types;
}
