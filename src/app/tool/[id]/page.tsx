'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Wrench, Copy, Check, Loader2, Cpu, Terminal, Command } from 'lucide-react';
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
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
        <div className="mesh-bg" />
        <div className="noise-overlay" />
        <div className="glass-panel max-w-md w-full p-12 text-center stagger-reveal">
          <div className="w-16 h-16 mx-auto mb-6 glass-panel flex items-center justify-center border-accent-primary/20">
            <span className="text-2xl text-accent-primary">?</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">ENTITY NOT FOUND</h1>
          <p className="text-text-secondary mb-8 font-technical text-sm">Target ID {id} does not exist in the archive.</p>
          <Link href="/" className="btn-premium">
            <ArrowLeft className="w-4 h-4" /> RE-INITIATE DIRECTORY
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
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
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const promptCount = tool.files.filter(f => f.type === 'prompt').length;
  const toolsCount = tool.files.filter(f => f.type === 'tools').length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="mesh-bg" />
      <div className="noise-overlay" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            RETURN TO DIRECTORY
          </Link>
        </motion.div>

        {/* Header Section */}
        <header className="mb-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 lg:w-32 lg:h-32 glass-panel p-4 flex items-center justify-center bg-white/[0.03] border-accent-primary/20"
          >
            {!imageError ? (
              <Image
                src={tool.logo}
                alt={tool.name}
                width={80}
                height={80}
                className="object-contain w-full h-full opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <span className="text-4xl font-bold text-accent-primary">{tool.name.charAt(0)}</span>
            )}
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">{tool.name}</h1>
              <div className="px-3 py-1 glass-panel bg-accent-primary/5 border-accent-primary/20 text-accent-primary text-[10px] font-technical tracking-widest uppercase">
                {tool.category}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-secondary max-w-3xl mb-8 leading-relaxed"
            >
              {tool.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3 font-technical text-xs tracking-wider text-text-muted">
                <FileText className="w-4 h-4 text-accent-primary" />
                <span>{promptCount} PROMPTS IDENTIFIED</span>
              </div>
              {toolsCount > 0 && (
                <div className="flex items-center gap-3 font-technical text-xs tracking-wider text-text-muted">
                  <Wrench className="w-4 h-4 text-accent-secondary" />
                  <span>{toolsCount} SCHEMAS DETECTED</span>
                </div>
              )}
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
          {/* File Selection Sidebar */}
          <aside className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Command className="w-4 h-4 text-text-muted" />
              <h2 className="font-technical text-sm tracking-widest text-text-primary">DATA_STREAMS</h2>
            </div>

            <div className="space-y-3">
              {tool.files.map((file, index) => {
                const isSelected = selectedFile === index;
                return (
                  <motion.button
                    key={file.name}
                    onClick={() => setSelectedFile(index)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left glass-panel p-4 transition-all duration-300 ${isSelected
                        ? 'bg-accent-primary/10 border-accent-primary/40 text-accent-primary'
                        : 'bg-white/[0.02] border-white/5 text-text-secondary hover:border-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-accent-primary/20' : 'bg-white/5'}`}>
                        {file.type === 'prompt' ? <FileText className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${isSelected ? 'text-accent-primary' : 'text-text-primary'}`}>
                          {formatToolFileTitle(file.name)}
                        </p>
                        <p className="text-[10px] font-technical tracking-tighter opacity-60">
                          {file.type.toUpperCase()}_PAYLOAD
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="min-w-0">
            <div className="glass-panel border-accent-primary/10 overflow-hidden bg-bg-surface/40 backdrop-blur-xl">
              {/* Toolbar */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5 px-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="font-technical text-[11px] tracking-widest text-accent-primary flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" />
                    {formatToolFileTitle(tool.files[selectedFile]?.name ?? '')}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  disabled={loading || !!error}
                  className="btn-premium px-4 py-2 text-[10px] uppercase font-technical tracking-[0.15em]"
                >
                  {copiedIndex === selectedFile ? (
                    <><Check className="w-3.5 h-3.5" /> COPIED</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> COPY_CONTENT</>
                  )}
                </button>
              </div>

              {/* Viewer */}
              <div className="p-8 min-h-[500px] relative">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-base/80">
                    <Loader2 className="w-10 h-10 animate-spin text-accent-primary" />
                    <p className="font-technical text-[10px] tracking-[0.2em] text-text-muted">RETRIEVING_DATA...</p>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-12">
                    <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border-red-500/20">
                      <span className="text-red-500 text-2xl font-technical">!</span>
                    </div>
                    <p className="text-text-secondary font-technical text-sm max-w-sm">{error}</p>
                    <button className="btn-premium mt-4 text-[10px] font-technical uppercase">RE-INITIATE_FETCH</button>
                  </div>
                ) : (
                  <pre className="font-technical text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words selection:bg-accent-primary/30">
                    {content}
                  </pre>
                )}
              </div>
            </div>

            {/* Related Tools Section */}
            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <Cpu className="w-5 h-5 text-accent-secondary" />
                <h2 className="text-2xl font-bold">Adjacent Entities</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter(t => t.category === tool.category && t.id !== tool.id)
                  .slice(0, 3)
                  .map((relatedTool) => (
                    <RelatedToolCard key={relatedTool.id} tool={relatedTool} />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Re-usable Bottom Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary/0 via-accent-primary/20 to-accent-primary/0 opacity-50" />
    </div>
  );
}

function RelatedToolCard({ tool }: { tool: typeof tools[0] }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/tool/${tool.id}`} className="block group">
      <div className="glow-card h-full">
        <div className="glass-panel p-5 flex items-center gap-4 transition-all duration-300 group-hover:bg-white/[0.04]">
          <div className="w-12 h-12 rounded-xl glass-panel p-2 flex items-center justify-center bg-white/[0.02]">
            {!imageError ? (
              <Image
                src={tool.logo}
                alt={tool.name}
                width={32}
                height={32}
                className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <span className="text-lg font-bold text-accent-primary">{tool.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-text-primary group-hover:text-accent-primary transition-colors truncate">
              {tool.name}
            </h3>
            <p className="font-technical text-[10px] tracking-widest text-text-muted">
              {tool.files.length} ASSETS
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
