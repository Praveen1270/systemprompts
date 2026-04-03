/**
 * Keyword Matrix for Programmatic SEO
 * Defines all combinations for scalable page generation
 */

import type { KeywordMatrix } from '@/lib/pseo/types';

// =============================================================================
// Category Definitions
// =============================================================================

export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const categories: Category[] = [
  {
    slug: 'ai-coding-assistant',
    name: 'AI Coding Assistant',
    description: 'AI-powered coding assistants for software development',
    keywords: ['ai coding assistant', 'ai code helper', 'coding ai', 'ai programming assistant'],
  },
  {
    slug: 'ai-code-editor',
    name: 'AI Code Editor',
    description: 'Code editors with integrated AI capabilities',
    keywords: ['ai code editor', 'ai ide', 'intelligent code editor', 'ai-powered editor'],
  },
  {
    slug: 'ai-chat-assistant',
    name: 'AI Chat & Assistant',
    description: 'Conversational AI assistants and chatbots',
    keywords: ['ai chat', 'ai assistant', 'chatbot', 'conversational ai'],
  },
  {
    slug: 'ai-platform',
    name: 'AI Platform',
    description: 'Full-stack AI development platforms',
    keywords: ['ai platform', 'ai development platform', 'ai saas', 'ai tool platform'],
  },
  {
    slug: 'open-source',
    name: 'Open Source',
    description: 'Open source AI tools and frameworks',
    keywords: ['open source ai', 'free ai tools', 'open source coding', 'oss ai'],
  },
  {
    slug: 'ide-extension',
    name: 'IDE Extension',
    description: 'AI extensions for popular IDEs',
    keywords: ['ide extension', 'vscode extension', 'ai plugin', 'editor extension'],
  },
];

// =============================================================================
// Tool Definitions (for page generation)
// =============================================================================

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  keywords: string[];
}

export const tools: ToolDefinition[] = [
  {
    id: 'cursor',
    slug: 'cursor',
    name: 'Cursor',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: 'AI-first code editor built on VSCode with powerful code generation.',
    keywords: ['cursor ai', 'cursor editor', 'cursor ide', 'cursor system prompt'],
  },
  {
    id: 'claude-code',
    slug: 'claude-code',
    name: 'Claude Code',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Anthropic's agentic coding tool powered by Claude.",
    keywords: ['claude code', 'anthropic claude', 'claude coding', 'claude prompt'],
  },
  {
    id: 'v0',
    slug: 'v0',
    name: 'v0',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: "Vercel's AI-powered UI generation tool.",
    keywords: ['v0 ai', 'v0 vercel', 'v0 prompt', 'v0 ui generator'],
  },
  {
    id: 'lovable',
    slug: 'lovable',
    name: 'Lovable',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'AI editor that creates and modifies web applications.',
    keywords: ['lovable ai', 'lovable dev', 'lovable prompt', 'lovable builder'],
  },
  {
    id: 'windsurf',
    slug: 'windsurf',
    name: 'Windsurf',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: "Codeium's AI-powered IDE with advanced code understanding.",
    keywords: ['windsurf ai', 'windsurf codeium', 'windsurf ide', 'windsurf prompt'],
  },
  {
    id: 'devin',
    slug: 'devin',
    name: 'Devin AI',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Cognition's autonomous AI software engineer.",
    keywords: ['devin ai', 'devin cognition', 'devin engineer', 'devin prompt'],
  },
  {
    id: 'replit',
    slug: 'replit',
    name: 'Replit',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'Browser-based IDE with AI-powered code completion.',
    keywords: ['replit ai', 'replit agent', 'replit prompt', 'replit ghostwriter'],
  },
  {
    id: 'augment-code',
    slug: 'augment-code',
    name: 'Augment Code',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: 'AI coding assistant with Claude and GPT-5 support.',
    keywords: ['augment code', 'augment ai', 'augment prompt', 'augment agent'],
  },
  {
    id: 'github-copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'IDE Extension',
    categorySlug: 'ide-extension',
    description: "GitHub Copilot's agent mode with multi-model support.",
    keywords: ['github copilot', 'copilot prompt', 'copilot agent', 'copilot vscode'],
  },
  {
    id: 'manus',
    slug: 'manus',
    name: 'Manus Agent',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: 'Modular AI agent with comprehensive tool capabilities.',
    keywords: ['manus ai', 'manus agent', 'manus prompt', 'manus tools'],
  },
  {
    id: 'bolt',
    slug: 'bolt',
    name: 'Bolt',
    category: 'Open Source',
    categorySlug: 'open-source',
    description: "StackBlitz's open-source AI web development tool.",
    keywords: ['bolt new', 'bolt ai', 'bolt stackblitz', 'bolt prompt'],
  },
  {
    id: 'cline',
    slug: 'cline',
    name: 'Cline',
    category: 'Open Source',
    categorySlug: 'open-source',
    description: 'Open-source autonomous coding agent for VS Code.',
    keywords: ['cline ai', 'cline vscode', 'cline prompt', 'cline agent'],
  },
  {
    id: 'amp',
    slug: 'amp',
    name: 'Amp',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Sourcegraph's AI coding assistant.",
    keywords: ['amp sourcegraph', 'amp ai', 'amp prompt', 'amp coding'],
  },
  {
    id: 'perplexity',
    slug: 'perplexity',
    name: 'Perplexity',
    category: 'AI Chat & Assistant',
    categorySlug: 'ai-chat-assistant',
    description: 'AI-powered search engine with conversational interface.',
    keywords: ['perplexity ai', 'perplexity search', 'perplexity prompt', 'perplexity chat'],
  },
  {
    id: 'google-gemini',
    slug: 'google-gemini',
    name: 'Google Gemini',
    category: 'AI Chat & Assistant',
    categorySlug: 'ai-chat-assistant',
    description: "Google's multimodal AI assistant.",
    keywords: ['gemini ai', 'google gemini', 'gemini prompt', 'gemini chat'],
  },
  {
    id: 'antigravity',
    slug: 'antigravity',
    name: 'Antigravity',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Google's experimental AI coding tool.",
    keywords: ['antigravity ai', 'google antigravity', 'antigravity prompt', 'antigravity coding'],
  },
  {
    id: 'trae',
    slug: 'trae',
    name: 'Trae',
    category: 'AI Code Editor',
    categorySlug: 'ai-code-editor',
    description: "ByteDance's AI-powered code editor.",
    keywords: ['trae ai', 'trae bytedance', 'trae editor', 'trae prompt'],
  },
  {
    id: 'junie',
    slug: 'junie',
    name: 'Junie',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "JetBrains' AI coding assistant.",
    keywords: ['junie ai', 'junie jetbrains', 'junie prompt', 'junie coding'],
  },
  {
    id: 'kiro',
    slug: 'kiro',
    name: 'Kiro',
    category: 'AI Coding Assistant',
    categorySlug: 'ai-coding-assistant',
    description: "Amazon's spec-driven AI coding assistant.",
    keywords: ['kiro ai', 'kiro amazon', 'kiro prompt', 'kiro coding'],
  },
  {
    id: 'same-dev',
    slug: 'same-dev',
    name: 'Same.dev',
    category: 'AI Platform',
    categorySlug: 'ai-platform',
    description: 'AI tool for cloning web applications.',
    keywords: ['same dev', 'same.dev ai', 'same dev prompt', 'same dev clone'],
  },
];

// =============================================================================
// Use Cases
// =============================================================================

export interface UseCase {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const useCases: UseCase[] = [
  { slug: 'code-generation', name: 'Code Generation', description: 'Generate code automatically with AI assistance', keywords: ['ai code generation', 'generate code ai', 'ai write code'] },
  { slug: 'code-review', name: 'Code Review', description: 'Automated AI-powered code review and feedback', keywords: ['ai code review', 'automated code review', 'ai pr review'] },
  { slug: 'debugging', name: 'Debugging', description: 'Find and fix bugs faster with AI assistance', keywords: ['ai debugging', 'ai bug finder', 'debug with ai'] },
  { slug: 'refactoring', name: 'Refactoring', description: 'Refactor and improve code quality using AI', keywords: ['ai refactoring', 'ai code improvement', 'refactor code ai'] },
  { slug: 'documentation', name: 'Documentation', description: 'Generate and maintain code documentation with AI', keywords: ['ai documentation', 'ai docs generation', 'auto documentation'] },
  { slug: 'testing', name: 'Testing', description: 'Write and run tests automatically with AI', keywords: ['ai testing', 'ai test generation', 'automated testing ai'] },
  { slug: 'code-completion', name: 'Code Completion', description: 'Intelligent code completion and autocomplete', keywords: ['ai code completion', 'ai autocomplete', 'intelligent autocomplete'] },
  { slug: 'code-explanation', name: 'Code Explanation', description: 'Understand and explain complex code with AI', keywords: ['ai explain code', 'code explanation ai', 'understand code ai'] },
  { slug: 'migration', name: 'Code Migration', description: 'Migrate codebases between languages and frameworks', keywords: ['ai code migration', 'ai framework migration', 'code conversion ai'] },
  { slug: 'optimization', name: 'Performance Optimization', description: 'Optimize code performance with AI assistance', keywords: ['ai performance optimization', 'ai code optimization', 'optimize code ai'] },
  { slug: 'security-audit', name: 'Security Audit', description: 'Identify security vulnerabilities with AI', keywords: ['ai security audit', 'ai vulnerability detection', 'ai security review'] },
  { slug: 'api-development', name: 'API Development', description: 'Build and document APIs faster with AI', keywords: ['ai api development', 'ai api design', 'build api with ai'] },
  { slug: 'frontend-development', name: 'Frontend Development', description: 'Build UIs and frontend code with AI', keywords: ['ai frontend development', 'ai ui generation', 'frontend ai tools'] },
  { slug: 'backend-development', name: 'Backend Development', description: 'Build backend services and APIs with AI', keywords: ['ai backend development', 'ai server development', 'backend ai tools'] },
  { slug: 'full-stack-development', name: 'Full Stack Development', description: 'Full stack application development with AI', keywords: ['ai full stack development', 'full stack ai tools', 'ai web development'] },
];

// Legacy string array for backward compat
export const useCaseSlugs = useCases.map(u => u.slug);

// =============================================================================
// Glossary Terms
// =============================================================================

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  longDefinition: string;
  relatedTerms: string[];
  relatedTools: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'system-prompt',
    term: 'System Prompt',
    definition: 'A set of instructions given to an AI model before the user conversation begins, shaping its behavior, tone, and capabilities.',
    longDefinition: 'A system prompt is a special type of instruction given to a large language model (LLM) at the start of a conversation session. Unlike user messages, system prompts are typically invisible to end users and are used by developers and companies to configure how the AI behaves. They can define the AI\'s persona, set boundaries on what it can and cannot do, establish its tone and communication style, and provide background context. System prompts are the primary way AI coding tools like Cursor, Claude Code, and GitHub Copilot define their specialized behaviors.',
    relatedTerms: ['llm', 'prompt-engineering', 'ai-agent', 'context-window'],
    relatedTools: ['cursor', 'claude-code', 'github-copilot', 'v0'],
    faqs: [
      { question: 'What is a system prompt?', answer: 'A system prompt is a set of instructions given to an AI model at the start of a session, defining its behavior, persona, and constraints before any user interaction begins.' },
      { question: 'Why are system prompts important?', answer: 'System prompts are critical because they define the AI\'s behavior, safety boundaries, and capabilities. For AI coding tools, they determine how the model approaches coding tasks, what languages it supports, and how it interacts with developers.' },
      { question: 'Can I see a tool\'s system prompt?', answer: 'Most companies keep their system prompts confidential, but many have been reverse-engineered by the developer community. SystemPrompts.fun is a database of verified system prompts from popular AI tools.' },
      { question: 'How long can a system prompt be?', answer: 'System prompts can range from a few sentences to tens of thousands of tokens. AI coding tools often have very long system prompts (10,000–50,000+ tokens) to define complex behaviors.' },
    ],
  },
  {
    slug: 'llm',
    term: 'Large Language Model (LLM)',
    definition: 'A type of AI model trained on massive amounts of text data, capable of understanding and generating human-like text across a wide range of tasks.',
    longDefinition: 'A Large Language Model (LLM) is a type of artificial intelligence model built using deep learning techniques, trained on vast corpora of text data. LLMs like GPT-4, Claude, and Gemini can understand context, generate coherent text, write code, answer questions, and perform complex reasoning. They are the foundation of modern AI coding assistants and chat tools. The "large" refers both to the number of parameters (billions to trillions) and the scale of training data.',
    relatedTerms: ['system-prompt', 'prompt-engineering', 'context-window', 'token', 'fine-tuning'],
    relatedTools: ['cursor', 'claude-code', 'github-copilot', 'perplexity', 'google-gemini'],
    faqs: [
      { question: 'What is a Large Language Model?', answer: 'A Large Language Model (LLM) is an AI system trained on massive amounts of text that can understand and generate human language, write code, answer questions, and perform complex reasoning tasks.' },
      { question: 'What LLMs power AI coding tools?', answer: 'Popular AI coding tools use various LLMs: Cursor uses Claude and GPT-4, GitHub Copilot uses OpenAI models, Claude Code uses Anthropic\'s Claude, and Windsurf uses multiple models including Claude.' },
      { question: 'What is the difference between an LLM and a chatbot?', answer: 'An LLM is the underlying AI model; a chatbot is an application built on top of an LLM. AI coding tools like Cursor are specialized applications that use LLMs and enhance them with code-specific tools and system prompts.' },
    ],
  },
  {
    slug: 'prompt-engineering',
    term: 'Prompt Engineering',
    definition: 'The practice of designing and optimizing text inputs (prompts) to get the best possible outputs from AI language models.',
    longDefinition: 'Prompt engineering is the discipline of crafting inputs to AI models to elicit desired outputs. It involves understanding how LLMs interpret instructions, using techniques like chain-of-thought reasoning, few-shot examples, role assignment, and structured formatting to guide model behavior. For developers, prompt engineering is essential for building effective AI-powered applications and for getting the most out of AI coding assistants.',
    relatedTerms: ['system-prompt', 'llm', 'chain-of-thought', 'few-shot-prompting', 'zero-shot-prompting'],
    relatedTools: ['cursor', 'claude-code', 'v0', 'lovable'],
    faqs: [
      { question: 'What is prompt engineering?', answer: 'Prompt engineering is the practice of crafting and optimizing inputs to AI models to get better, more accurate, and more useful outputs.' },
      { question: 'Is prompt engineering still relevant in 2026?', answer: 'Yes. While models have become more capable of interpreting natural language, prompt engineering remains critical for system prompt design, agentic workflows, and building reliable AI applications.' },
      { question: 'How do system prompts relate to prompt engineering?', answer: 'System prompts are a product of prompt engineering. Creating an effective system prompt for an AI coding tool requires deep prompt engineering knowledge—knowing how to structure instructions, set constraints, and define behaviors reliably.' },
    ],
  },
  {
    slug: 'context-window',
    term: 'Context Window',
    definition: 'The maximum amount of text (measured in tokens) that an AI model can process at one time, including both input and output.',
    longDefinition: 'The context window is the total amount of information—including the system prompt, conversation history, code files, and outputs—that an LLM can hold in its "memory" during a single session. Larger context windows allow AI coding tools to understand more of your codebase at once. For example, Claude has a 200K token context window, enabling it to process entire large codebases in a single session. Context window size is a key factor when choosing an AI coding tool.',
    relatedTerms: ['llm', 'token', 'system-prompt'],
    relatedTools: ['cursor', 'claude-code', 'github-copilot', 'windsurf'],
    faqs: [
      { question: 'What is a context window in AI?', answer: 'A context window is the maximum amount of text an AI model can process at once, including your prompt, the model\'s response, and any prior conversation history.' },
      { question: 'How big are context windows for AI coding tools?', answer: 'Context windows vary significantly: GPT-4 has 128K tokens, Claude has up to 200K tokens, and some specialized models offer even larger windows. Larger context windows let the AI understand more of your codebase simultaneously.' },
      { question: 'Why does context window size matter for coding?', answer: 'A larger context window means the AI can read more of your code at once—more files, more functions, more context. This leads to more accurate suggestions and better understanding of complex codebases.' },
    ],
  },
  {
    slug: 'ai-agent',
    term: 'AI Agent',
    definition: 'An AI system that can autonomously plan and execute multi-step tasks, using tools and making decisions to achieve a goal.',
    longDefinition: 'An AI agent is an AI system capable of taking a high-level goal and autonomously breaking it down into steps, using tools (like web search, code execution, file access), and iterating until the goal is achieved. In the coding context, AI agents like Devin, Claude Code, and Cursor\'s agent mode can write code, run tests, fix bugs, and deploy applications—all without constant human intervention. They represent a significant evolution beyond simple code completion.',
    relatedTerms: ['llm', 'system-prompt', 'tool-use', 'model-context-protocol'],
    relatedTools: ['devin', 'claude-code', 'cursor', 'manus', 'cline'],
    faqs: [
      { question: 'What is an AI agent?', answer: 'An AI agent is an AI system that can autonomously plan and complete multi-step tasks. Unlike a simple chatbot, agents can use tools, browse the web, write and execute code, and iterate on results.' },
      { question: 'What AI coding agents are available in 2026?', answer: 'Leading AI coding agents include Devin (Cognition), Claude Code (Anthropic), Cursor\'s agent mode, GitHub Copilot\'s agent mode, Manus, and Cline. Each has different strengths and autonomy levels.' },
      { question: 'How do AI agents use system prompts?', answer: 'System prompts for AI agents are more complex than for simple chatbots. They define the agent\'s capabilities, available tools, decision-making frameworks, safety constraints, and how to handle errors and edge cases.' },
    ],
  },
  {
    slug: 'model-context-protocol',
    term: 'Model Context Protocol (MCP)',
    definition: 'An open standard by Anthropic that enables AI models to connect with external tools, data sources, and services through a unified interface.',
    longDefinition: 'The Model Context Protocol (MCP) is an open-source standard developed by Anthropic that standardizes how AI models interact with external tools and data sources. Instead of each AI tool implementing custom integrations, MCP provides a unified protocol. This allows AI coding assistants to connect to databases, APIs, file systems, and other services in a consistent way. Cursor, Claude Code, and other major AI tools have adopted MCP as a core part of their architecture.',
    relatedTerms: ['ai-agent', 'tool-use', 'llm', 'system-prompt'],
    relatedTools: ['cursor', 'claude-code', 'windsurf', 'cline'],
    faqs: [
      { question: 'What is the Model Context Protocol?', answer: 'MCP (Model Context Protocol) is an open standard by Anthropic that lets AI models connect to external tools, data sources, and APIs through a unified interface, enabling more powerful and flexible AI applications.' },
      { question: 'Which AI tools support MCP?', answer: 'MCP is widely adopted: Cursor, Claude Code, Windsurf, Cline, and many other tools support MCP, enabling them to connect to databases, file systems, and APIs consistently.' },
      { question: 'Why does MCP matter for developers?', answer: 'MCP simplifies building AI-powered tools by providing a standard interface. Instead of writing custom integrations for each AI tool, developers can build MCP servers once and have them work across all MCP-compatible AI assistants.' },
    ],
  },
  {
    slug: 'token',
    term: 'Token',
    definition: 'The basic unit of text that AI models process. A token is roughly 4 characters or 0.75 words in English.',
    longDefinition: 'Tokens are the fundamental units that LLMs use to process text. Rather than processing characters or words directly, models split text into tokens—which can be whole words, parts of words, or punctuation marks. The number of tokens affects both the cost of using an AI model and what fits within its context window. For AI coding tools, tokens are used to measure how much code the model can read and generate in a single session.',
    relatedTerms: ['context-window', 'llm', 'fine-tuning'],
    relatedTools: ['cursor', 'claude-code', 'github-copilot'],
    faqs: [
      { question: 'What is a token in AI?', answer: 'A token is the basic unit an AI model uses to process text. Roughly speaking, 1 token ≈ 4 characters ≈ 0.75 words in English. AI models have limits on how many tokens they can process at once.' },
      { question: 'How do tokens affect AI coding tools?', answer: 'Tokens determine how much code an AI can read and generate. More tokens = larger context window = the AI can understand more of your codebase. Token limits also affect pricing for API-based tools.' },
    ],
  },
  {
    slug: 'fine-tuning',
    term: 'Fine-tuning',
    definition: 'The process of further training a pre-trained AI model on a specific dataset to improve its performance on a particular task or domain.',
    longDefinition: 'Fine-tuning is a transfer learning technique where a pre-trained model (like GPT-4 or Claude) is further trained on a smaller, task-specific dataset. This allows the model to specialize in a particular domain, coding language, or task without training from scratch. For AI coding tools, fine-tuning can improve performance on specific languages, frameworks, or company codebases.',
    relatedTerms: ['llm', 'token', 'prompt-engineering'],
    relatedTools: ['github-copilot', 'cursor', 'cline'],
    faqs: [
      { question: 'What is fine-tuning in AI?', answer: 'Fine-tuning is the process of taking a pre-trained AI model and training it further on specific data to improve its performance on particular tasks or domains.' },
      { question: 'Do AI coding tools use fine-tuning?', answer: 'Yes. GitHub Copilot Enterprise allows fine-tuning on your organization\'s codebase. Some tools also offer specialized models fine-tuned on coding data for better performance.' },
    ],
  },
  {
    slug: 'retrieval-augmented-generation',
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'A technique that enhances AI responses by retrieving relevant information from an external knowledge base before generating a response.',
    longDefinition: 'Retrieval-Augmented Generation (RAG) combines the power of LLMs with the ability to search and retrieve relevant information from external databases or documents. Instead of relying solely on training data, RAG systems first search a knowledge base for relevant context, then feed that context to the LLM alongside the user query. In AI coding tools, RAG is used to search codebases, documentation, and internal knowledge bases to give the AI relevant context for coding tasks.',
    relatedTerms: ['llm', 'context-window', 'embeddings', 'vector-database'],
    relatedTools: ['cursor', 'github-copilot', 'cline', 'augment-code'],
    faqs: [
      { question: 'What is RAG in AI?', answer: 'RAG (Retrieval-Augmented Generation) is a technique that gives AI models access to an external knowledge base at query time, allowing them to retrieve relevant information before generating responses.' },
      { question: 'How do AI coding tools use RAG?', answer: 'AI coding tools like Cursor and GitHub Copilot use RAG to search your codebase and documentation, giving the AI model relevant context about your specific project before generating code suggestions.' },
    ],
  },
  {
    slug: 'embeddings',
    term: 'Embeddings',
    definition: 'Numerical vector representations of text that capture semantic meaning, enabling AI systems to measure similarity between pieces of text.',
    longDefinition: 'Embeddings are dense vector representations of text where semantically similar content is placed close together in a high-dimensional space. AI coding tools use embeddings to index codebases and find semantically relevant code snippets when you ask a question. For example, when you ask "how does authentication work?", the tool finds code related to authentication even if it doesn\'t contain those exact words.',
    relatedTerms: ['retrieval-augmented-generation', 'vector-database', 'llm'],
    relatedTools: ['cursor', 'github-copilot', 'augment-code', 'cline'],
    faqs: [
      { question: 'What are embeddings in AI?', answer: 'Embeddings are numerical representations of text that capture semantic meaning. They allow AI systems to compare and search for similar content based on meaning rather than exact word matches.' },
      { question: 'Why do AI coding tools use embeddings?', answer: 'AI coding tools use embeddings to index your entire codebase, enabling semantic search. This lets the AI find relevant code for your query even when the exact words don\'t match.' },
    ],
  },
];

// =============================================================================
// Personas
// =============================================================================

export interface Persona {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  recommendedTools: string[];
  painPoints: string[];
  topUseCases: string[];
}

export const personas: Persona[] = [
  {
    slug: 'frontend-developers',
    name: 'Frontend Developers',
    description: 'JavaScript and TypeScript developers building UIs and web applications',
    keywords: ['ai tools for frontend developers', 'ai coding assistant frontend', 'best ai for react developers'],
    recommendedTools: ['cursor', 'v0', 'lovable', 'windsurf', 'github-copilot'],
    painPoints: ['Writing repetitive JSX/TSX', 'CSS debugging', 'Component creation', 'TypeScript type errors'],
    topUseCases: ['frontend-development', 'code-generation', 'debugging', 'code-completion'],
  },
  {
    slug: 'backend-developers',
    name: 'Backend Developers',
    description: 'Developers building APIs, services, and server-side applications',
    keywords: ['ai tools for backend developers', 'ai for backend development', 'best ai coding assistant backend'],
    recommendedTools: ['cursor', 'claude-code', 'github-copilot', 'cline', 'augment-code'],
    painPoints: ['API design', 'Database queries', 'Security implementation', 'Performance optimization'],
    topUseCases: ['backend-development', 'api-development', 'security-audit', 'optimization'],
  },
  {
    slug: 'full-stack-developers',
    name: 'Full Stack Developers',
    description: 'Developers working across the entire application stack',
    keywords: ['ai tools for full stack developers', 'ai full stack development', 'best ai for full stack'],
    recommendedTools: ['cursor', 'claude-code', 'replit', 'windsurf', 'lovable'],
    painPoints: ['Context switching between frontend/backend', 'Integration issues', 'Keeping up with both ecosystems'],
    topUseCases: ['full-stack-development', 'code-generation', 'debugging', 'refactoring'],
  },
  {
    slug: 'python-developers',
    name: 'Python Developers',
    description: 'Developers using Python for web development, data science, and automation',
    keywords: ['ai tools for python developers', 'best ai coding assistant python', 'ai python development'],
    recommendedTools: ['cursor', 'claude-code', 'github-copilot', 'replit', 'cline'],
    painPoints: ['Dependency management', 'Type hints', 'Data manipulation', 'Performance in Python'],
    topUseCases: ['code-generation', 'debugging', 'testing', 'documentation'],
  },
  {
    slug: 'react-developers',
    name: 'React Developers',
    description: 'Developers building applications with React and the React ecosystem',
    keywords: ['ai tools for react developers', 'best ai for react', 'ai react development'],
    recommendedTools: ['cursor', 'v0', 'lovable', 'windsurf', 'github-copilot'],
    painPoints: ['Component boilerplate', 'State management complexity', 'Hook patterns', 'Performance optimization'],
    topUseCases: ['frontend-development', 'code-generation', 'code-completion', 'refactoring'],
  },
  {
    slug: 'solo-developers',
    name: 'Solo Developers & Indie Hackers',
    description: 'Independent developers building products alone',
    keywords: ['ai tools for solo developers', 'best ai for indie hackers', 'ai for solo founders'],
    recommendedTools: ['cursor', 'v0', 'lovable', 'replit', 'bolt'],
    painPoints: ['Limited time', 'Wearing too many hats', 'No team for code review', 'Moving fast with quality'],
    topUseCases: ['code-generation', 'full-stack-development', 'prototyping', 'documentation'],
  },
  {
    slug: 'enterprise-teams',
    name: 'Enterprise Development Teams',
    description: 'Large engineering teams at enterprise organizations',
    keywords: ['ai tools for enterprise developers', 'ai coding for enterprise teams', 'enterprise ai development'],
    recommendedTools: ['github-copilot', 'cursor', 'augment-code', 'claude-code'],
    painPoints: ['Code consistency across team', 'Security compliance', 'Legacy codebase', 'Knowledge sharing'],
    topUseCases: ['code-review', 'refactoring', 'documentation', 'security-audit'],
  },
  {
    slug: 'students',
    name: 'Students & Beginners',
    description: 'Developers learning to code and students in computer science programs',
    keywords: ['ai tools for beginner developers', 'ai coding for students', 'learn coding with ai'],
    recommendedTools: ['replit', 'github-copilot', 'cursor', 'v0'],
    painPoints: ['Understanding error messages', 'Learning best practices', 'Lack of experience', 'Imposter syndrome'],
    topUseCases: ['learning', 'code-explanation', 'debugging', 'code-generation'],
  },
  {
    slug: 'data-scientists',
    name: 'Data Scientists',
    description: 'Professionals working with data analysis, ML, and AI models',
    keywords: ['ai tools for data scientists', 'ai coding assistant data science', 'best ai for data science'],
    recommendedTools: ['cursor', 'github-copilot', 'claude-code', 'replit'],
    painPoints: ['Pandas/NumPy syntax', 'Visualization code', 'ML pipeline setup', 'Data cleaning'],
    topUseCases: ['code-generation', 'code-explanation', 'debugging', 'documentation'],
  },
  {
    slug: 'devops-engineers',
    name: 'DevOps Engineers',
    description: 'Engineers managing infrastructure, CI/CD, and deployment pipelines',
    keywords: ['ai tools for devops', 'ai devops automation', 'best ai for infrastructure'],
    recommendedTools: ['cursor', 'claude-code', 'github-copilot', 'cline'],
    painPoints: ['YAML/config complexity', 'Shell scripting', 'Debugging pipelines', 'Documentation'],
    topUseCases: ['devops', 'code-generation', 'documentation', 'security-audit'],
  },
];

// =============================================================================
// Guide Topics
// =============================================================================

export const guideTopics: string[] = [
  'best-ai-coding-tools-2026',
  'how-to-write-effective-prompts',
  'ai-assisted-code-review',
  'choosing-the-right-ai-tool',
  'ai-coding-best-practices',
  'maximizing-ai-productivity',
  'ai-tools-for-beginners',
  'advanced-prompt-engineering',
  'ai-security-considerations',
  'ai-in-enterprise-development',
  'open-source-vs-commercial-ai',
  'ai-code-quality',
  'ai-pair-programming',
  'future-of-ai-coding',
  'ai-tool-integration-guide',
];

// =============================================================================
// Comparison Generation
// =============================================================================

/**
 * Generate all valid comparison pairs
 */
export function generateComparisonPairs(
  toolList: ToolDefinition[]
): Array<[string, string]> {
  const pairs: Array<[string, string]> = [];
  
  for (let i = 0; i < toolList.length; i++) {
    for (let j = i + 1; j < toolList.length; j++) {
      // Only compare tools in similar categories or both popular
      const tool1 = toolList[i];
      const tool2 = toolList[j];
      
      // Same category comparisons are always valid
      if (tool1.categorySlug === tool2.categorySlug) {
        pairs.push([tool1.slug, tool2.slug]);
        continue;
      }
      
      // Cross-category: only for major tools
      const majorTools = ['cursor', 'claude-code', 'github-copilot', 'v0', 'windsurf', 'replit'];
      if (majorTools.includes(tool1.slug) && majorTools.includes(tool2.slug)) {
        pairs.push([tool1.slug, tool2.slug]);
      }
    }
  }
  
  return pairs.sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Generate comparison slug from two tools
 */
export function generateComparisonSlug(tool1: string, tool2: string): string {
  const [first, second] = [tool1, tool2].sort();
  return `${first}-vs-${second}`;
}

// =============================================================================
// Full Keyword Matrix
// =============================================================================

export const keywordMatrix: KeywordMatrix = {
  tools: tools.map((t) => t.slug),
  categories: categories.map((c) => c.slug),
  useCases: useCaseSlugs,
  comparisons: generateComparisonPairs(tools),
  guides: guideTopics,
};

// =============================================================================
// Page Count Estimation
// =============================================================================

export function estimatePageCount(): {
  tools: number;
  comparisons: number;
  guides: number;
  hubs: number;
  total: number;
} {
  const toolPages = tools.length;
  const comparisonPages = keywordMatrix.comparisons.length;
  const guidePages = guideTopics.length;
  const hubPages = categories.length;
  
  return {
    tools: toolPages,
    comparisons: comparisonPages,
    guides: guidePages,
    hubs: hubPages,
    total: toolPages + comparisonPages + guidePages + hubPages,
  };
}

// =============================================================================
// Lookup Helpers
// =============================================================================

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): ToolDefinition[] {
  return tools.filter((t) => t.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getComparisonsForTool(toolSlug: string): Array<[string, string]> {
  return keywordMatrix.comparisons.filter(
    ([a, b]) => a === toolSlug || b === toolSlug
  );
}

// =============================================================================
// Slug Utilities
// =============================================================================

export function categoryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function slugToCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name || slug.split('-').map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find((p) => p.slug === slug);
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
