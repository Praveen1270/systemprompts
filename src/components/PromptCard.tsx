'use client';

import { motion } from 'framer-motion';
import { Check, ChevronDown, Copy, Link2, Share2, Terminal } from 'lucide-react';
import type { PromptIndexItem } from '@/data/promptTypes';
import { formatIndexItemTitle } from '@/lib/display';
import { useRef, useState } from 'react';

interface PromptCardProps {
  prompt: PromptIndexItem;
  index: number;
}

export default function PromptCard({ prompt, index }: PromptCardProps) {
  const maxVisibleTags = 2;
  const visibleTags = prompt.tags.slice(0, maxVisibleTags);
  const hiddenTags = prompt.tags.slice(maxVisibleTags);
  const cachedContentRef = useRef<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'loading' | 'copied'>('idle');
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

  const deepLinkPath = `/tool/${prompt.toolId}?file=${encodeURIComponent(prompt.title)}`;

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (copyState === 'loading') return;

    setCopyState('loading');
    try {
      let content = cachedContentRef.current;
      if (!content) {
        const res = await fetch(`/api/prompt?path=${encodeURIComponent(prompt.path)}`);
        const data = await res.json();
        content = typeof data?.content === 'string' ? data.content : '';
        cachedContentRef.current = content || null;
      }
      await copyToClipboard(content || prompt.preview);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1500);
    } catch {
      try {
        await copyToClipboard(prompt.preview);
        setCopyState('copied');
        window.setTimeout(() => setCopyState('idle'), 1500);
      } catch {
        setCopyState('idle');
      }
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (shareState !== 'idle') return;

    const url =
      typeof window !== 'undefined' ? `${window.location.origin}${deepLinkPath}` : deepLinkPath;

    try {
      const navAny = navigator as any;
      if (navAny?.share) {
        await navAny.share({
          title: prompt.title,
          text: prompt.preview,
          url,
        });
        return;
      }
    } catch {
      // ignore
    }

    try {
      await copyToClipboard(url);
      setShareState('copied');
      window.setTimeout(() => setShareState('idle'), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="glow-card h-full group">
      <div className="glass-panel h-full flex flex-col p-6 transition-all duration-500 hover:bg-white/[0.04]">
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary group-hover:animate-pulse" />
            <span className="font-technical text-[10px] tracking-widest text-text-muted uppercase">
              {prompt.toolCategory || 'General'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
              title="Copy Sequence"
            >
              {copyState === 'copied' ? (
                <Check className="w-3.5 h-3.5 text-accent-primary" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
              title="Share Link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Console Preview */}
        <div className="relative rounded-xl bg-black/40 border border-white/5 p-4 mb-6 flex-1 group/preview overflow-hidden">
          <div className="absolute top-2 right-2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
            <Terminal className="w-3 h-3 text-accent-primary/40" />
          </div>
          <pre className="text-[11px] leading-relaxed font-technical text-text-secondary whitespace-pre-wrap break-words line-clamp-5 selection:bg-accent-primary/30">
            {prompt.preview}
          </pre>
        </div>

        {/* Content Details */}
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-text-primary mb-4 leading-tight group-hover:text-accent-primary transition-colors duration-300">
            {formatIndexItemTitle(prompt.toolName, prompt.title, prompt.kind)}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded font-technical text-[10px] bg-white/5 border border-white/5 text-text-muted hover:text-accent-primary hover:border-accent-primary/30 transition-colors"
              >
                {tag}
              </span>
            ))}

            {hiddenTags.length > 0 && (
              <div className="relative group/tags">
                <span className="cursor-help px-2 py-0.5 rounded font-technical text-[10px] bg-white/5 border border-white/5 text-text-muted">
                  +{hiddenTags.length}
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover/tags:opacity-100 transition-opacity pointer-events-none z-50">
                  <div className="glass-panel p-3 shadow-2xl bg-bg-elevated/95">
                    <div className="flex flex-wrap gap-1.5">
                      {hiddenTags.map((tag) => (
                        <span key={tag} className="text-[9px] font-technical text-text-secondary bg-white/5 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
