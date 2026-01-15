/**
 * PSEO Page Validation
 * Validates page data for SEO best practices
 */

import type {
  PSEOPageData,
  ValidationResult,
  ValidationError,
  ContentSection,
  FAQ,
} from './types';
import { DEFAULT_PSEO_CONFIG } from './types';

const config = DEFAULT_PSEO_CONFIG;

// =============================================================================
// Constants
// =============================================================================

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 60;
const TITLE_OPTIMAL_LENGTH = 55;

const DESCRIPTION_MIN_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 160;
const DESCRIPTION_OPTIMAL_LENGTH = 155;

const MIN_FAQ_COUNT = 3;
const MAX_FAQ_COUNT = 10;

const MIN_SECTIONS = 2;
const MIN_SECTION_WORDS = 50;

// =============================================================================
// Title Validation
// =============================================================================

export function validateTitle(title: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!title || title.trim().length === 0) {
    errors.push({
      field: 'seo.title',
      message: 'Title is required',
      severity: 'error',
    });
    return errors;
  }

  const length = title.length;

  if (length < TITLE_MIN_LENGTH) {
    errors.push({
      field: 'seo.title',
      message: `Title too short (${length} chars). Minimum ${TITLE_MIN_LENGTH} recommended.`,
      severity: 'warning',
    });
  }

  if (length > TITLE_MAX_LENGTH) {
    errors.push({
      field: 'seo.title',
      message: `Title too long (${length} chars). Maximum ${TITLE_MAX_LENGTH} before truncation.`,
      severity: 'warning',
    });
  }

  // Check for keyword stuffing (excessive repetition)
  const words = title.toLowerCase().split(/\s+/);
  const wordCounts = new Map<string, number>();
  for (const word of words) {
    if (word.length > 3) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  }
  for (const [word, count] of wordCounts) {
    if (count > 2) {
      errors.push({
        field: 'seo.title',
        message: `Possible keyword stuffing: "${word}" appears ${count} times`,
        severity: 'warning',
      });
    }
  }

  // Check for all caps
  if (title === title.toUpperCase() && title.length > 10) {
    errors.push({
      field: 'seo.title',
      message: 'Title should not be all uppercase',
      severity: 'warning',
    });
  }

  return errors;
}

// =============================================================================
// Description Validation
// =============================================================================

export function validateDescription(description: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!description || description.trim().length === 0) {
    errors.push({
      field: 'seo.description',
      message: 'Description is required',
      severity: 'error',
    });
    return errors;
  }

  const length = description.length;

  if (length < DESCRIPTION_MIN_LENGTH) {
    errors.push({
      field: 'seo.description',
      message: `Description too short (${length} chars). Minimum ${DESCRIPTION_MIN_LENGTH} recommended.`,
      severity: 'warning',
    });
  }

  if (length > DESCRIPTION_MAX_LENGTH) {
    errors.push({
      field: 'seo.description',
      message: `Description too long (${length} chars). Maximum ${DESCRIPTION_MAX_LENGTH} before truncation.`,
      severity: 'warning',
    });
  }

  // Check for call-to-action
  const ctaPatterns = /\b(learn|discover|explore|find|get|try|start|read)\b/i;
  if (!ctaPatterns.test(description)) {
    errors.push({
      field: 'seo.description',
      message: 'Consider adding a call-to-action to the description',
      severity: 'warning',
    });
  }

  return errors;
}

// =============================================================================
// Content Validation
// =============================================================================

export function validateContent(
  h1: string,
  intro: string,
  sections: ContentSection[],
  title: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  // H1 validation
  if (!h1 || h1.trim().length === 0) {
    errors.push({
      field: 'content.h1',
      message: 'H1 heading is required',
      severity: 'error',
    });
  } else {
    // H1 should differ from title
    if (h1.toLowerCase() === title.toLowerCase()) {
      errors.push({
        field: 'content.h1',
        message: 'H1 should differ from page title for SEO variety',
        severity: 'warning',
      });
    }
  }

  // Intro validation
  if (!intro || intro.trim().length === 0) {
    errors.push({
      field: 'content.intro',
      message: 'Intro paragraph is required',
      severity: 'error',
    });
  } else {
    const introWords = countWords(intro);
    if (introWords < 30) {
      errors.push({
        field: 'content.intro',
        message: `Intro too short (${introWords} words). Consider 50+ words.`,
        severity: 'warning',
      });
    }
  }

  // Sections validation
  if (sections.length < MIN_SECTIONS) {
    errors.push({
      field: 'content.sections',
      message: `Too few content sections (${sections.length}). Minimum ${MIN_SECTIONS} recommended.`,
      severity: 'warning',
    });
  }

  // Validate individual sections
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionErrors = validateSection(section, i);
    errors.push(...sectionErrors);
  }

  // Check total word count
  const totalWords = countWords(intro) + 
    sections.reduce((acc, s) => acc + countWords(s.content), 0);
  
  if (totalWords < config.minWordCount) {
    errors.push({
      field: 'content',
      message: `Total content too thin (${totalWords} words). Minimum ${config.minWordCount} recommended.`,
      severity: 'error',
    });
  }

  return errors;
}

function validateSection(section: ContentSection, index: number): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!section.heading || section.heading.trim().length === 0) {
    errors.push({
      field: `content.sections[${index}].heading`,
      message: `Section ${index + 1} is missing a heading`,
      severity: 'error',
    });
  }

  const wordCount = countWords(section.content);
  if (wordCount < MIN_SECTION_WORDS) {
    errors.push({
      field: `content.sections[${index}].content`,
      message: `Section "${section.heading}" has thin content (${wordCount} words)`,
      severity: 'warning',
    });
  }

  return errors;
}

// =============================================================================
// FAQ Validation
// =============================================================================

export function validateFAQs(faqs: FAQ[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (faqs.length === 0) {
    errors.push({
      field: 'content.faqs',
      message: `No FAQs found. Add ${MIN_FAQ_COUNT}-${MAX_FAQ_COUNT} FAQs for better SEO.`,
      severity: 'warning',
    });
    return errors;
  }

  if (faqs.length < MIN_FAQ_COUNT) {
    errors.push({
      field: 'content.faqs',
      message: `Too few FAQs (${faqs.length}). Minimum ${MIN_FAQ_COUNT} recommended for FAQ schema.`,
      severity: 'warning',
    });
  }

  if (faqs.length > MAX_FAQ_COUNT) {
    errors.push({
      field: 'content.faqs',
      message: `Too many FAQs (${faqs.length}). Consider keeping under ${MAX_FAQ_COUNT}.`,
      severity: 'warning',
    });
  }

  // Validate individual FAQs
  const questionSet = new Set<string>();
  
  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];

    if (!faq.question || faq.question.trim().length === 0) {
      errors.push({
        field: `content.faqs[${i}].question`,
        message: `FAQ ${i + 1} is missing a question`,
        severity: 'error',
      });
    } else {
      // Check for duplicate questions
      const normalizedQuestion = faq.question.toLowerCase().trim();
      if (questionSet.has(normalizedQuestion)) {
        errors.push({
          field: `content.faqs[${i}].question`,
          message: `Duplicate FAQ question: "${faq.question}"`,
          severity: 'error',
        });
      }
      questionSet.add(normalizedQuestion);

      // Check question format
      if (!faq.question.endsWith('?')) {
        errors.push({
          field: `content.faqs[${i}].question`,
          message: `FAQ question should end with "?": "${faq.question}"`,
          severity: 'warning',
        });
      }
    }

    if (!faq.answer || faq.answer.trim().length === 0) {
      errors.push({
        field: `content.faqs[${i}].answer`,
        message: `FAQ ${i + 1} is missing an answer`,
        severity: 'error',
      });
    } else {
      const answerWords = countWords(faq.answer);
      if (answerWords < 20) {
        errors.push({
          field: `content.faqs[${i}].answer`,
          message: `FAQ answer too short (${answerWords} words). Provide detailed answers.`,
          severity: 'warning',
        });
      }
    }
  }

  return errors;
}

// =============================================================================
// Linking Validation
// =============================================================================

export function validateLinking(
  breadcrumbs: PSEOPageData['linking']['breadcrumbs'],
  relatedPages: string[],
  hubLinks: string[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Breadcrumbs validation
  if (breadcrumbs.length < 2) {
    errors.push({
      field: 'linking.breadcrumbs',
      message: 'Breadcrumbs should have at least 2 items (Home + current page)',
      severity: 'warning',
    });
  }

  // Check breadcrumb hierarchy
  if (breadcrumbs.length > 0 && breadcrumbs[0].label !== 'Home') {
    errors.push({
      field: 'linking.breadcrumbs',
      message: 'Breadcrumbs should start with "Home"',
      severity: 'warning',
    });
  }

  // Related pages validation
  if (relatedPages.length === 0) {
    errors.push({
      field: 'linking.relatedPages',
      message: 'No related pages found. Add 3-6 related pages for internal linking.',
      severity: 'warning',
    });
  } else if (relatedPages.length < 3) {
    errors.push({
      field: 'linking.relatedPages',
      message: `Only ${relatedPages.length} related pages. Consider adding more for better internal linking.`,
      severity: 'warning',
    });
  }

  // Hub links validation
  if (hubLinks.length === 0) {
    errors.push({
      field: 'linking.hubLinks',
      message: 'No hub links found. Add links to parent category pages.',
      severity: 'warning',
    });
  }

  return errors;
}

// =============================================================================
// Full Page Validation
// =============================================================================

/**
 * Validate a complete PSEO page
 */
export function validatePage(page: PSEOPageData): ValidationResult {
  const errors: ValidationError[] = [];

  // Required fields check
  if (!page.slug) {
    errors.push({
      field: 'slug',
      message: 'Slug is required',
      severity: 'error',
    });
  }

  if (!page.template) {
    errors.push({
      field: 'template',
      message: 'Template type is required',
      severity: 'error',
    });
  }

  // SEO validation
  errors.push(...validateTitle(page.seo.title));
  errors.push(...validateDescription(page.seo.description));

  // Canonical URL validation
  if (!page.seo.canonical) {
    errors.push({
      field: 'seo.canonical',
      message: 'Canonical URL is required',
      severity: 'error',
    });
  } else if (!isValidUrl(page.seo.canonical)) {
    errors.push({
      field: 'seo.canonical',
      message: 'Canonical URL is not valid',
      severity: 'error',
    });
  }

  // Content validation
  errors.push(...validateContent(
    page.content.h1,
    page.content.intro,
    page.content.sections,
    page.seo.title
  ));

  // FAQ validation
  errors.push(...validateFAQs(page.content.faqs));

  // Linking validation
  errors.push(...validateLinking(
    page.linking.breadcrumbs,
    page.linking.relatedPages,
    page.linking.hubLinks
  ));

  // Separate errors and warnings
  const errorList = errors.filter((e) => e.severity === 'error');
  const warningList = errors.filter((e) => e.severity === 'warning');

  return {
    valid: errorList.length === 0,
    errors: errorList,
    warnings: warningList,
  };
}

/**
 * Validate multiple pages
 */
export function validatePages(pages: PSEOPageData[]): Map<string, ValidationResult> {
  const results = new Map<string, ValidationResult>();
  
  for (const page of pages) {
    results.set(page.slug, validatePage(page));
  }
  
  return results;
}

/**
 * Get validation summary for multiple pages
 */
export function getValidationSummary(
  results: Map<string, ValidationResult>
): {
  totalPages: number;
  validPages: number;
  pagesWithErrors: number;
  pagesWithWarnings: number;
  totalErrors: number;
  totalWarnings: number;
} {
  let validPages = 0;
  let pagesWithErrors = 0;
  let pagesWithWarnings = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const result of results.values()) {
    if (result.valid) validPages++;
    if (result.errors.length > 0) pagesWithErrors++;
    if (result.warnings.length > 0) pagesWithWarnings++;
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  return {
    totalPages: results.size,
    validPages,
    pagesWithErrors,
    pagesWithWarnings,
    totalErrors,
    totalWarnings,
  };
}

// =============================================================================
// Utility Functions
// =============================================================================

function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
