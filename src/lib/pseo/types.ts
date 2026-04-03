/**
 * Programmatic SEO Types
 * Core type definitions for scalable SEO page generation
 */

// =============================================================================
// Base Types
// =============================================================================

export type PageTemplate = 'tool' | 'comparison' | 'guide' | 'hub';

export type SchemaType = 
  | 'SoftwareApplication'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'Article'
  | 'ItemList'
  | 'Organization'
  | 'WebPage'
  | 'HowTo';

export type ContentIntent = 'informational' | 'transactional' | 'navigational' | 'commercial';

// =============================================================================
// SEO Types
// =============================================================================

export interface SEOFields {
  /** Page title - intent-matched, 50-60 characters */
  title: string;
  /** Meta description - unique value prop, 150-160 characters */
  description: string;
  /** Canonical URL */
  canonical: string;
  /** Target keywords for the page */
  keywords: string[];
  /** Primary search intent */
  intent: ContentIntent;
  /** Prevent indexing (for thin/duplicate content) */
  noIndex?: boolean;
}

export interface OpenGraphFields {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type: 'website' | 'article';
  url: string;
  siteName: string;
}

export interface TwitterFields {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

// =============================================================================
// Content Types
// =============================================================================

export interface ContentSection {
  id: string;
  heading: string;
  headingLevel: 2 | 3 | 4;
  content: string;
  /** Optional code block */
  code?: {
    language: string;
    content: string;
  };
  /** Optional bullet points */
  bullets?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  /** Related page slugs for internal linking within answer */
  relatedSlugs?: string[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

// =============================================================================
// Linking Types
// =============================================================================

export interface BreadcrumbItem {
  label: string;
  href: string;
  /** Whether this is the current page */
  current?: boolean;
}

export interface RelatedPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  template: PageTemplate;
}

export interface HubLink {
  slug: string;
  label: string;
  description?: string;
}

export interface SiblingPage {
  slug: string;
  title: string;
  /** Position relative to current: -1 = previous, 1 = next */
  position: -1 | 1;
}

// =============================================================================
// Tool-Specific Types
// =============================================================================

export interface ToolFeature {
  name: string;
  description: string;
  available: boolean;
}

export interface ToolPricing {
  type: 'free' | 'freemium' | 'paid' | 'enterprise';
  startingPrice?: string;
  currency?: string;
}

export interface ToolData {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription?: string;
  logo: string;
  website?: string;
  pricing?: ToolPricing;
  features?: ToolFeature[];
  /** Available prompt files */
  files: ToolFile[];
  /** Last updated date */
  lastUpdated?: string;
}

export interface ToolFile {
  name: string;
  type: 'prompt' | 'tools' | 'other';
  path?: string;
}

// =============================================================================
// Comparison Types
// =============================================================================

export interface ComparisonTool {
  id: string;
  name: string;
  slug: string;
  logo: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  rating?: number;
}

export interface ComparisonFeature {
  name: string;
  description: string;
  tool1Value: string | boolean;
  tool2Value: string | boolean;
  winner?: 'tool1' | 'tool2' | 'tie';
}

export interface ComparisonData {
  tool1: ComparisonTool;
  tool2: ComparisonTool;
  features: ComparisonFeature[];
  verdict: string;
  recommendation: string;
}

// =============================================================================
// Guide Types
// =============================================================================

export interface GuideAuthor {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface GuideData {
  topic: string;
  title: string;
  subtitle?: string;
  author?: GuideAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tableOfContents: TableOfContentsItem[];
}

// =============================================================================
// Hub/Category Types
// =============================================================================

export interface CategoryData {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  icon?: string;
  toolCount: number;
  featuredTools: string[];
  featuredComparisons: string[];
  featuredGuides: string[];
}

// =============================================================================
// Main Page Data Interface
// =============================================================================

export interface PSEOPageData {
  /** Unique page slug */
  slug: string;
  /** Page template type */
  template: PageTemplate;
  /** Category slug */
  category: string;
  /** Category display name */
  categoryName: string;
  
  // SEO
  seo: SEOFields;
  openGraph: OpenGraphFields;
  twitter: TwitterFields;
  
  // Content
  content: {
    /** H1 heading - should differ from title */
    h1: string;
    /** Unique intro paragraph */
    intro: string;
    /** Main content sections */
    sections: ContentSection[];
    /** FAQ items (3-5 per page) */
    faqs: FAQ[];
  };
  
  // Internal Linking
  linking: {
    breadcrumbs: BreadcrumbItem[];
    /** Related page slugs (3-6) */
    relatedPages: string[];
    /** Parent hub page slugs */
    hubLinks: string[];
    /** Previous/next pages */
    siblings?: {
      previous?: SiblingPage;
      next?: SiblingPage;
    };
  };
  
  // Schema
  schemaTypes: SchemaType[];
  
  // Template-specific data
  toolData?: ToolData;
  comparisonData?: ComparisonData;
  guideData?: GuideData;
  categoryData?: CategoryData;
  
  // Metadata
  meta: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

// =============================================================================
// Validation Types
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface UniquenessReport {
  duplicateTitles: Array<{ title: string; slugs: string[] }>;
  duplicateDescriptions: Array<{ description: string; slugs: string[] }>;
  thinContent: Array<{ slug: string; wordCount: number }>;
}

export interface CannibalizationConflict {
  keyword: string;
  pages: Array<{
    slug: string;
    title: string;
    keywordDensity: number;
  }>;
  suggestedCanonical: string;
}

export interface CannibalizationReport {
  conflicts: CannibalizationConflict[];
  totalConflicts: number;
  severity: 'none' | 'low' | 'medium' | 'high';
}

// =============================================================================
// Keyword Matrix Types
// =============================================================================

export interface KeywordCluster {
  primary: string;
  secondary: string[];
  relatedPages: string[];
  searchVolume?: number;
  difficulty?: number;
}

export interface KeywordMatrix {
  tools: string[];
  categories: string[];
  useCases: string[];
  comparisons: Array<[string, string]>;
  guides: string[];
}

// =============================================================================
// Sitemap Types
// =============================================================================

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SitemapIndex {
  sitemaps: Array<{
    loc: string;
    lastmod: string;
  }>;
}

// =============================================================================
// Configuration Types
// =============================================================================

export interface PSEOConfig {
  /** Base URL for the site */
  baseUrl: string;
  /** Site name for OG tags */
  siteName: string;
  /** Default OG image */
  defaultOgImage: string;
  /** Minimum word count for content */
  minWordCount: number;
  /** Maximum pages per sitemap */
  maxSitemapUrls: number;
  /** ISR revalidation period in seconds */
  revalidatePeriod: number;
}

export const DEFAULT_PSEO_CONFIG: PSEOConfig = {
  baseUrl: 'https://systemprompts.fun',
  siteName: 'SystemPrompts',
  defaultOgImage: '/og-default.png',
  minWordCount: 300,
  maxSitemapUrls: 50000,
  revalidatePeriod: 86400, // 24 hours
};
