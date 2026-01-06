import type { PromptKind } from '@/data/promptTypes';

function normalize(name: string) {
  return name.trim();
}

export function formatIndexItemTitle(toolName: string, fileName: string, kind: PromptKind): string {
  const n = normalize(fileName);
  const isGenericPrompt = /^prompt$/i.test(n);
  const isGenericTools = /^tools$/i.test(n);

  if (kind === 'prompt' && isGenericPrompt) return `${toolName} — System Prompt`;
  if (kind === 'tools' && isGenericTools) return `${toolName} — Tools`;

  return `${toolName} — ${n}`;
}

export function formatToolFileTitle(fileName: string): string {
  const n = normalize(fileName);
  if (/^prompt$/i.test(n)) return 'System Prompt';
  if (/^tools$/i.test(n)) return 'Tools';
  return n;
}


