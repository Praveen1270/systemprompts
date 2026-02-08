'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, Filter, Database, Cpu, Command } from 'lucide-react';
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
        setLoadError('Failed to load transmission');
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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Layer */}
      <div className="mesh-bg" />
      <div className="noise-overlay" />

      {/* Twitter Credit */}
      <div className="absolute top-0 right-0 p-8 z-20">
        <a
          href="https://twitter.com/Praveenthotakur"
          target="_blank"
          rel="noopener noreferrer"
          className="font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors uppercase"
        >
          @Praveenthotakur
        </a>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {/* Hero Section */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 glass-panel flex items-center justify-center border-accent-primary/20 bg-accent-primary/5">
              <Cpu className="w-5 h-5 text-accent-primary" />
            </div>
            <span className="font-technical text-xs tracking-widest text-accent-primary uppercase">
              Omniscience Archive
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl"
          >
            The blueprint for <span className="text-accent-primary">artificial intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
          >
            A high-fidelity database of verified system prompts from the world's most powerful LLMs.
            Reverse-engineered for clarity and performance.
          </motion.p>
        </header>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-panel p-2 mb-16 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Query archive..."
                />
              </div>
            </div>

            <div className="h-px lg:w-px lg:h-8 bg-border-subtle mx-2" />

            <CategoryFilter
              categories={[...categories]}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </motion.div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-8 opacity-60">
          <div className="flex items-center gap-3 font-technical text-xs tracking-wider">
            <Command className="w-3 h-3" />
            <span>FOUND {filteredPrompts.length} ENTITIES</span>
            {selectedCategory && (
              <>
                <div className="w-1 h-1 rounded-full bg-accent-primary" />
                <span className="text-accent-primary">CATEGORY: {selectedCategory}</span>
              </>
            )}
          </div>
          <div className="hidden md:block w-32 h-px bg-gradient-to-l from-border-subtle to-transparent" />
        </div>

        {/* Main Content Area */}
        <main>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-accent-primary" />
              <p className="font-technical text-xs tracking-widest text-text-muted">INITIALIZING TRANSMISSION...</p>
            </div>
          ) : loadError ? (
            <div className="glass-panel py-24 text-center border-red-500/20 bg-red-500/5">
              <p className="text-red-400 font-technical mb-4">CRITICAL ERROR</p>
              <h3 className="text-2xl font-bold mb-2">{loadError}</h3>
              <p className="text-text-secondary">Archive synchronization failed. Re-initiating connection...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredPrompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PromptCard prompt={prompt} index={index} />
                  </motion.div>
                ))}
              </motion.div>

              {filteredPrompts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <p className="font-technical text-text-muted mb-4 uppercase tracking-[0.2em]">Zero matches found</p>
                  <h3 className="text-3xl font-bold text-text-secondary">Null result at current coordinates</h3>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                    className="mt-8 btn-premium"
                  >
                    Reset Query Parameters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-12 relative z-10 bg-bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <p className="font-technical text-xs tracking-widest text-text-muted">
              SYSTEMPROMPTS ARCHIVE // VERIFIED TRANSMISSIONS ONLY
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="https://twitter.com/Praveenthotakur"
              target="_blank"
              rel="noopener noreferrer"
              className="font-technical text-xs tracking-widest text-text-muted hover:text-accent-primary transition-colors"
            >
              BY @Praveenthotakur
            </a>
            <p className="text-xs text-text-muted">
              &copy; 2026 ARCHIVE. ALL PROMPTS SOURCED FROM PUBLIC DOMAIN COORDINATES.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
