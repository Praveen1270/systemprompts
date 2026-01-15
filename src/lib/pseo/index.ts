/**
 * PSEO Library - Barrel Export
 * Programmatic SEO utilities and types
 */

// Types
export * from './types';

// Data loading
export {
  loadToolPageData,
  loadComparisonPageData,
  loadGuidePageData,
  loadHubPageData,
  generateToolStaticParams,
  generateComparisonStaticParams,
  generateGuideStaticParams,
  generateHubStaticParams,
  loadAllToolPages,
  loadAllComparisonPages,
  loadAllGuidePages,
  loadAllHubPages,
  loadAllPages,
  getPageCounts,
  getCachedPageData,
  clearPageCache,
  ensureDataDirectories,
  initializePSEOData,
} from './data';

// Validation
export {
  validateTitle,
  validateDescription,
  validateContent,
  validateFAQs,
  validateLinking,
  validatePage,
  validatePages,
  getValidationSummary,
} from './validation';

// Uniqueness
export {
  checkTitleUniqueness,
  buildTitleMap,
  findDuplicateTitles,
  checkDescriptionUniqueness,
  buildDescriptionMap,
  findDuplicateDescriptions,
  calculateContentSimilarity,
  findSimilarPages,
  checkContentDepth,
  findThinContent,
  calculatePageWordCount,
  validateUniqueness,
  hasUniquenessIssues,
  getUniquenessScore,
  suggestTitleVariations,
  suggestDescriptionVariations,
  generateContentHash,
  areTextsDifferent,
} from './uniqueness';

// Cannibalization
export {
  extractPageKeywords,
  calculateKeywordDensity,
  buildKeywordPageMap,
  detectCannibalization,
  suggestCanonicalTarget,
  getKeywordClusters,
  getCannibalizationRecommendations,
  getRecommendedKeywords,
  validateKeywordDifferentiation,
} from './cannibalization';
