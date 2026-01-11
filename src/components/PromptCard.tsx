'use client';

import { motion } from 'framer-motion';
import { Check, ChevronDown, Copy, Link2, Share2 } from 'lucide-react';
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
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback
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
      // Prefer Web Share on supported devices
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // fall through to copy-link
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
    >
      <div className="group relative h-full">
        <div className="relative h-full rounded-2xl border border-[#d2d2d7]/60 bg-white/70 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#86868b]/60 hover:bg-white/85">
            {/* Actions (Copy / Share) */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copyState === 'copied' ? 'Copied' : 'Copy prompt'}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/70 border border-[#d2d2d7]/70 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white transition-colors"
              >
                {copyState === 'copied' ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleShare}
                aria-label={shareState === 'copied' ? 'Link copied' : 'Share prompt'}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/70 border border-[#d2d2d7]/70 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white transition-colors"
              >
                {shareState === 'copied' ? <Link2 className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Preview block */}
            <div className="rounded-xl border border-[#d2d2d7]/60 bg-white/60 p-4 mb-5 min-h-[120px]">
              <pre className="text-xs leading-relaxed text-[#6e6e73] whitespace-pre-wrap break-words line-clamp-6">
                {prompt.preview}
              </pre>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4 line-clamp-2">
              {formatIndexItemTitle(prompt.toolName, prompt.title, prompt.kind)}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full bg-black/5 border border-black/10"
                >
                  {tag}
                </span>
              ))}

              {hiddenTags.length > 0 && (
                <details className="relative">
                  <summary className="list-none cursor-pointer select-none px-2 py-1 rounded-full bg-black/5 border border-black/10 inline-flex items-center gap-1 hover:bg-black/10 transition-colors">
                    +{hiddenTags.length} more
                    <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                  </summary>
                  <div className="absolute right-0 mt-2 z-20 w-64 rounded-xl border border-[#d2d2d7]/70 bg-white/90 backdrop-blur p-3 shadow-xl">
                    <div className="flex flex-wrap gap-2">
                      {hiddenTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-black/5 border border-black/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
    </motion.div>
  );
}




