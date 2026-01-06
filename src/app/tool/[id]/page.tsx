'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Wrench, Copy, Check, Loader2 } from 'lucide-react';
import { getToolById, tools } from '@/data/tools';
import { useState, useEffect } from 'react';
import { filePathMap } from '@/data/filePathMap';
import { formatToolFileTitle } from '@/lib/display';

export default function ToolPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const tool = getToolById(id);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const initialSelectedFile = (() => {
    if (!tool) return 0;
    const requested = searchParams.get('file');
    if (!requested) return 0;
    const idx = tool.files.findIndex(f => f.name === requested);
    return idx >= 0 ? idx : 0;
  })();
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);
  const [contentByKey, setContentByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});
  const [imageError, setImageError] = useState(false);

  // Get the file path
  const getFilePath = (fileName: string) => {
    const paths = filePathMap[id];
    if (paths && paths[fileName]) {
      return paths[fileName];
    }
    return null;
  };

  const fileName = tool?.files[selectedFile]?.name;
  const filePath = fileName ? (filePathMap[id]?.[fileName] ?? null) : null;
  const currentKey = fileName ? `${id}::${fileName}` : null;
  const derivedMissingPathError = tool && fileName && !filePath ? 'File path not found' : null;
  const content = currentKey ? contentByKey[currentKey] ?? '' : '';
  const error = derivedMissingPathError ?? (currentKey ? errorByKey[currentKey] ?? null : null);
  const loading =
    !!tool &&
    !!filePath &&
    !!currentKey &&
    contentByKey[currentKey] === undefined &&
    errorByKey[currentKey] === undefined;

  // Fetch content when selected file changes
  useEffect(() => {
    if (!tool) return;
    if (!filePath) return;
    if (!currentKey) return;
    if (contentByKey[currentKey] !== undefined) return;
    if (errorByKey[currentKey] !== undefined) return;

    fetch(`/api/prompt?path=${encodeURIComponent(filePath)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.error) {
          setErrorByKey(prev => ({ ...prev, [currentKey]: data.error }));
          return;
        }
        setContentByKey(prev => ({ ...prev, [currentKey]: data.content ?? '' }));
      })
      .catch(() => {
        setErrorByKey(prev => ({ ...prev, [currentKey]: 'Failed to load content' }));
      });
  }, [tool, filePath, currentKey, contentByKey, errorByKey]);

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
    } catch {
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

        {/* Files (Card Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[#1d1d1f]">Prompts & files</h2>
              <p className="text-sm text-[#86868b]">
                Pick a file to view. Prompts and tool definitions are shown below.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tool.files.map((file, index) => {
              const isSelected = selectedFile === index;
              const filePath = getFilePath(file.name);
              const badgeLabel =
                file.type === 'prompt' ? 'Prompt' : file.type === 'tools' ? 'Tools' : 'File';

              return (
                <motion.button
                  key={file.name}
                  type="button"
                  onClick={() => setSelectedFile(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="text-left"
                  aria-pressed={isSelected}
                >
                  <div className="group relative h-full card-hover">
                    <div
                      className={[
                        'relative h-full bg-white/80 backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300',
                        isSelected
                          ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20 bg-white'
                          : 'border-[#d2d2d7]/50 hover:border-[#86868b] hover:bg-white',
                      ].join(' ')}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
                          {file.type === 'prompt' ? (
                            <FileText className="w-5 h-5 text-[#1d1d1f]" />
                          ) : (
                            <Wrench className="w-5 h-5 text-[#1d1d1f]" />
                          )}
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#f5f5f7] text-[#86868b] border border-[#d2d2d7]/60">
                          {badgeLabel}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors line-clamp-2">
                        {formatToolFileTitle(file.name)}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              );
            })}
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
                  {formatToolFileTitle(tool.files[selectedFile]?.name ?? '')}
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
