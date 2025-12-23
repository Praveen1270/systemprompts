'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Wrench, Copy, Check, Loader2 } from 'lucide-react';
import { getToolById, tools } from '@/data/tools';
import { useState, useEffect } from 'react';

// Map tool IDs to their actual file paths
const filePathMap: Record<string, Record<string, string>> = {
  'cursor': {
    'Agent Prompt v2.0': 'Cursor Prompts/Agent Prompt 2.0.txt',
    'Agent Prompt v1.2': 'Cursor Prompts/Agent Prompt v1.2.txt',
    'Agent Prompt v1.0': 'Cursor Prompts/Agent Prompt v1.0.txt',
    'Chat Prompt': 'Cursor Prompts/Chat Prompt.txt',
    'Agent Tools v1.0': 'Cursor Prompts/Agent Tools v1.0.json',
  },
  'claude-code': {
    'Prompt': 'Anthropic/Claude Code/Prompt.txt',
    'Claude Code 2.0': 'Anthropic/Claude Code 2.0.txt',
    'Tools': 'Anthropic/Claude Code/Tools.json',
  },
  'v0': {
    'Prompt': 'v0 Prompts and Tools/Prompt.txt',
    'Tools': 'v0 Prompts and Tools/Tools.json',
  },
  'lovable': {
    'Agent Prompt': 'Lovable/Agent Prompt.txt',
    'Agent Tools': 'Lovable/Agent Tools.json',
  },
  'windsurf': {
    'Prompt Wave 11': 'Windsurf/Prompt Wave 11.txt',
    'Tools Wave 11': 'Windsurf/Tools Wave 11.txt',
  },
  'devin': {
    'Prompt': 'Devin AI/Prompt.txt',
    'DeepWiki Prompt': 'Devin AI/DeepWiki Prompt.txt',
  },
  'replit': {
    'Prompt': 'Replit/Prompt.txt',
    'Tools': 'Replit/Tools.json',
  },
  'augment-code': {
    'Claude 4 Sonnet Agent Prompts': 'Augment Code/claude-4-sonnet-agent-prompts.txt',
    'Claude 4 Sonnet Tools': 'Augment Code/claude-4-sonnet-tools.json',
    'GPT-5 Agent Prompts': 'Augment Code/gpt-5-agent-prompts.txt',
    'GPT-5 Tools': 'Augment Code/gpt-5-tools.json',
  },
  'vscode-agent': {
    'Prompt': 'VSCode Agent/Prompt.txt',
    'Claude Sonnet 4': 'VSCode Agent/claude-sonnet-4.txt',
    'GPT-5': 'VSCode Agent/gpt-5.txt',
    'GPT-4.1': 'VSCode Agent/gpt-4.1.txt',
    'Gemini 2.5 Pro': 'VSCode Agent/gemini-2.5-pro.txt',
  },
  'manus': {
    'Prompt': 'Manus Agent Tools & Prompt/Prompt.txt',
    'Agent Loop': 'Manus Agent Tools & Prompt/Agent loop.txt',
    'Modules': 'Manus Agent Tools & Prompt/Modules.txt',
    'Tools': 'Manus Agent Tools & Prompt/tools.json',
  },
  'bolt': {
    'Prompt': 'Open Source prompts/Bolt/Prompt.txt',
  },
  'cline': {
    'Prompt': 'Open Source prompts/Cline/Prompt.txt',
  },
  'amp': {
    'Claude 4 Sonnet': 'Amp/claude-4-sonnet.yaml',
    'GPT-5': 'Amp/gpt-5.yaml',
  },
  'perplexity': {
    'Prompt': 'Perplexity/Prompt.txt',
  },
  'google-gemini': {
    'AI Studio Vibe Coder': 'Google/Gemini/AI Studio vibe-coder.txt',
    'Gemini CLI': 'Open Source prompts/Gemini CLI/google-gemini-cli-system-prompt.txt',
  },
  'antigravity': {
    'Fast Prompt': 'Google/Antigravity/Fast Prompt.txt',
    'Planning Mode': 'Google/Antigravity/planning-mode.txt',
  },
  'trae': {
    'Builder Prompt': 'Trae/Builder Prompt.txt',
    'Chat Prompt': 'Trae/Chat Prompt.txt',
    'Builder Tools': 'Trae/Builder Tools.json',
  },
  'junie': {
    'Prompt': 'Junie/Prompt.txt',
  },
  'kiro': {
    'Mode Classifier Prompt': 'Kiro/Mode_Clasifier_Prompt.txt',
    'Spec Prompt': 'Kiro/Spec_Prompt.txt',
    'Vibe Prompt': 'Kiro/Vibe_Prompt.txt',
  },
  'same-dev': {
    'Prompt': 'Same.dev/Prompt.txt',
    'Tools': 'Same.dev/Tools.json',
  },
  'leap': {
    'Prompts': 'Leap.new/Prompts.txt',
    'Tools': 'Leap.new/tools.json',
  },
  'warp': {
    'Prompt': 'Warp.dev/Prompt.txt',
  },
  'codex-cli': {
    'Prompt': 'Open Source prompts/Codex CLI/Prompt.txt',
    'System Prompt 2025': 'Open Source prompts/Codex CLI/openai-codex-cli-system-prompt-20250820.txt',
  },
  'roocode': {
    'Prompt': 'Open Source prompts/RooCode/Prompt.txt',
  },
  'lumo': {
    'Prompt': 'Open Source prompts/Lumo/Prompt.txt',
  },
  'notion-ai': {
    'Prompt': 'NotionAi/Prompt.txt',
    'Tools': 'NotionAi/tools.json',
  },
  'xcode': {
    'System': 'Xcode/System.txt',
    'Document Action': 'Xcode/DocumentAction.txt',
    'Explain Action': 'Xcode/ExplainAction.txt',
    'Message Action': 'Xcode/MessageAction.txt',
    'Preview Action': 'Xcode/PreviewAction.txt',
  },
  'cluely': {
    'Default Prompt': 'Cluely/Default Prompt.txt',
    'Enterprise Prompt': 'Cluely/Enterprise Prompt.txt',
  },
  'emergent': {
    'Prompt': 'Emergent/Prompt.txt',
    'Tools': 'Emergent/Tools.json',
  },
  'traycer': {
    'Phase Mode Prompts': 'Traycer AI/phase_mode_prompts.txt',
    'Phase Mode Tools': 'Traycer AI/phase_mode_tools.json',
    'Plan Mode Prompts': 'Traycer AI/plan_mode_prompts',
    'Plan Mode Tools': 'Traycer AI/plan_mode_tools.json',
  },
  'qoder': {
    'Prompt': 'Qoder/prompt.txt',
    'Quest Action': 'Qoder/Quest Action.txt',
    'Quest Design': 'Qoder/Quest Design.txt',
  },
  'dia': {
    'Prompt': 'dia/Prompt.txt',
  },
  'comet': {
    'System Prompt': 'Comet Assistant/System Prompt.txt',
  },
  'codebuddy': {
    'Chat Prompt': 'CodeBuddy Prompts/Chat Prompt.txt',
    'Craft Prompt': 'CodeBuddy Prompts/Craft Prompt.txt',
  },
  'orchids': {
    'System Prompt': 'Orchids.app/System Prompt.txt',
    'Decision-making Prompt': 'Orchids.app/Decision-making prompt.txt',
  },
  'poke': {
    'Poke Agent': 'Poke/Poke agent.txt',
    'Phase 1': 'Poke/Poke_p1.txt',
    'Phase 2': 'Poke/Poke_p2.txt',
    'Phase 3': 'Poke/Poke_p3.txt',
    'Phase 4': 'Poke/Poke_p4.txt',
    'Phase 5': 'Poke/Poke_p5.txt',
    'Phase 6': 'Poke/Poke_p6.txt',
  },
  'zai-code': {
    'Prompt': 'Z.ai Code/prompt.txt',
  },
};

export default function ToolPage() {
  const params = useParams();
  const id = params.id as string;
  const tool = getToolById(id);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState(0);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Get the file path
  const getFilePath = (fileName: string) => {
    const paths = filePathMap[id];
    if (paths && paths[fileName]) {
      return paths[fileName];
    }
    return null;
  };

  // Fetch content when selected file changes
  useEffect(() => {
    if (!tool) return;
    
    const fileName = tool.files[selectedFile]?.name;
    const filePath = getFilePath(fileName);
    
    if (!filePath) {
      setError('File path not found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/prompt?path=${encodeURIComponent(filePath)}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setContent(data.content);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load content');
        setLoading(false);
      });
  }, [selectedFile, tool, id]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f5f7] flex items-center justify-center">
            <span className="text-2xl text-[#86868b]">?</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Tool not found</h1>
          <Link href="/" className="text-[#0071e3] hover:underline">
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        // Fallback for mobile browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedIndex(selectedFile);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      // Final fallback - try execCommand
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedIndex(selectedFile);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const promptCount = tool.files.filter(f => f.type === 'prompt').length;
  const toolsCount = tool.files.filter(f => f.type === 'tools').length;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#0071e3] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to directory
          </Link>
        </motion.div>

        {/* Tool Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#f5f5f7] flex items-center justify-center overflow-hidden shrink-0">
              {!imageError ? (
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain w-10 h-10 md:w-12 md:h-12"
                  onError={() => setImageError(true)}
                  unoptimized
                />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-[#1d1d1f]">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1d1d1f]">{tool.name}</h1>
                <span className="category-pill w-fit">
                  {tool.category}
                </span>
              </div>
              <p className="text-base md:text-lg text-[#86868b] mb-4 max-w-2xl">{tool.description}</p>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-sm text-[#86868b]">
                  <FileText className="w-4 h-4" />
                  <span>{promptCount} prompt{promptCount !== 1 ? 's' : ''}</span>
                </div>
                {toolsCount > 0 && (
                  <div className="flex items-center gap-2 text-sm text-[#86868b]">
                    <Wrench className="w-4 h-4" />
                    <span>{toolsCount} tool{toolsCount !== 1 ? 's' : ''} definition</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Files Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2 border-b border-[#d2d2d7] pb-4">
            {tool.files.map((file, index) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedFile === index
                    ? 'bg-[#1d1d1f] text-white'
                    : 'bg-[#f5f5f7] text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#e8e8ed]'
                }`}
              >
                {file.type === 'prompt' ? (
                  <FileText className="w-3.5 h-3.5" />
                ) : (
                  <Wrench className="w-3.5 h-3.5" />
                )}
                {file.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Prompt Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="code-viewer">
            {/* Header */}
            <div className="code-viewer-header">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-sm text-[#86868b] font-mono">
                  {tool.files[selectedFile]?.name}
                </span>
              </div>
              <button
                onClick={handleCopy}
                disabled={loading || !!error}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3d3d3f] hover:bg-[#4d4d4f] text-xs text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copiedIndex === selectedFile ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Content */}
            <div className="code-viewer-content">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-[#86868b]" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20 text-center">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#3d3d3f] flex items-center justify-center">
                      <span className="text-[#86868b]">!</span>
                    </div>
                    <p className="text-[#86868b]">{error}</p>
                  </div>
                </div>
              ) : (
                <pre className="font-mono text-sm text-[#f5f5f7] leading-relaxed whitespace-pre-wrap break-words">
                  {content}
                </pre>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-xl font-semibold text-[#1d1d1f] mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tools
              .filter(t => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool) => (
                <RelatedToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d2d2d7] py-8 mt-12 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-[#86868b]">
            System prompts collected from public sources
          </p>
        </div>
      </footer>
    </div>
  );
}

function RelatedToolCard({ tool }: { tool: typeof tools[0] }) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link
      href={`/tool/${tool.id}`}
      className="block p-4 bg-[#f5f5f7] border border-transparent rounded-xl hover:border-[#d2d2d7] transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={24}
              height={24}
              className="object-contain"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <span className="text-sm font-bold text-[#1d1d1f]">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-[#86868b]">
            {tool.files.length} files
          </p>
        </div>
      </div>
    </Link>
  );
}
