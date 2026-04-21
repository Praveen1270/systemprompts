'use client';

import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  FileText,
  Wrench,
  Copy,
  Check,
  Loader2,
} from 'lucide-react';
import { getToolById, tools } from '@/data/tools';
import { useState, useEffect, useCallback } from 'react';
import { filePathMap } from '@/data/filePathMap';
import { formatToolFileTitle } from '@/lib/display';

export default function ToolPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = params.id as string;
  const tool = getToolById(id);
  const fileParam = searchParams.get('file');

  const initialFileIndex =
    tool && fileParam
      ? (() => {
          const i = tool.files.findIndex((f) => f.name === fileParam);
          return i >= 0 ? i : 0;
        })()
      : 0;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState(initialFileIndex);
  const [contentByKey, setContentByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!tool) return;
    if (!fileParam) {
      setSelectedFile(0);
      return;
    }
    const idx = tool.files.findIndex((f) => f.name === fileParam);
    if (idx >= 0) setSelectedFile(idx);
  }, [tool, fileParam]);

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
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          setErrorByKey((prev) => ({ ...prev, [currentKey]: data.error }));
          return;
        }
        setContentByKey((prev) => ({ ...prev, [currentKey]: data.content ?? '' }));
      })
      .catch(() => {
        setErrorByKey((prev) => ({ ...prev, [currentKey]: 'Failed to load content' }));
      });
  }, [tool, filePath, currentKey, contentByKey, errorByKey]);

  const selectFile = useCallback(
    (index: number) => {
      if (!tool) return;
      setSelectedFile(index);
      const name = tool.files[index]?.name;
      if (!name) return;
      const next = new URLSearchParams(searchParams.toString());
      next.set('file', name);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [tool, pathname, router, searchParams]
  );

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-bg-base">
        <div className="max-w-sm w-full text-center px-6">
          <p className="text-sm text-text-muted mb-2">Not found</p>
          <h1 className="text-xl font-semibold text-text-primary mb-6 tracking-tight">
            No tool “{id}”
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:opacity-80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
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

  const promptCount = tool.files.filter((f) => f.type === 'prompt').length;
  const toolsCount = tool.files.filter((f) => f.type === 'tools').length;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <header className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-border-subtle bg-bg-surface flex items-center justify-center shrink-0 shadow-sm">
            {!imageError ? (
              <Image
                src={tool.logo}
                alt=""
                width={56}
                height={56}
                className="object-contain"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <span className="text-2xl font-semibold text-text-muted">{tool.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                {tool.name}
              </h1>
              <span className="text-xs font-medium text-text-secondary px-2.5 py-1 rounded-full border border-border-subtle bg-bg-surface">
                {tool.category}
              </span>
            </div>
            <p className="text-base text-text-secondary leading-relaxed max-w-2xl mb-5">
              {tool.description}
            </p>
            <p className="text-sm text-text-muted">
              {promptCount} prompt{promptCount !== 1 ? 's' : ''}
              {toolsCount > 0 ? ` · ${toolsCount} tool file${toolsCount !== 1 ? 's' : ''}` : ''}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-10 lg:gap-14">
          <nav aria-label="Prompt files" className="space-y-1">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3 px-1">
              Files
            </p>
            {tool.files.map((file, index) => {
              const selected = selectedFile === index;
              return (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => selectFile(index)}
                  className={`w-full text-left rounded-xl px-3 py-3 flex items-start gap-3 transition-colors border ${
                    selected
                      ? 'bg-bg-surface border-border-bright shadow-sm'
                      : 'border-transparent hover:bg-bg-surface/80'
                  }`}
                >
                  <span
                    className={`mt-0.5 p-1.5 rounded-lg ${
                      selected ? 'text-accent-primary bg-accent-primary/10' : 'text-text-muted'
                    }`}
                  >
                    {file.type === 'prompt' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <Wrench className="w-4 h-4" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-medium leading-snug ${
                        selected ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {formatToolFileTitle(file.name)}
                    </span>
                    <span className="text-xs text-text-muted capitalize">{file.type}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          <section className="min-w-0">
            <div className="rounded-2xl border border-border-subtle bg-bg-surface shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-border-subtle bg-bg-base/50">
                <h2 className="text-sm font-medium text-text-primary truncate pr-2">
                  {formatToolFileTitle(tool.files[selectedFile]?.name ?? '')}
                </h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={loading || !!error}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-text-primary text-bg-surface disabled:opacity-40 disabled:pointer-events-none hover:opacity-90 transition-opacity"
                >
                  {copiedIndex === selectedFile ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-6 min-h-[280px] sm:min-h-[420px] relative">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-surface/80">
                    <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
                    <p className="text-sm text-text-muted">Loading…</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                    <p className="text-sm text-text-secondary mb-2">{error}</p>
                  </div>
                ) : (
                  <pre className="font-technical text-[13px] sm:text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                    {content}
                  </pre>
                )}
              </div>
            </div>

            <div className="mt-14">
              <h3 className="text-lg font-semibold text-text-primary mb-4 tracking-tight">
                More in {tool.category}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools
                  .filter((t) => t.category === tool.category && t.id !== tool.id)
                  .slice(0, 4)
                  .map((related) => (
                    <li key={related.id}>
                      <Link
                        href={`/tool/${related.id}`}
                        className="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-surface px-4 py-3 hover:border-border-bright transition-colors shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center bg-bg-base shrink-0 overflow-hidden">
                          <Image
                            src={related.logo}
                            alt=""
                            width={24}
                            height={24}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-text-primary text-sm block truncate">
                            {related.name}
                          </span>
                          <span className="text-xs text-text-muted">
                            {related.files.length} files
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
