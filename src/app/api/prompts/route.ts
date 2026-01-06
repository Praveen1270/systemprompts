import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { tools } from '@/data/tools';
import { filePathMap } from '@/data/filePathMap';
import type { PromptIndexItem } from '@/data/promptTypes';

function safeReadPreview(fullPath: string, maxChars = 260): string {
  try {
    if (!fs.existsSync(fullPath)) return '';
    const raw = fs.readFileSync(fullPath, 'utf-8');
    // Normalize whitespace for a nice card preview.
    const trimmed = raw
      .replace(/\r\n/g, '\n')
      .split('\n')
      .slice(0, 12)
      .join('\n')
      .trim();
    if (!trimmed) return '';
    return trimmed.length > maxChars ? `${trimmed.slice(0, maxChars - 1)}…` : trimmed;
  } catch {
    return '';
  }
}

function makeId(toolId: string, fileName: string) {
  return `${toolId}::${fileName}`;
}

export async function GET() {
  const baseDir = path.join(process.cwd(), 'src', 'prompts');
  const items: PromptIndexItem[] = [];

  for (const tool of tools) {
    const paths = filePathMap[tool.id] ?? {};
    for (const file of tool.files) {
      const relPath = paths[file.name];
      if (!relPath) continue;

      const fullPath = path.join(baseDir, relPath);
      const resolvedPath = path.resolve(fullPath);
      const resolvedBase = path.resolve(baseDir);
      if (!resolvedPath.startsWith(resolvedBase)) continue;

      const ext = path.extname(relPath).replace('.', '').toLowerCase();
      const kind =
        file.type === 'prompt' ? 'prompt' : file.type === 'tools' ? 'tools' : 'other';

      const tags = [
        tool.category,
        tool.name,
        kind === 'prompt' ? 'System Prompt' : 'Tools',
        ext ? ext.toUpperCase() : 'TEXT',
      ];

      items.push({
        id: makeId(tool.id, file.name),
        toolId: tool.id,
        toolName: tool.name,
        toolCategory: tool.category,
        title: file.name,
        kind,
        path: relPath,
        preview:
          safeReadPreview(fullPath) ||
          `Open ${file.name} from ${tool.name}.`,
        tags,
      });
    }
  }

  // Sort: prompts first, then by tool name, then title.
  items.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'prompt' ? -1 : 1;
    if (a.toolName !== b.toolName) return a.toolName.localeCompare(b.toolName);
    return a.title.localeCompare(b.title);
  });

  return NextResponse.json({ items });
}




