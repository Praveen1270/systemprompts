/**
 * SEO Library - Barrel Export
 * Central export for all SEO utilities
 */

// Metadata generation
export {
  generateMetadata,
  generateMetadataFromSlug,
  generateTitle,
  generateDescription,
  buildCanonicalUrl,
  buildToolCanonicalUrl,
  buildKeywords,
  buildSEOFields,
  buildOpenGraphFields,
  buildTwitterFields,
  isTitleLengthOptimal,
  isDescriptionLengthOptimal,
  getTitleStatus,
  getDescriptionStatus,
} from './metadata';

// Schema markup
export {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateArticleSchema,
  generateComparisonItemListSchema,
  generateCategoryItemListSchema,
  generateOrganizationSchema,
  generateWebPageSchema,
  generateHowToSchema,
  generatePageSchemas,
  schemasToJsonLd,
  generateJsonLdScript,
  validateSchema,
  getApplicableSchemaTypes,
} from './schema';

// Internal linking
export {
  CATEGORIES,
  categoryToSlug,
  getCategoryBySlug,
  getCategoryByName,
  getToolBreadcrumbs,
  getComparisonBreadcrumbs,
  getGuideBreadcrumbs,
  getHubBreadcrumbs,
  getBreadcrumbs,
  getRelatedToolsInCategory,
  getRelatedToolsCrossCategory,
  getRelatedPagesForTool,
  getRelatedPagesForComparison,
  getToolHubLinks,
  getComparisonHubLinks,
  getGuideHubLinks,
  getHubLinks,
  getSiblingPages,
  buildToolUrl,
  buildComparisonUrl,
  buildGuideUrl,
  buildHubUrl,
  buildFullUrl,
  scoreRelatedPage,
  sortByRelevance,
} from './linking';

export type { CategoryDefinition } from './linking';
