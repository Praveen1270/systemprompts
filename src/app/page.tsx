'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ToolCard from '@/components/ToolCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { tools, categories } from '@/data/tools';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredLogos = tools.filter(tool => tool.id !== 'replit').slice(0, 8);

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Small Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#86868b] text-lg mb-6"
              >
                <span className="font-normal">Welcome to</span>{' '}
                <span className="italic">the Collection</span>
              </motion.p>

              {/* Main Title with Gradient Effect */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                <span className="hero-gradient-text">AI.Prompts.Hub</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto mb-10">
                Explore system prompts from leading AI coding assistants and development tools.
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                <motion.a
                  href="#tools"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white border-2 border-[#1d1d1f] text-[#1d1d1f] font-medium hover:bg-[#1d1d1f] hover:text-white transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Featured Logos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-8"
              >
                {featuredLogos.map((tool) => (
                  <div key={tool.id} className="w-8 h-8 hover:scale-110 transition-transform">
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section id="tools" className="max-w-6xl mx-auto px-6 py-16">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </div>
            <CategoryFilter
              categories={[...categories]}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-sm text-[#86868b]">
              Showing <span className="text-[#1d1d1f] font-medium">{filteredTools.length}</span> tools
              {selectedCategory && (
                <span>
                  {' '}in <span className="text-[#1d1d1f] font-medium">{selectedCategory}</span>
                </span>
              )}
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredTools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="#86868b" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="#86868b" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No tools found</h3>
              <p className="text-[#86868b]">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[#d2d2d7]/50 py-8 backdrop-blur-sm bg-white/30">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-sm text-[#86868b]">
              System prompts collected from public sources
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
