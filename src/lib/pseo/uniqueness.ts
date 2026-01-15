/**
 * PSEO Uniqueness Validation
 * Ensures content uniqueness across pages to avoid duplicate content issues
 */

import type {
  PSEOPageData,
  UniquenessReport,
  ContentSection,
} from './types';
import { DEFAULT_PSEO_CONFIG } from './types';

const config = DEFAULT_PSEO_CONFIG;

// =============================================================================
// Title Uniqueness
// =============================================================================

/**
 * Check if a title is unique across all pages
 */
export function checkTitleUniqueness(
  title: string,
  allTitles: Map<string, string[]>
): boolean {
  const normalizedTitle = normalizeText(title);
  return !allTitles.has(normalizedTitle) || allTitles.get(normalizedTitle)!.length <= 1;
}

/**
 * Build a map of titles to slugs for uniqueness checking
 */
export function buildTitleMap(pages: PSEOPageData[]): Map<string, string[]> {
  const titleMap = new Map<string, string[]>();
  
  for (const page of pages) {
    const normalizedTitle = normalizeText(page.seo.title);
    const existing = titleMap.get(normalizedTitle) || [];
    existing.push(page.slug);
    titleMap.set(normalizedTitle, existing);
  }
  
  return titleMap;
}

/**
 * Find duplicate titles
 */
export function findDuplicateTitles(
  pages: PSEOPageData[]
): Array<{ title: string; slugs: string[] }> {
  const titleMap = buildTitleMap(pages);
  const duplicates: Array<{ title: string; slugs: string[] }> = [];
  
  for (const [title, slugs] of titleMap) {
    if (slugs.length > 1) {
      duplicates.push({ title, slugs });
    }
  }
  
  return duplicates;
}

// =============================================================================
// Description Uniqueness
// =============================================================================

/**
 * Check if a description is unique
 */
export function checkDescriptionUniqueness(
  description: string,
  allDescriptions: Map<string, string[]>
): boolean {
  const normalizedDesc = normalizeText(description);
  return !allDescriptions.has(normalizedDesc) || allDescriptions.get(normalizedDesc)!.length <= 1;
}

/**
 * Build a map of descriptions to slugs
 */
export function buildDescriptionMap(pages: PSEOPageData[]): Map<string, string[]> {
  const descMap = new Map<string, string[]>();
  
  for (const page of pages) {
    const normalizedDesc = normalizeText(page.seo.description);
    const existing = descMap.get(normalizedDesc) || [];
    existing.push(page.slug);
    descMap.set(normalizedDesc, existing);
  }
  
  return descMap;
}

/**
 * Find duplicate descriptions
 */
export function findDuplicateDescriptions(
  pages: PSEOPageData[]
): Array<{ description: string; slugs: string[] }> {
  const descMap = buildDescriptionMap(pages);
  const duplicates: Array<{ description: string; slugs: string[] }> = [];
  
  for (const [description, slugs] of descMap) {
    if (slugs.length > 1) {
      duplicates.push({ description, slugs });
    }
  }
  
  return duplicates;
}

// =============================================================================
// Content Uniqueness
// =============================================================================

/**
 * Calculate content similarity between two pages (0-1)
 */
export function calculateContentSimilarity(
  page1: PSEOPageData,
  page2: PSEOPageData
): number {
  const text1 = extractPageText(page1);
  const text2 = extractPageText(page2);
  
  return calculateJaccardSimilarity(text1, text2);
}

/**
 * Extract all text content from a page
 */
function extractPageText(page: PSEOPageData): string {
  const parts: string[] = [
    page.content.h1,
    page.content.intro,
    ...page.content.sections.map((s) => `${s.heading} ${s.content}`),
    ...page.content.faqs.map((f) => `${f.question} ${f.answer}`),
  ];
  
  return parts.join(' ');
}

/**
 * Calculate Jaccard similarity between two texts
 */
function calculateJaccardSimilarity(text1: string, text2: string): number {
  const words1 = new Set(normalizeText(text1).split(/\s+/));
  const words2 = new Set(normalizeText(text2).split(/\s+/));
  
  const intersection = new Set([...words1].filter((w) => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  if (union.size === 0) return 0;
  
  return intersection.size / union.size;
}

/**
 * Find pages with high content similarity
 */
export function findSimilarPages(
  pages: PSEOPageData[],
  threshold = 0.7
): Array<{ page1: string; page2: string; similarity: number }> {
  const similar: Array<{ page1: string; page2: string; similarity: number }> = [];
  
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const similarity = calculateContentSimilarity(pages[i], pages[j]);
      if (similarity >= threshold) {
        similar.push({
          page1: pages[i].slug,
          page2: pages[j].slug,
          similarity,
        });
      }
    }
  }
  
  return similar.sort((a, b) => b.similarity - a.similarity);
}

// =============================================================================
// Thin Content Detection
// =============================================================================

/**
 * Check if content is considered thin
 */
export function checkContentDepth(sections: ContentSection[]): boolean {
  const totalWords = sections.reduce(
    (acc, section) => acc + countWords(section.content),
    0
  );
  
  return totalWords >= config.minWordCount;
}

/**
 * Find pages with thin content
 */
export function findThinContent(
  pages: PSEOPageData[],
  minWordCount = config.minWordCount
): Array<{ slug: string; wordCount: number }> {
  const thin: Array<{ slug: string; wordCount: number }> = [];
  
  for (const page of pages) {
    const wordCount = calculatePageWordCount(page);
    if (wordCount < minWordCount) {
      thin.push({ slug: page.slug, wordCount });
    }
  }
  
  return thin.sort((a, b) => a.wordCount - b.wordCount);
}

/**
 * Calculate total word count for a page
 */
export function calculatePageWordCount(page: PSEOPageData): number {
  let count = 0;
  
  count += countWords(page.content.h1);
  count += countWords(page.content.intro);
  
  for (const section of page.content.sections) {
    count += countWords(section.heading);
    count += countWords(section.content);
    if (section.bullets) {
      count += section.bullets.reduce((acc, b) => acc + countWords(b), 0);
    }
  }
  
  for (const faq of page.content.faqs) {
    count += countWords(faq.question);
    count += countWords(faq.answer);
  }
  
  return count;
}

// =============================================================================
// Full Uniqueness Report
// =============================================================================

/**
 * Generate comprehensive uniqueness report
 */
export function validateUniqueness(pages: PSEOPageData[]): UniquenessReport {
  return {
    duplicateTitles: findDuplicateTitles(pages),
    duplicateDescriptions: findDuplicateDescriptions(pages),
    thinContent: findThinContent(pages),
  };
}

/**
 * Check if uniqueness report has issues
 */
export function hasUniquenessIssues(report: UniquenessReport): boolean {
  return (
    report.duplicateTitles.length > 0 ||
    report.duplicateDescriptions.length > 0 ||
    report.thinContent.length > 0
  );
}

/**
 * Get uniqueness score (0-100)
 */
export function getUniquenessScore(pages: PSEOPageData[]): number {
  const report = validateUniqueness(pages);
  const totalPages = pages.length;
  
  if (totalPages === 0) return 100;
  
  // Calculate penalties
  const duplicateTitlePenalty = report.duplicateTitles.reduce(
    (acc, d) => acc + (d.slugs.length - 1) * 10,
    0
  );
  
  const duplicateDescPenalty = report.duplicateDescriptions.reduce(
    (acc, d) => acc + (d.slugs.length - 1) * 5,
    0
  );
  
  const thinContentPenalty = report.thinContent.length * 5;
  
  const totalPenalty = duplicateTitlePenalty + duplicateDescPenalty + thinContentPenalty;
  const maxPenalty = totalPages * 20; // Max penalty per page
  
  const score = Math.max(0, 100 - (totalPenalty / maxPenalty) * 100);
  
  return Math.round(score);
}

// =============================================================================
// Uniqueness Suggestions
// =============================================================================

/**
 * Generate title variation suggestions
 */
export function suggestTitleVariations(
  baseTool: string,
  category: string
): string[] {
  return [
    `${baseTool} System Prompt | ${category} Prompts`,
    `${baseTool} AI Prompt | Verified System Prompts`,
    `Explore ${baseTool} Prompt | ${category}`,
    `${baseTool} Prompt Collection | AI Tools`,
    `${baseTool} | ${category} System Prompts`,
  ];
}

/**
 * Generate description variation suggestions
 */
export function suggestDescriptionVariations(
  toolName: string,
  category: string,
  fileCount: number
): string[] {
  return [
    `Explore ${toolName} system prompts. Verified ${category.toLowerCase()} prompts with detailed documentation.`,
    `Get the official ${toolName} system prompt. Part of our verified ${category.toLowerCase()} collection with ${fileCount}+ files.`,
    `Access ${toolName} AI prompts and configurations. Comprehensive library for developers.`,
    `Discover ${toolName}'s system prompts. Browse verified ${category.toLowerCase()} prompts and tool definitions.`,
    `${toolName} system prompts collection. ${fileCount}+ verified AI prompts for ${category.toLowerCase()}.`,
  ];
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Normalize text for comparison
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Generate a hash for content comparison
 */
export function generateContentHash(text: string): string {
  const normalized = normalizeText(text);
  let hash = 0;
  
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

/**
 * Check if two texts are substantially different
 */
export function areTextsDifferent(text1: string, text2: string, threshold = 0.3): boolean {
  const similarity = calculateJaccardSimilarity(text1, text2);
  return similarity < threshold;
}
