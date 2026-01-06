import Link from 'next/link';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-[#0071e3] hover:underline">
          ← Back to directory
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mt-6 mb-3">
          Add a prompt
        </h1>
        <p className="text-[#86868b] mb-8">
          This directory is file-based. To add a new prompt, add the prompt file and wire it into the
          tool + file map.
        </p>

        <div className="rounded-2xl border border-[#d2d2d7]/60 bg-[#f5f5f7] p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-1">1) Add the file</h2>
            <p className="text-sm text-[#6e6e73]">
              Put your prompt under <code className="font-mono">src/prompts/…</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-1">2) Register the tool/file</h2>
            <p className="text-sm text-[#6e6e73]">
              Add the file name under the correct tool in <code className="font-mono">src/data/tools.ts</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-1">3) Map the file path</h2>
            <p className="text-sm text-[#6e6e73]">
              Add the relative path in <code className="font-mono">src/data/filePathMap.ts</code>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1d1d1f] mb-1">4) Refresh</h2>
            <p className="text-sm text-[#6e6e73]">
              The home page pulls from <code className="font-mono">/api/prompts</code> and will pick it up automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}


