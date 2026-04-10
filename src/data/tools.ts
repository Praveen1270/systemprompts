export interface PromptFile {
  name: string;
  content: string;
  type: 'prompt' | 'tools' | 'other';
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  files: PromptFile[];
}

export const categories = [
  'AI Coding Assistant',
  'AI Chat & Assistant',
  'AI Code Editor',
  'AI Platform',
  'Open Source',
  'IDE Extension',
] as const;

export const tools: AITool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Code Editor',
    description: 'AI-first code editor built on VSCode with powerful code generation and editing capabilities.',
    logo: 'https://cursor.sh/favicon.ico',
    files: [
      { name: 'Agent Prompt v2.0', content: '', type: 'prompt' },
      { name: 'Agent Prompt v1.2', content: '', type: 'prompt' },
      { name: 'Agent Prompt v1.0', content: '', type: 'prompt' },
      { name: 'Chat Prompt', content: '', type: 'prompt' },
      { name: 'Agent Tools v1.0', content: '', type: 'tools' },
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'AI Coding Assistant',
    description: 'Anthropic\'s agentic coding tool powered by Claude for software development.',
    logo: 'https://www.anthropic.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Claude Code 2.0', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'claude-web',
    name: 'Claude (Web)',
    category: 'AI Chat & Assistant',
    description:
      'Anthropic\'s consumer chat experience on claude.ai and the Claude apps: archived Sonnet 4.6 system prompt (behavior, artifacts, search, and tools).',
    logo: 'https://www.anthropic.com/favicon.ico',
    files: [{ name: 'Claude Sonnet 4.6 - Web Chat', content: '', type: 'prompt' }],
  },
  {
    id: 'v0',
    name: 'v0',
    category: 'AI Platform',
    description: 'Vercel\'s AI-powered UI generation tool that creates React components from descriptions.',
    logo: 'https://vercel.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'AI Platform',
    description: 'AI editor that creates and modifies web applications with real-time preview.',
    logo: 'https://lovable.dev/favicon.ico',
    files: [
      { name: 'Agent Prompt', content: '', type: 'prompt' },
      { name: 'Agent Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'AI Code Editor',
    description: 'Codeium\'s AI-powered IDE with advanced code understanding and generation.',
    logo: 'https://windsurf.ai/favicon.ico',
    files: [
      { name: 'Prompt Wave 11', content: '', type: 'prompt' },
      { name: 'Tools Wave 11', content: '', type: 'tools' },
    ],
  },
  {
    id: 'devin',
    name: 'Devin AI',
    category: 'AI Coding Assistant',
    description: 'Cognition\'s autonomous AI software engineer that can handle complex tasks.',
    logo: 'https://www.cognition.ai/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'DeepWiki Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'AI Platform',
    description: 'Browser-based IDE with AI-powered code completion and generation.',
    logo: 'https://replit.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'augment-code',
    name: 'Augment Code',
    category: 'AI Coding Assistant',
    description: 'AI coding assistant with Claude and GPT-5 powered agent capabilities.',
    logo: 'https://augmentcode.com/favicon.ico',
    files: [
      { name: 'Claude 4 Sonnet Agent Prompts', content: '', type: 'prompt' },
      { name: 'Claude 4 Sonnet Tools', content: '', type: 'tools' },
      { name: 'GPT-5 Agent Prompts', content: '', type: 'prompt' },
      { name: 'GPT-5 Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'vscode-agent',
    name: 'GitHub Copilot',
    category: 'IDE Extension',
    description: 'GitHub Copilot\'s agent mode in VS Code with multi-model support.',
    logo: 'https://github.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Claude Sonnet 4', content: '', type: 'prompt' },
      { name: 'GPT-5', content: '', type: 'prompt' },
      { name: 'GPT-4.1', content: '', type: 'prompt' },
      { name: 'Gemini 2.5 Pro', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'manus',
    name: 'Manus Agent',
    category: 'AI Coding Assistant',
    description: 'Modular AI agent with comprehensive tool capabilities for complex tasks.',
    logo: 'https://manus.ai/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Agent Loop', content: '', type: 'prompt' },
      { name: 'Modules', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'bolt',
    name: 'Bolt',
    category: 'Open Source',
    description: 'StackBlitz\'s open-source AI-powered full-stack web development tool.',
    logo: 'https://stackblitz.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'cline',
    name: 'Cline',
    category: 'Open Source',
    description: 'Open-source autonomous coding agent for VS Code with Claude integration.',
    logo: 'https://cline.bot/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'amp',
    name: 'Amp',
    category: 'AI Coding Assistant',
    description: 'Sourcegraph\'s AI coding assistant with Claude 4 and GPT-5 support.',
    logo: 'https://sourcegraph.com/favicon.ico',
    files: [
      { name: 'Claude 4 Sonnet', content: '', type: 'prompt' },
      { name: 'GPT-5', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'AI Chat & Assistant',
    description: 'AI-powered search engine with conversational interface and citations.',
    logo: 'https://www.perplexity.ai/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    category: 'AI Chat & Assistant',
    description: 'Google\'s multimodal AI assistant including Gemini CLI and AI Studio.',
    logo: 'https://gemini.google.com/favicon.ico',
    files: [
      { name: 'AI Studio Vibe Coder', content: '', type: 'prompt' },
      { name: 'Gemini CLI', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    category: 'AI Coding Assistant',
    description: 'Google\'s experimental AI coding tool with planning mode.',
    logo: 'https://www.google.com/favicon.ico',
    files: [
      { name: 'Fast Prompt', content: '', type: 'prompt' },
      { name: 'Planning Mode', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'trae',
    name: 'Trae',
    category: 'AI Code Editor',
    description: 'ByteDance\'s AI-powered code editor with builder and chat modes.',
    logo: 'https://trae.ai/favicon.ico',
    files: [
      { name: 'Builder Prompt', content: '', type: 'prompt' },
      { name: 'Chat Prompt', content: '', type: 'prompt' },
      { name: 'Builder Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'junie',
    name: 'Junie',
    category: 'AI Coding Assistant',
    description: 'JetBrains\' AI coding assistant for intelligent code generation.',
    logo: 'https://www.jetbrains.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'kiro',
    name: 'Kiro',
    category: 'AI Coding Assistant',
    description: 'Amazon\'s spec-driven AI coding assistant with vibe and planning modes.',
    logo: 'https://aws.amazon.com/favicon.ico',
    files: [
      { name: 'Mode Classifier Prompt', content: '', type: 'prompt' },
      { name: 'Spec Prompt', content: '', type: 'prompt' },
      { name: 'Vibe Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'same-dev',
    name: 'Same.dev',
    category: 'AI Platform',
    description: 'AI tool for cloning and recreating web applications.',
    logo: 'https://same.dev/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'leap',
    name: 'Leap.new',
    category: 'AI Platform',
    description: 'AI-powered web app builder for rapid prototyping.',
    logo: 'https://leap.new/favicon.ico',
    files: [
      { name: 'Prompts', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'warp',
    name: 'Warp',
    category: 'AI Coding Assistant',
    description: 'Modern terminal with AI-powered command suggestions.',
    logo: 'https://www.warp.dev/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    category: 'Open Source',
    description: 'OpenAI\'s open-source CLI tool for code generation.',
    logo: 'https://openai.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'System Prompt 2025', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'roocode',
    name: 'RooCode',
    category: 'Open Source',
    description: 'Open-source AI coding assistant with VS Code integration.',
    logo: 'https://roocode.ai/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'lumo',
    name: 'Lumo',
    category: 'Open Source',
    description: 'Open-source AI coding tool for intelligent code assistance.',
    logo: 'https://lumo.dev/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'AI Chat & Assistant',
    description: 'Notion\'s built-in AI assistant for writing and organization.',
    logo: 'https://www.notion.so/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'xcode',
    name: 'Xcode AI',
    category: 'IDE Extension',
    description: 'Apple\'s AI assistant for Xcode with multiple action types.',
    logo: 'https://developer.apple.com/favicon.ico',
    files: [
      { name: 'System', content: '', type: 'prompt' },
      { name: 'Document Action', content: '', type: 'prompt' },
      { name: 'Explain Action', content: '', type: 'prompt' },
      { name: 'Message Action', content: '', type: 'prompt' },
      { name: 'Preview Action', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'cluely',
    name: 'Cluely',
    category: 'AI Chat & Assistant',
    description: 'AI assistant with default and enterprise prompt configurations.',
    logo: 'https://cluely.ai/favicon.ico',
    files: [
      { name: 'Default Prompt', content: '', type: 'prompt' },
      { name: 'Enterprise Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'emergent',
    name: 'Emergent',
    category: 'AI Coding Assistant',
    description: 'AI coding assistant with advanced tool capabilities.',
    logo: 'https://emergent.sh/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'traycer',
    name: 'Traycer AI',
    category: 'AI Coding Assistant',
    description: 'AI coding tool with phase and plan modes for structured development.',
    logo: 'https://traycer.ai/favicon.ico',
    files: [
      { name: 'Phase Mode Prompts', content: '', type: 'prompt' },
      { name: 'Phase Mode Tools', content: '', type: 'tools' },
      { name: 'Plan Mode Prompts', content: '', type: 'prompt' },
      { name: 'Plan Mode Tools', content: '', type: 'tools' },
    ],
  },
  {
    id: 'qoder',
    name: 'Qoder',
    category: 'AI Coding Assistant',
    description: 'AI coding assistant with quest-based action and design modes.',
    logo: 'https://qoder.com/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
      { name: 'Quest Action', content: '', type: 'prompt' },
      { name: 'Quest Design', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'dia',
    name: 'Dia',
    category: 'AI Chat & Assistant',
    description: 'The Browser Company\'s AI-powered browser assistant.',
    logo: 'https://www.thebrowser.company/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'comet',
    name: 'Comet Assistant',
    category: 'AI Chat & Assistant',
    description: 'AI assistant for conversational interactions.',
    logo: 'https://www.comet.com/favicon.ico',
    files: [
      { name: 'System Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'codebuddy',
    name: 'CodeBuddy',
    category: 'AI Coding Assistant',
    description: 'AI coding companion with chat and craft prompt modes.',
    logo: 'https://codebuddy.ai/favicon.ico',
    files: [
      { name: 'Chat Prompt', content: '', type: 'prompt' },
      { name: 'Craft Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'orchids',
    name: 'Orchids.app',
    category: 'AI Chat & Assistant',
    description: 'AI assistant with decision-making capabilities.',
    logo: 'https://orchids.app/favicon.ico',
    files: [
      { name: 'System Prompt', content: '', type: 'prompt' },
      { name: 'Decision-making Prompt', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'poke',
    name: 'Poke',
    category: 'AI Coding Assistant',
    description: 'AI agent with multi-phase prompt structure.',
    logo: 'https://poke.ai/favicon.ico',
    files: [
      { name: 'Poke Agent', content: '', type: 'prompt' },
      { name: 'Phase 1', content: '', type: 'prompt' },
      { name: 'Phase 2', content: '', type: 'prompt' },
      { name: 'Phase 3', content: '', type: 'prompt' },
      { name: 'Phase 4', content: '', type: 'prompt' },
      { name: 'Phase 5', content: '', type: 'prompt' },
      { name: 'Phase 6', content: '', type: 'prompt' },
    ],
  },
  {
    id: 'zai-code',
    name: 'Z.ai Code',
    category: 'AI Coding Assistant',
    description: 'AI-powered code generation and assistance tool.',
    logo: 'https://z.ai/favicon.ico',
    files: [
      { name: 'Prompt', content: '', type: 'prompt' },
    ],
  },
];

export function getToolsByCategory(category: string): AITool[] {
  return tools.filter(tool => tool.category === category);
}

export function getToolById(id: string): AITool | undefined {
  return tools.find(tool => tool.id === id);
}
