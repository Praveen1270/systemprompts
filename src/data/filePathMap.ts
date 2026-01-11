// Central map of tool IDs -> display file name -> relative path under `src/prompts/`
export const filePathMap: Record<string, Record<string, string>> = {
  cursor: {
    'Agent Prompt v2.0': 'Cursor Prompts/Agent Prompt 2.0.txt',
    'Agent Prompt v1.2': 'Cursor Prompts/Agent Prompt v1.2.txt',
    'Agent Prompt v1.0': 'Cursor Prompts/Agent Prompt v1.0.txt',
    'Chat Prompt': 'Cursor Prompts/Chat Prompt.txt',
    'Agent Tools v1.0': 'Cursor Prompts/Agent Tools v1.0.json',
  },
  'claude-code': {
    Prompt: 'Anthropic/Claude Code/Prompt.txt',
    'Claude Code 2.0': 'Anthropic/Claude Code 2.0.txt',
    Tools: 'Anthropic/Claude Code/Tools.json',
  },
  v0: {
    Prompt: 'v0 Prompts and Tools/Prompt.txt',
    Tools: 'v0 Prompts and Tools/Tools.json',
  },
  lovable: {
    'Agent Prompt': 'Lovable/Agent Prompt.txt',
    'Agent Tools': 'Lovable/Agent Tools.json',
  },
  windsurf: {
    'Prompt Wave 11': 'Windsurf/Prompt Wave 11.txt',
    'Tools Wave 11': 'Windsurf/Tools Wave 11.txt',
  },
  devin: {
    Prompt: 'Devin AI/Prompt.txt',
    'DeepWiki Prompt': 'Devin AI/DeepWiki Prompt.txt',
  },
  replit: {
    Prompt: 'Replit/Prompt.txt',
    Tools: 'Replit/Tools.json',
  },
  'augment-code': {
    'Claude 4 Sonnet Agent Prompts': 'Augment Code/claude-4-sonnet-agent-prompts.txt',
    'Claude 4 Sonnet Tools': 'Augment Code/claude-4-sonnet-tools.json',
    'GPT-5 Agent Prompts': 'Augment Code/gpt-5-agent-prompts.txt',
    'GPT-5 Tools': 'Augment Code/gpt-5-tools.json',
  },
  'vscode-agent': {
    Prompt: 'VSCode Agent/Prompt.txt',
    'Claude Sonnet 4': 'VSCode Agent/claude-sonnet-4.txt',
    'GPT-5': 'VSCode Agent/gpt-5.txt',
    'GPT-4.1': 'VSCode Agent/gpt-4.1.txt',
    'Gemini 2.5 Pro': 'VSCode Agent/gemini-2.5-pro.txt',
  },
  manus: {
    Prompt: 'Manus Agent Tools & Prompt/Prompt.txt',
    'Agent Loop': 'Manus Agent Tools & Prompt/Agent loop.txt',
    Modules: 'Manus Agent Tools & Prompt/Modules.txt',
    Tools: 'Manus Agent Tools & Prompt/tools.json',
  },
  bolt: {
    Prompt: 'Open Source prompts/Bolt/Prompt.txt',
  },
  cline: {
    Prompt: 'Open Source prompts/Cline/Prompt.txt',
  },
  amp: {
    'Claude 4 Sonnet': 'Amp/claude-4-sonnet.yaml',
    'GPT-5': 'Amp/gpt-5.yaml',
  },
  perplexity: {
    Prompt: 'Perplexity/Prompt.txt',
  },
  'google-gemini': {
    'AI Studio Vibe Coder': 'Google/Gemini/AI Studio vibe-coder.txt',
    'Gemini CLI': 'Open Source prompts/Gemini CLI/google-gemini-cli-system-prompt.txt',
  },
  antigravity: {
    'Fast Prompt': 'Google/Antigravity/Fast Prompt.txt',
    'Planning Mode': 'Google/Antigravity/planning-mode.txt',
  },
  trae: {
    'Builder Prompt': 'Trae/Builder Prompt.txt',
    'Chat Prompt': 'Trae/Chat Prompt.txt',
    'Builder Tools': 'Trae/Builder Tools.json',
  },
  junie: {
    Prompt: 'Junie/Prompt.txt',
  },
  kiro: {
    'Mode Classifier Prompt': 'Kiro/Mode_Clasifier_Prompt.txt',
    'Spec Prompt': 'Kiro/Spec_Prompt.txt',
    'Vibe Prompt': 'Kiro/Vibe_Prompt.txt',
  },
  'same-dev': {
    Prompt: 'Same.dev/Prompt.txt',
    Tools: 'Same.dev/Tools.json',
  },
  leap: {
    Prompts: 'Leap.new/Prompts.txt',
    Tools: 'Leap.new/tools.json',
  },
  warp: {
    Prompt: 'Warp.dev/Prompt.txt',
  },
  'codex-cli': {
    Prompt: 'Open Source prompts/Codex CLI/Prompt.txt',
    'System Prompt 2025': 'Open Source prompts/Codex CLI/openai-codex-cli-system-prompt-20250820.txt',
  },
  roocode: {
    Prompt: 'Open Source prompts/RooCode/Prompt.txt',
  },
  lumo: {
    Prompt: 'Open Source prompts/Lumo/Prompt.txt',
  },
  'notion-ai': {
    Prompt: 'NotionAi/Prompt.txt',
    Tools: 'NotionAi/tools.json',
  },
  xcode: {
    System: 'Xcode/System.txt',
    'Document Action': 'Xcode/DocumentAction.txt',
    'Explain Action': 'Xcode/ExplainAction.txt',
    'Message Action': 'Xcode/MessageAction.txt',
    'Preview Action': 'Xcode/PreviewAction.txt',
  },
  cluely: {
    'Default Prompt': 'Cluely/Default Prompt.txt',
    'Enterprise Prompt': 'Cluely/Enterprise Prompt.txt',
  },
  emergent: {
    Prompt: 'Emergent/Prompt.txt',
    Tools: 'Emergent/Tools.json',
  },
  traycer: {
    'Phase Mode Prompts': 'Traycer AI/phase_mode_prompts.txt',
    'Phase Mode Tools': 'Traycer AI/phase_mode_tools.json',
    // NOTE: this file currently has no extension in the repo; keep as-is.
    'Plan Mode Prompts': 'Traycer AI/plan_mode_prompts',
    'Plan Mode Tools': 'Traycer AI/plan_mode_tools.json',
  },
  qoder: {
    Prompt: 'Qoder/prompt.txt',
    'Quest Action': 'Qoder/Quest Action.txt',
    'Quest Design': 'Qoder/Quest Design.txt',
  },
  dia: {
    Prompt: 'dia/Prompt.txt',
  },
  comet: {
    'System Prompt': 'Comet Assistant/System Prompt.txt',
  },
  codebuddy: {
    'Chat Prompt': 'CodeBuddy Prompts/Chat Prompt.txt',
    'Craft Prompt': 'CodeBuddy Prompts/Craft Prompt.txt',
  },
  orchids: {
    'System Prompt': 'Orchids.app/System Prompt.txt',
    'Decision-making Prompt': 'Orchids.app/Decision-making prompt.txt',
  },
  poke: {
    'Poke Agent': 'Poke/Poke agent.txt',
    'Phase 1': 'Poke/Poke_p1.txt',
    'Phase 2': 'Poke/Poke_p2.txt',
    'Phase 3': 'Poke/Poke_p3.txt',
    'Phase 4': 'Poke/Poke_p4.txt',
    'Phase 5': 'Poke/Poke_p5.txt',
    'Phase 6': 'Poke/Poke_p6.txt',
  },
  'zai-code': {
    Prompt: 'Z.ai Code/prompt.txt',
  },
};





