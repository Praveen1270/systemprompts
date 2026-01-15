/**
 * PSEO Data Loading Utilities
 * Efficient data loading for programmatic SEO at scale
 */

import fs from 'fs';
import path from 'path';
import type {
  PSEOPageData,
  ToolData,
  ComparisonData,
  GuideData,
  CategoryData,
  PageTemplate,
  PSEOConfig,
} from './types';
import { DEFAULT_PSEO_CONFIG } from './types';
import {
  getBreadcrumbs,
  getHubLinks,
  categoryToSlug,
  buildToolUrl,
  buildComparisonUrl,
  buildGuideUrl,
  buildHubUrl,
} from '@/lib/seo/linking';
import {
  buildSEOFields,
  buildOpenGraphFields,
  buildTwitterFields,
} from '@/lib/seo/metadata';

const config: PSEOConfig = DEFAULT_PSEO_CONFIG;

// =============================================================================
// File System Helpers
// =============================================================================

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'pseo');

/**
 * Check if a directory exists
 */
function directoryExists(dirPath: string): boolean {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Read JSON file safely
 */
function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fileExists(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    return null;
  }
}

/**
 * List all JSON files in a directory
 */
function listJsonFiles(dirPath: string): string[] {
  try {
    if (!directoryExists(dirPath)) return [];
    return fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));
  } catch {
    return [];
  }
}

/**
 * List all subdirectories in a directory
 */
function listSubdirectories(dirPath: string): string[] {
  try {
    if (!directoryExists(dirPath)) return [];
    return fs
      .readdirSync(dirPath)
      .filter((item) => {
        const itemPath = path.join(dirPath, item);
        return fs.statSync(itemPath).isDirectory();
      });
  } catch {
    return [];
  }
}

// =============================================================================
// Page Data Loaders
// =============================================================================

/**
 * Load tool page data
 */
export async function loadToolPageData(
  categorySlug: string,
  toolSlug: string
): Promise<PSEOPageData | null> {
  const filePath = path.join(DATA_DIR, categorySlug, `${toolSlug}.json`);
  const data = readJsonFile<Partial<PSEOPageData>>(filePath);
  
  if (!data) return null;
  
  return enrichPageData(data, 'tool', categorySlug, toolSlug);
}

/**
 * Load comparison page data
 */
export async function loadComparisonPageData(
  comparisonSlug: string
): Promise<PSEOPageData | null> {
  const filePath = path.join(DATA_DIR, 'comparisons', `${comparisonSlug}.json`);
  const data = readJsonFile<Partial<PSEOPageData>>(filePath);
  
  if (!data) return null;
  
  return enrichPageData(data, 'comparison', 'comparisons', comparisonSlug);
}

/**
 * Load guide page data
 */
export async function loadGuidePageData(
  guideSlug: string
): Promise<PSEOPageData | null> {
  const filePath = path.join(DATA_DIR, 'guides', `${guideSlug}.json`);
  const data = readJsonFile<Partial<PSEOPageData>>(filePath);
  
  if (!data) return null;
  
  return enrichPageData(data, 'guide', 'guides', guideSlug);
}

/**
 * Load category hub page data
 */
export async function loadHubPageData(
  categorySlug: string
): Promise<PSEOPageData | null> {
  const filePath = path.join(DATA_DIR, 'categories', `${categorySlug}.json`);
  const data = readJsonFile<Partial<PSEOPageData>>(filePath);
  
  if (!data) return null;
  
  return enrichPageData(data, 'hub', categorySlug, categorySlug);
}

/**
 * Enrich partial page data with computed fields
 */
function enrichPageData(
  data: Partial<PSEOPageData>,
  template: PageTemplate,
  category: string,
  slug: string
): PSEOPageData {
  const categoryName = data.categoryName || formatCategoryName(category);
  const now = new Date().toISOString();
  
  // Build URLs based on template
  const canonical = buildCanonicalForTemplate(template, category, slug);
  
  // Default SEO fields if not provided
  const seoFields = data.seo || buildSEOFields(template, {
    toolName: data.toolData?.name,
    categoryName,
    tool1Name: data.comparisonData?.tool1.name,
    tool2Name: data.comparisonData?.tool2.name,
    topic: data.guideData?.topic,
  });
  
  // Ensure canonical is set
  seoFields.canonical = seoFields.canonical || `${config.baseUrl}${canonical}`;
  
  return {
    slug,
    template,
    category,
    categoryName,
    
    seo: seoFields,
    openGraph: data.openGraph || buildOpenGraphFields(seoFields, template),
    twitter: data.twitter || buildTwitterFields(seoFields),
    
    content: {
      h1: data.content?.h1 || seoFields.title,
      intro: data.content?.intro || seoFields.description,
      sections: data.content?.sections || [],
      faqs: data.content?.faqs || [],
    },
    
    linking: {
      breadcrumbs: data.linking?.breadcrumbs || getBreadcrumbs(template, {
        name: data.toolData?.name || data.guideData?.title || categoryName,
        slug,
        categoryName,
        categorySlug: category,
        tool1Name: data.comparisonData?.tool1.name,
        tool2Name: data.comparisonData?.tool2.name,
      }),
      relatedPages: data.linking?.relatedPages || [],
      hubLinks: data.linking?.hubLinks || getHubLinks(template, category, categoryName).map(h => h.slug),
      siblings: data.linking?.siblings,
    },
    
    schemaTypes: data.schemaTypes || getDefaultSchemaTypes(template, data.content?.faqs?.length || 0),
    
    toolData: data.toolData,
    comparisonData: data.comparisonData,
    guideData: data.guideData,
    categoryData: data.categoryData,
    
    meta: {
      createdAt: data.meta?.createdAt || now,
      updatedAt: data.meta?.updatedAt || now,
      version: data.meta?.version || 1,
    },
  };
}

/**
 * Build canonical URL based on template
 */
function buildCanonicalForTemplate(
  template: PageTemplate,
  category: string,
  slug: string
): string {
  switch (template) {
    case 'tool':
      return buildToolUrl(category, slug);
    case 'comparison':
      return buildComparisonUrl(slug.split('-vs-')[0], slug.split('-vs-')[1] || slug);
    case 'guide':
      return buildGuideUrl(slug);
    case 'hub':
      return buildHubUrl(category);
    default:
      return `/${slug}`;
  }
}

/**
 * Get default schema types for a template
 */
function getDefaultSchemaTypes(template: PageTemplate, faqCount: number): PSEOPageData['schemaTypes'] {
  const types: PSEOPageData['schemaTypes'] = ['WebPage', 'BreadcrumbList'];
  
  if (faqCount > 0) {
    types.push('FAQPage');
  }
  
  switch (template) {
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

/**
 * Format category slug to display name
 */
function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// =============================================================================
// Static Params Generation
// =============================================================================

/**
 * Generate static params for tool pages
 */
export async function generateToolStaticParams(): Promise<
  Array<{ category: string; slug: string }>
> {
  const params: Array<{ category: string; slug: string }> = [];
  
  // List all category directories
  const categories = listSubdirectories(DATA_DIR).filter(
    (dir) => !['comparisons', 'guides', 'categories'].includes(dir)
  );
  
  for (const category of categories) {
    const categoryDir = path.join(DATA_DIR, category);
    const tools = listJsonFiles(categoryDir);
    
    for (const tool of tools) {
      params.push({ category, slug: tool });
    }
  }
  
  return params;
}

/**
 * Generate static params for comparison pages
 */
export async function generateComparisonStaticParams(): Promise<
  Array<{ slug: string }>
> {
  const comparisonsDir = path.join(DATA_DIR, 'comparisons');
  const comparisons = listJsonFiles(comparisonsDir);
  
  return comparisons.map((slug) => ({ slug }));
}

/**
 * Generate static params for guide pages
 */
export async function generateGuideStaticParams(): Promise<
  Array<{ topic: string }>
> {
  const guidesDir = path.join(DATA_DIR, 'guides');
  const guides = listJsonFiles(guidesDir);
  
  return guides.map((slug) => ({ topic: slug }));
}

/**
 * Generate static params for category hub pages
 */
export async function generateHubStaticParams(): Promise<
  Array<{ category: string }>
> {
  const categoriesDir = path.join(DATA_DIR, 'categories');
  const categories = listJsonFiles(categoriesDir);
  
  return categories.map((slug) => ({ category: slug }));
}

// =============================================================================
// Bulk Data Loading
// =============================================================================

/**
 * Load all tool page data
 */
export async function loadAllToolPages(): Promise<PSEOPageData[]> {
  const params = await generateToolStaticParams();
  const pages: PSEOPageData[] = [];
  
  for (const { category, slug } of params) {
    const page = await loadToolPageData(category, slug);
    if (page) pages.push(page);
  }
  
  return pages;
}

/**
 * Load all comparison page data
 */
export async function loadAllComparisonPages(): Promise<PSEOPageData[]> {
  const params = await generateComparisonStaticParams();
  const pages: PSEOPageData[] = [];
  
  for (const { slug } of params) {
    const page = await loadComparisonPageData(slug);
    if (page) pages.push(page);
  }
  
  return pages;
}

/**
 * Load all guide page data
 */
export async function loadAllGuidePages(): Promise<PSEOPageData[]> {
  const params = await generateGuideStaticParams();
  const pages: PSEOPageData[] = [];
  
  for (const { topic } of params) {
    const page = await loadGuidePageData(topic);
    if (page) pages.push(page);
  }
  
  return pages;
}

/**
 * Load all hub page data
 */
export async function loadAllHubPages(): Promise<PSEOPageData[]> {
  const params = await generateHubStaticParams();
  const pages: PSEOPageData[] = [];
  
  for (const { category } of params) {
    const page = await loadHubPageData(category);
    if (page) pages.push(page);
  }
  
  return pages;
}

/**
 * Load all PSEO pages
 */
export async function loadAllPages(): Promise<PSEOPageData[]> {
  const [tools, comparisons, guides, hubs] = await Promise.all([
    loadAllToolPages(),
    loadAllComparisonPages(),
    loadAllGuidePages(),
    loadAllHubPages(),
  ]);
  
  return [...tools, ...comparisons, ...guides, ...hubs];
}

// =============================================================================
// Page Count Utilities
// =============================================================================

/**
 * Get total page counts by type
 */
export async function getPageCounts(): Promise<{
  tools: number;
  comparisons: number;
  guides: number;
  hubs: number;
  total: number;
}> {
  const [tools, comparisons, guides, hubs] = await Promise.all([
    generateToolStaticParams(),
    generateComparisonStaticParams(),
    generateGuideStaticParams(),
    generateHubStaticParams(),
  ]);
  
  return {
    tools: tools.length,
    comparisons: comparisons.length,
    guides: guides.length,
    hubs: hubs.length,
    total: tools.length + comparisons.length + guides.length + hubs.length,
  };
}

// =============================================================================
// Cache Utilities
// =============================================================================

// Simple in-memory cache for development
const pageCache = new Map<string, { data: PSEOPageData; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute for dev

/**
 * Get page data with caching
 */
export async function getCachedPageData(
  template: PageTemplate,
  ...slugParts: string[]
): Promise<PSEOPageData | null> {
  const cacheKey = `${template}:${slugParts.join(':')}`;
  const cached = pageCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  let data: PSEOPageData | null = null;
  
  switch (template) {
    case 'tool':
      data = await loadToolPageData(slugParts[0], slugParts[1]);
      break;
    case 'comparison':
      data = await loadComparisonPageData(slugParts[0]);
      break;
    case 'guide':
      data = await loadGuidePageData(slugParts[0]);
      break;
    case 'hub':
      data = await loadHubPageData(slugParts[0]);
      break;
  }
  
  if (data) {
    pageCache.set(cacheKey, { data, timestamp: Date.now() });
  }
  
  return data;
}

/**
 * Clear page cache
 */
export function clearPageCache(): void {
  pageCache.clear();
}

// =============================================================================
// Data Directory Initialization
// =============================================================================

/**
 * Ensure data directories exist
 */
export function ensureDataDirectories(): void {
  const dirs = [
    DATA_DIR,
    path.join(DATA_DIR, 'comparisons'),
    path.join(DATA_DIR, 'guides'),
    path.join(DATA_DIR, 'categories'),
  ];
  
  for (const dir of dirs) {
    if (!directoryExists(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

/**
 * Initialize PSEO data structure
 */
export async function initializePSEOData(): Promise<void> {
  ensureDataDirectories();
  
  // Additional initialization can go here
  // e.g., creating index files, validating structure, etc.
}
