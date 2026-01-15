/**
 * Keyword Cannibalization Detection
 * Prevents multiple pages from competing for the same keywords
 */

import type {
  PSEOPageData,
  CannibalizationReport,
  CannibalizationConflict,
  KeywordCluster,
  PageTemplate,
} from './types';

// =============================================================================
// Keyword Extraction
// =============================================================================

/**
 * Extract keywords from a page
 */
export function extractPageKeywords(page: PSEOPageData): string[] {
  const keywords = new Set<string>();
  
  // Add explicit keywords
  for (const keyword of page.seo.keywords) {
    keywords.add(normalizeKeyword(keyword));
  }
  
  // Extract from title
  const titleKeywords = extractKeywordsFromText(page.seo.title);
  for (const kw of titleKeywords) {
    keywords.add(kw);
  }
  
  // Extract from H1
  const h1Keywords = extractKeywordsFromText(page.content.h1);
  for (const kw of h1Keywords) {
    keywords.add(kw);
  }
  
  // Extract from description
  const descKeywords = extractKeywordsFromText(page.seo.description);
  for (const kw of descKeywords) {
    keywords.add(kw);
  }
  
  return Array.from(keywords);
}

/**
 * Extract meaningful keywords from text
 */
function extractKeywordsFromText(text: string): string[] {
  if (!text) return [];
  
  // Remove common stop words
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
    'we', 'they', 'what', 'which', 'who', 'whom', 'when', 'where', 'why',
    'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 'just', 'also', 'now', 'here', 'there',
  ]);
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));
  
  // Also extract bi-grams (two-word phrases)
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    if (!stopWords.has(words[i]) && !stopWords.has(words[i + 1])) {
      bigrams.push(`${words[i]} ${words[i + 1]}`);
    }
  }
  
  return [...words, ...bigrams].map(normalizeKeyword);
}

/**
 * Normalize a keyword for comparison
 */
function normalizeKeyword(keyword: string): string {
  return keyword.toLowerCase().trim().replace(/\s+/g, ' ');
}

// =============================================================================
// Keyword Density Calculation
// =============================================================================

/**
 * Calculate keyword density in a page
 */
export function calculateKeywordDensity(
  page: PSEOPageData,
  keyword: string
): number {
  const normalizedKeyword = normalizeKeyword(keyword);
  const text = getPageFullText(page).toLowerCase();
  const words = text.split(/\s+/);
  
  if (words.length === 0) return 0;
  
  // Count keyword occurrences
  let count = 0;
  const keywordWords = normalizedKeyword.split(' ');
  
  if (keywordWords.length === 1) {
    // Single word keyword
    count = words.filter((w) => w === normalizedKeyword).length;
  } else {
    // Multi-word keyword (phrase)
    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase === normalizedKeyword) {
        count++;
      }
    }
  }
  
  return (count / words.length) * 100;
}

/**
 * Get full text content of a page
 */
function getPageFullText(page: PSEOPageData): string {
  const parts: string[] = [
    page.seo.title,
    page.seo.description,
    page.content.h1,
    page.content.intro,
    ...page.content.sections.flatMap((s) => [s.heading, s.content, ...(s.bullets || [])]),
    ...page.content.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  
  return parts.filter(Boolean).join(' ');
}

// =============================================================================
// Cannibalization Detection
// =============================================================================

/**
 * Build keyword-to-pages mapping
 */
export function buildKeywordPageMap(
  pages: PSEOPageData[]
): Map<string, Array<{ slug: string; density: number }>> {
  const keywordMap = new Map<string, Array<{ slug: string; density: number }>>();
  
  for (const page of pages) {
    const keywords = extractPageKeywords(page);
    
    for (const keyword of keywords) {
      const density = calculateKeywordDensity(page, keyword);
      const existing = keywordMap.get(keyword) || [];
      existing.push({ slug: page.slug, density });
      keywordMap.set(keyword, existing);
    }
  }
  
  return keywordMap;
}

/**
 * Detect keyword cannibalization
 */
export function detectCannibalization(
  pages: PSEOPageData[],
  minDensity = 0.5
): CannibalizationReport {
  const keywordMap = buildKeywordPageMap(pages);
  const conflicts: CannibalizationConflict[] = [];
  
  for (const [keyword, pageData] of keywordMap) {
    // Filter to pages with significant keyword density
    const significantPages = pageData.filter((p) => p.density >= minDensity);
    
    if (significantPages.length > 1) {
      // Sort by density to find the best canonical target
      significantPages.sort((a, b) => b.density - a.density);
      
      const pageDetails = significantPages.map((p) => {
        const page = pages.find((pg) => pg.slug === p.slug)!;
        return {
          slug: p.slug,
          title: page.seo.title,
          keywordDensity: p.density,
        };
      });
      
      conflicts.push({
        keyword,
        pages: pageDetails,
        suggestedCanonical: significantPages[0].slug,
      });
    }
  }
  
  // Sort conflicts by number of pages affected
  conflicts.sort((a, b) => b.pages.length - a.pages.length);
  
  // Determine severity
  const severity = getSeverity(conflicts.length, pages.length);
  
  return {
    conflicts,
    totalConflicts: conflicts.length,
    severity,
  };
}

/**
 * Get severity level based on conflict count
 */
function getSeverity(
  conflictCount: number,
  totalPages: number
): CannibalizationReport['severity'] {
  if (conflictCount === 0) return 'none';
  
  const ratio = conflictCount / totalPages;
  
  if (ratio > 0.3) return 'high';
  if (ratio > 0.1) return 'medium';
  return 'low';
}

// =============================================================================
// Canonical Suggestions
// =============================================================================

/**
 * Suggest canonical target for conflicting pages
 */
export function suggestCanonicalTarget(
  conflictingPages: Array<{ slug: string; page: PSEOPageData }>
): string {
  // Score each page based on various factors
  const scores = conflictingPages.map(({ slug, page }) => {
    let score = 0;
    
    // Higher content depth = higher score
    const wordCount = getWordCount(page);
    score += Math.min(wordCount / 100, 10);
    
    // More FAQs = higher score
    score += page.content.faqs.length * 2;
    
    // More sections = higher score
    score += page.content.sections.length * 1.5;
    
    // Hub pages get priority
    if (page.template === 'hub') score += 5;
    
    // Tool pages over comparison pages
    if (page.template === 'tool') score += 3;
    
    // More internal links = higher score
    score += page.linking.relatedPages.length;
    
    return { slug, score };
  });
  
  // Return slug with highest score
  scores.sort((a, b) => b.score - a.score);
  return scores[0].slug;
}

/**
 * Get word count of a page
 */
function getWordCount(page: PSEOPageData): number {
  return getPageFullText(page).split(/\s+/).length;
}

// =============================================================================
// Keyword Clusters
// =============================================================================

/**
 * Generate keyword clusters for site structure
 */
export function getKeywordClusters(pages: PSEOPageData[]): KeywordCluster[] {
  const clusters: KeywordCluster[] = [];
  const keywordMap = buildKeywordPageMap(pages);
  
  // Group related keywords
  const processed = new Set<string>();
  
  for (const [keyword, pageData] of keywordMap) {
    if (processed.has(keyword)) continue;
    
    // Find related keywords (share pages)
    const relatedKeywords: string[] = [];
    const primaryPages = new Set(pageData.map((p) => p.slug));
    
    for (const [otherKeyword, otherPageData] of keywordMap) {
      if (otherKeyword === keyword) continue;
      
      const otherPages = new Set(otherPageData.map((p) => p.slug));
      const overlap = [...primaryPages].filter((p) => otherPages.has(p));
      
      if (overlap.length > 0) {
        relatedKeywords.push(otherKeyword);
        processed.add(otherKeyword);
      }
    }
    
    clusters.push({
      primary: keyword,
      secondary: relatedKeywords,
      relatedPages: pageData.map((p) => p.slug),
    });
    
    processed.add(keyword);
  }
  
  // Sort by number of related pages
  return clusters.sort((a, b) => b.relatedPages.length - a.relatedPages.length);
}

// =============================================================================
// Recommendations
// =============================================================================

/**
 * Get recommendations for fixing cannibalization
 */
export function getCannibalizationRecommendations(
  report: CannibalizationReport,
  pages: PSEOPageData[]
): Array<{
  conflict: CannibalizationConflict;
  recommendation: string;
  action: 'merge' | 'differentiate' | 'canonical' | 'noindex';
}> {
  return report.conflicts.map((conflict) => {
    const pagesInvolved = conflict.pages.length;
    const densities = conflict.pages.map((p) => p.keywordDensity);
    const maxDensity = Math.max(...densities);
    const minDensity = Math.min(...densities);
    
    let recommendation: string;
    let action: 'merge' | 'differentiate' | 'canonical' | 'noindex';
    
    if (pagesInvolved === 2 && maxDensity - minDensity > 0.5) {
      // Clear winner - use canonical
      recommendation = `Set canonical from "${conflict.pages[1].slug}" to "${conflict.suggestedCanonical}"`;
      action = 'canonical';
    } else if (pagesInvolved > 3) {
      // Too many pages targeting same keyword - consider merging
      recommendation = `Consider consolidating content about "${conflict.keyword}" into fewer pages`;
      action = 'merge';
    } else {
      // Differentiate content
      recommendation = `Differentiate keyword focus for pages targeting "${conflict.keyword}"`;
      action = 'differentiate';
    }
    
    return { conflict, recommendation, action };
  });
}

// =============================================================================
// Template-Based Keyword Allocation
// =============================================================================

/**
 * Get recommended primary keywords by template type
 */
export function getRecommendedKeywords(
  template: PageTemplate,
  params: {
    toolName?: string;
    tool1Name?: string;
    tool2Name?: string;
    categoryName?: string;
    topic?: string;
  }
): string[] {
  switch (template) {
    case 'tool':
      return [
        `${params.toolName} system prompt`,
        `${params.toolName} prompt`,
        `${params.toolName} ai prompt`,
        `${params.toolName} ${params.categoryName?.toLowerCase()}`,
      ].filter(Boolean) as string[];
    
    case 'comparison':
      return [
        `${params.tool1Name} vs ${params.tool2Name}`,
        `${params.tool1Name} versus ${params.tool2Name}`,
        `compare ${params.tool1Name} ${params.tool2Name}`,
        `${params.tool1Name} or ${params.tool2Name}`,
      ].filter(Boolean) as string[];
    
    case 'guide':
      return [
        params.topic || '',
        `${params.topic} guide`,
        `how to ${params.topic?.toLowerCase()}`,
        `${params.categoryName?.toLowerCase()} ${params.topic?.toLowerCase()}`,
      ].filter(Boolean);
    
    case 'hub':
      return [
        `best ${params.categoryName?.toLowerCase()}`,
        `${params.categoryName?.toLowerCase()} tools`,
        `${params.categoryName?.toLowerCase()} comparison`,
        `top ${params.categoryName?.toLowerCase()}`,
      ].filter(Boolean);
    
    default:
      return [];
  }
}

/**
 * Check if a page's keywords are appropriately differentiated from template norms
 */
export function validateKeywordDifferentiation(
  page: PSEOPageData,
  allPages: PSEOPageData[]
): { differentiated: boolean; overlappingWith: string[] } {
  const pageKeywords = new Set(extractPageKeywords(page));
  const overlapping: string[] = [];
  
  for (const otherPage of allPages) {
    if (otherPage.slug === page.slug) continue;
    if (otherPage.template !== page.template) continue; // Only compare same template
    
    const otherKeywords = new Set(extractPageKeywords(otherPage));
    const overlap = [...pageKeywords].filter((kw) => otherKeywords.has(kw));
    
    // More than 50% overlap is concerning
    if (overlap.length > pageKeywords.size * 0.5) {
      overlapping.push(otherPage.slug);
    }
  }
  
  return {
    differentiated: overlapping.length === 0,
    overlappingWith: overlapping,
  };
}
