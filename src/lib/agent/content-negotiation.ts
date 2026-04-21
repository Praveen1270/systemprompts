/**
 * RFC 7231-style Accept negotiation for text/markdown vs text/html.
 * Defaults to HTML when weights tie (browsers).
 */
export function prefersMarkdownOverHtml(acceptHeader: string | null): boolean {
  if (!acceptHeader?.trim()) return false;

  let bestHtml = 0;
  let bestMd = 0;

  for (const part of acceptHeader.split(',')) {
    const [rawType, ...params] = part.trim().split(';').map((s) => s.trim());
    if (!rawType) continue;
    let q = 1;
    for (const p of params) {
      const m = /^q=([0-9]*\.?[0-9]+)$/.exec(p);
      if (m) q = Math.min(1, Math.max(0, parseFloat(m[1]!)));
    }
    if (rawType === 'text/html' || rawType === 'application/xhtml+xml') {
      bestHtml = Math.max(bestHtml, q);
    }
    if (rawType === 'text/markdown' || rawType === 'text/x-markdown') {
      bestMd = Math.max(bestMd, q);
    }
    if (rawType === '*/*') {
      bestHtml = Math.max(bestHtml, q);
      bestMd = Math.max(bestMd, q);
    }
  }

  if (bestMd > bestHtml) return true;
  return false;
}

/** Rough token estimate for x-markdown-tokens (no tokenizer dependency). */
export function estimateMarkdownTokens(markdown: string): number {
  return Math.ceil(markdown.length / 4);
}
