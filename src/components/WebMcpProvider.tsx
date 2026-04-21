'use client';

import { useEffect } from 'react';

type ModelContext = {
  provideContext?: (context: {
    tools?: Array<{
      name: string;
      description: string;
      inputSchema: Record<string, unknown>;
      execute: (args: Record<string, unknown>) => Promise<unknown>;
    }>;
  }) => void;
};

/**
 * Experimental WebMCP: exposes read-only archive actions when the browser supports
 * navigator.modelContext (see https://webmachinelearning.github.io/webmcp/).
 */
export default function WebMcpProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const nav = navigator as Navigator & { modelContext?: ModelContext };
    const mc = nav.modelContext;
    if (!mc?.provideContext) return;

    mc.provideContext({
      tools: [
        {
          name: 'systemprompts_list_prompts',
          description:
            'Returns the SystemPrompts public index (tool name, prompt title, tags, preview).',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          execute: async () => {
            const res = await fetch('/api/prompts', { credentials: 'same-origin' });
            const data = await res.json();
            return data;
          },
        },
        {
          name: 'systemprompts_open_tool',
          description: 'Opens a tool page path such as /tool/cursor on this site.',
          inputSchema: {
            type: 'object',
            properties: {
              toolId: { type: 'string', description: 'Tool id from tools.ts (e.g. cursor)' },
            },
            required: ['toolId'],
            additionalProperties: false,
          },
          execute: async (args) => {
            const toolId = String(args.toolId ?? '');
            if (!toolId) return { error: 'toolId required' };
            const url = `${window.location.origin}/tool/${encodeURIComponent(toolId)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            return { opened: url };
          },
        },
      ],
    });
  }, []);

  return children;
}
