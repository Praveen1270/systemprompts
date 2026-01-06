'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Loader2 } from 'lucide-react';
import PromptCard from '@/components/PromptCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { categories } from '@/data/tools';
import type { PromptIndexItem } from '@/data/promptTypes';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<PromptIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    fetch('/api/prompts')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError('Failed to load prompts');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((p) => {
      const matchesCategory = !selectedCategory || p.toolCategory === selectedCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.toolName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesKind = p.kind === 'prompt';
      return matchesCategory && matchesSearch && matchesKind;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(125% 125% at 50% 90%, #fff 35%, #6366f1 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
          <main className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-center"
              >
                <div className="flex items-center justify-center text-[#6e6e73] mb-3">
                  <span className="text-base sm:text-lg font-semibold tracking-wide text-[#1d1d1f]">
                    systemprompts
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  A database of verified LLM system prompts
                </h1>

                <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-4">
                  <div className="w-full sm:max-w-xl">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Search prompts, tools, categories…"
                    />
                  </div>
                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1d1d1f] text-white font-medium hover:bg-[#2d2d2f] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add prompt
                  </Link>
                </div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <CategoryFilter
                  categories={[...categories]}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </motion.div>

              <div className="flex items-center justify-between gap-3 mb-5">
                <p className="text-sm text-[#86868b]">
                  Showing{' '}
                  <span className="text-[#1d1d1f] font-medium">
                    {filteredPrompts.length}
                  </span>{' '}
                  items
                  {selectedCategory && (
                    <span>
                      {' '}in{' '}
                      <span className="text-[#1d1d1f] font-medium">{selectedCategory}</span>
                    </span>
                  )}
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-[#86868b]" />
                </div>
              ) : loadError ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/80 backdrop-blur flex items-center justify-center border border-[#d2d2d7]/50">
                    <span className="text-xl text-[#86868b]">!</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">Couldn’t load prompts</h3>
                  <p className="text-[#86868b]">{loadError}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 lg:gap-16">
                    {filteredPrompts.map((prompt, index) => (
                      <PromptCard key={prompt.id} prompt={prompt} index={index} />
                    ))}
                  </div>

                  {filteredPrompts.length === 0 && (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/80 backdrop-blur flex items-center justify-center border border-[#d2d2d7]/50">
                        <span className="text-xl text-[#86868b]">⌕</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No matches</h3>
                      <p className="text-[#86868b]">Try a different search or category.</p>
                    </div>
                  )}
                </>
              )}
          </main>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#d2d2d7]/50 py-8 backdrop-blur-sm bg-white/30">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-[#86868b]">
              System prompts collected from public sources
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
