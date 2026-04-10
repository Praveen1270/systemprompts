import Link from 'next/link';

export default function SubmitPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="mesh-bg" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/"
          className="text-sm font-technical tracking-wide text-text-muted hover:text-accent-primary transition-colors"
        >
          ← Back to directory
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mt-6 mb-3">
          Add a prompt
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          This directory is file-based. To add a new prompt, add the prompt file and wire it into the
          tool and file map.
        </p>

        <div className="rounded-2xl border border-border-subtle glass-panel p-5 sm:p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">1) Add the file</h2>
            <p className="text-sm text-text-muted">
              Put your prompt under <code className="font-mono text-accent-primary/90">src/prompts/…</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">2) Register the tool/file</h2>
            <p className="text-sm text-text-muted">
              Add the file name under the correct tool in <code className="font-mono text-accent-primary/90">src/data/tools.ts</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">3) Map the file path</h2>
            <p className="text-sm text-text-muted">
              Add the relative path in <code className="font-mono text-accent-primary/90">src/data/filePathMap.ts</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">4) Refresh</h2>
            <p className="text-sm text-text-muted">
              The home page pulls from <code className="font-mono text-accent-primary/90">/api/prompts</code> and will pick it up automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
